"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function getElementWidth(element) {
    if (element !== null && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object") {
        return parseInt(element.getBoundingClientRect().right - element.getBoundingClientRect().left);
    } else return false;
}
function getElementHeight(element) {
    if (element !== null && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object") {
        return parseInt(element.getBoundingClientRect().bottom - element.getBoundingClientRect().top);
    } else return false;
}
function addCardsImagesToHtml() {
    for (var card in CARDS) {
        if (CARDS.hasOwnProperty(card)) {
            var hiddenDiv = document.getElementById("hidden_cards_img");
            var image = document.createElement("img");
            image.id = card;
            image.src = CARDS[card].src;
            hiddenDiv.appendChild(image);
        }
    }
}
function getCardsNames() {
    return Object.keys(CARDS);
}

//# sourceMappingURL=functions-compiled.js.map