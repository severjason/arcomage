"use strict";

document.addEventListener('DOMContentLoaded', function () {

    let arcomageDiv = document.getElementById("arcomage");

    let canvas = new fabric.Canvas("arcomage_canvas");
    let canvasWidth = getElementWidth(arcomageDiv);
    let canvasHeight = getElementHeight(arcomageDiv);
    canvas.setDimensions({width: canvasWidth, height: canvasHeight});


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

        let padding = 5;
        let cardsValues = {
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

        for (let i = 0, cardsArrayLength = getCardsNames().length; i < cardsArrayLength; i++) {

            let cardName = getCardsNames()[i];
            let card = CARDS[cardName];
            //let img = document.getElementById(cardName);
            let descriptionLength = card.description.length;

            let mainBody = new fabric.Rect({
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
            let mainText = new fabric.Text(card.text["ru"], {
                fontSize: 14,
                width: 150,
                left: -140,
                top: 115,
                fill: cardsValues[card.type].textColor
            });
            let descriptionText = new fabric.Text(card.description, {
                fontSize: 16,
                width: 150,
                left: -140,
                top: 5,
                fill: cardsValues[card.type].textColor,
                textAlign: "center"
            });
            let priceText = new fabric.Text(card.price[cardsValues[card.type].price].toString(), {
                fontSize: 18,
                left: -22,
                top: 174,
                fill: cardsValues[card.type].textColor
            });
            let circle = new fabric.Circle({
                radius: 12,
                fill: cardsValues[card.type].color,
                stroke: cardsValues[card.type].textColor,
                strokeWidth: 1,
                left: -30,
                top: 171
            });

            let img = new Image();
            img.src = card.src;
            let image = new fabric.Image(img, {
                left: -120,
                top: 30
            });

            let group = new fabric.Group([mainBody, descriptionText, image, mainText, circle, priceText], {
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

