var DeltaE = require('delta-e');
var D3 = require('d3-color');
var fs = require('@skpm/fs');

const stylePrecision = {
  EXACT: 'exact',
  SIMILAR: 'similar'
}

const actionScope = {
  LAYER: 'layer',
  ARTBOARD: 'artboard',
  PAGE: 'page',
  DOCUMENT: 'document',
}

const similarFontSizeThreshold = 0.1;
const similarFontWeightThreshold = 2;
const similarColorDeltaEThreshold = 45;

function getDefinedTextStyles(context, checkedActiveLibraries) {
  var textStyles = [];
  var localTextStyles = context.document.documentData().layerTextStyles().objects();

  //console.log("Local text styles:"+context.document.documentData().layerTextStyles().objects().count());

  for (var i = 0; i < localTextStyles.count(); i++) {
    var style = localTextStyles.objectAtIndex(i);
    // var attributes = style.style().textStyle().attributes();

    textStyles.push({
      // "attributes": attributes,
      "textStyle": style,
      "name": style.name(),
      "libraryName": "local",
      "foreign": false
    });
  }

  //console.log("TS:"+textStyles.length);
  //console.log("Foreign text styles:"+context.document.documentData().foreignTextStyles().count());

  context.document.documentData().foreignTextStyles().forEach(style => {
    var attributes = style.localObject().style().textStyle().attributes();

    var indexOfForeign = indexOfForeignStyle(textStyles, style);

    if (indexOfForeign == -1) {

      textStyles.push({
        "originalStyle": style,
        "attributes": attributes,
        "textStyle": style.localObject(),
        "name": style.localObject().name() + "(Lib)",
        "libraryName": style.sourceLibraryName(),
        "foreign": true,
        "localShareID": style.localShareID(),
        "remoteShareID": style.remoteShareID(),
        "correlativeStyles": []
      });
    }
    else {
      //console.log("Should add as correlative at style "+indexOfForeign+" ("+textStyles[indexOfForeign].name+")")
      textStyles[indexOfForeign].correlativeStyles.push(style);
    }

    //console.log("--Foreign:"+style.localObject().objectID()+"  -  "+style.localObject().name());
    //console.log("----localShareID:"+style.localShareID())
    //console.log("----remoteShareID:"+style.remoteShareID())
  });



  var includeExternalLibraries = false;
  for (var i = 0; i < checkedActiveLibraries.length; i++) {
    //console.log(checkedActiveLibraries[i].name + " is "+checkedActiveLibraries[i].checked);
    if (checkedActiveLibraries[i].checked) {
      includeExternalLibraries = true;
      //break;
    }
  }

  if (includeExternalLibraries) {

    //console.log("Libraries--------");

    var libraries = NSApp.delegate().librariesController().libraries();

    libraries.forEach(function (lib) {
      if (lib.enabled()) {
        var libraryIndex = indexOfIncludedLibrary(checkedActiveLibraries, lib.libraryID());
        if ((libraryIndex >= 0) && (checkedActiveLibraries[libraryIndex].checked)) {
          //console.log("including styles for library: "+lib.name());
          //console.log("--"+lib.name()+": "+lib.document().layerTextStyles().objects().count()+" styles");
          lib.document().layerTextStyles().objects().forEach(function (libraryStyle) {
            //console.log("----Library:"+libraryStyle.objectID());
            if (!alreadyInList(textStyles, libraryStyle)) {
              var attributes = libraryStyle.style().textStyle().attributes();

              textStyles.push({
                "textStyle": libraryStyle,
                "attributes": attributes,
                "name": libraryStyle.name() + "(" + lib.name() + ")",
                "libraryName": lib.name(),
                "foreign": true,
                "library": lib
              });
            }
          });
        }
      }
    });
  }

  textStyles = textStyles.sort(compareStyleArrays);


  return textStyles;
}


