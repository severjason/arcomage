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
