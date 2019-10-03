const StylesHelpers = require("./StylesHelpers")

function onValidate(context) {
  var state = StylesHelpers.ExiGuthrie();
  if (state == StylesHelpers.valStatus.app) {
    scanTextLayers(context);
  }
  else {
    if (state == StylesHelpers.valStatus.over) {
      globalIsOver = true;
      showRegistration(context);
    }
    else {
      var trialDate = StylesHelpers.IsInTrial();
      var startTrialDate = new Date(parseInt(trialDate));
      if (trialDate != null) {
        var Difference_In_Time = startTrialDate - Date.now();
        var Difference_In_Days = Math.floor(Math.abs(Difference_In_Time / (1000 * 3600 * 24)));
        globalRemainingDays = 7 - Difference_In_Days;
        if (globalRemainingDays > 0)
          globalIsInTrial = true;
        else
          globalIsExpired = true;

          showRegistration(context);
        }
      else
        showRegistration(context);
    }
  }
}

// export function showRegistration(context) {

//   var options = {
//     identifier: webviewRegIdentifier,
//     width: 1200,
//     height: 700,
//     show: false,
//     titleBarStyle: 'hidden'
//   }

//   var regWindow = new BrowserWindow(options)

//   const webContentsReg = regWindow.webContents;

//   regWindow.once('ready-to-show', () => {
//     if (globalIsInTrial) {
//       webContentsReg.executeJavaScript(`SetTrialMode(${JSON.stringify(globalRemainingDays)})`).catch(console.error);
//     }
//     if (globalIsExpired) {
//       webContentsReg.executeJavaScript(`SetExpiredMode()`).catch(console.error);
//     }
//     if (globalIsOver) {
//       webContentsReg.executeJavaScript(`SetOverMode()`).catch(console.error);
//     }

//     regWindow.show()
//   });

//   //var _0xff0f = ["\x72\x65\x61\x64\x79\x2D\x74\x6F\x2D\x73\x68\x6F\x77", "\x65\x72\x72\x6F\x72", "\x63\x61\x74\x63\x68", "\x53\x65\x74\x54\x72\x69\x61\x6C\x4D\x6F\x64\x65\x28", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x29", "\x65\x78\x65\x63\x75\x74\x65\x4A\x61\x76\x61\x53\x63\x72\x69\x70\x74", "\x53\x65\x74\x45\x78\x70\x69\x72\x65\x64\x4D\x6F\x64\x65\x28\x29", "\x73\x68\x6F\x77", "\x6F\x6E\x63\x65"]; regWindow[_0xff0f[9]](_0xff0f[0], () => { if (globalIsInTrial) { webContentsReg[_0xff0f[6]]((_0xff0f[3] + (JSON[_0xff0f[4]](globalRemainingDays)) + _0xff0f[5]))[_0xff0f[2]](console[_0xff0f[1]]) }; if (globalIsExpired) { webContentsReg[_0xff0f[6]](_0xff0f[7])[_0xff0f[2]](console[_0xff0f[1]]) }; regWindow[_0xff0f[8]]() })

//   webContentsReg.on('did-finish-load', () => {
//     if (globalIsInTrial) {
//       webContentsReg.executeJavaScript(`SetTrialMode(${JSON.stringify(globalRemainingDays)})`).catch(console.error);
//     }
//     if (globalIsExpired) {
//       webContentsReg.executeJavaScript(`SetExpiredMode()`).catch(console.error);
//     }
//     if (globalIsOver) {
//       webContentsReg.executeJavaScript(`SetOverMode()`).catch(console.error);
//     }
//   })


//   webContentsReg.on('RegisterKey', (licenseKey) => {
//     var state = StylesHelpers.Guthrie(licenseKey, true);
//     if (state == StylesHelpers.valStatus.app) {
//       var licenseplain = {
//         "licenseKey": "" + licenseKey
//       }
//       StylesHelpers.writeTextToFile(licenseplain, MSPluginManager.mainPluginsFolderURL().path() + '/StyleMe.json');
//       webContentsReg.executeJavaScript(`ShowRegistrationComplete()`).catch(console.error);
//     }
//     else {
//       if (state == StylesHelpers.valStatus.over) {
//         webContentsReg.executeJavaScript(`SetOverMode()`).catch(console.error);
//         webContentsReg.executeJavaScript(`SetOverModeInReg()`).catch(console.error);
//       }
//       else
//         webContentsReg.executeJavaScript(`ShowRegistrationFail()`).catch(console.error);
//     }
//   });