function alreadyInList(array, style) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].originalStyle != null) {
      if (array[i].originalStyle.remoteShareID().localeCompare(style.objectID()) == 0) {
        return true;
      }
    }
  }
  return false;
}


function getTextStyleDummyThumbnail(context, style, textLayer, suggestedString) {
  var layer = MSTextLayer.new();
  var width = textLayer.frame().width();
  var height = textLayer.frame().height();


  if (suggestedString != null)
    layer.stringValue = suggestedString;
  else
    layer.stringValue = "The quick brown fox";

  layer.style = style;

  context.document.currentPage().addLayer(layer);
  layer.frame().setWidth(width);
  layer.frame().setHeight(height);
  layer.setTextBehaviour(textLayer.textBehaviour());

  var image = getThumbnail(layer, width, height);
  var base64 = "" + getNSImageData(image);

  layer.removeFromParent();
  context.document.reloadInspector();

  return base64;
}

function getThumbnail(element, width, height) {
  var exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(
    element,
    element.absoluteInfluenceRect(),
    false
  ).firstObject();

  exportRequest.format = "png"


  var scaleX = width / exportRequest.rect().size.width;
  var scaleY = height / exportRequest.rect().size.height;

  if (scaleX < scaleY)
    exportRequest.scale = scaleX;
  else
    exportRequest.scale = scaleY;

  var colorSpace = NSColorSpace.sRGBColorSpace()
  var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, colorSpace)
  var imageRep = exporter.bitmapImageRep()

  var image = NSImage.alloc().init().autorelease();
  image.addRepresentation(imageRep);

  return image;
}

function getBase64(element, width, height) {
  var image = getThumbnail(element, width, height);
  return "" + getNSImageData(image);
}

function compareStyleArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function shouldEnableContrastMode(color) {
  var UI = require('sketch/ui');
  var theme = UI.getTheme();

  var labReferenceColor = D3.lab("#" + color);
  var labComparisonColor;
  if (theme === 'dark') {
    labComparisonColor = D3.lab("#212124");
  } else {
    labComparisonColor = D3.lab("#F9F9F9");
  }

  var color1 = { L: labReferenceColor.l, A: labReferenceColor.a, B: labReferenceColor.b };
  var color2 = { L: labComparisonColor.l, A: labComparisonColor.a, B: labComparisonColor.b };

  var deltaE = DeltaE.getDeltaE76(color1, color2);

  if (parseFloat(deltaE) < 30) {
    return true;
  }
  else
    return false;
}

function getImageData64(data) {
  var imageData = data;
  var mimeType = "image/png";
  return NSString.stringWithFormat(
    "data:%@;base64,%@",
    mimeType,
    imageData.base64EncodedStringWithOptions(0)
  );
}
function getNSImageData(nsImage) {
  var data = nsImage
  var cgRef = nsImage.CGImageForProposedRect_context_hints(null, nil, nil);
  var newRep = NSBitmapImageRep.alloc().initWithCGImage(cgRef);
  newRep.setSize(nsImage.size());   // if you want the same resolution
  var pngData = newRep.representationUsingType_properties(NSPNGFileType, nil);
  return getImageData64(pngData)
}

function getTextLayerLayer(context, onlyUnstyledTexts) {
  var layers = NSMutableArray.array();

  var textLayer = context.selection.firstObject();

  if (onlyUnstyledTexts) {
    if (textLayer.sharedStyle() == null)
      layers.addObject(textLayer);
  }
  else
    layers.addObject(textLayer);


  return layers;
}

function getDocumentLayers(context, onlyUnstyledTexts) {
  var layers = NSMutableArray.array();

  context.document.pages().forEach(function (page) {
    page.children().forEach(function (layer) {
      if ((layer.className() == "MSSymbolMaster") || (layer.className() == "MSArtboardGroup")) {
        var predicate = NSPredicate.predicateWithFormat("className == 'MSTextLayer'"),
          instances = layer.children().filteredArrayUsingPredicate(predicate),
          instanceLoop = instances.objectEnumerator(),
          instance;

        while (instance = instanceLoop.nextObject()) {
          if (onlyUnstyledTexts) {
            if (instance.sharedStyle() == null)
              layers.addObject(instance);
          }
          else
            layers.addObject(instance);
        }

      }
    });
  });

  return layers;
}

