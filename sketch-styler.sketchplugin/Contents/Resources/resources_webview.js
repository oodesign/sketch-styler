!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var a,i,c=0;document.getElementById("btnFindMatchingStyles").addEventListener("click",(function(){findMatchingStyles()})),document.getElementById("btnEmptyState").addEventListener("click",(function(){findMatchingStyles()})),window.findMatchingStyles=function(){window.postMessage("GetMeAStyle",document.getElementById("checkSameFont").checked,document.getElementById("checkSameWeight").checked,document.getElementById("checkSimilarWeight").checked,document.getElementById("checkSameSize").checked,document.getElementById("checkSimilarSize").checked,document.getElementById("checkSameColor").checked,document.getElementById("checkSimilarColor").checked,document.getElementById("checkSameParagraphSpacing").checked,document.getElementById("checkSameLineHeight").checked,document.getElementById("checkSameAlignment").checked,document.getElementById("checkSameCharacterSpacing").checked,a)},window.onSameWeightChange=function(){document.getElementById("checkSameWeight").checked&&(document.getElementById("checkSimilarWeight").checked=!1)},window.onSimilarWeightChange=function(){document.getElementById("checkSimilarWeight").checked&&(document.getElementById("checkSameWeight").checked=!1)},window.onSameSizeChange=function(){document.getElementById("checkSameSize").checked&&(document.getElementById("checkSimilarSize").checked=!1)},window.onSimilarSizeChange=function(){document.getElementById("checkSimilarSize").checked&&(document.getElementById("checkSameSize").checked=!1)},window.onSameColorChange=function(){document.getElementById("checkSameColor").checked&&(document.getElementById("checkSimilarColor").checked=!1)},window.onSimilarColorChange=function(){document.getElementById("checkSimilarColor").checked&&(document.getElementById("checkSameColor").checked=!1)},window.onNonMatchingVisibleChange=function(){document.getElementById("checkNonMatchingVisible").checked?null!=i&&i.parentNode.removeChild(i):(null==i&&((i=document.createElement("style")).innerHTML=".hidable {display:none;}"),document.body.appendChild(i))},document.getElementById("btnAssign").addEventListener("click",(function(){assignStyles()})),document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),window.SetWindowTitle=function(e){document.getElementById("windowTitle").innerHTML="Sketch Styler - "+e+" trial days left"},window.UpdateProgress=function(e){document.getElementById("progressCircle").className="item progress-"+Math.floor(100*e)},window.ShowProgress=function(e){document.getElementById("emptyState").className="emptyState fadeOut",document.getElementById("progressLayer").className="progressCircle fadeIn",document.getElementById("progressCircle").className="rowAuto alignFullCenter item progress-0",document.getElementById("loadingMessage").innerHTML=e,document.getElementById("listOfStyles").className="scrollable movingYFadeInitialState movingYFadeOut",document.getElementById("resultsTitle").className="colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeOut"},window.HideProgress=function(e){document.getElementById("progressCircle").className="rowAuto alignFullCenter item progress-"+e,document.getElementById("progressLayer").className="progressCircle fadeOut"},window.DrawActiveLibraries=function(e){window.postMessage("nativeLog","5"),a=e;for(var t="",n=0;n<e.length;n++)t+='<div class="roundCheckbox horizontalLayout">\n              <input class="colAuto" type="checkbox" id="externalLibraryCheck'.concat(n,"\"  onchange='onLibraryCheckChange(").concat(n,')\'/>\n              <label class="colAuto labelCheck" for="externalLibraryCheck').concat(n,'">\n              </label>\n              <label class="colAvailable offset" for="externalLibraryCheck').concat(n,'">\n                <span class="padder">').concat(e[n].name,"</span>\n              </label>\n            </div>");document.getElementById("activeLibraries").innerHTML=t},window.DrawElements=function(e,t){n=e,t,c=0;var a="",i=0;for(var o in e){var l=e[o];a+=0==i?"<div class='primaryBigText'>".concat(e[o][0].artboardName,"</div>"):"<div class='primaryBigText separeHeader'>".concat(e[o][0].artboardName,"</div>");for(var s=0;s<l.length;s++){c++;var d="",r="",m="",g="";l[s].matchingStyles.matchingStyles.length>1&&(m="<button class='btnThumbnailNavigationLeft btnArrow' onclick='loadPreviousStyle(".concat(JSON.stringify(o),",").concat(s,",").concat(i,')\'> \n                              <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                  <g id="Icons/Arrow" transform="translate(-9.000000, -5.000000)" fill="#FFFFFF" fill-rule="nonzero">\n                                      <path d="M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z" id="Path"></path>\n                                  </g>\n                              </g>\n                              </svg>\n                            </button>                            <button class=\'btnThumbnailNavigationRight btnArrow\' onclick=\'loadNextStyle(').concat(JSON.stringify(o),",").concat(s,",").concat(i,')\'>\n\n                              <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                  <g id="Icons/Arrow" transform="translate(-7.000000, -5.000000)" fill="#FFFFFF" fill-rule="nonzero">\n                                      <path d="M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z" id="Path" transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "></path>\n                                  </g>\n                              </g>\n                              </svg>\n                              \n                            </button>'));var h="";l[s].contrastBackground&&(h="contrastMode");var y="";l[s].isSmall&&(y="isSmallThumbnail");var u="";if(l[s].matchingStyles.matchingStyles.length>0){var v="";l[s].matchingStyles.matchingStyles[0].contrastBackground&&(v="contrastMode"),d="<div class='thumbnailContainer stylePreview' ><div class=\"thumbnail ".concat(v," ").concat(y,"\" id='similarThumb").concat(i,"' style='background-image:url(\"").concat(l[s].matchingStyles.matchingStyles[0].thumbnail,"\")'></div>").concat(m,"</div>"),r="<div class='rowAuto'>\n                          <div class='horizontalLayout'>\n                            <div class='colAvailable horizontalLayout primaryBoldText itemText' id='styleName".concat(i,"'>\n                              <span>").concat(l[s].matchingStyles.matchingStyles[0].styleName,'</span>\n                              <div class=\'colAuto infoIcon tooltip\'>\n                                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                        <g id="Artboard" transform="translate(-873.000000, -356.000000)" fill-rule="nonzero">\n                                            <path d="M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z" id="Shape"></path>\n                                        </g>\n                                    </g>\n                                </svg>\n                                <div class="tooltipText left">\n                                  <span id=\'styleTooltip').concat(i,"'>\n                                    ").concat(l[s].matchingStyles.matchingStyles[0].fontName," - ").concat(l[s].matchingStyles.matchingStyles[0].fontSize,"\n                                    <br/>\n                                    ").concat(l[s].matchingStyles.matchingStyles[0].color,"\n                                  </span>\n                                </div>\n                              </div>\n                          </div>\n                        </div>"),g='<div class="selectRoundCheckbox"><input type="checkbox" onchange=\'onCheckChange('.concat(JSON.stringify(o),",").concat(s,")' id='checkbox").concat(i,'\'" checked/><label for="checkbox').concat(i,'"></label></div>')}else u="hidable",d="<div class='thumbnailContainer textPreview alignVerticalCenter'><div class=\"alignHorizontalCenter secondaryText\"> No matching styles</div> </div>",r="<div class='rowAuto primaryBoldText itemText' id='styleName".concat(i,"'>&nbsp;</div>"),g='<div class="selectRoundCheckbox notVisible"><input type="checkbox" onchange=\'onCheckChange('.concat(JSON.stringify(o),",").concat(s,")' id='checkbox").concat(i,'\'" checked/><label for="checkbox').concat(i,'"></label></div>'),c--;a+="<div class='verticalLayout listItem ".concat(u,"'>              <div class='rowAuto listItemHead'></div>                  <div class=\"rowAuto listItemBg\">                    <div class='horizontalLayout'>                      <div class='colAuto'>                        <div class='verticalLayout'>                          \n                          <div class='rowAvailable alignFullCenter'>                            \n                              ").concat(g,"\n                              \n                          </div>                        </div>                      </div>\n                      <div class='colAvailable'>                        <div class='verticalLayout'>                          <div class='rowAuto'>\n                            <div class='horizontalLayout'>\n                              <div class='colAvailable horizontalLayout primaryText itemText'>\n                                <span>").concat(l[s].name,'</span>\n                                <div class=\'colAuto infoIcon tooltip\'>\n                                  <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                          <g id="Artboard" transform="translate(-873.000000, -356.000000)" fill-rule="nonzero">\n                                              <path d="M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z" id="Shape"></path>\n                                          </g>\n                                      </g>\n                                  </svg>\n                                  <div class="tooltipText">\n                                    <span>\n                                      ').concat(l[s].fontName," - ").concat(l[s].fontSize,"\n                                      <br/>\n                                      ").concat(l[s].color,"\n                                    </span>\n                                  </div>\n                                </div>\n                              </div>                            </div>\n                          </div>\n                          <div class='rowAuto'>                             <div class='thumbnailContainer textPreview'>                              <div class=\"thumbnail ").concat(h," ").concat(y,"\"  id='thumb").concat(i,"' style='background-image:url(\"").concat(l[s].thumbnail,"\")'></div>                            </div>                          </div>                        </div>                      </div>\n                      <div class='colAvailable'>                        <div class='verticalLayout'>                          ").concat(r,"\n                          <div class='rowAuto'>                             ").concat(d,"\n                          </div>                        </div>                      </div>                      \n                    </div>                  </div>                  <div class='rowAuto listItemFoot'></div>                </div>"),i++}0}var S=document.getElementById("btnAssign");if(S.innerHTML="Assign "+c+" style",c>1&&(S.innerHTML="Assign "+c+" styles"),0==c&&(S.innerHTML="No styles selected"),S.disabled=!(c>0),document.getElementById("resultsTitle").innerHTML="We found "+t+" unstyled text layers in "+Object.keys(e).length+" artboards, and "+c+" styles that match with them.",c>0){var w=document.getElementById("listOfStyles");w.innerHTML=a,w.className="scrollable movingYFadeInitialState movingYFadeIn",document.getElementById("resultsTitle").className="colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeIn"}else document.getElementById("emptyStateMessage").innerHTML="We didn't find any style that matches with your unstyled layers. Want to try again changing your matching criteria?",document.getElementById("btnEmptyState").className="notDisplayed",document.getElementById("emptyState").className="emptyState fadeIn"},window.onLibraryCheckChange=function(e){a[e].checked=!a[e].checked},window.onCheckChange=function(e,t){n[e][t].assignStyle=!n[e][t].assignStyle,n[e][t].assignStyle?c++:c--;var a=document.getElementById("btnAssign");a.innerHTML="Assign "+c+" style",c>1&&(a.innerHTML="Assign "+c+" styles"),0==c&&(a.innerHTML="No styles selected"),a.disabled=!(c>0)},window.loadNextStyle=function(e,t,a){var i=n[e][t].styleLoaded+1;i<n[e][t].matchingStyles.matchingStyles.length?n[e][t].styleLoaded=i:n[e][t].styleLoaded=0,document.getElementById("styleName"+a).innerHTML="<span>".concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].styleName,"</span>"),document.getElementById("styleTooltip"+a).innerHTML="\n                                  ".concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontName," - ").concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontSize,"\n                                  <br/>\n                                  ").concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].color),window.postMessage("GetThumbnail",n[e][t].layerID,n[e][t].styleLoaded,"similarThumb"+a);var c="";n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].contrastBackground&&(c="contrastMode");var o="";n[e][t].isSmall&&(o="isSmallThumbnail"),document.getElementById("similarThumb"+a).className="thumbnail "+c+" "+o},window.DrawStyleThumbnail=function(e,t){document.getElementById(t).style.backgroundImage='url("'+e+'")'},window.loadPreviousStyle=function(e,t,a){var i=n[e][t].styleLoaded-1;n[e][t].styleLoaded=i>=0?i:n[e][t].matchingStyles.matchingStyles.length-1,document.getElementById("styleName"+a).innerHTML="<span>".concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].styleName,"</span>"),document.getElementById("styleTooltip"+a).innerHTML="\n                                  ".concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontName," - ").concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontSize,"\n                                  <br/>\n                                  ").concat(n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].color),window.postMessage("GetThumbnail",n[e][t].layerID,n[e][t].styleLoaded,"similarThumb"+a);var c="";n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].contrastBackground&&(c="contrastMode");var o="";n[e][t].isSmall&&(o="isSmallThumbnail"),document.getElementById("similarThumb"+a).className="thumbnail "+c+" "+o},window.assignStyles=function(){window.postMessage("AssignStyles",n)},window.cancelAssignation=function(){window.postMessage("Cancel")}}]);