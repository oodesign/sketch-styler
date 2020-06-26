/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/webview.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/webview.js":
/*!******************************!*\
  !*** ./resources/webview.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var globalUnstyledLayers;
var globalTotalLayers;
var globalAssignLayers = 0;
var globalActiveLibraries;
var globalComplementarySheet; // call the plugin from the webview

document.getElementById('btnFindMatchingStyles').addEventListener('click', function () {
  findMatchingStyles();
});
document.getElementById('btnEmptyState').addEventListener('click', function () {
  findMatchingStyles();
});

window.findMatchingStyles = function () {
  window.postMessage('GetMeAStyle', document.getElementById("checkSameFont").checked, document.getElementById("checkSameWeight").checked, document.getElementById("checkSimilarWeight").checked, document.getElementById("checkSameSize").checked, document.getElementById("checkSimilarSize").checked, document.getElementById("checkSameColor").checked, document.getElementById("checkSimilarColor").checked, document.getElementById("checkSameParagraphSpacing").checked, document.getElementById("checkSameLineHeight").checked, document.getElementById("checkSameAlignment").checked, document.getElementById("checkSameCharacterSpacing").checked, globalActiveLibraries);
};

window.onSameWeightChange = function () {
  if (document.getElementById("checkSameWeight").checked) document.getElementById("checkSimilarWeight").checked = false;
};

window.onSimilarWeightChange = function () {
  if (document.getElementById("checkSimilarWeight").checked) document.getElementById("checkSameWeight").checked = false;
};

window.onSameSizeChange = function () {
  if (document.getElementById("checkSameSize").checked) document.getElementById("checkSimilarSize").checked = false;
};

window.onSimilarSizeChange = function () {
  if (document.getElementById("checkSimilarSize").checked) document.getElementById("checkSameSize").checked = false;
};

window.onSameColorChange = function () {
  if (document.getElementById("checkSameColor").checked) document.getElementById("checkSimilarColor").checked = false;
};

window.onSimilarColorChange = function () {
  if (document.getElementById("checkSimilarColor").checked) document.getElementById("checkSameColor").checked = false;
};

document.getElementById('btnAssign').addEventListener("click", function () {
  assignStyles();
});
document.getElementById('btnCancel').addEventListener("click", function () {
  cancelAssignation();
});

window.SetWindowTitle = function (remainingDays) {
  document.getElementById('windowTitle').innerHTML = "Sketch Styler - " + remainingDays + " trial days left";
};

window.UpdateProgress = function (progress) {
  document.getElementById('progressCircle').className = "item progress-" + Math.floor(progress * 100);
};

window.ShowProgress = function (message) {
  document.getElementById('emptyState').className = "emptyState fadeOut";
  document.getElementById('progressLayer').className = "progressCircle fadeIn";
  document.getElementById('progressCircle').className = "rowAuto alignFullCenter item progress-0";
  document.getElementById('loadingMessage').innerHTML = message;
  var listOfStyles = document.getElementById('listOfStyles');
  listOfStyles.className = "movingYFadeInitialState movingYFadeOut";
  document.getElementById('resultsTitle').className = "colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeOut";
};

window.HideProgress = function (targetProgress) {
  document.getElementById('progressCircle').className = "rowAuto alignFullCenter item progress-" + targetProgress;
  document.getElementById('progressLayer').className = "progressCircle fadeOut";
};

window.DrawActiveLibraries = function (activeLibraries) {
  globalActiveLibraries = activeLibraries;
  var inner = "";

  for (var i = 0; i < activeLibraries.length; i++) {
    var checked = activeLibraries[i].checked ? "checked" : "";
    inner += "<div class=\"roundCheckbox horizontalLayout\">\n              <input class=\"colAuto\" type=\"checkbox\" id=\"externalLibraryCheck".concat(i, "\"  onchange='onLibraryCheckChange(").concat(i, ")' ").concat(checked, "/>\n              <label class=\"colAuto labelCheck\" for=\"externalLibraryCheck").concat(i, "\">\n              </label>\n              <label class=\"colAvailable offset\" for=\"externalLibraryCheck").concat(i, "\">\n                <span class=\"padder\">").concat(activeLibraries[i].name, "</span>\n              </label>\n            </div>");
  }

  document.getElementById('activeLibraries').innerHTML = inner;
};

window.createTextWithClass = function (text, classname, id) {
  var span = document.createElement('span');
  span.className = classname;
  span.appendChild(document.createTextNode(text));
  if (id != null) span.id = id;
  return span;
};

window.createSvgWithClass = function (pathData, width, height, transform) {
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
};

window.DrawElements = function (byArtb, totalLayers, layersWithNoMatches) {
  document.getElementById('listOfStyles').innerHTML = "";
  globalUnstyledLayers = byArtb;
  globalTotalLayers = totalLayers;
  globalAssignLayers = 0;
  var inner = "";
  var frag = document.createDocumentFragment();
  var artboardID = 0;
  var layerID = 0;
  if (layersWithNoMatches < 1) document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML = "";else if (layersWithNoMatches == 1) document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML = "* There is " + layersWithNoMatches + " layer with no matching styles";else document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML = "* There are " + layersWithNoMatches + " layers with no matching styles";

  for (var artboard in byArtb) {
    var unstyledTextLayers = byArtb[artboard];
    var artboardDiv = document.createElement("div");
    if (layerID > 0) artboardDiv.className = "separeHeader";
    artboardDiv.appendChild(createTextWithClass(byArtb[artboard][0].artboardName, 'primaryBigText'));
    frag.appendChild(artboardDiv);

    var _loop = function _loop() {
      var argArtboard = artboard;
      var argIndex = i;
      var argLayerID = layerID;
      globalAssignLayers++;
      styleNameDiv = document.createElement("div");
      styleNameDiv.className = "rowAuto";
      checkbox = document.createElement("div");
      checkbox.className = "colAuto selectRoundCheckbox";
      checkbox.addEventListener("change", function () {
        onCheckChange(argArtboard, argIndex);
      });
      prevButton = document.createElement("button");
      prevButton.className = "btnThumbnailNavigationLeft btnArrow";
      prevButton.appendChild(createSvgWithClass("M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z", 8, 14, "translate(-7, -5)"));
      nextButton = document.createElement("button");
      nextButton.className = "btnThumbnailNavigationRight btnArrow";
      nextButton.appendChild(createSvgWithClass("M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z", 8, 14, "translate(16, -5) scale(-1,1)"));
      prevButton.addEventListener("click", function () {
        loadPreviousStyle(argArtboard, argIndex, argLayerID);
      });
      nextButton.addEventListener("click", function () {
        loadNextStyle(argArtboard, argIndex, argLayerID);
      });
      contrastModeOnLayer = "";
      if (unstyledTextLayers[i].contrastBackground) contrastModeOnLayer = "contrastMode";
      isSmall = "";
      if (unstyledTextLayers[i].isSmall) isSmall = "isSmallThumbnail";
      contrastModeOnStyle = "";
      if (unstyledTextLayers[i].matchingStyles.matchingStyles[0].contrastBackground) contrastModeOnStyle = "contrastMode";
      inputCheckBox = document.createElement("input");
      inputCheckBox.setAttribute("type", "checkbox");
      inputCheckBox.id = "checkbox".concat(layerID);
      inputCheckBox.checked = true;
      checkBoxLabel = document.createElement("label");
      checkBoxLabel.className = "labelCheck";
      checkBoxLabel.htmlFor = "checkbox".concat(layerID);
      checkbox.appendChild(inputCheckBox);
      checkbox.appendChild(checkBoxLabel); //TEXT LAYER CONTENT

      realLayerName = document.createElement("div");
      realLayerName.className = "primaryText itemText";
      realLayerName.appendChild(document.createTextNode(unstyledTextLayers[i].name));
      realTooltipIcon = document.createElement("div");
      realTooltipIcon.className = "infoIcon tooltip";
      realTooltipMain = document.createElement("div");
      realTooltipMain.appendChild(createTextWithClass(unstyledTextLayers[i].fontName + " - " + unstyledTextLayers[i].fontSize, "primaryText"));
      realTooltipSecondary = document.createElement("div");
      realTooltipSecondary.appendChild(createTextWithClass(unstyledTextLayers[i].color, "primaryText"));
      realTooltipContent = document.createElement("div");
      realTooltipContent.className = "tooltipText right";
      realTooltipContent.appendChild(realTooltipMain);
      realTooltipContent.appendChild(realTooltipSecondary);
      realTooltipIcon.appendChild(createSvgWithClass("M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z", 14, 14, "translate(-873.000000, -356.000000)"));
      realTooltipIcon.appendChild(realTooltipContent);
      realNameContainer = document.createElement("div");
      realNameContainer.className = "itemRowTitle";
      realNameContainer.appendChild(realLayerName);
      realNameContainer.appendChild(realTooltipIcon);
      realThumbnail = document.createElement("div");
      realThumbnail.className = "thumbnail ".concat(contrastModeOnLayer, " ").concat(isSmall);
      realThumbnail.id = "thumb".concat(layerID);
      realThumbnail.style = "background-image:url(\"".concat(unstyledTextLayers[i].thumbnail, "\")");
      realThumbnailContainer = document.createElement("div");
      realThumbnailContainer.className = "thumbnailContainer textPreview";
      realThumbnailContainer.append(realThumbnail);
      textLayer = document.createElement("div");
      textLayer.className = "realTextLayer verticalLayout";
      textLayer.append(realNameContainer);
      textLayer.append(realThumbnailContainer); //ENDOF LAYER CONTENT
      //RELATED STYLES CONTENT

      matchingThumbnailContainer = document.createElement("div");
      matchingThumbnailContainer.className = "thumbnailContainer stylePreview";
      matchingThumbnail = document.createElement("div");
      matchingThumbnail.className = "thumbnail ".concat(contrastModeOnStyle, " ").concat(isSmall);
      matchingThumbnail.id = "similarThumb".concat(layerID);
      matchingThumbnail.style = "background-image:url(\"".concat(unstyledTextLayers[i].matchingStyles.matchingStyles[0].thumbnail);
      matchingThumbnailContainer.appendChild(matchingThumbnail);

      if (unstyledTextLayers[i].matchingStyles.matchingStyles.length > 1) {
        matchingThumbnailContainer.appendChild(prevButton);
        matchingThumbnailContainer.appendChild(nextButton);
      }

      matchingLayerName = document.createElement("div");
      matchingLayerName.className = "primaryBoldText itemText";
      matchingLayerName.id = "styleName".concat(layerID);
      matchingLayerName.appendChild(document.createTextNode(unstyledTextLayers[i].matchingStyles.matchingStyles[0].styleName));
      matchingTooltipIcon = document.createElement("div");
      matchingTooltipIcon.className = "colAuto infoIcon tooltip";
      matchingTooltipContent = document.createElement("div");
      matchingTooltipContent.className = "tooltipText left";
      tooltipMain = document.createElement("div");
      tooltipMain.appendChild(createTextWithClass(unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontName + " - " + unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontSize, "primaryText", "styleTooltipAttributes".concat(layerID)));
      tooltipSecondary = document.createElement("div");
      tooltipSecondary.appendChild(createTextWithClass(unstyledTextLayers[i].matchingStyles.matchingStyles[0].color, "primaryText", "styleTooltipColor".concat(layerID)));
      matchingTooltipContent.appendChild(tooltipMain);
      matchingTooltipContent.appendChild(tooltipSecondary);
      matchingTooltipIcon.appendChild(createSvgWithClass("M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z", 14, 14, "translate(-873.000000, -356.000000)"));
      matchingTooltipIcon.appendChild(matchingTooltipContent);
      matchingNameContainer = document.createElement("div");
      matchingNameContainer.className = "itemRowTitle";
      matchingNameContainer.appendChild(matchingLayerName);
      matchingNameContainer.appendChild(matchingTooltipIcon);
      relatedStylesContainer = document.createElement("div");
      relatedStylesContainer.className = "relatedStyles";
      relatedStylesContainer.appendChild(matchingNameContainer);
      relatedStylesContainer.appendChild(matchingThumbnailContainer);
      itemRow = document.createElement("div");
      itemRow.className = "listItemRow";
      itemRow.appendChild(checkbox);
      itemRow.appendChild(textLayer);
      itemRow.appendChild(relatedStylesContainer); //ENDOF RELATED STYLES CONTENT

      frag.appendChild(itemRow);
      layerID++;
    };

    for (var i = 0; i < unstyledTextLayers.length; i++) {
      var styleNameDiv;
      var checkbox;
      var prevButton;
      var nextButton;
      var contrastModeOnLayer;
      var isSmall;
      var contrastModeOnStyle;
      var inputCheckBox;
      var checkBoxLabel;
      var realLayerName;
      var realTooltipIcon;
      var realTooltipMain;
      var realTooltipSecondary;
      var realTooltipContent;
      var realNameContainer;
      var realThumbnail;
      var realThumbnailContainer;
      var textLayer;
      var matchingThumbnailContainer;
      var matchingThumbnail;
      var matchingLayerName;
      var matchingTooltipIcon;
      var matchingTooltipContent;
      var tooltipMain;
      var tooltipSecondary;
      var matchingNameContainer;
      var relatedStylesContainer;
      var itemRow;

      _loop();
    }

    artboardID++;
  }

  var btnAssign = document.getElementById('btnAssign');
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
  } else {
    document.getElementById('emptyStateMessage').innerHTML = "We didn't find any style that matches with your unstyled layers. Want to try again changing your matching criteria?";
    document.getElementById('btnEmptyState').className = "notDisplayed";
    document.getElementById('emptyState').className = "emptyState fadeIn";
  }
};

window.onLibraryCheckChange = function (index) {
  globalActiveLibraries[index].checked = !globalActiveLibraries[index].checked;
};

window.onCheckChange = function (artboard, index) {
  globalUnstyledLayers[artboard][index].assignStyle = !globalUnstyledLayers[artboard][index].assignStyle;
  if (globalUnstyledLayers[artboard][index].assignStyle) globalAssignLayers++;else globalAssignLayers--;
  var btnAssign = document.getElementById('btnAssign');
  btnAssign.innerHTML = "Assign " + globalAssignLayers + " style";
  if (globalAssignLayers > 1) btnAssign.innerHTML = "Assign " + globalAssignLayers + " styles";
  if (globalAssignLayers == 0) btnAssign.innerHTML = "No styles selected";
  btnAssign.disabled = !(globalAssignLayers > 0);
};

window.loadNextStyle = function (artboard, index, layerID) {
  var newThumbnailIndex = globalUnstyledLayers[artboard][index].styleLoaded + 1;
  if (newThumbnailIndex < globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles.length) globalUnstyledLayers[artboard][index].styleLoaded = newThumbnailIndex;else globalUnstyledLayers[artboard][index].styleLoaded = 0;
  document.getElementById("styleName" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName;
  document.getElementById("styleTooltipAttributes" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName + " - " + globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize;
  document.getElementById("styleTooltipColor" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color;
  window.postMessage('GetThumbnail', globalUnstyledLayers[artboard][index].layerID, globalUnstyledLayers[artboard][index].styleLoaded, "similarThumb" + layerID);
  var contrastModeOnStyle = "";
  if (globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].contrastBackground) contrastModeOnStyle = "contrastMode";
  var isSmall = "";
  if (globalUnstyledLayers[artboard][index].isSmall) isSmall = "isSmallThumbnail";
  document.getElementById("similarThumb" + layerID).className = "thumbnail " + contrastModeOnStyle + " " + isSmall;
};

window.DrawStyleThumbnail = function (thumbnail, markupLayerID) {
  document.getElementById(markupLayerID).style.backgroundImage = "url(\"" + thumbnail + "\")";
};

window.loadPreviousStyle = function (artboard, index, layerID) {
  var newThumbnailIndex = globalUnstyledLayers[artboard][index].styleLoaded - 1;
  if (newThumbnailIndex >= 0) globalUnstyledLayers[artboard][index].styleLoaded = newThumbnailIndex;else globalUnstyledLayers[artboard][index].styleLoaded = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles.length - 1;
  document.getElementById("styleName" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName;
  document.getElementById("styleTooltipAttributes" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName + " - " + globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize;
  document.getElementById("styleTooltipColor" + layerID).innerHTML = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color;
  window.postMessage('GetThumbnail', globalUnstyledLayers[artboard][index].layerID, globalUnstyledLayers[artboard][index].styleLoaded, "similarThumb" + layerID);
  var contrastModeOnStyle = "";
  if (globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].contrastBackground) contrastModeOnStyle = "contrastMode";
  var isSmall = "";
  if (globalUnstyledLayers[artboard][index].isSmall) isSmall = "isSmallThumbnail";
  document.getElementById("similarThumb" + layerID).className = "thumbnail " + contrastModeOnStyle + " " + isSmall;
};

window.assignStyles = function () {
  window.postMessage('AssignStyles', globalUnstyledLayers);
};

window.cancelAssignation = function () {
  window.postMessage('Cancel');
};

/***/ })

/******/ });
//# sourceMappingURL=resources_webview.js.map