//   //var _0x4e91 = ["\x52\x65\x67\x69\x73\x74\x65\x72\x4B\x65\x79", "", "\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x53\x74\x79\x6C\x65\x4D\x65\x2E\x6A\x73\x6F\x6E", "\x77\x72\x69\x74\x65\x54\x65\x78\x74\x54\x6F\x46\x69\x6C\x65", "\x65\x72\x72\x6F\x72", "\x63\x61\x74\x63\x68", "\x53\x68\x6F\x77\x52\x65\x67\x69\x73\x74\x72\x61\x74\x69\x6F\x6E\x43\x6F\x6D\x70\x6C\x65\x74\x65\x28\x29", "\x65\x78\x65\x63\x75\x74\x65\x4A\x61\x76\x61\x53\x63\x72\x69\x70\x74", "\x53\x68\x6F\x77\x52\x65\x67\x69\x73\x74\x72\x61\x74\x69\x6F\x6E\x46\x61\x69\x6C\x28\x29", "\x6F\x6E"]; webContentsReg[_0x4e91[11]](_0x4e91[0], (_0x9a51x1) => { if (StylesHelpers.Guthrie(_0x9a51x1, true)) { var _0x9a51x2 = { "\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79": _0x4e91[1] + _0x9a51x1 }; StylesHelpers[_0x4e91[5]](_0x9a51x2, MSPluginManager[_0x4e91[3]]()[_0x4e91[2]]() + _0x4e91[4]); webContentsReg[_0x4e91[9]](_0x4e91[8])[_0x4e91[7]](console[_0x4e91[6]]) } else { webContentsReg[_0x4e91[9]](_0x4e91[10])[_0x4e91[7]](console[_0x4e91[6]]) } })


//   webContentsReg.on('StartTrial', (licenseKey) => {
//     var trialStart = {
//       "startTime": "" + Date.now()
//     }
//     StylesHelpers.writeTextToFile(trialStart, MSPluginManager.mainPluginsFolderURL().path() + '/StyleMe.json');
//     webContentsReg.executeJavaScript(`ShowTrialStarted()`).catch(console.error);

//   });

//   //var _0x3688 = ["\x53\x74\x61\x72\x74\x54\x72\x69\x61\x6C", "", "\x6E\x6F\x77", "\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x53\x74\x79\x6C\x65\x4D\x65\x2E\x6A\x73\x6F\x6E", "\x77\x72\x69\x74\x65\x54\x65\x78\x74\x54\x6F\x46\x69\x6C\x65", "\x65\x72\x72\x6F\x72", "\x63\x61\x74\x63\x68", "\x53\x68\x6F\x77\x54\x72\x69\x61\x6C\x53\x74\x61\x72\x74\x65\x64\x28\x29", "\x65\x78\x65\x63\x75\x74\x65\x4A\x61\x76\x61\x53\x63\x72\x69\x70\x74", "\x6F\x6E"]; webContentsReg[_0x3688[11]](_0x3688[0], (_0xd23cx1) => { var _0xd23cx2 = { "\x73\x74\x61\x72\x74\x54\x69\x6D\x65": _0x3688[1] + Date[_0x3688[2]]() }; StylesHelpers[_0x3688[6]](_0xd23cx2, MSPluginManager[_0x3688[4]]()[_0x3688[3]]() + _0x3688[5]); webContentsReg[_0x3688[10]](_0x3688[9])[_0x3688[8]](console[_0x3688[7]]) })

//   webContentsReg.on('ContinueTrial', () => {
//     onShutdown(webviewRegIdentifier);
//     scanTextLayers(context);
//   });
//   // var _0x574a=["\x43\x6F\x6E\x74\x69\x6E\x75\x65\x54\x72\x69\x61\x6C","\x6F\x6E"];webContentsReg[_0x574a[1]](_0x574a[0],()=>{onShutdown(webviewRegIdentifier);scanTextLayers(context)})

