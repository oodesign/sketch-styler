!function(e){var t={};function n(a){if(t[a])return t[a].exports;var c=t[a]={i:a,l:!1,exports:{}};return e[a].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(a,c,function(t){return e[t]}.bind(null,c));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){}));var a,c=0;document.getElementById("btnFindMatchingStyles").addEventListener("click",(function(){findMatchingStyles()})),document.getElementById("btnEmptyState").addEventListener("click",(function(){findMatchingStyles()})),window.findMatchingStyles=function(){window.postMessage("GetMeAStyle",document.getElementById("checkSameFont").checked,document.getElementById("checkSameWeight").checked,document.getElementById("checkSimilarWeight").checked,document.getElementById("checkSameSize").checked,document.getElementById("checkSimilarSize").checked,document.getElementById("checkSameColor").checked,document.getElementById("checkSimilarColor").checked,document.getElementById("checkSameParagraphSpacing").checked,document.getElementById("checkSameLineHeight").checked,document.getElementById("checkSameAlignment").checked,document.getElementById("checkSameCharacterSpacing").checked,a)},window.onSameWeightChange=function(){document.getElementById("checkSameWeight").checked&&(document.getElementById("checkSimilarWeight").checked=!1)},window.onSimilarWeightChange=function(){document.getElementById("checkSimilarWeight").checked&&(document.getElementById("checkSameWeight").checked=!1)},window.onSameSizeChange=function(){document.getElementById("checkSameSize").checked&&(document.getElementById("checkSimilarSize").checked=!1)},window.onSimilarSizeChange=function(){document.getElementById("checkSimilarSize").checked&&(document.getElementById("checkSameSize").checked=!1)},window.onSameColorChange=function(){document.getElementById("checkSameColor").checked&&(document.getElementById("checkSimilarColor").checked=!1)},window.onSimilarColorChange=function(){document.getElementById("checkSimilarColor").checked&&(document.getElementById("checkSameColor").checked=!1)},document.getElementById("btnAssign").addEventListener("click",(function(){assignStyles()})),document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),window.SetWindowTitle=function(e){document.getElementById("windowTitle").innerHTML="Sketch Styler - "+e+" trial days left"},window.UpdateProgress=function(e){document.getElementById("progressCircle").className="item progress-"+Math.floor(100*e)},window.ShowProgress=function(e){document.getElementById("emptyState").className="emptyState fadeOut",document.getElementById("progressLayer").className="progressCircle fadeIn",document.getElementById("progressCircle").className="rowAuto alignFullCenter item progress-0",document.getElementById("loadingMessage").innerHTML=e,document.getElementById("listOfStyles").className="movingYFadeInitialState movingYFadeOut",document.getElementById("resultsTitle").className="colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeOut"},window.HideProgress=function(e){document.getElementById("progressCircle").className="rowAuto alignFullCenter item progress-"+e,document.getElementById("progressLayer").className="progressCircle fadeOut"},window.DrawActiveLibraries=function(e){a=e;for(var t="",n=0;n<e.length;n++){var c=e[n].checked?"checked":"";t+='<div class="roundCheckbox horizontalLayout">\n              <input class="colAuto" type="checkbox" id="externalLibraryCheck'.concat(n,"\"  onchange='onLibraryCheckChange(").concat(n,")' ").concat(c,'/>\n              <label class="colAuto labelCheck" for="externalLibraryCheck').concat(n,'">\n              </label>\n              <label class="colAvailable offset" for="externalLibraryCheck').concat(n,'">\n                <span class="padder">').concat(e[n].name,"</span>\n              </label>\n            </div>")}document.getElementById("activeLibraries").innerHTML=t},window.createTextWithClass=function(e,t,n){var a=document.createElement("span");return a.className=t,a.appendChild(document.createTextNode(e)),null!=n&&(a.id=n),a},window.createSvgWithClass=function(e,t,n,a){var c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("width",""+t),c.setAttribute("height",""+n),c.setAttribute("viewBox","0 0 "+t+" "+n);var l=document.createElementNS("http://www.w3.org/2000/svg","path");return l.setAttribute("d",e),l.setAttribute("transform",a),l.setAttribute("fill","#FFFFFF"),c.appendChild(l),c},window.DrawElements=function(e,t,a){document.getElementById("listOfStyles").innerHTML="",n=e,t,c=0;var l=document.createDocumentFragment(),i=0;for(var d in document.getElementById("unstyledLayersWithNoMatchingStyles").innerHTML=a<1?"":1==a?"* There is "+a+" layer with no matching styles":"* There are "+a+" layers with no matching styles",e){var o=e[d],m=document.createElement("div");i>0&&(m.className="separeHeader"),m.appendChild(createTextWithClass(e[d][0].artboardName,"primaryBigText")),l.appendChild(m);for(var s=function(){var e=d,t=r,n=i;c++,document.createElement("div").className="rowAuto",(h=document.createElement("div")).className="colAuto selectRoundCheckbox",h.addEventListener("change",(function(){onCheckChange(e,t)})),(u=document.createElement("button")).className="btnThumbnailNavigationLeft btnArrow",u.appendChild(createSvgWithClass("M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z",8,14,"translate(-7, -5)")),(g=document.createElement("button")).className="btnThumbnailNavigationRight btnArrow",g.appendChild(createSvgWithClass("M15.7303757,6.64230705 C16.0898748,6.2666066 16.0898748,5.6574758 15.7303757,5.28177534 C15.3708766,4.90607489 14.7880134,4.90607489 14.4285143,5.28177534 L8,12 L14.4285143,18.7182247 C14.7880134,19.0939251 15.3708766,19.0939251 15.7303757,18.7182247 C16.0898748,18.3425242 16.0898748,17.7333934 15.7303757,17.3576929 L10.6037228,12 L15.7303757,6.64230705 Z",8,14,"translate(16, -5) scale(-1,1)")),u.addEventListener("click",(function(){loadPreviousStyle(e,t,n)})),g.addEventListener("click",(function(){loadNextStyle(e,t,n)})),y="",o[r].contrastBackground&&(y="contrastMode"),p="",o[r].isSmall&&(p="isSmallThumbnail"),S="",o[r].matchingStyles.matchingStyles[0].contrastBackground&&(S="contrastMode"),(C=document.createElement("input")).setAttribute("type","checkbox"),C.id="checkbox".concat(i),C.checked=!0,(E=document.createElement("label")).className="labelCheck",E.htmlFor="checkbox".concat(i),h.appendChild(C),h.appendChild(E),(f=document.createElement("div")).className="primaryText itemText",f.appendChild(document.createTextNode(o[r].name)),(v=document.createElement("div")).className="infoIcon tooltip",(b=document.createElement("div")).appendChild(createTextWithClass(o[r].fontName+" - "+o[r].fontSize,"primaryText")),(w=document.createElement("div")).appendChild(createTextWithClass(o[r].color,"primaryText")),(k=document.createElement("div")).className="tooltipText right",k.appendChild(b),k.appendChild(w),v.appendChild(createSvgWithClass("M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z",14,14,"translate(-873.000000, -356.000000)")),v.appendChild(k),(L=document.createElement("div")).className="itemRowTitle",L.appendChild(f),L.appendChild(v),(T=document.createElement("div")).className="thumbnail ".concat(y," ").concat(p),T.id="thumb".concat(i),T.style='background-image:url("'.concat(o[r].thumbnail,'")'),(I=document.createElement("div")).className="thumbnailContainer textPreview",I.append(T),(B=document.createElement("div")).className="realTextLayer verticalLayout",B.append(L),B.append(I),(N=document.createElement("div")).className="thumbnailContainer stylePreview",(M=document.createElement("div")).className="thumbnail ".concat(S," ").concat(p),M.id="similarThumb".concat(i),M.style='background-image:url("'.concat(o[r].matchingStyles.matchingStyles[0].thumbnail),N.appendChild(M),o[r].matchingStyles.matchingStyles.length>1&&(N.appendChild(u),N.appendChild(g)),(x=document.createElement("div")).className="primaryBoldText itemText",x.id="styleName".concat(i),x.appendChild(document.createTextNode(o[r].matchingStyles.matchingStyles[0].styleName)),(A=document.createElement("div")).className="colAuto infoIcon tooltip",(W=document.createElement("div")).className="tooltipText left",(H=document.createElement("div")).appendChild(createTextWithClass(o[r].matchingStyles.matchingStyles[0].fontName+" - "+o[r].matchingStyles.matchingStyles[0].fontSize,"primaryText","styleTooltipAttributes".concat(i))),(F=document.createElement("div")).appendChild(createTextWithClass(o[r].matchingStyles.matchingStyles[0].color,"primaryText","styleTooltipColor".concat(i))),W.appendChild(H),W.appendChild(F),A.appendChild(createSvgWithClass("M880,356 C876.134133,356 873,359.134133 873,363 C873,366.865867 876.134133,370 880,370 C883.865867,370 887,366.865867 887,363 C887,359.134133 883.865867,356 880,356 Z M879.191111,366.021511 L879.191111,362.817067 C879.191111,362.37033 879.553263,362.008178 880,362.008178 C880.446737,362.008178 880.808889,362.37033 880.808889,362.817067 L880.808889,366.021511 C880.808889,366.468248 880.446737,366.8304 880,366.8304 C879.553263,366.8304 879.191111,366.468248 879.191111,366.021511 L879.191111,366.021511 Z M880,361.125556 C879.606773,361.125556 879.252265,360.888681 879.101784,360.525387 C878.951302,360.162092 879.034481,359.743922 879.312535,359.465868 C879.590589,359.187815 880.008759,359.104636 880.372053,359.255117 C880.735348,359.405599 880.972222,359.760106 880.972222,360.153333 C880.972222,360.690277 880.536944,361.125556 880,361.125556 Z",14,14,"translate(-873.000000, -356.000000)")),A.appendChild(W),(P=document.createElement("div")).className="itemRowTitle",P.appendChild(x),P.appendChild(A),(O=document.createElement("div")).className="relatedStyles",O.appendChild(P),O.appendChild(N),(z=document.createElement("div")).className="listItemRow",z.appendChild(h),z.appendChild(B),z.appendChild(O),l.appendChild(z),i++},r=0;r<o.length;r++){var h,u,g,y,p,S,C,E,f,v,b,w,k,L,T,I,B,N,M,x,A,W,H,F,P,O,z;s()}0}var j=document.getElementById("btnAssign");if(j.innerHTML="Assign "+c+" style",c>1&&(j.innerHTML="Assign "+c+" styles"),0==c&&(j.innerHTML="No styles selected"),j.disabled=!(c>0),document.getElementById("resultsTitle").innerHTML="We found "+t+" unstyled text layers in "+Object.keys(e).length+" artboards, and "+c+" styles that match with them.",c>0){var Y=document.getElementById("listOfStyles");Y.appendChild(l),Y.className="movingYFadeInitialState movingYFadeIn",document.getElementById("resultsTitle").className="colAvailable rightPanelPadding secondaryText movingYFadeInitialState movingYFadeIn"}else document.getElementById("emptyStateMessage").innerHTML="We didn't find any style that matches with your unstyled layers. Want to try again changing your matching criteria?",document.getElementById("btnEmptyState").className="notDisplayed",document.getElementById("emptyState").className="emptyState fadeIn"},window.onLibraryCheckChange=function(e){a[e].checked=!a[e].checked},window.onCheckChange=function(e,t){n[e][t].assignStyle=!n[e][t].assignStyle,n[e][t].assignStyle?c++:c--;var a=document.getElementById("btnAssign");a.innerHTML="Assign "+c+" style",c>1&&(a.innerHTML="Assign "+c+" styles"),0==c&&(a.innerHTML="No styles selected"),a.disabled=!(c>0)},window.loadNextStyle=function(e,t,a){var c=n[e][t].styleLoaded+1;c<n[e][t].matchingStyles.matchingStyles.length?n[e][t].styleLoaded=c:n[e][t].styleLoaded=0,document.getElementById("styleName"+a).innerHTML=n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].styleName,document.getElementById("styleTooltipAttributes"+a).innerHTML=n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontName+" - "+n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontSize,document.getElementById("styleTooltipColor"+a).innerHTML=n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].color,window.postMessage("GetThumbnail",n[e][t].layerID,n[e][t].styleLoaded,"similarThumb"+a);var l="";n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].contrastBackground&&(l="contrastMode");var i="";n[e][t].isSmall&&(i="isSmallThumbnail"),document.getElementById("similarThumb"+a).className="thumbnail "+l+" "+i},window.DrawStyleThumbnail=function(e,t){document.getElementById(t).style.backgroundImage='url("'+e+'")'},window.loadPreviousStyle=function(e,t,a){var c=n[e][t].styleLoaded-1;n[e][t].styleLoaded=c>=0?c:n[e][t].matchingStyles.matchingStyles.length-1,document.getElementById("styleName"+a).innerHTML=n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].styleName,document.getElementById("styleTooltipAttributes"+a).innerHTML=n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontName+" - "+n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].fontSize,document.getElementById("styleTooltipColor"+a).innerHTML=n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].color,window.postMessage("GetThumbnail",n[e][t].layerID,n[e][t].styleLoaded,"similarThumb"+a);var l="";n[e][t].matchingStyles.matchingStyles[n[e][t].styleLoaded].contrastBackground&&(l="contrastMode");var i="";n[e][t].isSmall&&(i="isSmallThumbnail"),document.getElementById("similarThumb"+a).className="thumbnail "+l+" "+i},window.assignStyles=function(){window.postMessage("AssignStyles",n)},window.cancelAssignation=function(){window.postMessage("Cancel")}}]);