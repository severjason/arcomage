"use strict";

document.addEventListener('DOMContentLoaded', function () {

    var arcomageDiv = document.getElementById("arcomage");

    var canvas = new fabric.Canvas("arcomage_canvas");
    var canvasWidth = getElementWidth(arcomageDiv);
    var canvasHeight = getElementHeight(arcomageDiv);
    canvas.setDimensions({ width: canvasWidth, height: canvasHeight });

    /*let loadImages = new Promise(function (resolve, reject) {
        let imagesArray = [];
         for (let i = 0, cardsArrayLength = getCardsNames().length; i < cardsArrayLength; i++) {
            let img = new Image();
            img.src = CARDS[getCardsNames()[i]].src;
            img.onload = function () {
                imagesArray.push(img);
            };
        }
        resolve(imagesArray);
    });*/

    function drawCards() {

        var padding = 5;
        var cardsValues = {
            "red": {
                "color": "#e74c3c",
                "textColor": "#34495e",
                "price": "bricks"
            },
            "blue": {
                "color": "#3498db",
                "textColor": "#34495e",
                "price": "gems"
            },
            "green": {
                "color": "#1abc9c",
                "textColor": "#34495e",
                "price": "beasts"
            }
        };

        var _loop = function _loop(i, cardsArrayLength) {

            var cardName = getCardsNames()[i];
            var card = CARDS[cardName];
            //let img = document.getElementById(cardName);
            var descriptionLength = card.description.length;

            var mainBody = new fabric.Rect({
                width: 150,
                height: 200,
                fill: cardsValues[card.type].color,
                stroke: cardsValues[card.type].textColor,
                strokeWidth: 1,
                rx: 3,
                ry: 3,
                originX: 'right',
                originY: 'top'
            });
            var mainText = new fabric.Text(card.text["ru"], {
                fontSize: 14,
                width: 150,
                left: -140,
                top: 115,
                fill: cardsValues[card.type].textColor
            });
            var descriptionText = new fabric.Text(card.description, {
                fontSize: 16,
                width: 150,
                left: -140,
                top: 5,
                fill: cardsValues[card.type].textColor,
                textAlign: "center"
            });
            var priceText = new fabric.Text(card.price[cardsValues[card.type].price].toString(), {
                fontSize: 18,
                left: -22,
                top: 174,
                fill: cardsValues[card.type].textColor
            });
            var circle = new fabric.Circle({
                radius: 12,
                fill: cardsValues[card.type].color,
                stroke: cardsValues[card.type].textColor,
                strokeWidth: 1,
                left: -30,
                top: 171
            });

            var img = new Image();
            img.src = card.src;
            var image = new fabric.Image(img, {
                left: -120,
                top: 30
            });

            var group = new fabric.Group([mainBody, descriptionText, image, mainText, circle, priceText], {
                left: padding,
                top: canvasHeight - mainBody.getHeight() - 2 * padding,
                selectable: true,
                hoverCursor: "pointer"
            });

            group.on('mousedown', function () {
                console.log('mousedown');
            });
            group.on('mouseover', function () {
                console.log('mouseover');
                group.top -= 5;
                canvas.renderAll();
            });
            group.on('mouseout', function () {
                console.log('mouseout');
                group.top += 5;
                canvas.renderAll();
            });

            CARDS[cardName].object = group;
        };

        for (var i = 0, cardsArrayLength = getCardsNames().length; i < cardsArrayLength; i++) {
            _loop(i, cardsArrayLength);
        }
    }
    //addCardsImagesToHtml();
    drawCards();
    //console.log(CARDS);
    //canvas.add(CARDS["amethyst"].object);
    //canvas.renderAll();

    canvas.add(CARDS["amethyst"].object);
    canvas.add(CARDS["great_wall"].object);
    canvas.add(CARDS["werewolf"].object);
});

//# sourceMappingURL=canvas-compiled.js.map