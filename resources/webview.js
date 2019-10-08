// disable the context menu (eg. the right click menu) to have a more native feel
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })

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
  if(document.getElementById("checkSameWeight").checked) document.getElementById("checkSimilarWeight").checked = false;
};
window.onSimilarWeightChange = () => {
  if(document.getElementById("checkSimilarWeight").checked) document.getElementById("checkSameWeight").checked = false;
};

window.onSameSizeChange = () => {
  if(document.getElementById("checkSameSize").checked) document.getElementById("checkSimilarSize").checked = false;
};
window.onSimilarSizeChange = () => {
  if(document.getElementById("checkSimilarSize").checked) document.getElementById("checkSameSize").checked = false;
};

window.onSameColorChange = () => {
  if(document.getElementById("checkSameColor").checked) document.getElementById("checkSimilarColor").checked = false;
};
window.onSimilarColorChange = () => {
  if(document.getElementById("checkSimilarColor").checked) document.getElementById("checkSameColor").checked = false;
};
window.onNonMatchingVisibleChange = () => {
  if(!document.getElementById("checkNonMatchingVisible").checked)
  {
    if(globalComplementarySheet==null)
    {
      globalComplementarySheet = document.createElement('style');
      globalComplementarySheet.innerHTML = ".hidable {display:none;}";
    }
    document.body.appendChild(globalComplementarySheet);
  }
  else
  {
    if(globalComplementarySheet!=null)
    {
      var sheetParent = globalComplementarySheet.parentNode;
      sheetParent.removeChild(globalComplementarySheet);
    }
  }
};



document.getElementById('btnAssign').addEventListener("click", () => {
  assignStyles();
});
document.getElementById('btnCancel').addEventListener("click", () => {
  cancelAssignation();
});

window.SetWindowTitle = (remainingDays) => {
  document.getElementById('windowTitle').innerHTML = "Sketch Styler - "+remainingDays+" trial days left";
};
window.UpdateProgress = (progress) => {
  document.getElementById('progressCircle').className = "item progress-"+Math.floor(progress*100);
};

window.ShowProgress = (message) => {
  document.getElementById('emptyState').className = "emptyState fadeOut";
  document.getElementById('progressLayer').className = "progressCircle fadeIn";
  document.getElementById('progressCircle').className = "rowAuto alignFullCenter item progress-0";
  document.getElementById('loadingMessage').innerHTML = message;
  

  var listOfStyles = document.getElementById('listOfStyles');
  listOfStyles.className= "scrollable movingYFadeInitialState movingYFadeOut";
  document.getElementById('resultsTitle').className= "colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeOut";
};

window.HideProgress = (targetProgress) => {
  document.getElementById('progressCircle').className = "rowAuto alignFullCenter item progress-"+targetProgress;
  document.getElementById('progressLayer').className = "progressCircle fadeOut";
};

window.DrawActiveLibraries = (activeLibraries) => {
  globalActiveLibraries = activeLibraries;
  var inner="";
  for(var i=0;i<activeLibraries.length;i++)
  {
    inner +=`<div class="roundCheckbox">
              <input type="checkbox" id="externalLibraryCheck${i}"  onchange='onLibraryCheckChange(${i})'/>
              <label for="externalLibraryCheck${i}"><div class="padder"><span>${activeLibraries[i].name}</span></div></label>
            </div>`;
  }

  document.getElementById('activeLibraries').innerHTML = inner;
}

