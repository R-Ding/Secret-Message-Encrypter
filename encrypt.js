/**
 * A1: Secret Message Encrypter
 * CS 11 JS Winter 2021
 */

"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Sets up the event handlers for the encryption program.
   *   - When the #encrypt button is clicked, the value of #input-text
   *     is encoded using the currently-selected cipher type (#cipher-type)
   *     and the result is displayed in the #result paragraph.
   *   - When the #reset button is clicked, the #input-text textarea and #result
   *     are both cleared.
   *   - When either radio button is changed, the result text is updated with
   *     the currently-selected font size.
   */
  function init() { 
    console.log("Page loaded!");
   
    let encryptButton = id('encrypt');
    encryptButton.addEventListener('click', generateCipher);
    
    let resetButton = id('reset');
    resetButton.addEventListener('click', reset);

    let caps = id('all-caps');
    caps.addEventListener('change', checkBoxes);

    let radioButtons = qsa("input[name='text-size']");
    radioButtons[0].addEventListener('change', updateFontSize);
    radioButtons[1].addEventListener('change', updateFontSize);
  }

  /**
   * Shifts each letter in a string alphabetically by 1 letter, and each digit up one.
   *
   * @param {String} text - input text to encode with a single-letter/digit shift cipher
   * @return {String} - encoded text, maintaining letter-casing and ignoring 
   * non-alphabetical characters or characters outside of the digits 0-9.
   */
  function shiftCipher(text) { 
    let output = '';
    for (let i = 0; i < text.length; i++) {
      let c = text.charCodeAt(i);
      if (isUpperCaseLetter(c)) {
        output += String.fromCharCode(((c - 65 + 1) % 26) + 65);
      } else if (isLowerCaseLetter(c)) {
        output += String.fromCharCode(((c - 97 + 1) % 26) + 97);
      } else if (isDigit(c)) {
        output += String.fromCharCode(((c - 48 + 1) % 10) + 48);
      } else {
        output += String.fromCharCode(c);
      }
    }
    return output;
  }

  /**
   * Generates a random mapping of letters (upper and lowercase) and digits.
   * No characters map to the same character (one to one mapping).
   *
   * @param {String} text - input text to encode 
   * @return {String} - encoded text, maintaining letter-casing and 
   * ignoring non-alphabetical characters.
   */
  function customCipher(text) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let unused = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let map = {};
    let upperLen = 26;
    let lowerLen = 26;
    let digitLen = 10;
    for(let i = 0; i < alphabet.length; i++) {
      let element = alphabet.charCodeAt(i);
      let l = '';
      
      if (isUpperCaseLetter(element)) {
        l = unused.charAt(Math.floor(Math.random() * (upperLen-1)));
        upperLen--;
      } else if (isLowerCaseLetter(element)) {
        l = unused.charAt(Math.floor(Math.random() * (lowerLen-1)) + upperLen);
        lowerLen--;
      } else if (isDigit) {
        l = unused.charAt((Math.floor(Math.random() * (digitLen-1))) + upperLen + lowerLen);
        digitLen--;
      }
      map[element] = l;
      unused = unused.replace(l,'');
    }

    let output = '';
    for (let j = 0; j < text.length; j++) {
      let c = text.charCodeAt(j);
      if (isUpperCaseLetter(c) || isLowerCaseLetter(c) || isDigit(c)) {
        output += map[c];
      } else {
        output += String.fromCharCode(c);
      }
    }
    return output;
  }

  /**
   * Gets the current value of the #result textarea and currently-selected cipher text,
   * calls the corresponding cipher function, and uses the resulting encoded string
   * to update the #result textarea.
   */
  function generateCipher() { 
    let input = id('input-text');
    let cipherType = id('cipher-type').value;
    let output = '';
    let result = id('result');
    if (cipherType == 'shift') {
      output = shiftCipher(input.value);
    } else {
      output = customCipher(input.value);
    }
    result.innerHTML = output;
  }

  /**
   * Clears both the textarea and the #result paragraph.
   */
  function reset() {
    let input = id('input-text');
    input.value = '';
    let result = id('result');
    result.innerHTML = '';
  }

  /**
   * Adds the .uppercase class to #result if the checkbox is checked, remove the .uppercase
   * class from #result otherwise.
   */
  function checkBoxes() {
    let result = id('result');
    let caps = id('all-caps')
    if (caps.checked) {
      result.classList.add('uppercase');
    } else {
      result.classList.remove('uppercase');
    }
  }

  /**  
   * Updates the font size of #result paragraph based on the value of the selected radio button. 
   */

  function updateFontSize() {
    let result = id('result');
    let radioButtons = qsa("input[name='text-size']");
    if (radioButtons[0].checked) {
      result.style.fontSize = radioButtons[0].value
    } else {
      result.style.fontSize = radioButtons[1].value
    }
  }

  /* Helper Functions */
  function id(idName) {
    return document.getElementById(idName);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function isUpperCaseLetter(c) {
    return c >= 65 && c <= 90;
  }

  function isLowerCaseLetter(c) {
    return c >= 97 && c <= 122;
  }

  function isDigit(c) {
    return c >= 48 && c <= 57;
  }

})();
