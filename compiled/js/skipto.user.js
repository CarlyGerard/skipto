// -----------------------------------------------------
// Title: Skip to Options User script
// version: 3.0.0
// Date: 2020-10-30
// Author: PayPal Accessibility Team and University of Illinois
// Homepage: https://github.com/paypal/skipto
// Copyright (c) 2020 PayPal Accessibility Team and University of Illinois
// -----------------------------------------------------
//
// ==UserScript==
// @name skipto
// @namespace skipto
// @description This plugin provides a dynamically-generated drop-down menu that allows keyboard and screen reader users to quickly skip to the most important places on the webpage.
// @include *
// ==/UserScript==

/*! skipto - v3.0.0 - 2020-10-30
* https://github.com/paypal/skipto
* Copyright (c) 2020 PayPal Accessibility Team and University of Illinois; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/

!function(){"use strict";var SkipTo={domNode:null,buttonNode:null,menuNode:null,menuitemNodes:[],firstMenuitem:!1,lastMenuitem:!1,firstChars:[],headingLevels:[],skipToIdIndex:1,config:{accesskey:"0",attachElement:"header",displayOption:"static",containerElement:"div",containerRole:"",customClass:"",containerTitle:"Keyboard Navigation",containerTitleWithAccesskey:'Keyboard Navigation, accesskey is "$key"',buttonLabel:"Skip To Content",menuLabel:"Landmarks and Headings",landmarkGroupLabel:"Landmarks",headingGroupLabel:"Main Headings",actionGroupLabel:"Actions",actionMoreHeadingsLabel:"Show more headings",mainLabel:"main",searchLabel:"search",navLabel:"menu",asideLabel:"aside",footerLabel:"footer",headerLabel:"header",formLabel:"form",moreHeadingsLabel:"Show more headings",msgNoLandmarksFound:"No landmarks to skip to",msgNoHeadingsFound:"No main headings to skip to",landmarks:'main, [role="main"], [role="search"], nav, [role="navigation"], aside, [role="complementary"]',headings:'main h1, [role="main"] h1, main h2, [role="main"] h2',colorTheme:"",positionLeft:"",buttonColor:"",buttonBackgroundColor:"",buttonBorderColor:"",buttonColorFocus:"",buttonFocusBackgroundColor:"",buttonFocusBorderColor:"",menuBackgroundColor:"",menuitemColor:"",menuitemLevelColor:"",menuitemBackgroundColor:"",menuitemFocusColor:"",menuitemFocusLevelColor:"",menuitemFocusBackgroundColor:"",menuitemFocusBorderColor:""},colorThemes:{default:{positionLeft:"46%",buttonColor:"#1a1a1a",buttonBackgroundColor:"#eeeeee",buttonBorderColor:"#eeeeee",buttonColorFocus:"#000000",buttonFocusBackgroundColor:"#dcdcdc",buttonFocusBorderColor:"#1a1a1a",menuBackgroundColor:"#eeeeee",menuBorderColor:"1a1a1a",menuitemColor:"#1a1a1a",menuitemLevelColor:"#222222",menuitemBackgroundColor:"#eeeeee",menuitemFocusColor:"#eeeeee",menuitemFocusLevelColor:"#dddddd",menuitemFocusBackgroundColor:"#1a1a1a",menuitemFocusBorderColor:"#1a1a1a"},illinois:{positionLeft:"46%",buttonColor:"#00132c",buttonBackgroundColor:"#dddede",buttonBorderColor:"#dddede",buttonColorFocus:"#00132c",buttonFocusBackgroundColor:"#cad9ef",buttonFocusBorderColor:"#ff552e",menuBackgroundColor:"#cad9ef",menuBorderColor:"#ff552e",menuitemColor:"#00132c",menuitemLevelColor:"#00132c",menuitemBackgroundColor:"#cad9ef",menuitemFocusColor:"#eeeeee",menuitemFocusLevelColor:"#dddddd",menuitemFocusBackgroundColor:"#00132c",menuitemFocusBorderColor:"#ff552e"}},defaultCSS:".skip-to.popup{position:absolute;top:-30em;left:-3000em}.skip-to,.skip-to.popup.focus{position:absolute;top:0;left:$positionLeft}.skip-to button{position:relative;margin:0;padding:6px 8px 6px 8px;border-width:0 1px 1px 1px;border-style:solid;border-radius:0 0 6px 6px;background-color:$buttonBackgroundColor;border-color:$buttonBorderColor;color:$buttonColor;z-index:1000}.skip-to [role=menu]{position:absolute;min-width:17em;display:none;margin:0;padding:0;background-color:$menuBackgroundColor;border-width:2px;border-style:solid;border-color:$menuBorderColor;border-radius:5px;z-index:1000}.skip-to [role=group]{display:grid;grid-auto-rows:min-content;grid-row-gap:1px}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem]{margin:1px;padding:2px;display:block;width:auto;background-color:$menuitemBackgroundColor;border-width:0;border-style:solid;color:$menuitemColor;z-index:1000;display:grid;overflow-y:auto;grid-template-columns:repeat(6,.85rem) 1fr;grid-column-gap:2px}.skip-to [role=menuitem] .label{margin:0;padding:0}.skip-to [role=menuitem] .level{margin:0;padding:0;color:$menuitemLevelColor}.skip-to [role=menuitem] .label:first-letter,.skip-to [role=menuitem] .level:first-letter{text-decoration:underline;text-transform:uppercase}.skip-to [role=menuitem].action .label{grid-column:1/8}.skip-to [role=menuitem].landmark .label{grid-column:1/8}.skip-to [role=menuitem].heading .level{grid-column:1}.skip-to [role=menuitem].heading .label{grid-column:2/8}.skip-to [role=menuitem].heading .label.skip-to-h2{grid-column:3/8}.skip-to [role=menuitem].heading .label.skip-to-h3{grid-column:4/8}.skip-to [role=menuitem].heading .label.skip-to-h4{grid-column:5/8}.skip-to [role=menuitem].heading .label.skip-to-h5{grid-column:6/8}.skip-to [role=menuitem].heading .label.skip-to-h6{grid-column:7/8}.skip-to [role=separator]{margin:0;padding:4px;display:block;width:auto;font-weight:700;text-align:center;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:$menuitemColor;background-color:$menuitemBackgroundColor;color:$menuitemColor;z-index:1000}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem].last{border-radius:0 0 5px 5px}.skip-to.focus{display:block}.skip-to button:focus,.skip-to button:hover{background-color:$buttonFocusBackgroundColor;color:$buttonFocusColor;outline:0}.skip-to button:focus{padding:4px 7px 5px 7px;border-width:2px 2px 2px 2px;border-color:$buttonFocusBorderColor}.skip-to [role=menuitem]:focus{padding:0;border-width:2px;border-style:solid;border-color:$menuitemFocusBorderColor;background-color:$menuitemFocusBackgroundColor;color:$menuitemFocusColor;outline:0}.skip-to [role=menuitem]:focus .level{color:$menuitemFocusLevelColor}",updateStyle:function(stylePlaceholder,value,defaultValue){"string"==typeof value&&0!==value.length||(value=defaultValue);for(var index1=this.defaultCSS.indexOf(stylePlaceholder),index2=index1+stylePlaceholder.length;0<=index1&&index2<this.defaultCSS.length;)this.defaultCSS=this.defaultCSS.substring(0,index1)+value+this.defaultCSS.substring(index2),index2=(index1=this.defaultCSS.indexOf(stylePlaceholder,index2))+stylePlaceholder.length},addCSSColors:function(){var theme=this.colorThemes.default;"object"==typeof this.colorThemes[this.config.colorTheme]&&(theme=this.colorThemes[this.config.colorTheme]),this.updateStyle("$positionLeft",this.config.positionLeft,theme.positionLeft),this.updateStyle("$buttonColor",this.config.buttonColor,theme.buttonColor),this.updateStyle("$buttonBackgroundColor",this.config.buttonBackgroundColor,theme.buttonBackgroundColor),this.updateStyle("$buttonBorderColor",this.config.buttonBorderColor,theme.buttonBorderColor),this.updateStyle("$buttonFocusColor",this.config.buttonFocusColor,theme.buttonFocusColor),this.updateStyle("$buttonFocusBackgroundColor",this.config.buttonFocusBackgroundColor,theme.buttonFocusBackgroundColor),this.updateStyle("$buttonFocusBorderColor",this.config.buttonFocusBorderColor,theme.buttonFocusBorderColor),this.updateStyle("$menuBackgroundColor",this.config.menuBackgroundColor,theme.menuBackgroundColor),this.updateStyle("$menuBorderColor",this.config.menuBorderColor,theme.menuBorderColor),this.updateStyle("$menuitemColor",this.config.menuitemColor,theme.menuitemColor),this.updateStyle("$menuitemLevelColor",this.config.menuitemLevelColor,theme.menuitemLevelColor),this.updateStyle("$menuitemBackgroundColor",this.config.menuitemBackgroundColor,theme.menuitemBackgroundColor),this.updateStyle("$menuitemFocusColor",this.config.menuitemFocusColor,theme.menuitemFocusColor),this.updateStyle("$menuitemFocusLevelColor",this.config.menuitemFocusLevelColor,theme.menuitemFocusLevelColor),this.updateStyle("$menuitemFocusBackgroundColor",this.config.menuitemFocusBackgroundColor,theme.menuitemFocusBackgroundColor),this.updateStyle("$menuitemFocusBorderColor",this.config.menuitemFocusBorderColor,theme.menuitemFocusBorderColor)},isNotEmptyString:function(str){return"string"==typeof str&&str.length},init:function(config){var node,title,attachElement=document.body;config&&this.setUpConfig(config),"string"!=typeof this.config.attachElement||(node=document.querySelector(this.config.attachElement))&&node.nodeType===Node.ELEMENT_NODE&&(attachElement=node),this.addCSSColors(),this.addStyleElement(this.defaultCSS),this.domNode=document.createElement(this.config.containerElement),this.domNode.classList.add("skip-to"),this.isNotEmptyString(this.config.customClass)&&this.domNode.classList.add(this.config.customClass),this.isNotEmptyString(this.config.containerRole)&&this.domNode.setAttribute("role",this.config.containerRole),this.isNotEmptyString(this.config.containerTitleWithAccesskey)&&1===this.config.accesskey.length?(title=this.config.containerTitleWithAccesskey.replace("$key",this.config.accesskey),this.domNode.setAttribute("title",title)):this.isNotEmptyString(this.config.containerTitle)&&this.domNode.setAttribute("title",this.config.containerTitle);var displayOption=this.config.displayOption;if("string"==typeof displayOption&&(displayOption=displayOption.trim().toLowerCase()).length)switch(this.config.displayOption){case"popup":this.domNode.classList.add("popup")}attachElement.firstElementChild?attachElement.insertBefore(this.domNode,attachElement.firstElementChild):attachElement.appendChild(this.domNode),this.buttonNode=document.createElement("button"),this.buttonNode.textContent=this.config.buttonLabel,this.buttonNode.setAttribute("aria-haspopup","true"),this.buttonNode.setAttribute("aria-expanded","false"),this.buttonNode.setAttribute("accesskey",this.config.accesskey),this.domNode.appendChild(this.buttonNode),this.menuNode=document.createElement("div"),this.menuNode.setAttribute("role","menu"),this.domNode.appendChild(this.menuNode),this.buttonNode.addEventListener("keydown",this.handleButtonKeydown.bind(this)),this.buttonNode.addEventListener("click",this.handleButtonClick.bind(this)),this.domNode.addEventListener("focusin",this.handleFocusin.bind(this)),this.domNode.addEventListener("focusout",this.handleFocusout.bind(this)),window.addEventListener("mousedown",this.handleBackgroundMousedown.bind(this),!0)},setUpConfig:function(appConfig){var name,localConfig=this.config,appConfigSettings=void 0!==appConfig.settings?appConfig.settings.skipTo:{};for(name in appConfigSettings)localConfig.hasOwnProperty(name)&&"string"==typeof appConfigSettings[name]&&0<appConfigSettings[name].length&&(localConfig[name]=appConfigSettings[name])},addStyleElement:function(cssString){var styleNode=document.createElement("style"),headNode=document.getElementsByTagName("head")[0],css=document.createTextNode(cssString);styleNode.setAttribute("type","text/css"),styleNode.appendChild(css),headNode.appendChild(styleNode)},getFirstChar:function(menuitem){var c="",label=menuitem.querySelector(".label");return label&&label.textContent.length&&(c=label.textContent.trim()[0].toLowerCase()),c},getHeadingLevel:function(menuitem){var level="";return menuitem.hasAttribute("data-level")&&(level=menuitem.getAttribute("data-level")),level},updateKeyboardShortCuts:function(){var mi;this.firstChars=[],this.headingLevels=[];for(var i=0;i<this.menuitemNodes.length;i+=1)mi=this.menuitemNodes[i],console.log("[UpdateKeyboardShortcuts][menuitem]: "+this.getFirstChar(mi)+" "+this.getHeadingLevel(mi)+" "+mi.textContent),this.firstChars.push(this.getFirstChar(mi)),this.headingLevels.push(this.getHeadingLevel(mi))},updateMenuitems:function(){var menuitemNodes=this.menuNode.querySelectorAll("[role=menuitem");this.menuitemNodes=[],console.log("[updateMenuitems]: "+menuitemNodes.length);for(var i=0;i<menuitemNodes.length;i+=1)this.menuitemNodes.push(menuitemNodes[i]);this.firstMenuitem=this.menuitemNodes[0],this.lastMenuitem=this.menuitemNodes[this.menuitemNodes.length-1],this.lastMenuitem.classList.add("last"),this.updateKeyboardShortCuts()},addMenuitemToGroup:function(groupNode,mi){var tagNode,tagNodeChild,labelNode,menuitemNode=document.createElement("div");mi.class.includes("heading")&&(tagNode=document.createElement("span"),(tagNodeChild=document.createElement("span")).appendChild(document.createTextNode(mi.tagName.substring(1))),tagNode.append(tagNodeChild),tagNode.appendChild(document.createTextNode(":")),tagNode.classList.add("level"),menuitemNode.append(tagNode),menuitemNode.setAttribute("data-level",mi.tagName.substring(1))),(labelNode=document.createElement("span")).appendChild(document.createTextNode(mi.name)),labelNode.classList.add("label"),mi.tagName&&mi.tagName.length&&labelNode.classList.add("skip-to-"+mi.tagName),menuitemNode.append(labelNode),menuitemNode.setAttribute("role","menuitem"),menuitemNode.classList.add(mi.class),menuitemNode.setAttribute("data-id",mi.dataId),menuitemNode.tabIndex=-1,menuitemNode.addEventListener("keydown",this.handleMenuitemKeydown.bind(this)),menuitemNode.addEventListener("click",this.handleMenuitemClick.bind(this)),menuitemNode.addEventListener("mouseover",this.handleMenuitemMouseover.bind(this)),groupNode.appendChild(menuitemNode)},addMenuitemsToGroup:function(groupNode,menuitems,msgNoItemsFound){var len=menuitems.length;if(groupNode.innerHTML="",0===menuitems.length){var item={};item.name=msgNoItemsFound,item.tagName="notag",item.role="",item.class="noitems",item.dataId="",this.addMenuitem(groupNode,item)}else for(var i=0;i<len;i+=1)this.addMenuitemToGroup(groupNode,menuitems[i])},addMenuitemGroup:function(groupId,title){var labelNode,groupNode,menuNode=this.menuNode;return title&&((labelNode=document.createElement("div")).setAttribute("role","separator"),labelNode.textContent=title,menuNode.appendChild(labelNode),(groupNode=document.createElement("div")).setAttribute("role","group"),groupNode.setAttribute("aria-label",title),groupNode.id=groupId,menuNode.appendChild(groupNode),menuNode=groupNode),groupNode},addActionMoreHeadings:function(groupNode,label){var item={};item.name=label,item.tagName="action",item.role="menuitem",item.class="action",item.dataId="skip-to-more-headings",this.addMenuitemToGroup(groupNode,item)},updateHeadingGroupMenuitems:function(level){"number"!=typeof level&&(level=6);var selector="h1";switch(level){case 2:selector="h1, h2";break;case 3:selector="h1, h2, h3";break;case 4:selector="h1, h2, h3, h4";break;case 5:selector="h1, h2, h3, h4, h5";break;case 6:default:selector="h1, h2, h3, h4, h5, h6"}var headings=this.getHeadings(selector),groupNode=document.getElementById("id-skip-to-group-headings");this.addMenuitemsToGroup(groupNode,headings,this.config.msgNoHeadingsFound),this.updateMenuitems(),groupNode.firstElementChild&&groupNode.firstElementChild.focus()},createMenu:function(){for(var groupNode,landmarkElems,headingElems;this.menuNode.lastElementChild;)this.menuNode.removeChild(this.menuNode.lastElementChild);this.skipToIdIndex=1,landmarkElems=this.getLandmarks(),groupNode=this.addMenuitemGroup("id-skip-to-group-landmarks",this.config.landmarkGroupLabel),this.addMenuitemsToGroup(groupNode,landmarkElems,this.config.msgNoLandmarksFound),headingElems=this.getHeadings(),console.log("[updateMenuitems][headingElems]: "+headingElems.length),groupNode=this.addMenuitemGroup("id-skip-to-group-headings",this.config.headingGroupLabel),this.addMenuitemsToGroup(groupNode,headingElems,this.config.msgNoHeadingsFound),groupNode=this.addMenuitemGroup("id-skip-to-group-actions",this.config.actionGroupLabel),this.addActionMoreHeadings(groupNode,this.config.actionMoreHeadingsLabel),this.updateMenuitems()},setFocusToMenuitem:function(menuitem){menuitem&&menuitem.focus()},setFocusToFirstMenuitem:function(){this.setFocusToMenuitem(this.firstMenuitem)},setFocusToLastMenuitem:function(){this.setFocusToMenuitem(this.lastMenuitem)},setFocusToPreviousMenuitem:function(menuitem){var index,newMenuitem=menuitem===this.firstMenuitem?this.lastMenuitem:(index=this.menuitemNodes.indexOf(menuitem),this.menuitemNodes[index-1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusToNextMenuitem:function(menuitem){var index,newMenuitem=menuitem===this.lastMenuitem?this.firstMenuitem:(index=this.menuitemNodes.indexOf(menuitem),this.menuitemNodes[index+1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusByFirstCharacter:function(menuitem,char){var start,index;1<char.length||(char=char.toLowerCase(),(start=this.menuitemNodes.indexOf(menuitem)+1)>=this.menuitemNodes.length&&(start=0),-1===(index=this.firstChars.indexOf(char,start))&&(index=this.headingLevels.indexOf(char,start)),-1===index&&(index=this.firstChars.indexOf(char,0)),-1===index&&(index=this.headingLevels.indexOf(char,0)),-1<index&&this.setFocusToMenuitem(this.menuitemNodes[index]))},getIndexFirstChars:function(startIndex,char){for(var i=startIndex;i<this.firstChars.length;i+=1)if(char===this.firstChars[i])return i;return-1},openPopup:function(){this.createMenu(),this.menuNode.style.display="block",this.buttonNode.setAttribute("aria-expanded","true")},closePopup:function(){this.isOpen()&&(this.buttonNode.setAttribute("aria-expanded","false"),this.menuNode.style.display="none")},isOpen:function(){return"true"===this.buttonNode.getAttribute("aria-expanded")},handleFocusin:function(){this.domNode.classList.add("focus")},handleFocusout:function(){this.domNode.classList.remove("focus")},handleButtonKeydown:function(event){var flag=!1;switch(event.key){case" ":case"Enter":case"ArrowDown":case"Down":this.openPopup(),this.setFocusToFirstMenuitem(),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.openPopup(),this.setFocusToLastMenuitem(),flag=!0}flag&&(event.stopPropagation(),event.preventDefault())},handleButtonClick:function(event){this.isOpen()?(this.closePopup(),this.buttonNode.focus()):(this.openPopup(),this.setFocusToFirstMenuitem()),event.stopPropagation(),event.preventDefault()},skipToElement:function(menuitem){var inputNode=!1,isSearch=menuitem.classList.contains("skip-to-search"),node=document.querySelector('[data-skip-to-id="'+menuitem.getAttribute("data-id")+'"]');node&&(isSearch&&(inputNode=node.querySelector("input")),inputNode&&this.isVisible(inputNode)?inputNode.focus():(node.tabIndex=-1,node.focus()))},handleMenuitemKeydown:function(event){var tgt=event.currentTarget,key=event.key,flag=!1;function isPrintableCharacter(str){return 1===str.length&&str.match(/\S/)}if(!(event.ctrlKey||event.altKey||event.metaKey)){if(event.shiftKey)isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0),"Tab"===event.key&&(this.buttonNode.focus(),this.closePopup(),flag=!0);else switch(key){case"Enter":case" ":switch(tgt.getAttribute("data-id")){case"skip-to-more-headings":this.updateHeadingGroupMenuitems(4);break;default:this.closePopup(),this.skipToElement(tgt)}flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.setFocusToPreviousMenuitem(tgt),flag=!0;break;case"ArrowDown":case"Down":this.setFocusToNextMenuitem(tgt),flag=!0;break;case"Home":case"PageUp":this.setFocusToFirstMenuitem(),flag=!0;break;case"End":case"PageDown":this.setFocusToLastMenuitem(),flag=!0;break;case"Tab":this.closePopup();break;default:isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0)}flag&&(event.stopPropagation(),event.preventDefault())}},handleMenuitemClick:function(event){var tgt=event.currentTarget;switch(tgt.getAttribute("data-id")){case"skip-to-more-headings":this.updateHeadingGroupMenuitems(5);break;default:this.closePopup(),this.skipToElement(tgt)}event.stopPropagation(),event.preventDefault()},handleMenuitemMouseover:function(event){event.currentTarget.focus()},handleBackgroundMousedown:function(event){this.domNode.contains(event.target)||this.isOpen()&&(this.closePopup(),this.buttonNode.focus())},normalizeName:function(name){return"string"==typeof name?name.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()}):""},getTextContent:function(elem){var str="Test",strings=[];return function getText(e,strings){if(e.nodeType===Node.TEXT_NODE)strings.push(e.data);else if(e.nodeType===Node.ELEMENT_NODE){var tagName=e.tagName.toLowerCase();if("img"===tagName||"area"===tagName)e.alt&&strings.push(e.alt);else for(var c=e.firstChild;c;)getText(c,strings),c=c.nextSibling}}(elem,strings),strings.length&&(str=strings.join(" ")),30<str.length&&(str=str.substring(0,27)+"..."),str},getAccessibleName:function(elem){var labelledbyIds=elem.getAttribute("aria-labelledby"),label=elem.getAttribute("aria-label"),title=elem.getAttribute("title"),name="";if(labelledbyIds&&labelledbyIds.length){var str,strings=[],ids=labelledbyIds.split(" ");ids.length||(ids=[labelledbyIds]);for(var i=0,l=ids.length;i<l;i+=1){var e=document.getElementById(ids[i]);e&&(str=this.getTextContent(e)),str.length&&strings.push(str)}name=strings.join(" ")}else label&&label.length?name=label:title&&title.length&&(name=title);return name},isVisible:function(element){return function isVisibleRec(el){if(9===el.nodeType)return!0;var computedStyle=window.getComputedStyle(el),display=computedStyle.getPropertyValue("display"),visibility=computedStyle.getPropertyValue("visibility"),hidden=el.getAttribute("hidden");return"none"!==display&&"hidden"!==visibility&&null===hidden&&isVisibleRec(el.parentNode)}(element)},getHeadings:function(targets){var dataId;"string"!=typeof targets&&(targets=this.config.headings);var headingElementsArr=[];if("string"==typeof targets&&0!==targets.length){console.log("[getHeadings][targets]: "+targets);var headings=document.querySelectorAll(targets);console.log("[getHeadings][headings]: "+headings.length);for(var i=0,len=headings.length;i<len;i+=1){var headingItem,heading=headings[i],role=heading.getAttribute("role");"string"==typeof role&&"presentation"===role||this.isVisible(heading)&&(dataId=heading.hasAttribute("data-skip-to-id")?heading.getAttribute("data-skip-to-id"):(heading.setAttribute("data-skip-to-id",this.skipToIdIndex),this.skipToIdIndex),(headingItem={}).dataId=dataId.toString(),headingItem.class="heading",headingItem.name=this.getTextContent(heading),headingItem.tagName=heading.tagName.toLowerCase(),headingItem.role="heading",headingElementsArr.push(headingItem),this.skipToIdIndex+=1)}return headingElementsArr}},getLocalizedLandmarkName:function(tagName,name){var n;switch(tagName){case"aside":n=this.config.asideLabel;break;case"footer":n=this.config.footerLabel;break;case"form":n=this.config.formLabel;break;case"header":n=this.config.headerLabel;break;case"main":n=this.config.mainLabel;break;case"nav":n=this.config.navLabel;break;case"search":n=this.config.searchLabel;break;default:n=this.config.mainLabel}return this.isNotEmptyString(name)&&(n+=": "+name),n},getLandmarks:function(){var targets=this.config.landmarks;if("string"==typeof targets&&0!==targets.length){for(var landmarks=document.querySelectorAll(targets),mainElems=[],searchElems=[],navElems=[],asideElems=[],footerElems=[],otherElems=[],dataId="",i=0,len=landmarks.length;i<len;i+=1){var landmark=landmarks[i];if(landmark!==this.domNode){var role=landmark.getAttribute("role"),tagName=landmark.tagName.toLowerCase();if(("string"!=typeof role||"presentation"!==role)&&this.isVisible(landmark)){role=role||landmark.tagName.toLowerCase();var name=this.getAccessibleName(landmark);switch("string"!=typeof name&&(name=""),role){case"banner":tagName="header";break;case"complementary":tagName="aside";break;case"contentinfo":tagName="footer";break;case"form":tagName="form";break;case"main":tagName="main";break;case"navigation":tagName="nav";break;case"search":tagName="search"}["aside","footer","form","header","main","nav","search"].indexOf(tagName)<0&&(tagName="main"),dataId=landmark.hasAttribute("data-skip-to-id")?landmark.getAttribute("data-skip-to-id"):(landmark.setAttribute("data-skip-to-id",this.skipToIdIndex),this.skipToIdIndex);var landmarkItem={};switch(landmarkItem.dataId=dataId.toString(),landmarkItem.class="landmark",landmarkItem.name=this.getLocalizedLandmarkName(tagName,name),landmarkItem.tagName=tagName,this.skipToIdIndex+=1,tagName){case"main":mainElems.push(landmarkItem);break;case"search":searchElems.push(landmarkItem);break;case"nav":navElems.push(landmarkItem);break;case"aside":asideElems.push(landmarkItem);break;case"footer":footerElems.push(landmarkItem);break;default:otherElems.push(landmarkItem)}}}}return[].concat(mainElems,searchElems,navElems,asideElems,footerElems,otherElems)}}};window.addEventListener("load",function(){SkipTo.init(window.SkipToConfig||window.Drupal||window.Wordpress||{}),console.log("SkipTo loaded...")})}();
//# sourceMappingURL=skipto.min.js.map/*@end @*/