window.DrawElements = (byArtb, totalLayers) => {
  globalUnstyledLayers = byArtb;
  globalTotalLayers = totalLayers;
  globalAssignLayers = 0;
  var inner = "";
  var artboardID = 0;
  var layerID = 0;


  for (var artboard in byArtb) {

    var unstyledTextLayers = byArtb[artboard];
    if(layerID == 0)
      inner += `<div class='primaryBigText'>${byArtb[artboard][0].artboardName}</div>`;
    else
      inner += `<div class='primaryBigText separeHeader'>${byArtb[artboard][0].artboardName}</div>`;


    for (var i = 0; i < unstyledTextLayers.length; i++) {
      globalAssignLayers++;
      var matchingStyles = "";
      var styleNameDiv = "";
      var navigationButtons = "";
      var checkbox = "";


      if (unstyledTextLayers[i].matchingStyles.matchingStyles.length > 1) {
        navigationButtons = `<button class='btnThumbnailNavigationLeft btnArrow' onclick='loadPreviousStyle(${JSON.stringify(artboard)},${i},${layerID})'> 
                              <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                  <g id="Icons/Arrow" transform="translate(-9.000000, -5.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                      <path d="M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z" id="Path"></path>
                                  </g>
                              </g>
                              </svg>
                            </button>\
                            <button class='btnThumbnailNavigationRight btnArrow' onclick='loadNextStyle(${JSON.stringify(artboard)},${i},${layerID})'>

                              <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                  <g id="Icons/Arrow" transform="translate(-7.000000, -5.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                      <path d="M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z" id="Path" transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "></path>
                                  </g>
                              </g>
                              </svg>
                              
                            </button>`;
      }

      var contrastModeOnLayer = "";
      if(unstyledTextLayers[i].contrastBackground)
        contrastModeOnLayer = "contrastMode";

      var isSmall = "";
      if(unstyledTextLayers[i].isSmall)
        isSmall = "isSmallThumbnail";

      var hidable = "";

      if (unstyledTextLayers[i].matchingStyles.matchingStyles.length > 0) {
        var contrastModeOnStyle = "";
        if(unstyledTextLayers[i].matchingStyles.matchingStyles[0].contrastBackground)
          contrastModeOnStyle = "contrastMode";

        matchingStyles = `<div class='thumbnailContainer stylePreview' ><div class="thumbnail ${contrastModeOnStyle} ${isSmall}" id='similarThumb${layerID}' style='background-image:url("${unstyledTextLayers[i].matchingStyles.matchingStyles[0].thumbnail}")'></div>${navigationButtons}</div>`;
        styleNameDiv = `<div class='rowAuto'>
                          <div class='horizontalLayout'>
                            <div class='colAuto primaryBoldText itemText' id='styleName${layerID}'><span>${unstyledTextLayers[i].matchingStyles.matchingStyles[0].styleName}</span></div>
                            <div class='colAuto infoIcon tooltip'>
                              <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <g id="Artboard" transform="translate(-873.000000, -356.000000)" fill-rule="nonzero">
                                          <path d="M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z" id="Shape"></path>
                                      </g>
                                  </g>
                              </svg>
                              <div class="tooltipText">
                                <span id='styleTooltip${layerID}'>
                                  ${unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontName} - ${unstyledTextLayers[i].matchingStyles.matchingStyles[0].fontSize}
                                  <br/>
                                  ${unstyledTextLayers[i].matchingStyles.matchingStyles[0].color}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>`;
        checkbox = `<div class="selectRoundCheckbox"><input type="checkbox" onchange='onCheckChange(${JSON.stringify(artboard)},${i})' id='checkbox${layerID}'" checked/><label for="checkbox${layerID}"></label></div>`;
      }
      else {
        hidable="hidable";
        matchingStyles = `<div class='thumbnailContainer textPreview alignVerticalCenter'><div class="alignHorizontalCenter secondaryText"> No matching styles</div> </div>`;
        styleNameDiv = `<div class='rowAuto primaryBoldText itemText' id='styleName${layerID}'>&nbsp;</div>`;
        checkbox = `<div class="selectRoundCheckbox notVisible"><input type="checkbox" onchange='onCheckChange(${JSON.stringify(artboard)},${i})' id='checkbox${layerID}'" checked/><label for="checkbox${layerID}"></label></div>`;
        globalAssignLayers--;
      }

      inner += `<div class='verticalLayout listItem ${hidable}'>\
              <div class='rowAuto listItemHead'></div>\
                  <div class="rowAuto listItemBg">\
                    <div class='horizontalLayout'>\
                      <div class='colAuto'>\
                        <div class='verticalLayout'>\
                          
                          <div class='rowAvailable alignFullCenter'>\
                            
                              ${checkbox}
                              
                          </div>\
                        </div>\
                      </div>\

                      <div class='colAvailable'>\
                        <div class='verticalLayout'>\
                          <div class='rowAuto'>
                            <div class='horizontalLayout'>
                              <div class='colAuto primaryText itemText'><span>${unstyledTextLayers[i].name}<span></div>\
                              <div class='colAuto infoIcon tooltip'>
                                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Artboard" transform="translate(-873.000000, -356.000000)" fill-rule="nonzero">
                                            <path d="M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </svg>
                                <div class="tooltipText">
                                  <span>
                                    ${unstyledTextLayers[i].fontName} - ${unstyledTextLayers[i].fontSize}
                                    <br/>
                                    ${unstyledTextLayers[i].color}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class='rowAuto'> \
                            <div class='thumbnailContainer textPreview'>\
                              <div class="thumbnail ${contrastModeOnLayer} ${isSmall}"  id='thumb${layerID}' style='background-image:url("${unstyledTextLayers[i].thumbnail}")'></div>\
                            </div>\
                          </div>\
                        </div>\
                      </div>\

                      <div class='colAvailable'>\
                        <div class='verticalLayout'>\
                          ${styleNameDiv}
                          <div class='rowAuto'> \
                            ${matchingStyles}
                          </div>\
                        </div>\
                      </div>\
                      
                    </div>\
                  </div>\
                  <div class='rowAuto listItemFoot'></div>\
                </div>`;


      layerID ++;
    }
    artboardID++;
  }
  var btnAssign = document.getElementById('btnAssign')
  btnAssign.innerHTML = "Assign "+globalAssignLayers+" style";
  if(globalAssignLayers>1) btnAssign.innerHTML = "Assign "+globalAssignLayers+" styles";
  if(globalAssignLayers==0) btnAssign.innerHTML = "No styles selected";
  btnAssign.disabled=!(globalAssignLayers>0);


  document.getElementById('resultsTitle').innerHTML = "We found " + totalLayers + " unstyled text layers in " + Object.keys(byArtb).length + " artboards, and "+globalAssignLayers+" styles that match with them.";

  if(globalAssignLayers > 0)
  {
    var listOfStyles = document.getElementById('listOfStyles');
    listOfStyles.innerHTML = inner;
    listOfStyles.className= "scrollable movingYFadeInitialState movingYFadeIn";
    document.getElementById('resultsTitle').className= "colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeIn";
  }
  else
  {
    
    document.getElementById('emptyStateMessage').innerHTML = "We didn't find any style that matches with your unstyled layers. Want to try again changing your matching criteria?";
    document.getElementById('btnEmptyState').className = "notDisplayed";
    document.getElementById('emptyState').className = "emptyState fadeIn";
    
  }

}


