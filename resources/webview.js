// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

var globalUnstyledLayers;
var globalTotalLayers;
var globalAssignLayers = 0;
var globalActiveLibraries;
var globalComplementarySheet;

// call the plugin from the webview
document.getElementById('btnFindMatchingStyles').addEventListener('click', () => {
  findMatchingStyles();
})
document.getElementById('btnEmptyState').addEventListener('click', () => {
  findMatchingStyles();
})

window.findMatchingStyles = () => {
  window.postMessage('GetMeAStyle',
    document.getElementById("checkSameFont").checked,
    document.getElementById("checkSameWeight").checked,
    document.getElementById("checkSimilarWeight").checked,
    document.getElementById("checkSameSize").checked,
    document.getElementById("checkSimilarSize").checked,
    document.getElementById("checkSameColor").checked,
    document.getElementById("checkSimilarColor").checked,
    document.getElementById("checkSameParagraphSpacing").checked,
    document.getElementById("checkSameLineHeight").checked,
    document.getElementById("checkSameAlignment").checked,
    document.getElementById("checkSameCharacterSpacing").checked,
    globalActiveLibraries
  );
};

window.onSameWeightChange = () => {
  if (document.getElementById("checkSameWeight").checked) document.getElementById("checkSimilarWeight").checked = false;
};
window.onSimilarWeightChange = () => {
  if (document.getElementById("checkSimilarWeight").checked) document.getElementById("checkSameWeight").checked = false;
};

window.onSameSizeChange = () => {
  if (document.getElementById("checkSameSize").checked) document.getElementById("checkSimilarSize").checked = false;
};
window.onSimilarSizeChange = () => {
  if (document.getElementById("checkSimilarSize").checked) document.getElementById("checkSameSize").checked = false;
};

window.onSameColorChange = () => {
  if (document.getElementById("checkSameColor").checked) document.getElementById("checkSimilarColor").checked = false;
};
window.onSimilarColorChange = () => {
  if (document.getElementById("checkSimilarColor").checked) document.getElementById("checkSameColor").checked = false;
};


document.getElementById('btnAssign').addEventListener("click", () => {
  assignStyles();
});
document.getElementById('btnCancel').addEventListener("click", () => {
  cancelAssignation();
});

window.SetWindowTitle = (remainingDays) => {
  document.getElementById('windowTitle').innerHTML = "Sketch Styler - " + remainingDays + " trial days left";
};
window.UpdateProgress = (progress) => {
  document.getElementById('progressCircle').className = "item progress-" + Math.floor(progress * 100);
};

window.ShowProgress = (message) => {
  document.getElementById('emptyState').className = "emptyState fadeOut";
  document.getElementById('progressLayer').className = "progressCircle fadeIn";
  document.getElementById('progressCircle').className = "rowAuto alignFullCenter item progress-0";
  document.getElementById('loadingMessage').innerHTML = message;


  var listOfStyles = document.getElementById('listOfStyles');
  listOfStyles.className = "movingYFadeInitialState movingYFadeOut";
  document.getElementById('resultsTitle').className = "colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeOut";
};

window.HideProgress = (targetProgress) => {
  document.getElementById('progressCircle').className = "rowAuto alignFullCenter item progress-" + targetProgress;
  document.getElementById('progressLayer').className = "progressCircle fadeOut";
};

window.DrawActiveLibraries = (activeLibraries) => {
  globalActiveLibraries = activeLibraries;
  var inner = "";

  for (var i = 0; i < activeLibraries.length; i++) {
    inner += `<div class="roundCheckbox horizontalLayout">
              <input class="colAuto" type="checkbox" id="externalLibraryCheck${i}"  onchange='onLibraryCheckChange(${i})'/>
              <label class="colAuto labelCheck" for="externalLibraryCheck${i}">
              </label>
              <label class="colAvailable offset" for="externalLibraryCheck${i}">
                <span class="padder">${activeLibraries[i].name}</span>
              </label>
            </div>`;
  }

  document.getElementById('activeLibraries').innerHTML = inner;
}


window.createTextWithClass = (text, classname, id) => {
  var span = document.createElement('span');
  span.className = classname;
  span.appendChild(document.createTextNode(text));
  if (id != null) span.id = id;
  return span;
}