//   webContentsReg.on('LetsStartTrial', () => {
//     globalIsInTrial = true;
//     globalRemainingDays = 7;
//     onShutdown(webviewRegIdentifier);
//     scanTextLayers(context);
//   });
//   // var _0xa1ab=["\x4C\x65\x74\x73\x53\x74\x61\x72\x74\x54\x72\x69\x61\x6C","\x6F\x6E"];webContentsReg[_0xa1ab[1]](_0xa1ab[0],()=>{globalIsInTrial= true;globalRemainingDays= 7;onShutdown(webviewRegIdentifier);scanTextLayers(context)})

//   webContentsReg.on('LetsStart', () => {
//     globalIsInTrial = false;
//     onShutdown(webviewRegIdentifier);
//     scanTextLayers(context);
//   });

//   // var _0x7489 = ["\x4C\x65\x74\x73\x53\x74\x61\x72\x74", "\x6F\x6E"]; webContentsReg[_0x7489[1]](_0x7489[0], () => { globalIsInTrial = false; onShutdown(webviewRegIdentifier); scanTextLayers(context) })

//   webContentsReg.on('nativeLog', s => {
//     console.log(s);
//   })

//   webContentsReg.on('OpenStylerWeb', s => {
//     NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.sketchstyler.com"));
//   })

//   webContentsReg.on('Cancel', () => {
//     onShutdown(webviewRegIdentifier);
//   });

//   regWindow.loadURL(require('../resources/register.html'));
// }

// export function scanTextLayers(context) {


//   const options = {
//     identifier: webviewIdentifier,
//     width: 1200,
//     height: 700,
//     show: false,
//     titleBarStyle: 'hidden'
//   }

//   const browserWindow = new BrowserWindow(options)


//   // only show the window when the page has loaded to avoid a white flash
//   browserWindow.once('ready-to-show', () => {
//     browserWindow.show()
//   })

//   const webContents = browserWindow.webContents

//   // print a message when the page loads
//   webContents.on('did-finish-load', () => {
//     //UI.message('UI loaded!')
//     var libraries = NSApp.delegate().librariesController().libraries();
//     var activeLibraries = []
//     libraries.forEach(function (lib) {
//       if (lib.enabled()) {
//         activeLibraries.push({
//           "name": "" + lib.name(),
//           "libraryID": "" + lib.libraryID(),
//           "checked": false
//         });
//       }
//     });
//     if (globalIsInTrial)
//       webContents.executeJavaScript(`SetWindowTitle(${JSON.stringify(globalRemainingDays)})`).catch(console.error);

//     webContents.executeJavaScript(`DrawActiveLibraries(${JSON.stringify(activeLibraries)})`).catch(console.error);

//   })

//   // add a handler for a call from web content's javascript
//   webContents.on('nativeLog', s => {
//     console.log(s);
//   })


//   webContents.on('GetThumbnail', (layerID, matchingStyleIndex, markupLayerID) => {
//     var index = StylesHelpers.indexOfTextLayer(globalTextLayers, layerID);
//     var thumbnail = StylesHelpers.getTextStyleDummyThumbnail(context, globalTextLayers[index].matchingStyles[matchingStyleIndex].textStyle.style(), globalTextLayers[index].textLayer, globalTextLayers[index].textLayer.stringValue());

//     webContents.executeJavaScript(`DrawStyleThumbnail(${JSON.stringify(thumbnail)}, ${JSON.stringify(markupLayerID)})`).catch(console.error);
//   });



//   webContents.on('GetMeAStyle', (checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing, checkedActiveLibraries) => {

