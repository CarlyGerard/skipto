/*! skipto - v3.0.0 - 2020-10-30
* https://github.com/paypal/skipto
* Copyright (c) 2020 PayPal Accessibility Team and University of Illinois; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/
/*jslint devel: true */
/* ========================================================================
* Copyright (c) <2020> PayPal
* All rights reserved.
* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of PayPal or any of its subsidiaries or affiliates nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ======================================================================== */

(function() {
  'use strict';
  var SkipTo = {
    domNode: null,
    buttonNode: null,
    menuNode: null,
    menuitemNodes: [],
    firstMenuitem: false,
    lastMenuitem: false,
    firstChars: [],
    headingLevels: [],
    skipToIdIndex: 1,
    // Default configuration values
    config: {
      // Customization of button and menu
      accesskey: '0', // default is the number zero
      attachElement: 'header',
      displayOption: 'static', // options: static (default), popup
      // container element, use containerClass for custom styling
      containerElement: 'div',
      containerRole: '',
      customClass: '',
      containerTitle: 'Keyboard Navigation',
      containerTitleWithAccesskey: 'Keyboard Navigation, accesskey is "$key"',
      // labels and messages
      buttonLabel: 'Skip To Content',
      menuLabel: 'Landmarks and Headings',
      landmarkGroupLabel: 'Landmarks',
      headingGroupLabel: 'Main Headings',
      actionGroupLabel: 'Actions',
      actionMoreHeadingsLabel: 'Show more headings',
      mainLabel: 'main',
      searchLabel: 'search',
      navLabel: 'menu',
      asideLabel: 'aside',
      footerLabel: 'footer',
      headerLabel: 'header',
      formLabel: 'form',
      moreHeadingsLabel: 'Show more headings',
      msgNoLandmarksFound: 'No landmarks to skip to',
      msgNoHeadingsFound: 'No main headings to skip to',
      // Selectors for landmark and headings sections
      landmarks: 'main, [role="main"], [role="search"], nav, [role="navigation"], aside, [role="complementary"]',
      headings: 'main h1, [role="main"] h1, main h2, [role="main"] h2',
      // Custom CSS position and colors
      colorTheme: '',
      positionLeft: '',
      buttonColor: '',
      buttonBackgroundColor: '',
      buttonBorderColor: '',
      buttonColorFocus: '',
      buttonFocusBackgroundColor: '',
      buttonFocusBorderColor: '',
      menuBackgroundColor: '',
      menuitemColor: '',
      menuitemLevelColor: '',
      menuitemBackgroundColor: '',
      menuitemFocusColor: '',
      menuitemFocusLevelColor: '',
      menuitemFocusBackgroundColor: '',
      menuitemFocusBorderColor: ''
    },
    colorThemes: {
      'default': {
        positionLeft: '46%',
        buttonColor: '#1a1a1a',
        buttonBackgroundColor: '#eeeeee',
        buttonBorderColor: '#eeeeee',
        buttonColorFocus: '#000000',
        buttonFocusBackgroundColor: '#dcdcdc',
        buttonFocusBorderColor: '#1a1a1a',
        menuBackgroundColor: '#eeeeee',
        menuBorderColor: '1a1a1a',
        menuitemColor: '#1a1a1a',
        menuitemLevelColor: '#222222',
        menuitemBackgroundColor: '#eeeeee',
        menuitemFocusColor: '#eeeeee',
        menuitemFocusLevelColor: '#dddddd',
        menuitemFocusBackgroundColor: '#1a1a1a',
        menuitemFocusBorderColor: '#1a1a1a'
      },
      'illinois': {
        positionLeft: '46%',
        buttonColor: '#00132c',
        buttonBackgroundColor: '#dddede',
        buttonBorderColor: '#dddede',
        buttonColorFocus: '#00132c',
        buttonFocusBackgroundColor: '#cad9ef',
        buttonFocusBorderColor: '#ff552e',
        menuBackgroundColor: '#cad9ef',
        menuBorderColor: '#ff552e',
        menuitemColor: '#00132c',
        menuitemLevelColor: '#00132c',
        menuitemBackgroundColor: '#cad9ef',
        menuitemFocusColor: '#eeeeee',
        menuitemFocusLevelColor: '#dddddd',
        menuitemFocusBackgroundColor: '#00132c',
        menuitemFocusBorderColor: '#ff552e'
      }
    },
    defaultCSS: '.skip-to.popup{position:absolute;top:-30em;left:-3000em}.skip-to,.skip-to.popup.focus{position:absolute;top:0;left:$positionLeft}.skip-to button{position:relative;margin:0;padding:6px 8px 6px 8px;border-width:0 1px 1px 1px;border-style:solid;border-radius:0 0 6px 6px;background-color:$buttonBackgroundColor;border-color:$buttonBorderColor;color:$buttonColor;z-index:1000}.skip-to [role=menu]{position:absolute;min-width:17em;display:none;margin:0;padding:0;background-color:$menuBackgroundColor;border-width:2px;border-style:solid;border-color:$menuBorderColor;border-radius:5px;z-index:1000}.skip-to [role=group]{display:grid;grid-auto-rows:min-content;grid-row-gap:1px}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem]{margin:1px;padding:2px;display:block;width:auto;background-color:$menuitemBackgroundColor;border-width:0;border-style:solid;color:$menuitemColor;z-index:1000;display:grid;overflow-y:auto;grid-template-columns:repeat(6,.85rem) 1fr;grid-column-gap:2px}.skip-to [role=menuitem] .label{margin:0;padding:0}.skip-to [role=menuitem] .level{margin:0;padding:0;color:$menuitemLevelColor}.skip-to [role=menuitem] .label:first-letter,.skip-to [role=menuitem] .level:first-letter{text-decoration:underline;text-transform:uppercase}.skip-to [role=menuitem].action .label{grid-column:1/8}.skip-to [role=menuitem].landmark .label{grid-column:1/8}.skip-to [role=menuitem].heading .level{grid-column:1}.skip-to [role=menuitem].heading .label{grid-column:2/8}.skip-to [role=menuitem].heading .label.skip-to-h2{grid-column:3/8}.skip-to [role=menuitem].heading .label.skip-to-h3{grid-column:4/8}.skip-to [role=menuitem].heading .label.skip-to-h4{grid-column:5/8}.skip-to [role=menuitem].heading .label.skip-to-h5{grid-column:6/8}.skip-to [role=menuitem].heading .label.skip-to-h6{grid-column:7/8}.skip-to [role=separator]{margin:0;padding:4px;display:block;width:auto;font-weight:700;text-align:center;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:$menuitemColor;background-color:$menuitemBackgroundColor;color:$menuitemColor;z-index:1000}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem].last{border-radius:0 0 5px 5px}.skip-to.focus{display:block}.skip-to button:focus,.skip-to button:hover{background-color:$buttonFocusBackgroundColor;color:$buttonFocusColor;outline:0}.skip-to button:focus{padding:4px 7px 5px 7px;border-width:2px 2px 2px 2px;border-color:$buttonFocusBorderColor}.skip-to [role=menuitem]:focus{padding:0;border-width:2px;border-style:solid;border-color:$menuitemFocusBorderColor;background-color:$menuitemFocusBackgroundColor;color:$menuitemFocusColor;outline:0}.skip-to [role=menuitem]:focus .level{color:$menuitemFocusLevelColor}',
    updateStyle: function(stylePlaceholder, value, defaultValue) {
      if (typeof value !== 'string' || value.length === 0) {
        value = defaultValue;
      }
      var index1 = this.defaultCSS.indexOf(stylePlaceholder);
      var index2 = index1 + stylePlaceholder.length;
      while (index1 >= 0 && index2 < this.defaultCSS.length) {
        this.defaultCSS = this.defaultCSS.substring(0, index1) + value + this.defaultCSS.substring(index2);
        index1 = this.defaultCSS.indexOf(stylePlaceholder, index2);
        index2 = index1 + stylePlaceholder.length;
      }
    },
    addCSSColors: function() {
      var theme = this.colorThemes['default'];
      if (typeof this.colorThemes[this.config.colorTheme] === 'object') {
        theme = this.colorThemes[this.config.colorTheme];
      }
      this.updateStyle('$positionLeft', this.config.positionLeft, theme.positionLeft);
      this.updateStyle('$buttonColor', this.config.buttonColor, theme.buttonColor);
      this.updateStyle('$buttonBackgroundColor', this.config.buttonBackgroundColor, theme.buttonBackgroundColor);
      this.updateStyle('$buttonBorderColor', this.config.buttonBorderColor, theme.buttonBorderColor);
      this.updateStyle('$buttonFocusColor', this.config.buttonFocusColor, theme.buttonFocusColor);
      this.updateStyle('$buttonFocusBackgroundColor', this.config.buttonFocusBackgroundColor, theme.buttonFocusBackgroundColor);
      this.updateStyle('$buttonFocusBorderColor', this.config.buttonFocusBorderColor, theme.buttonFocusBorderColor);
      this.updateStyle('$menuBackgroundColor', this.config.menuBackgroundColor, theme.menuBackgroundColor);
      this.updateStyle('$menuBorderColor', this.config.menuBorderColor, theme.menuBorderColor);
      this.updateStyle('$menuitemColor', this.config.menuitemColor, theme.menuitemColor);
      this.updateStyle('$menuitemLevelColor', this.config.menuitemLevelColor, theme.menuitemLevelColor);
      this.updateStyle('$menuitemBackgroundColor', this.config.menuitemBackgroundColor, theme.menuitemBackgroundColor);
      this.updateStyle('$menuitemFocusColor', this.config.menuitemFocusColor, theme.menuitemFocusColor);
      this.updateStyle('$menuitemFocusLevelColor', this.config.menuitemFocusLevelColor, theme.menuitemFocusLevelColor);
      this.updateStyle('$menuitemFocusBackgroundColor', this.config.menuitemFocusBackgroundColor, theme.menuitemFocusBackgroundColor);
      this.updateStyle('$menuitemFocusBorderColor', this.config.menuitemFocusBorderColor, theme.menuitemFocusBorderColor);
    },
    isNotEmptyString: function(str) {
      return (typeof str === 'string') && str.length;
    },
    init: function(config) {
      var attachElement = document.body;
      if (config) {
        this.setUpConfig(config);
      }
      if (typeof this.config.attachElement === 'string') {
        var node = document.querySelector(this.config.attachElement);
        if (node && node.nodeType === Node.ELEMENT_NODE) {
          attachElement = node;
        }
      }
      this.addCSSColors();
      this.addStyleElement(this.defaultCSS);
      this.domNode = document.createElement(this.config.containerElement);
      this.domNode.classList.add('skip-to');
      if (this.isNotEmptyString(this.config.customClass)) {
        this.domNode.classList.add(this.config.customClass);
      }
      if (this.isNotEmptyString(this.config.containerRole)) {
        this.domNode.setAttribute('role', this.config.containerRole);
      }
      if (this.isNotEmptyString(this.config.containerTitleWithAccesskey) &&
        (this.config.accesskey.length === 1)) {
        var title = this.config.containerTitleWithAccesskey.replace('$key', this.config.accesskey);
        this.domNode.setAttribute('title', title);
      } else {
        if (this.isNotEmptyString(this.config.containerTitle)) {
          this.domNode.setAttribute('title', this.config.containerTitle);
        }
      }
      var displayOption = this.config.displayOption;
      if (typeof displayOption === 'string') {
        displayOption = displayOption.trim().toLowerCase();
        if (displayOption.length) {
          switch (this.config.displayOption) {
            case 'popup':
              this.domNode.classList.add('popup');
              break;
            default:
              break;
          }
        }
      }
      // Place skip to at the beginning of the document
      if (attachElement.firstElementChild) {
        attachElement.insertBefore(this.domNode, attachElement.firstElementChild);
      } else {
        attachElement.appendChild(this.domNode);
      }
      this.buttonNode = document.createElement('button');
      this.buttonNode.textContent = this.config.buttonLabel;
      this.buttonNode.setAttribute('aria-haspopup', 'true');
      this.buttonNode.setAttribute('aria-expanded', 'false');
      this.buttonNode.setAttribute('accesskey', this.config.accesskey);
      this.domNode.appendChild(this.buttonNode);
      this.menuNode = document.createElement('div');
      this.menuNode.setAttribute('role', 'menu');
      this.domNode.appendChild(this.menuNode);
      this.buttonNode.addEventListener('keydown', this.handleButtonKeydown.bind(this));
      this.buttonNode.addEventListener('click', this.handleButtonClick.bind(this));
      this.domNode.addEventListener('focusin', this.handleFocusin.bind(this));
      this.domNode.addEventListener('focusout', this.handleFocusout.bind(this));
      window.addEventListener('mousedown', this.handleBackgroundMousedown.bind(this), true);
    },
    setUpConfig: function(appConfig) {
      var localConfig = this.config,
        name,
        appConfigSettings = typeof appConfig.settings !== 'undefined' ? appConfig.settings.skipTo : {};
      for (name in appConfigSettings) {
        //overwrite values of our local config, based on the external config
        if (localConfig.hasOwnProperty(name) &&
          typeof appConfigSettings[name] === 'string' &&
          appConfigSettings[name].length > 0) {
          localConfig[name] = appConfigSettings[name];
        }
      }
    },
    addStyleElement: function(cssString) {
      var styleNode = document.createElement('style');
      var headNode = document.getElementsByTagName('head')[0];
      var css = document.createTextNode(cssString);

      styleNode.setAttribute("type", "text/css");
      styleNode.appendChild(css);
      headNode.appendChild(styleNode);
    },

    // Functions related to creating and populating the
    // the popup menu

    getFirstChar: function(menuitem) {
      var c = '';
      var label = menuitem.querySelector('.label');
      if (label && label.textContent.length) {
        c = label.textContent.trim()[0].toLowerCase();
      }
      return c;
    },

    getHeadingLevel: function(menuitem) {
      var level = '';
      if (menuitem.hasAttribute('data-level')) {
        level = menuitem.getAttribute('data-level');
      }
      return level;
    },

    updateKeyboardShortCuts: function () {
      var mi;
      this.firstChars = [];
      this.headingLevels = [];

      for(var i = 0; i < this.menuitemNodes.length; i += 1) {
        mi = this.menuitemNodes[i];
        console.log('[UpdateKeyboardShortcuts][menuitem]: ' + this.getFirstChar(mi) + ' ' + this.getHeadingLevel(mi) + ' ' + mi.textContent);
        this.firstChars.push(this.getFirstChar(mi));
        this.headingLevels.push(this.getHeadingLevel(mi));
      }
    },

    updateMenuitems: function () {
      var menuitemNodes = this.menuNode.querySelectorAll('[role=menuitem');

      this.menuitemNodes = [];
      console.log('[updateMenuitems]: ' + menuitemNodes.length);
      for(var i = 0; i < menuitemNodes.length; i += 1) {
        this.menuitemNodes.push(menuitemNodes[i]);
      }

      this.firstMenuitem = this.menuitemNodes[0];
      this.lastMenuitem = this.menuitemNodes[this.menuitemNodes.length-1];
      this.lastMenuitem.classList.add('last');
      this.updateKeyboardShortCuts();
    },

    addMenuitemToGroup: function (groupNode, mi) {
      var tagNode, tagNodeChild, labelNode;

      var menuitemNode = document.createElement('div');

      if (mi.class.includes('heading')) {
        tagNode = document.createElement('span');
        tagNodeChild = document.createElement('span');
        tagNodeChild.appendChild(document.createTextNode(mi.tagName.substring(1)));
        tagNode.append(tagNodeChild);
        tagNode.appendChild(document.createTextNode(':'));
        tagNode.classList.add('level');
        menuitemNode.append(tagNode);
        menuitemNode.setAttribute('data-level', mi.tagName.substring(1));
      }

      labelNode = document.createElement('span');
      labelNode.appendChild(document.createTextNode(mi.name));
      labelNode.classList.add('label');
      if (mi.tagName && mi.tagName.length) {
        labelNode.classList.add('skip-to-' + mi.tagName);
      }
      menuitemNode.append(labelNode);

      menuitemNode.setAttribute('role', 'menuitem');
      menuitemNode.classList.add(mi.class);
      menuitemNode.setAttribute('data-id', mi.dataId);
      menuitemNode.tabIndex = -1;

      // add event handlers
      menuitemNode.addEventListener('keydown', this.handleMenuitemKeydown.bind(this));
      menuitemNode.addEventListener('click', this.handleMenuitemClick.bind(this));
      menuitemNode.addEventListener('mouseover', this.handleMenuitemMouseover.bind(this));

      groupNode.appendChild(menuitemNode);
    },

    addMenuitemsToGroup: function(groupNode, menuitems, msgNoItemsFound) {
      var len = menuitems.length;
      groupNode.innerHTML = '';

      if (menuitems.length === 0) {
        var item = {};
        item.name = msgNoItemsFound;
        item.tagName = 'notag';
        item.role = '';
        item.class = 'noitems';
        item.dataId = '';
        this.addMenuitem(groupNode, item);
      }
      else {
        for (var i = 0; i < len; i += 1) {
          this.addMenuitemToGroup(groupNode, menuitems[i]);
        }
      }
    },

    addMenuitemGroup: function(groupId, title) {
      var labelNode, groupNode;
      var menuNode = this.menuNode;
      if (title) {
        labelNode = document.createElement('div');
        labelNode.setAttribute('role', 'separator');
        labelNode.textContent = title;
        menuNode.appendChild(labelNode);
        groupNode = document.createElement('div');
        groupNode.setAttribute('role', 'group');
        groupNode.setAttribute('aria-label', title);
        groupNode.id = groupId;
        menuNode.appendChild(groupNode);
        menuNode = groupNode;
      }
      return groupNode;
    },

    addActionMoreHeadings: function(groupNode, label) {
      var item = {};
      item.name = label;
      item.tagName = 'action';
      item.role = 'menuitem';
      item.class = 'action';
      item.dataId = 'skip-to-more-headings';
      this.addMenuitemToGroup(groupNode, item);
    },


    updateHeadingGroupMenuitems: function(level) {
      if (typeof level !== 'number') {
        level = 6;
      }

      var selector = 'h1';
      switch (level) {
        case 2:
          selector = 'h1, h2';
          break;

        case 3:
          selector = 'h1, h2, h3';
          break;

        case 4:
          selector = 'h1, h2, h3, h4';
          break;

        case 5:
          selector = 'h1, h2, h3, h4, h5';
          break;

        case 6:
        default:
          selector = 'h1, h2, h3, h4, h5, h6';
          break;
      }

      var headings = this.getHeadings(selector);
      var groupNode = document.getElementById('id-skip-to-group-headings');
      this.addMenuitemsToGroup(groupNode, headings, this.config.msgNoHeadingsFound);
      this.updateMenuitems();

      // Move focus to first heading menuitem
      if (groupNode.firstElementChild) {
        groupNode.firstElementChild.focus();
      }
    },

    createMenu: function() {
      var groupNode, landmarkElems, headingElems;
      // remove current menu items from menu
      while (this.menuNode.lastElementChild) {
        this.menuNode.removeChild(this.menuNode.lastElementChild);
      }

      // initialize menu variables
      this.skipToIdIndex = 1;

      // Update landmarks
      landmarkElems = this.getLandmarks();
      groupNode = this.addMenuitemGroup('id-skip-to-group-landmarks', this.config.landmarkGroupLabel);
      this.addMenuitemsToGroup(groupNode, landmarkElems, this.config.msgNoLandmarksFound);

      // Update headings
      headingElems = this.getHeadings();
      console.log('[updateMenuitems][headingElems]: ' + headingElems.length);
      groupNode = this.addMenuitemGroup('id-skip-to-group-headings', this.config.headingGroupLabel);
      this.addMenuitemsToGroup(groupNode, headingElems, this.config.msgNoHeadingsFound);

      // Update actions
      groupNode = this.addMenuitemGroup('id-skip-to-group-actions', this.config.actionGroupLabel);
      this.addActionMoreHeadings(groupNode, this.config.actionMoreHeadingsLabel);

      // Update list of menuitems
      this.updateMenuitems();
    },

    // Menu scripting event utilities

    setFocusToMenuitem: function(menuitem) {
      if (menuitem) {
        menuitem.focus();
      }
    },

    setFocusToFirstMenuitem: function() {
      this.setFocusToMenuitem(this.firstMenuitem);
    },

    setFocusToLastMenuitem: function() {
      this.setFocusToMenuitem(this.lastMenuitem);
    },

    setFocusToPreviousMenuitem: function(menuitem) {
      var newMenuitem, index;
      if (menuitem === this.firstMenuitem) {
        newMenuitem = this.lastMenuitem;
      } else {
        index = this.menuitemNodes.indexOf(menuitem);
        newMenuitem = this.menuitemNodes[index - 1];
      }
      this.setFocusToMenuitem(newMenuitem);
      return newMenuitem;
    },

    setFocusToNextMenuitem: function(menuitem) {
      var newMenuitem, index;
      if (menuitem === this.lastMenuitem) {
        newMenuitem = this.firstMenuitem;
      } else {
        index = this.menuitemNodes.indexOf(menuitem);
        newMenuitem = this.menuitemNodes[index + 1];
      }
      this.setFocusToMenuitem(newMenuitem);
      return newMenuitem;
    },

    setFocusByFirstCharacter: function(menuitem, char) {
      var start, index;
      if (char.length > 1) {
        return;
      }
      char = char.toLowerCase();

      // Get start index for search based on position of currentItem
      start = this.menuitemNodes.indexOf(menuitem) + 1;
      if (start >= this.menuitemNodes.length) {
        start = 0;
      }

      // Check remaining items in the menu
      index = this.firstChars.indexOf(char, start);

      // If not found in remaining items, check headings
      if (index === -1) {
        index = this.headingLevels.indexOf(char, start);
      }

      // If not found in remaining items, check from beginning
      if (index === -1) {
        index = this.firstChars.indexOf(char, 0);
      }

      // If not found in remaining items, check headings from beginning
      if (index === -1) {
        index = this.headingLevels.indexOf(char, 0);
      }

      // If match was found...
      if (index > -1) {
        this.setFocusToMenuitem(this.menuitemNodes[index]);
      }
    },

    // Utilities
    getIndexFirstChars: function(startIndex, char) {
      for (var i = startIndex; i < this.firstChars.length; i += 1) {
        if (char === this.firstChars[i]) {
          return i;
        }
      }
      return -1;
    },
    // Popup menu methods
    openPopup: function() {
      this.createMenu();
      this.menuNode.style.display = 'block';
      this.buttonNode.setAttribute('aria-expanded', 'true');
    },

    closePopup: function() {
      if (this.isOpen()) {
        this.buttonNode.setAttribute('aria-expanded', 'false');
        this.menuNode.style.display = 'none';
      }
    },
    isOpen: function() {
      return this.buttonNode.getAttribute('aria-expanded') === 'true';
    },
    // Menu event handlers
    handleFocusin: function() {
      this.domNode.classList.add('focus');
    },
    handleFocusout: function() {
      this.domNode.classList.remove('focus');
    },
    handleButtonKeydown: function(event) {
      var key = event.key,
        flag = false;
      switch (key) {
        case ' ':
        case 'Enter':
        case 'ArrowDown':
        case 'Down':
          this.openPopup();
          this.setFocusToFirstMenuitem();
          flag = true;
          break;
        case 'Esc':
        case 'Escape':
          this.closePopup();
          this.buttonNode.focus();
          flag = true;
          break;
        case 'Up':
        case 'ArrowUp':
          this.openPopup();
          this.setFocusToLastMenuitem();
          flag = true;
          break;
        default:
          break;
      }
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    handleButtonClick: function(event) {
      if (this.isOpen()) {
        this.closePopup();
        this.buttonNode.focus();
      } else {
        this.openPopup();
        this.setFocusToFirstMenuitem();
      }
      event.stopPropagation();
      event.preventDefault();
    },
    skipToElement: function(menuitem) {
      var inputNode = false;
      var isSearch = menuitem.classList.contains('skip-to-search');
      var node = document.querySelector('[data-skip-to-id="' + menuitem.getAttribute('data-id') + '"]');
      if (node) {
        if (isSearch) {
          inputNode = node.querySelector('input');
        }
        if (inputNode && this.isVisible(inputNode)) {
          inputNode.focus();
        }
        else {
          node.tabIndex = -1;
          node.focus();
        }
      }
    },
    handleMenuitemKeydown: function(event) {
      var tgt = event.currentTarget,
        key = event.key,
        flag = false;

      function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      }
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }
      if (event.shiftKey) {
        if (isPrintableCharacter(key)) {
          this.setFocusByFirstCharacter(tgt, key);
          flag = true;
        }
        if (event.key === 'Tab') {
          this.buttonNode.focus();
          this.closePopup();
          flag = true;
        }
      } else {
        switch (key) {
          case 'Enter':
          case ' ':
            switch (tgt.getAttribute('data-id')) {
              case 'skip-to-more-headings':
                this.updateHeadingGroupMenuitems(4);
                break;

              default:
                this.closePopup();
                this.skipToElement(tgt);
                break;
            }
            flag = true;
            break;
          case 'Esc':
          case 'Escape':
            this.closePopup();
            this.buttonNode.focus();
            flag = true;
            break;
          case 'Up':
          case 'ArrowUp':
            this.setFocusToPreviousMenuitem(tgt);
            flag = true;
            break;
          case 'ArrowDown':
          case 'Down':
            this.setFocusToNextMenuitem(tgt);
            flag = true;
            break;
          case 'Home':
          case 'PageUp':
            this.setFocusToFirstMenuitem();
            flag = true;
            break;
          case 'End':
          case 'PageDown':
            this.setFocusToLastMenuitem();
            flag = true;
            break;
          case 'Tab':
            this.closePopup();
            break;
          default:
            if (isPrintableCharacter(key)) {
              this.setFocusByFirstCharacter(tgt, key);
              flag = true;
            }
            break;
        }
      }
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    handleMenuitemClick: function(event) {
      var tgt = event.currentTarget;
      switch (tgt.getAttribute('data-id')) {
        case 'skip-to-more-headings':
          this.updateHeadingGroupMenuitems(5);
          break;

        default:
          this.closePopup();
          this.skipToElement(tgt);
          break;

      }
      event.stopPropagation();
      event.preventDefault();
    },
    handleMenuitemMouseover: function(event) {
      var tgt = event.currentTarget;
      tgt.focus();
    },
    handleBackgroundMousedown: function(event) {
      if (!this.domNode.contains(event.target)) {
        if (this.isOpen()) {
          this.closePopup();
          this.buttonNode.focus();
        }
      }
    },
    // methods to extract lanndmarks, headings and ids
    normalizeName: function(name) {
      if (typeof name === 'string') return name.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      return "";
    },
    getTextContent: function(elem) {
      function getText(e, strings) {
        // If text node get the text and return
        if (e.nodeType === Node.TEXT_NODE) {
          strings.push(e.data);
        } else {
          // if an element for through all the children elements looking for text
          if (e.nodeType === Node.ELEMENT_NODE) {
            // check to see if IMG or AREA element and to use ALT content if defined
            var tagName = e.tagName.toLowerCase();
            if ((tagName === 'img') || (tagName === 'area')) {
              if (e.alt) {
                strings.push(e.alt);
              }
            } else {
              var c = e.firstChild;
              while (c) {
                getText(c, strings);
                c = c.nextSibling;
              } // end loop
            }
          }
        }
      } // end function getStrings
      // Create return object
      var str = "Test",
        strings = [];
      getText(elem, strings);
      if (strings.length) str = strings.join(" ");
      if (str.length > 30) str = str.substring(0, 27) + "...";
      return str;
    },
    getAccessibleName: function(elem) {
      var labelledbyIds = elem.getAttribute('aria-labelledby'),
        label = elem.getAttribute('aria-label'),
        title = elem.getAttribute('title'),
        name = "";
      if (labelledbyIds && labelledbyIds.length) {
        var str,
          strings = [],
          ids = labelledbyIds.split(' ');
        if (!ids.length) ids = [labelledbyIds];
        for (var i = 0, l = ids.length; i < l; i += 1) {
          var e = document.getElementById(ids[i]);
          if (e) str = this.getTextContent(e);
          if (str.length) strings.push(str);
        }
        name = strings.join(" ");
      } else {
        if (label && label.length) {
          name = label;
        } else {
          if (title && title.length) {
            name = title;
          }
        }
      }
      return name;
    },
    isVisible: function(element) {
      function isVisibleRec(el) {
        if (el.nodeType === 9) return true; /*IE8 does not support Node.DOCUMENT_NODE*/
        var computedStyle = window.getComputedStyle(el);
        var display = computedStyle.getPropertyValue('display');
        var visibility = computedStyle.getPropertyValue('visibility');
        var hidden = el.getAttribute('hidden');
        if ((display === 'none') ||
          (visibility === 'hidden') ||
          (hidden !== null)) {
          return false;
        }
        return isVisibleRec(el.parentNode);
      }
      return isVisibleRec(element);
    },
    getHeadings: function(targets) {
      var dataId;
      if (typeof targets !== 'string') {
        targets = this.config.headings;
      }
      var headingElementsArr = [];
      if (typeof targets !== 'string' || targets.length === 0) return;
      console.log('[getHeadings][targets]: ' + targets);
      var headings = document.querySelectorAll(targets);
      console.log('[getHeadings][headings]: ' + headings.length);
      for (var i = 0, j = 0, len = headings.length; i < len; i += 1) {
        var heading = headings[i];
        var role = heading.getAttribute('role');
        if ((typeof role === 'string') && (role === 'presentation')) continue;
        if (this.isVisible(heading)) {
          if (heading.hasAttribute('data-skip-to-id')) {
            dataId = heading.getAttribute('data-skip-to-id');
          } else {
            heading.setAttribute('data-skip-to-id', this.skipToIdIndex);
            dataId = this.skipToIdIndex;
          }
          var headingItem = {};
          headingItem.dataId = dataId.toString();
          headingItem.class = 'heading';
          headingItem.name = this.getTextContent(heading);
          headingItem.tagName = heading.tagName.toLowerCase();
          headingItem.role = 'heading';
          headingElementsArr.push(headingItem);
          j += 1;
          this.skipToIdIndex += 1;
        }
      }
      return headingElementsArr;
    },
    getLocalizedLandmarkName: function(tagName, name) {
      var n;
      switch (tagName) {
        case 'aside':
          n = this.config.asideLabel;
          break;
        case 'footer':
          n = this.config.footerLabel;
          break;
        case 'form':
          n = this.config.formLabel;
          break;
        case 'header':
          n = this.config.headerLabel;
          break;
        case 'main':
          n = this.config.mainLabel;
          break;
        case 'nav':
          n = this.config.navLabel;
          break;
        case 'search':
          n = this.config.searchLabel;
          break;
          // When an ID is used as a selector, assume for main content
        default:
          n = this.config.mainLabel;
          break;
      }
      if (this.isNotEmptyString(name)) {
        n += ': ' + name;
      }
      return n;
    },
    getLandmarks: function() {
      var targets = this.config.landmarks;
      if (typeof targets !== 'string' || targets.length === 0) return;
      var landmarks = document.querySelectorAll(targets);
      var mainElems = [];
      var searchElems = [];
      var navElems = [];
      var asideElems = [];
      var footerElems = [];
      var otherElems = [];
      var dataId = '';
      for (var i = 0, j = 0, len = landmarks.length; i < len; i = i + 1) {
        var landmark = landmarks[i];
        // if skipto is a landmark don't include it in the list
        if (landmark === this.domNode) {
          continue;
        }
        var role = landmark.getAttribute('role');
        var tagName = landmark.tagName.toLowerCase();
        if ((typeof role === 'string') && (role === 'presentation')) continue;
        if (this.isVisible(landmark)) {
          if (!role) role = landmark.tagName.toLowerCase();
          var name = this.getAccessibleName(landmark);
          if (typeof name !== 'string') {
            name = '';
          }
          // normalize tagNames
          switch (role) {
            case 'banner':
              tagName = 'header';
              break;
            case 'complementary':
              tagName = 'aside';
              break;
            case 'contentinfo':
              tagName = 'footer';
              break;
            case 'form':
              tagName = 'form';
              break;
            case 'main':
              tagName = 'main';
              break;
            case 'navigation':
              tagName = 'nav';
              break;
            case 'search':
              tagName = 'search';
              break;
            default:
              break;
          }
          // if using ID for selectQuery give tagName as main
          if (['aside', 'footer', 'form', 'header', 'main', 'nav', 'search'].indexOf(tagName) < 0) {
            tagName = 'main';
          }
          if (landmark.hasAttribute('data-skip-to-id')) {
            dataId = landmark.getAttribute('data-skip-to-id');
          } else {
            landmark.setAttribute('data-skip-to-id', this.skipToIdIndex);
            dataId =  this.skipToIdIndex;
          }
          var landmarkItem = {};
          landmarkItem.dataId = dataId.toString();
          landmarkItem.class = 'landmark';
          landmarkItem.name = this.getLocalizedLandmarkName(tagName, name);
          landmarkItem.tagName = tagName;
          j += 1;
          this.skipToIdIndex += 1;
          // For sorting landmarks into groups
          switch (tagName) {
            case 'main':
              mainElems.push(landmarkItem);
              break;
            case 'search':
              searchElems.push(landmarkItem);
              break;
            case 'nav':
              navElems.push(landmarkItem);
              break;
            case 'aside':
              asideElems.push(landmarkItem);
              break;
            case 'footer':
              footerElems.push(landmarkItem);
              break;
            default:
              otherElems.push(landmarkItem);
              break;
          }
        }
      }
      return [].concat(mainElems, searchElems, navElems, asideElems, footerElems, otherElems);
    }
  };
  // Initialize skipto menu button with onload event
  window.addEventListener('load', function() {
    SkipTo.init(window.SkipToConfig || window.Drupal || window.Wordpress || {});
    console.log('SkipTo loaded...');
  });
})();
/*@end @*/