window.createSvgWithClass = (pathData, width, height, transform) => {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "" + width);
  svg.setAttribute("height", "" + height);
  svg.setAttribute("viewBox", "0 0 " + width + " " + height);

  var svgContent = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  svgContent.setAttribute("d", pathData);
  svgContent.setAttribute("transform", transform);
  svgContent.setAttribute("fill", "#FFFFFF");
  svg.appendChild(svgContent);

  return svg;
}



window.DrawElements = (byArtb, totalLayers, layersWithNoMatches) => {

  document.getElementById('listOfStyles').innerHTML = "";

  globalUnstyledLayers = byArtb;
  globalTotalLayers = totalLayers;
  globalAssignLayers = 0;
  var inner = "";
  var frag = document.createDocumentFragment();
  var artboardID = 0;
  var layerID = 0;

  if (layersWithNoMatches < 1)
    document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML = "";
  else if (layersWithNoMatches == 1)
    document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML = "* There is " + layersWithNoMatches + " layer with no matching styles";
  else
    document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML = "* There are " + layersWithNoMatches + " layers with no matching styles";



  for (var artboard in byArtb) {

    var unstyledTextLayers = byArtb[artboard];
    var artboardDiv = document.createElement("div");
    if (layerID > 0)
      artboardDiv.className = "separeHeader";

    artboardDiv.appendChild(createTextWithClass(byArtb[artboard][0].artboardName, 'primaryBigText'));
    frag.appendChild(artboardDiv);


    for (var i = 0; i < unstyledTextLayers.length; i++) {

      let argArtboard = artboard;
      let argIndex = i;
      let argLayerID = layerID;

      globalAssignLayers++;
      var styleNameDiv = document.createElement("div");
      styleNameDiv.className = "rowAuto";
      var checkbox = document.createElement("div");
      checkbox.className = "colAuto selectRoundCheckbox";
      checkbox.addEventListener("change", function () { onCheckChange(argArtboard, argIndex) });

      var prevButton = document.createElement("button");
      prevButton.className = "btnThumbnailNavigationLeft btnArrow";
      prevButton.appendChild(createSvgWithClass("M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z", 8, 14, "translate(-7, -5)"));

      var nextButton = document.createElement("button");
      nextButton.className = "btnThumbnailNavigationRight btnArrow";
      nextButton.appendChild(createSvgWithClass("M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z", 8, 14, "translate(16, -5) scale(-1,1)"));


      prevButton.addEventListener("click", function () { loadPreviousStyle(argArtboard, argIndex, argLayerID) });
      nextButton.addEventListener("click", function () { loadNextStyle(argArtboard, argIndex, argLayerID) });


      var contrastModeOnLayer = "";
      if (unstyledTextLayers[i].contrastBackground)
        contrastModeOnLayer = "contrastMode";

      var isSmall = "";
      if (unstyledTextLayers[i].isSmall)
        isSmall = "isSmallThumbnail";

      var contrastModeOnStyle = "";
      if (unstyledTextLayers[i].matchingStyles.matchingStyles[0].contrastBackground)
        contrastModeOnStyle = "contrastMode";





      var inputCheckBox = document.createElement("input");
      inputCheckBox.setAttribute("type", "checkbox");
      inputCheckBox.id = `checkbox${layerID}`;
      inputCheckBox.checked = true;

      var checkBoxLabel = document.createElement("label");
      checkBoxLabel.className = "labelCheck";
      checkBoxLabel.htmlFor = `checkbox${layerID}`;

      checkbox.appendChild(inputCheckBox);
      checkbox.appendChild(checkBoxLabel);

      //TEXT LAYER CONTENT


      var realLayerName = document.createElement("div");
      realLayerName.className = "primaryText itemText";
      realLayerName.appendChild(document.createTextNode(unstyledTextLayers[i].name));

      var realTooltipIcon = document.createElement("div");
      realTooltipIcon.className = "infoIcon tooltip";



      var realTooltipMain = document.createElement("div");
      realTooltipMain.appendChild(createTextWithClass(unstyledTextLayers[i].fontName + " - " + unstyledTextLayers[i].fontSize, "primaryText"));
      var realTooltipSecondary = document.createElement("div");
      realTooltipSecondary.appendChild(createTextWithClass(unstyledTextLayers[i].color, "primaryText"));

      var realTooltipContent = document.createElement("div");
      realTooltipContent.className = "tooltipText right";
      realTooltipContent.appendChild(realTooltipMain);
      realTooltipContent.appendChild(realTooltipSecondary);


      realTooltipIcon.appendChild(createSvgWithClass("M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z", 14, 14, "translate(-873.000000, -356.000000)"));
      realTooltipIcon.appendChild(realTooltipContent);


      var realNameContainer = document.createElement("div");
      realNameContainer.className = "itemRowTitle";
      realNameContainer.appendChild(realLayerName);
      realNameContainer.appendChild(realTooltipIcon);


      var realThumbnail = document.createElement("div");
      realThumbnail.className = `thumbnail ${contrastModeOnLayer} ${isSmall}`;
      realThumbnail.id = `thumb${layerID}`;

      realThumbnail.style = `background-image:url("${unstyledTextLayers[i].thumbnail}")`;


      var realThumbnailContainer = document.createElement("div");
      realThumbnailContainer.className = "thumbnailContainer textPreview";
      realThumbnailContainer.append(realThumbnail);


      var textLayer = document.createElement("div");
      textLayer.className = "realTextLayer verticalLayout";
      textLayer.append(realNameContainer);
      textLayer.append(realThumbnailContainer);

      //ENDOF LAYER CONTENT


      //RELATED STYLES CONTENT

      var matchingThumbnailContainer = document.createElement("div");
      matchingThumbnailContainer.className = "thumbnailContainer stylePreview";

      var matchingThumbnail = document.createElement("div");
      matchingThumbnail.className = `thumbnail ${contrastModeOnStyle} ${isSmall}`;
      matchingThumbnail.id = `similarThumb${layerID}`;
      matchingThumbnail.style = `background-image:url("${unstyledTextLayers[i].matchingStyles.matchingStyles[0].thumbnail}`;

      matchingThumbnailContainer.appendChild(matchingThumbnail);

      if (unstyledTextLayers[i].matchingStyles.matchingStyles.length > 1) {
        matchingThumbnailContainer.appendChild(prevButton);
        matchingThumbnailContainer.appendChild(nextButton);
      }

      var matchingLayerName = document.createElement("div");
      matchingLayerName.className = "primaryBoldText itemText";
      matchingLayerName.id = `styleName${layerID}`;
      matchingLayerName.appendChild(document.createTextNode(unstyledTextLayers[i].matchingStyles.matchingStyles[0].styleName));

      var matchingTooltipIcon = document.createElement("div");
      matchingTooltipIcon.className = "colAuto infoIcon tooltip";

      var matchingTooltipContent = document.createElement("div");
      matchingTooltipContent.className = "tooltipText left";
      var tooltipMain = document.createElement("div");
      tooltipMain.appendChild(createTextWithClass(unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontName + " - " + unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontSize, "primaryText", `styleTooltipAttributes${layerID}`));
      var tooltipSecondary = document.createElement("div");
      tooltipSecondary.appendChild(createTextWithClass(unstyledTextLayers[i].matchingStyles.matchingStyles[0].color, "primaryText", `styleTooltipColor${layerID}`));
      matchingTooltipContent.appendChild(tooltipMain);
      matchingTooltipContent.appendChild(tooltipSecondary);

      matchingTooltipIcon.appendChild(createSvgWithClass("M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z", 14, 14, "translate(-873.000000, -356.000000)"));
      matchingTooltipIcon.appendChild(matchingTooltipContent);


      var matchingNameContainer = document.createElement("div");
      matchingNameContainer.className = "itemRowTitle";
      matchingNameContainer.appendChild(matchingLayerName);
      matchingNameContainer.appendChild(matchingTooltipIcon);


      var relatedStylesContainer = document.createElement("div");
      relatedStylesContainer.className = "relatedStyles";

      relatedStylesContainer.appendChild(matchingNameContainer);
      relatedStylesContainer.appendChild(matchingThumbnailContainer);


      var itemRow = document.createElement("div");
      itemRow.className = "listItemRow";
      itemRow.appendChild(checkbox);
      itemRow.appendChild(textLayer);
      itemRow.appendChild(relatedStylesContainer);

      //ENDOF RELATED STYLES CONTENT


      frag.appendChild(itemRow);


      layerID++;
    }
    artboardID++;
  }
  var btnAssign = document.getElementById('btnAssign')
  btnAssign.innerHTML = "Assign " + globalAssignLayers + " style";
  if (globalAssignLayers > 1) btnAssign.innerHTML = "Assign " + globalAssignLayers + " styles";
  if (globalAssignLayers == 0) btnAssign.innerHTML = "No styles selected";
  btnAssign.disabled = !(globalAssignLayers > 0);


  document.getElementById('resultsTitle').innerHTML = "We found " + totalLayers + " unstyled text layers in " + Object.keys(byArtb).length + " artboards, and " + globalAssignLayers + " styles that match with them.";

  if (globalAssignLayers > 0) {
    var listOfStyles = document.getElementById('listOfStyles');
    listOfStyles.appendChild(frag);
    listOfStyles.className = "movingYFadeInitialState movingYFadeIn";
    document.getElementById('resultsTitle').className = "colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeIn";
  }
  else {

    document.getElementById('emptyStateMessage').innerHTML = "We didn't find any style that matches with your unstyled layers. Want to try again changing your matching criteria?";
    document.getElementById('btnEmptyState').className = "notDisplayed";
    document.getElementById('emptyState').className = "emptyState fadeIn";

  }

}