//     // console.log("checkSameFont:"+checkSameFont);
//     // console.log("checkSameWeight:"+checkSameWeight);
//     // console.log("includeSimilarWeights:"+includeSimilarWeights); 
//     // console.log("checkSameSize:"+checkSameSize);
//     // console.log("includeSimilarSize:"+includeSimilarSize); 
//     // console.log("checkSameColor:"+checkSameColor);
//     // console.log("includeSimilarColor:"+includeSimilarColor); 
//     // console.log("checkSameParagraphSpacing:"+checkSameParagraphSpacing);
//     // console.log("checkSameLineHeight:"+checkSameLineHeight);
//     // console.log("checkSameAlignment:"+checkSameAlignment); 
//     // console.log("checkSameCharacterSpacing:"+checkSameCharacterSpacing);

//     //console.time('GetMeAStyle');

//     var countHowManySaves = 0;

//     var textStyles = StylesHelpers.getDefinedTextStyles(context, checkedActiveLibraries);
//     var allTextLayers = StylesHelpers.getAllTextLayers(context, true, globalTriggeredAction);
//     globalTextLayers = [];
//     //console.log("All layers received");
//     var thumbnailsgenerated = 0;
//     var unstyledTextLayers = [];
//     var stylesArranged = StylesHelpers.getStylesArranged(textStyles, context, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
//     var message = "";

//     if ((allTextLayers.length > 50) && (textStyles.length > 20)) message = "Looking for matching styles. This may take a minute...";
//     if (textStyles.length > 50) message = "Looking for matching styles. This may take a minute...";
//     if ((allTextLayers.length > 100) && (textStyles.length > 50)) message = "Wow! " + allTextLayers.length + " unstyled layers and " + textStyles.length + " styles! We're pairing texts and styles, but this may take some minutes. You may better go get some coffee?";
//     if (textStyles.length > 100) message = "Wow! " + allTextLayers.length + " unstyled layers and " + textStyles.length + " styles!!! We're pairing texts and styles, but this may take some minutes. You may better go get some coffee?";

//     webContents.executeJavaScript(`ShowProgress(${JSON.stringify(message)})`).catch(console.error);

//     for (var i = 0; i < allTextLayers.length; i++) {
//       var layerThumbnail = StylesHelpers.getBase64(allTextLayers[i], allTextLayers[i].frame().width(), allTextLayers[i].frame().height());

//       var matchingStylesWithArranged = StylesHelpers.findMatchInArranged(allTextLayers[i], stylesArranged, checkSameFont, checkSameWeight, includeSimilarWeights, checkSameSize, includeSimilarSize, checkSameColor, includeSimilarColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);

//       globalTextLayers.push({
//         "textLayer": allTextLayers[i],
//         "layerID": allTextLayers[i].objectID(),
//         "matchingStyles": matchingStylesWithArranged
//       });

//       var matchingStyles = {};
//       matchingStyles['matchingStyles'] = [];
//       for (var j = 0; j < matchingStylesWithArranged.length; j++) {
//         var thumbnail;
//         if (j == 0)
//           thumbnail = StylesHelpers.getTextStyleDummyThumbnail(context, matchingStylesWithArranged[j].textStyle.style(), allTextLayers[i], allTextLayers[i].stringValue());
//         else
//           thumbnail = null;

//         var sendColor = "Couldn't load color";
//         if (matchingStylesWithArranged[j].textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute != null)
//           sendColor = "#" + matchingStylesWithArranged[j].textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();

//         matchingStyles['matchingStyles'].push({
//           "styleName": "" + matchingStylesWithArranged[j].name,
//           "textStyle": matchingStylesWithArranged[j].textStyle,
//           "thumbnail": thumbnail,
//           "contrastBackground": StylesHelpers.shouldEnableContrastMode(matchingStylesWithArranged[j].textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString()),
//           "fontName": "" + matchingStylesWithArranged[j].textStyle.style().textStyle().attributes().NSFont.familyName(),
//           "fontSize": "" + matchingStylesWithArranged[j].textStyle.style().textStyle().attributes().NSFont.pointSize() + "pt",
//           "color": sendColor,
//         });
//       }

//       var styleLoaded = 0;
//       if (matchingStylesWithArranged.length == 0)
//         styleLoaded = -1;

//       var sendLayerColor = "Couldn't load color";
//       var sendFontName = "Couldn't gather font name";
//       var sendFontSize = "Couldn't gather font size";
//       var sendContrast = false;