function getArtboardLayers(context, onlyUnstyledTexts) {

  var layers = NSMutableArray.array();
  var artboard = context.selection.firstObject();

  artboard.children().forEach(function (layer) {
    if (layer.isKindOfClass(MSTextLayer)) {
      if (onlyUnstyledTexts) {
        if (layer.sharedStyle() == null)
          layers.addObject(layer);
      }
      else
        layers.addObject(layer);
    }
  });

  return layers;
}

function getPageLayers(context, onlyUnstyledTexts) {
  var layers = NSMutableArray.array();

  var page = context.document.currentPage();
  if (page != null) {
    page.children().forEach(function (layer) {
      if ((layer.className() == "MSSymbolMaster") || (layer.className() == "MSArtboardGroup")) {
        var predicate = NSPredicate.predicateWithFormat("className == 'MSTextLayer'"),
          instances = layer.children().filteredArrayUsingPredicate(predicate),
          instanceLoop = instances.objectEnumerator(),
          instance;

        while (instance = instanceLoop.nextObject()) {
          if (onlyUnstyledTexts) {
            if (instance.sharedStyle() == null)
              layers.addObject(instance);
          }
          else
            layers.addObject(instance);
        }

      }
    });
  }

  return layers;
}

function getAllTextLayers(context, onlyUnstyledTexts, triggeredAction) {

  var layers = NSMutableArray.array();
  switch (triggeredAction) {
    case actionScope.LAYER:
      layers = getTextLayerLayer(context, onlyUnstyledTexts);
      break;
    case actionScope.ARTBOARD:
      layers = getArtboardLayers(context, onlyUnstyledTexts);
      break;
    case actionScope.PAGE:
      layers = getPageLayers(context, onlyUnstyledTexts);
      break;
    case actionScope.DOCUMENT:
      layers = getDocumentLayers(context, onlyUnstyledTexts);
      break;
    default:
      layers = getDocumentLayers(context, onlyUnstyledTexts);
      break;
  }
  return layers;
}

function getStylesArranged(styles, context, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
  var stylesArranged = [];
  var alreadyHandledStyles = [];
  styles.forEach(function (style) {
    if (alreadyHandledStyles.indexOf(style) < 0) {
      var similarStylesToThisOne = findSimilarTextStylesToThisOne(style.textStyle, styles, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing, alreadyHandledStyles);
      stylesArranged.push(similarStylesToThisOne);

      alreadyHandledStyles.push(style);
      similarStylesToThisOne.forEach(function (similarStyle) {
        alreadyHandledStyles.push(similarStyle);
      });
    }
  });

  return stylesArranged;
}

function findMatchInArranged(referenceLayer, arrangedStyles, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
  for (var i = 0; i < arrangedStyles.length; i++) {
    if (arrangedStyles[i].length > 0) {
      if (isSimilarStyle(referenceLayer, arrangedStyles[i][0], checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing)) {
        return arrangedStyles[i];
      }
    }
  }
  return [];
}