window.onLibraryCheckChange = (index) => {
  globalActiveLibraries[index].checked = !globalActiveLibraries[index].checked;
}


window.onCheckChange = (artboard,index) => {
  globalUnstyledLayers[artboard][index].assignStyle = !globalUnstyledLayers[artboard][index].assignStyle;
  if(globalUnstyledLayers[artboard][index].assignStyle) globalAssignLayers++;
  else globalAssignLayers--;

  var btnAssign = document.getElementById('btnAssign')
  btnAssign.innerHTML = "Assign "+globalAssignLayers+" style";
  if(globalAssignLayers>1) btnAssign.innerHTML = "Assign "+globalAssignLayers+" styles";
  if(globalAssignLayers==0) btnAssign.innerHTML = "No styles selected";
  btnAssign.disabled=!(globalAssignLayers>0);
}



window.loadNextStyle = (artboard,index,layerID) => {
  var newThumbnailIndex = globalUnstyledLayers[artboard][index].styleLoaded+1;


  if(newThumbnailIndex < globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles.length)
   globalUnstyledLayers[artboard][index].styleLoaded = newThumbnailIndex;
  else
   globalUnstyledLayers[artboard][index].styleLoaded = 0;
  
  document.getElementById("styleName"+layerID).innerHTML = `<span>${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName}</span>`;
  document.getElementById("styleTooltip"+layerID).innerHTML = `
                                  ${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName} - ${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize}
                                  <br/>
                                  ${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color}`;
  window.postMessage('GetThumbnail', globalUnstyledLayers[artboard][index].layerID,globalUnstyledLayers[artboard][index].styleLoaded, "similarThumb"+layerID);

  var contrastModeOnStyle = "";
  if(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].contrastBackground)
    contrastModeOnStyle = "contrastMode";

  var isSmall = "";
  if(globalUnstyledLayers[artboard][index].isSmall)
    isSmall = "isSmallThumbnail";

  document.getElementById("similarThumb"+layerID).className="thumbnail "+contrastModeOnStyle+" "+isSmall;
}

window.DrawStyleThumbnail = (thumbnail, markupLayerID) => {
  document.getElementById(markupLayerID).style.backgroundImage="url(\""+thumbnail+"\")";
}



window.loadPreviousStyle = (artboard,index,layerID) => {
  var newThumbnailIndex = globalUnstyledLayers[artboard][index].styleLoaded-1;

  if(newThumbnailIndex >= 0)
    globalUnstyledLayers[artboard][index].styleLoaded = newThumbnailIndex;
  else
    globalUnstyledLayers[artboard][index].styleLoaded = globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles.length-1;

  document.getElementById("styleName"+layerID).innerHTML = `<span>${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].styleName}</span>`;
  document.getElementById("styleTooltip"+layerID).innerHTML = `
                                  ${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontName} - ${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].fontSize}
                                  <br/>
                                  ${globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].color}`;
  window.postMessage('GetThumbnail', globalUnstyledLayers[artboard][index].layerID,globalUnstyledLayers[artboard][index].styleLoaded, "similarThumb"+layerID);

  var contrastModeOnStyle = "";
  if(globalUnstyledLayers[artboard][index].matchingStyles.matchingStyles[globalUnstyledLayers[artboard][index].styleLoaded].contrastBackground)
    contrastModeOnStyle = "contrastMode";

    var isSmall = "";
    if(globalUnstyledLayers[artboard][index].isSmall)
      isSmall = "isSmallThumbnail";
  
    document.getElementById("similarThumb"+layerID).className="thumbnail "+contrastModeOnStyle+" "+isSmall;
}

window.assignStyles = () => {
  window.postMessage('AssignStyles', globalUnstyledLayers);
}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

