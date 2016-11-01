"use strict";

function getElementWidth(element) {
    if (element !== null && typeof element === "object") {
        return parseInt(element.getBoundingClientRect().right - element.getBoundingClientRect().left);
    }
    else return false;
}
function getElementHeight (element) {
    if (element !== null && typeof element === "object") {
        return parseInt(element.getBoundingClientRect().bottom - element.getBoundingClientRect().top);
    }
    else return false;
}
function addCardsImagesToHtml() {
    for (let card in CARDS) {
        if (CARDS.hasOwnProperty(card)) {
            let hiddenDiv = document.getElementById("hidden_cards_img");
            let image = document.createElement("img");
            image.id = card;
            image.src = CARDS[card].src;
            hiddenDiv.appendChild(image);
        }
    }
}
function getCardsNames() {
    return Object.keys(CARDS);
}