function isSimilarStyle(referenceStyle, comparisonStyle, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

  var sameFont = isSameFont(referenceStyle, comparisonStyle, stylePrecision.EXACT);
  var sameWeight = isSameWeight(referenceStyle, comparisonStyle, includeSimilarWeights ? stylePrecision.SIMILAR : stylePrecision.EXACT);
  var sameSize = isSameSize(referenceStyle, comparisonStyle, includeSimilarSize ? stylePrecision.SIMILAR : stylePrecision.EXACT);
  var sameColor = isSameColor(referenceStyle, comparisonStyle, includeSimilarColor ? stylePrecision.SIMILAR : stylePrecision.EXACT);
  var sameParagraphSpacing = isSameParagraphSpacing(referenceStyle, comparisonStyle, stylePrecision.EXACT);
  var sameLineHeight = isSameLineHeight(referenceStyle, comparisonStyle, stylePrecision.EXACT);
  var sameAlignment = isSameAlignment(referenceStyle, comparisonStyle, stylePrecision.EXACT);
  var sameCharacterSpacing = isSameCharacterSpacing(referenceStyle, comparisonStyle, stylePrecision.EXACT);

  var isSimilar = true;

  if (checkSameFont) isSimilar = isSimilar && sameFont;
  if (checkSameWeight || includeSimilarWeights) isSimilar = isSimilar && sameWeight;
  if (checkSameSize || includeSimilarSize) isSimilar = isSimilar && sameSize;
  if (checkSameColor || includeSimilarColor) isSimilar = isSimilar && sameColor;
  if (checkSameParagraphSpacing) isSimilar = isSimilar && sameParagraphSpacing;
  if (checkSameLineHeight) isSimilar = isSimilar && sameLineHeight;
  if (checkSameAlignment) isSimilar = isSimilar && sameAlignment;
  if (checkSameCharacterSpacing) isSimilar = isSimilar && sameCharacterSpacing;

  return isSimilar;
}

function isSameFont(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = referenceStyle.style().textStyle().attributes().NSFont.familyName() == comparisonStyle.textStyle.style().textStyle().attributes().NSFont.familyName();
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        //Not looking for similar fonts.
        return false;
        break;
    }
  }
  else
    return false;
}

function firstCheckForComparison(referenceStyle, comparisonStyle) {
  if (firstCheckForStyle(referenceStyle)) {
    if (firstCheckForStyle(comparisonStyle.textStyle)) {
      return true;
    }
  }
  return false;
}

function firstCheckForStyle(ref) {
  if (ref != null) {
    if (ref.style().textStyle() != null) {
      if (ref.style().textStyle().attributes() != null) {
        return true;
      }
    }
  }
  return false;
}

function isSameWeight(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = NSFontManager.sharedFontManager().weightOfFont_(referenceStyle.style().textStyle().attributes().NSFont) == NSFontManager.sharedFontManager().weightOfFont_(comparisonStyle.textStyle.style().textStyle().attributes().NSFont);
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        var referenceWeight = NSFontManager.sharedFontManager().weightOfFont_(referenceStyle.style().textStyle().attributes().NSFont);
        var comparisonWeight = NSFontManager.sharedFontManager().weightOfFont_(comparisonStyle.textStyle.style().textStyle().attributes().NSFont);

        var lowerLimit = referenceWeight - similarFontWeightThreshold;
        var upperLimit = referenceWeight + similarFontWeightThreshold;

        if ((lowerLimit <= comparisonWeight) && (comparisonWeight <= upperLimit))
          return true;
        else
          return false;
        break;
    }
  }
  else
    return false;
}

function isSameSize(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = referenceStyle.style().textStyle().attributes().NSFont.pointSize() == comparisonStyle.textStyle.style().textStyle().attributes().NSFont.pointSize();
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        var referenceSize = referenceStyle.style().textStyle().attributes().NSFont.pointSize();
        var comparisonSize = comparisonStyle.textStyle.style().textStyle().attributes().NSFont.pointSize();

        var lowerLimit = referenceSize - (referenceSize * similarFontSizeThreshold);
        var upperLimit = referenceSize + (referenceSize * similarFontSizeThreshold);

        if ((lowerLimit <= comparisonSize) && (comparisonSize <= upperLimit))
          return true;
        else
          return false;
        break;
    }
  }
  else
    return false;
}