//       if (StylesHelpers.firstCheckForStyle(allTextLayers[i])) {
//         sendFontName = "" + allTextLayers[i].style().textStyle().attributes().NSFont.familyName();
//         sendFontSize = "" + allTextLayers[i].style().textStyle().attributes().NSFont.pointSize() + "pt";
//         sendLayerColor = "#" + allTextLayers[i].style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();
//         sendContrast = StylesHelpers.shouldEnableContrastMode(allTextLayers[i].style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString());
//       }

//       unstyledTextLayers.push({
//         "layerID": "" + allTextLayers[i].objectID(),
//         "isSmall": ((allTextLayers[i].frame().width() > 2000) || (allTextLayers[i].frame().height() < 28) || (allTextLayers[i].frame().height() > 100)),
//         "contrastBackground": sendContrast,
//         "textLayer": allTextLayers[i],
//         "name": "" + allTextLayers[i].name(),
//         "artboardID": "" + allTextLayers[i].parentArtboard().objectID(),
//         "artboardName": "" + allTextLayers[i].parentArtboard().name(),
//         "displayText": allTextLayers[i].stringValue(),
//         "thumbnail": layerThumbnail,
//         "matchingStyles": matchingStyles,
//         "styleLoaded": styleLoaded,
//         "assignStyle": true,
//         "fontName": sendFontName,
//         "fontSize": sendFontSize,
//         "color": sendLayerColor,
//       });

//       var percent = i / allTextLayers.length;
//       webContents.executeJavaScript(`UpdateProgress(${JSON.stringify(percent)})`).catch(console.error);

//     }

//     const groupByArtboard = groupBy('artboardID');
//     var byArtb = groupByArtboard(unstyledTextLayers);


//     //console.timeEnd('GetMeAStyle');
//     globalByArtb = byArtb;

//     var targetProgress = 100;
//     webContents.executeJavaScript(`HideProgress(${targetProgress})`).catch(console.error);
//     webContents.executeJavaScript(`DrawElements(${JSON.stringify(byArtb)},${unstyledTextLayers.length})`).catch(console.error);
//   });


//   const groupBy = key => array =>
//     array.reduce((objectsByKeyValue, obj) => {
//       const value = obj[key];
//       objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
//       return objectsByKeyValue;
//     }, {});

//   webContents.on('AssignStyles', (byArtb) => {
//     //console.log("Back in the plugin, assigning styles");
//     var stylesAsigned = 0;
//     for (var artboard in globalByArtb) {
//       var glob_unstyledTextLayers = globalByArtb[artboard];
//       var ref_unstyledTextLayers = byArtb[artboard];

//       for (var i = 0; i < glob_unstyledTextLayers.length; i++) {
//         var textLayer = glob_unstyledTextLayers[i].textLayer;
//         if (ref_unstyledTextLayers[i].assignStyle) {
//           if (ref_unstyledTextLayers[i].styleLoaded == -1) {
//             //console.log("Looks like text layer '" + textLayer.name() + "' doesn't have any similar style to be applied");
//           }
//           else {
//             //console.log("We're gonna give '" + textLayer.name() + "' style '" + glob_unstyledTextLayers[i].matchingStyles['matchingStyles'][ref_unstyledTextLayers[i].styleLoaded].textStyle.name() + "'");
//             textLayer.setSharedStyle(glob_unstyledTextLayers[i].matchingStyles['matchingStyles'][ref_unstyledTextLayers[i].styleLoaded].textStyle);
//             stylesAsigned++;
//           }
//         }
//         else {
//           //console.log("Not styling layer "+textLayer.name+" because we were told not to do so");
//         }
//       }
//     }

//     onShutdown(webviewIdentifier);

//     UI.message("Hey ho! " + stylesAsigned + " layers now have a cool shiny style!");

//   });

//   webContents.on('Cancel', () => {
//     onShutdown(webviewIdentifier);
//   });

//   browserWindow.loadURL(require('../resources/webview.html'))
// }


// export function onShutdown(webviewID) {
//   const existingWebview = getWebview(webviewID)
//   if (existingWebview) {
//     existingWebview.close()
//   }
// }



module.exports = { onValidate };