window.onLibraryCheckChange = (index) => {
  globalActiveLibraries[index].checked = !globalActiveLibraries[index].checked;
}


window.onCheckChange = (artboard, index) => {
  globalUnstyledLayers[artboard][index].assignStyle = !globalUnstyledLayers[artboard][index].assignStyle;
  if (globalUnstyledLayers[artboard][index].assignStyle) globalAssignLayers++;
  else globalAssignLayers--;

  var btnAssign = document.getElementById('btnAssign')
  btnAssign.innerHTML = "Assign " + globalAssignLayers + " style";
  if (globalAssignLayers > 1) btnAssign.innerHTML = "Assign " + globalAssignLayers + " styles";
  if (globalAssignLayers == 0) btnAssign.innerHTML = "No styles selected";
  btnAssign.disabled = !(globalAssignLayers > 0);
}



window.loadNextStyle = (artboard, index, layerID) => {

  var newThumbnailIndex = globalUnstyledLayers[artboard][index].styleLoaded + 1;

  if (newThumbnailIndex < globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles.length)
    globalUnstyledLayers[artboard][index].styleLoaded = newThumbnailIndex;
  else
    globalUnstyledLayers[artboard][index].styleLoaded = 0;

  document.getElementById("styleName" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName;
  document.getElementById("styleTooltipAttributes" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName + " - " + globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize;
  document.getElementById("styleTooltipColor" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color;

  window.postMessage('GetThumbnail', globalUnstyledLayers[artboard][index].layerID, globalUnstyledLayers[artboard][index].styleLoaded, "similarThumb" + layerID);

  var contrastModeOnStyle = "";
  if (globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].contrastBackground)
    contrastModeOnStyle = "contrastMode";

  var isSmall = "";
  if (globalUnstyledLayers[artboard][index].isSmall)
    isSmall = "isSmallThumbnail";

  document.getElementById("similarThumb" + layerID).className = "thumbnail " + contrastModeOnStyle + " " + isSmall;
}

window.DrawStyleThumbnail = (thumbnail, markupLayerID) => {
  document.getElementById(markupLayerID).style.backgroundImage = "url(\"" + thumbnail + "\")";
}



window.loadPreviousStyle = (artboard, index, layerID) => {

  var newThumbnailIndex = globalUnstyledLayers[artboard][index].styleLoaded - 1;

  if (newThumbnailIndex >= 0)
    globalUnstyledLayers[artboard][index].styleLoaded = newThumbnailIndex;
  else
    globalUnstyledLayers[artboard][index].styleLoaded = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles.length - 1;


  document.getElementById("styleName" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName;
  document.getElementById("styleTooltipAttributes" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName + " - " + globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize;
  document.getElementById("styleTooltipColor" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color;

  window.postMessage('GetThumbnail', globalUnstyledLayers[artboard][index].layerID, globalUnstyledLayers[artboard][index].styleLoaded, "similarThumb" + layerID);

  var contrastModeOnStyle = "";
  if (globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].contrastBackground)
    contrastModeOnStyle = "contrastMode";

  var isSmall = "";
  if (globalUnstyledLayers[artboard][index].isSmall)
    isSmall = "isSmallThumbnail";

  document.getElementById("similarThumb" + layerID).className = "thumbnail " + contrastModeOnStyle + " " + isSmall;
}

window.assignStyles = () => {
  window.postMessage('AssignStyles', globalUnstyledLayers);
}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