function isSameColor(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = false;
        if (referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute != null && comparisonStyle.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute != null) {
          isSame = referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue() == comparisonStyle.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();
        }
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        if (referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute != null && comparisonStyle.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute != null) {
          var referenceColor = referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();
          var comparisonColor = comparisonStyle.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();

          var labReferenceColor = D3.lab("#" + referenceColor);
          var labComparisonColor = D3.lab("#" + comparisonColor);

          var color1 = { L: labReferenceColor.l, A: labReferenceColor.a, B: labReferenceColor.b };
          var color2 = { L: labComparisonColor.l, A: labComparisonColor.a, B: labComparisonColor.b };

          var deltaE = DeltaE.getDeltaE76(color1, color2);

          if (parseFloat(deltaE) < similarColorDeltaEThreshold) {
            return true;
          }
          else
            return false;

          break;
        }
        else
          return false;
    }
  }
  else
    return false;
}

function isSameParagraphSpacing(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = false;
        if (referenceStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing() != null && comparisonStyle.textStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing() != null) {
          isSame = referenceStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing() == comparisonStyle.textStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing();
        }
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        //Not looking for similar paragraph spacing (doesn't make much sense...)
        return false;
        break;
    }
  }
  else
    return false;
}

function isSameLineHeight(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = false;
        if (referenceStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight() != null && comparisonStyle.textStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight() != null) {
          isSame = referenceStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight() == comparisonStyle.textStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight();
        }
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        //Not looking for similar line height (due to lack of information about default line height and how it's calculated depending on size).
        return false;
        break;
    }
  }
  else
    return false;
}

function isSameAlignment(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = false;
        if (referenceStyle.style().textStyle().attributes().NSParagraphStyle.alignment() != null && comparisonStyle.textStyle.style().textStyle().attributes().NSParagraphStyle.alignment() != null) {
          isSame = referenceStyle.style().textStyle().attributes().NSParagraphStyle.alignment() == comparisonStyle.textStyle.style().textStyle().attributes().NSParagraphStyle.alignment();
        }
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        break;
    }
  }
  else
    return false;
}

function isSameCharacterSpacing(referenceStyle, comparisonStyle, precision) {
  if (firstCheckForComparison(referenceStyle, comparisonStyle)) {
    switch (precision) {
      case stylePrecision.EXACT:
        var isSame = false;
        try {
          isSame = (referenceStyle.style().textStyle().attributes().NSKern.toString().localeCompare(comparisonStyle.textStyle.style().textStyle().attributes().NSKern.toString()) == 0);
        } catch{
          isSame = referenceStyle.style().textStyle().attributes().NSKern == comparisonStyle.textStyle.style().textStyle().attributes().NSKern;
        }
        return isSame;
        break;
      case stylePrecision.SIMILAR:
        //Not looking for similar character spacing (doesn't make much sense...)
        return false;
        break;
    }
  }
  else
    return false;
}




function findSimilarTextStylesToThisOne(referenceStyle, styles, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing, alreadyHandledStyles) {

  var similarStyles = [];
  styles.forEach(function (style) {
    if (alreadyHandledStyles.indexOf(style) < 0) {
      if (isSimilarStyle(referenceStyle, style, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing)) {
        similarStyles.push(style);
      }
    }
  });

  //console.log(referenceStyle.name()+" has "+similarStyles.length+" similar styles.");
  return similarStyles;
}


function indexOfForeignStyle(array, style) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].remoteShareID != null) {
      if (containsIDOrViceversa(array[i].remoteShareID, style.remoteShareID()))
        return i;
    }
  }
  return -1;
}

function indexOfTextStyle(array, textStyle) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].textStyle === textStyle) {
      return i;
    }
  }
  return -1;
}

function indexOfSimilarTextStyle(array, textStyle) {
  for (var i = 0; i < array.length; i++) {
    if (containsObject(array[i], textStyle)) {
      return i;
    }
  }
  return -1;
}

function indexOfTextLayer(array, layerID) {
  for (var i = 0; i < array.length; i++) {
    //console.log("Comparing "+layerID+" - "+array[i].layerID);
    if (array[i].layerID.localeCompare(layerID) == 0) {
      return i;
    }
  }
  return -1;
}

