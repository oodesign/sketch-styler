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
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })
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

window.onNonMatchingVisibleChange = function () {
  if (!document.getElementById("checkNonMatchingVisible").checked) {
    if (globalComplementarySheet == null) {
      globalComplementarySheet = document.createElement('style');
      globalComplementarySheet.innerHTML = ".hidable {display:none;}";
    }

    document.body.appendChild(globalComplementarySheet);
  } else {
    if (globalComplementarySheet != null) {
      var sheetParent = globalComplementarySheet.parentNode;
      sheetParent.removeChild(globalComplementarySheet);
    }
  }
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
  listOfStyles.className = "scrollable movingYFadeInitialState movingYFadeOut";
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
    inner += "<div class=\"roundCheckbox\">\n              <input type=\"checkbox\" id=\"externalLibraryCheck".concat(i, "\"  onchange='onLibraryCheckChange(").concat(i, ")'/>\n              <label for=\"externalLibraryCheck").concat(i, "\"><div class=\"padder\"><span>").concat(activeLibraries[i].name, "</span></div></label>\n            </div>");
  }

  document.getElementById('activeLibraries').innerHTML = inner;
};

window.DrawElements = function (byArtb, totalLayers) {
  globalUnstyledLayers = byArtb;
  globalTotalLayers = totalLayers;
  globalAssignLayers = 0;
  var inner = "";
  var artboardID = 0;
  var layerID = 0;

  for (var artboard in byArtb) {
    var unstyledTextLayers = byArtb[artboard];
    if (layerID == 0) inner += "<div class='primaryBigText'>".concat(byArtb[artboard][0].artboardName, "</div>");else inner += "<div class='primaryBigText separeHeader'>".concat(byArtb[artboard][0].artboardName, "</div>");

    for (var i = 0; i < unstyledTextLayers.length; i++) {
      globalAssignLayers++;
      var matchingStyles = "";
      var styleNameDiv = "";
      var navigationButtons = "";
      var checkbox = "";

      if (unstyledTextLayers[i].matchingStyles.matchingStyles.length > 1) {
        navigationButtons = "<button class='btnThumbnailNavigationLeft btnArrow' onclick='loadPreviousStyle(".concat(JSON.stringify(artboard), ",").concat(i, ",").concat(layerID, ")'> \n                              <svg width=\"8px\" height=\"14px\" viewBox=\"0 0 8 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                              <g id=\"Symbols\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                  <g id=\"Icons/Arrow\" transform=\"translate(-9.000000, -5.000000)\" fill=\"#FFFFFF\" fill-rule=\"nonzero\">\n                                      <path d=\"M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z\" id=\"Path\"></path>\n                                  </g>\n                              </g>\n                              </svg>\n                            </button>                            <button class='btnThumbnailNavigationRight btnArrow' onclick='loadNextStyle(").concat(JSON.stringify(artboard), ",").concat(i, ",").concat(layerID, ")'>\n\n                              <svg width=\"8px\" height=\"14px\" viewBox=\"0 0 8 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                              <g id=\"Symbols\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                  <g id=\"Icons/Arrow\" transform=\"translate(-7.000000, -5.000000)\" fill=\"#FFFFFF\" fill-rule=\"nonzero\">\n                                      <path d=\"M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z\" id=\"Path\" transform=\"translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) \"></path>\n                                  </g>\n                              </g>\n                              </svg>\n                              \n                            </button>");
      }

      var contrastModeOnLayer = "";
      if (unstyledTextLayers[i].contrastBackground) contrastModeOnLayer = "contrastMode";
      var isSmall = "";
      if (unstyledTextLayers[i].isSmall) isSmall = "isSmallThumbnail";
      var hidable = "";

      if (unstyledTextLayers[i].matchingStyles.matchingStyles.length > 0) {
        var contrastModeOnStyle = "";
        if (unstyledTextLayers[i].matchingStyles.matchingStyles[0].contrastBackground) contrastModeOnStyle = "contrastMode";
        matchingStyles = "<div class='thumbnailContainer stylePreview' ><div class=\"thumbnail ".concat(contrastModeOnStyle, " ").concat(isSmall, "\" id='similarThumb").concat(layerID, "' style='background-image:url(\"").concat(unstyledTextLayers[i].matchingStyles.matchingStyles[0].thumbnail, "\")'></div>").concat(navigationButtons, "</div>");
        styleNameDiv = "<div class='rowAuto'>\n                          <div class='horizontalLayout'>\n                            <div class='colAuto primaryBoldText itemText' id='styleName".concat(layerID, "'><span>").concat(unstyledTextLayers[i].matchingStyles.matchingStyles[0].styleName, "</span></div>\n                            <div class='colAuto infoIcon tooltip'>\n                              <svg width=\"14px\" height=\"14px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                      <g id=\"Artboard\" transform=\"translate(-873.000000, -356.000000)\" fill-rule=\"nonzero\">\n                                          <path d=\"M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z\" id=\"Shape\"></path>\n                                      </g>\n                                  </g>\n                              </svg>\n                              <div class=\"tooltipText\">\n                                <span id='styleTooltip").concat(layerID, "'>\n                                  ").concat(unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontName, " - ").concat(unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontSize, "\n                                  <br/>\n                                  ").concat(unstyledTextLayers[i].matchingStyles.matchingStyles[0].color, "\n                                </span>\n                              </div>\n                            </div>\n                          </div>\n                        </div>");
        checkbox = "<div class=\"selectRoundCheckbox\"><input type=\"checkbox\" onchange='onCheckChange(".concat(JSON.stringify(artboard), ",").concat(i, ")' id='checkbox").concat(layerID, "'\" checked/><label for=\"checkbox").concat(layerID, "\"></label></div>");
      } else {
        hidable = "hidable";
        matchingStyles = "<div class='thumbnailContainer textPreview alignVerticalCenter'><div class=\"alignHorizontalCenter secondaryText\"> No matching styles</div> </div>";
        styleNameDiv = "<div class='rowAuto primaryBoldText itemText' id='styleName".concat(layerID, "'>&nbsp;</div>");
        checkbox = "<div class=\"selectRoundCheckbox notVisible\"><input type=\"checkbox\" onchange='onCheckChange(".concat(JSON.stringify(artboard), ",").concat(i, ")' id='checkbox").concat(layerID, "'\" checked/><label for=\"checkbox").concat(layerID, "\"></label></div>");
        globalAssignLayers--;
      }

      inner += "<div class='verticalLayout listItem ".concat(hidable, "'>              <div class='rowAuto listItemHead'></div>                  <div class=\"rowAuto listItemBg\">                    <div class='horizontalLayout'>                      <div class='colAuto'>                        <div class='verticalLayout'>                          \n                          <div class='rowAvailable alignFullCenter'>                            \n                              ").concat(checkbox, "\n                              \n                          </div>                        </div>                      </div>\n                      <div class='colAvailable'>                        <div class='verticalLayout'>                          <div class='rowAuto'>\n                            <div class='horizontalLayout'>\n                              <div class='colAuto primaryText itemText'><span>").concat(unstyledTextLayers[i].name, "<span></div>                              <div class='colAuto infoIcon tooltip'>\n                                <svg width=\"14px\" height=\"14px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                        <g id=\"Artboard\" transform=\"translate(-873.000000, -356.000000)\" fill-rule=\"nonzero\">\n                                            <path d=\"M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z\" id=\"Shape\"></path>\n                                        </g>\n                                    </g>\n                                </svg>\n                                <div class=\"tooltipText\">\n                                  <span>\n                                    ").concat(unstyledTextLayers[i].fontName, " - ").concat(unstyledTextLayers[i].fontSize, "\n                                    <br/>\n                                    ").concat(unstyledTextLayers[i].color, "\n                                  </span>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                          <div class='rowAuto'>                             <div class='thumbnailContainer textPreview'>                              <div class=\"thumbnail ").concat(contrastModeOnLayer, " ").concat(isSmall, "\"  id='thumb").concat(layerID, "' style='background-image:url(\"").concat(unstyledTextLayers[i].thumbnail, "\")'></div>                            </div>                          </div>                        </div>                      </div>\n                      <div class='colAvailable'>                        <div class='verticalLayout'>                          ").concat(styleNameDiv, "\n                          <div class='rowAuto'>                             ").concat(matchingStyles, "\n                          </div>                        </div>                      </div>                      \n                    </div>                  </div>                  <div class='rowAuto listItemFoot'></div>                </div>");
      layerID++;
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
    listOfStyles.innerHTML = inner;
    listOfStyles.className = "scrollable movingYFadeInitialState movingYFadeIn";
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
  document.getElementById("styleName" + layerID).innerHTML = "<span>".concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName, "</span>");
  document.getElementById("styleTooltip" + layerID).innerHTML = "\n                                  ".concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName, " - ").concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize, "\n                                  <br/>\n                                  ").concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color);
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
  document.getElementById("styleName" + layerID).innerHTML = "<span>".concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName, "</span>");
  document.getElementById("styleTooltip" + layerID).innerHTML = "\n                                  ".concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName, " - ").concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize, "\n                                  <br/>\n                                  ").concat(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color);
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