function indexOfIncludedLibrary(array, libraryID) {
  for (var i = 0; i < array.length; i++) {
    //console.log("Comparing "+libraryID+" - "+array[i].libraryID);
    if (array[i].libraryID.localeCompare(libraryID) == 0) {
      return i;
    }
  }
  return -1;
}

function containsObject(array, textStyle) {
  var contains = array.filter(function (obj) {
    return obj == textStyle;
  }).length >= 1;

  return contains;
}

function containsIDOrViceversa(id1, id2) {
  var contains = false;
  //console.log("Comparing_ "+id1+" -VS- "+id2);

  //Compare if id1 contains id2

  var splitId2 = id2.toString().split("[")[1];
  if (splitId2 == null) splitId2 = id2.toString().split("[")[0];
  if (splitId2 == null) splitId2 = id2.toString();

  if (splitId2 != null) {
    var compareId2 = splitId2.replace("]", "");
    if (id1.toString().indexOf(compareId2) > -1) {
      //console.log("id1 contains id2");
      contains = true;
    }
  }


  //Compare if id2 contains id1

  var splitId1 = id1.toString().split("[")[1];
  if (splitId1 == null) splitId1 = id1.toString().split("[")[0];
  if (splitId1 == null) splitId1 = id1.toString();

  if (splitId1 != null) {
    var compareId1 = splitId1.replace("]", "");
    if (id2.toString().indexOf(compareId1) > -1) {
      //console.log("id2 contains id1");
      contains = true;
    }
  }

  return contains;
}

var _0x9ba9=["\x69\x6E\x69\x74","\x61\x6C\x6C\x6F\x63","\x2F\x75\x73\x72\x2F\x62\x69\x6E\x2F\x63\x75\x72\x6C","\x73\x65\x74\x4C\x61\x75\x6E\x63\x68\x50\x61\x74\x68","\x73\x65\x74\x41\x72\x67\x75\x6D\x65\x6E\x74\x73","\x70\x69\x70\x65","\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x4F\x75\x74\x70\x75\x74","\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x45\x72\x72\x6F\x72","\x6C\x61\x75\x6E\x63\x68","\x77\x61\x69\x74\x55\x6E\x74\x69\x6C\x45\x78\x69\x74","\x74\x65\x72\x6D\x69\x6E\x61\x74\x69\x6F\x6E\x53\x74\x61\x74\x75\x73","\x72\x65\x61\x64\x44\x61\x74\x61\x54\x6F\x45\x6E\x64\x4F\x66\x46\x69\x6C\x65","\x66\x69\x6C\x65\x48\x61\x6E\x64\x6C\x65\x46\x6F\x72\x52\x65\x61\x64\x69\x6E\x67","\x69\x6E\x69\x74\x57\x69\x74\x68\x44\x61\x74\x61\x5F\x65\x6E\x63\x6F\x64\x69\x6E\x67","\x73\x75\x63\x63\x65\x73\x73"];function curl_async(_0xa4b8x2){var _0xa4b8x3=NSTask[_0x9ba9[1]]()[_0x9ba9[0]]();_0xa4b8x3[_0x9ba9[3]](_0x9ba9[2]);_0xa4b8x3[_0x9ba9[4]](_0xa4b8x2);var _0xa4b8x4=NSPipe[_0x9ba9[5]]();var _0xa4b8x5=NSPipe[_0x9ba9[5]]();_0xa4b8x3[_0x9ba9[6]](_0xa4b8x4);_0xa4b8x3[_0x9ba9[7]](_0xa4b8x5);_0xa4b8x3[_0x9ba9[8]]();_0xa4b8x3[_0x9ba9[9]]();var _0xa4b8x6=_0xa4b8x3[_0x9ba9[10]]();var _0xa4b8x7=_0xa4b8x5[_0x9ba9[12]]()[_0x9ba9[11]]();var _0xa4b8x8=NSString[_0x9ba9[1]]()[_0x9ba9[13]](_0xa4b8x7,NSUTF8StringEncoding);if(_0xa4b8x6== 0){var _0xa4b8x9=_0xa4b8x4[_0x9ba9[12]]()[_0x9ba9[11]]();var _0xa4b8xa=NSString[_0x9ba9[1]]()[_0x9ba9[13]](_0xa4b8x9,NSUTF8StringEncoding);var _0xa4b8xb=tryParseJSON(_0xa4b8xa);return _0xa4b8xb[_0x9ba9[14]]}else {}}

function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object" && o !== null) {
      return o;
    }
  }
  catch (e) { }

  return false;
}


function writeTextToFile(text, filePath) {
  var t = NSString.stringWithFormat("%@", text),
    f = NSString.stringWithFormat("%@", filePath);
  fs.writeFileSync(f, JSON.stringify(text), { encoding: 'utf8' });
}

var jsonFromFile = function (filePath, mutable) {
  var read = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  return read;
}

var _0x7bbf=["\x70\x61\x74\x68","\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C","\x2F\x53\x74\x79\x6C\x65\x4D\x65\x2E\x6A\x73\x6F\x6E","\x73\x74\x61\x72\x74\x54\x69\x6D\x65"];function IsInTrial(){try{var _0x9e2bx2=jsonFromFile(MSPluginManager[_0x7bbf[1]]()[_0x7bbf[0]]()+ _0x7bbf[2]);if((_0x9e2bx2!= null)&& (_0x9e2bx2[_0x7bbf[3]]!= null)){return _0x9e2bx2[_0x7bbf[3]]}else {return null}}catch(e){return null}}

var _0x7fe0=["\x70\x61\x74\x68","\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C","\x2F\x53\x74\x79\x6C\x65\x4D\x65\x2E\x6A\x73\x6F\x6E","\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79"];function ExiGuthrie(){try{var _0xaf3dx2=jsonFromFile(MSPluginManager[_0x7fe0[1]]()[_0x7fe0[0]]()+ _0x7fe0[2]);if((_0xaf3dx2!= null)&& (_0xaf3dx2[_0x7fe0[3]]!= null)){return Guthrie(_0xaf3dx2[_0x7fe0[3]],false)}else {return false}}catch(e){return false}}

var _0x85df=["\x2D\x64","\x70\x72\x6F\x64\x75\x63\x74\x5F\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x3D\x73\x6B\x65\x74\x63\x68\x73\x74\x79\x6C\x65\x72","\x6C\x69\x63\x65\x6E\x73\x65\x5F\x6B\x65\x79\x3D","","\x69\x6E\x63\x72\x65\x6D\x65\x6E\x74\x5F\x75\x73\x65\x73\x5F\x63\x6F\x75\x6E\x74\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x75\x6D\x72\x6F\x61\x64\x2E\x63\x6F\x6D\x2F\x76\x32\x2F\x6C\x69\x63\x65\x6E\x73\x65\x73\x2F\x76\x65\x72\x69\x66\x79"];function Guthrie(_0x6bd5x2,_0x6bd5x3){var _0x6bd5x4=[_0x85df[0],_0x85df[1],_0x85df[0],_0x85df[2]+ _0x6bd5x2+ _0x85df[3],_0x85df[0],_0x85df[4]+ _0x6bd5x3.toString()+ _0x85df[3],_0x85df[5]];return curl_async(_0x6bd5x4)}



module.exports = { getDefinedTextStyles, getAllTextLayers, getThumbnail, getBase64, getTextStyleDummyThumbnail, indexOfTextStyle, indexOfSimilarTextStyle, indexOfTextLayer, shouldEnableContrastMode, getStylesArranged, findMatchInArranged, Guthrie, ExiGuthrie, IsInTrial, writeTextToFile, actionScope,firstCheckForStyle };