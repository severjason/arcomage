"use strict";

class Canvas {

    constructor(containerId, canvasId) {

        this.divId = containerId;
        this.ID = canvasId;
        this.canvas = new fabric.Canvas(canvasId, {
            selection: false
        });
        this.promises = {
            cardsImages :[],
            sourcesImages :[]
        };
    }

    get width() {
        let element = document.getElementById(this.divId);
        return parseInt(element.getBoundingClientRect().right - element.getBoundingClientRect().left, 10);
    }

    get height() {
        let element = document.getElementById(this.divId);
        return parseInt(element.getBoundingClientRect().bottom - element.getBoundingClientRect().top, 10);
    }

    get fabricElement() {
        return this.canvas;
    }

    get cardsImagesLoaded() {
        return this.promises.cardsImages;
    }

    get sourcesImagesLoaded() {
        return this.promises.sourcesImages;
    }

    setCanvasDimensions(width = this.width, height = this.height) {
        this.fabricElement.setDimensions({
            width: width,
            height: height
        })
    }

    createCards(CARDS, cardsValues) {
        let that = this;
        let padding = 5;
        //let cardsPerPlayer = 5;
        let cardWidth = 150;//(this.width >= 800) ? 150 : parseInt(this.width / cardsPerPlayer - 2 * padding, 10);
        let cardHeight = parseInt(cardWidth * 1.4, 10);

        let cardsNames = CARDS.names;

        for (let i = 0, cardsArrayLength = cardsNames.length; i < cardsArrayLength; i++) {

            let cardName = cardsNames[i];
            let card = CARDS.all[cardName];
            let descriptionFontSize = (card.description.length >= 15) ? 14 : 16;
            let mainTextFontSize = (card.text["ru"].length >= 15) ? 14 : 16;
            let cardPrice = card.price[cardsValues[card.type].price];
            let circleRadius = 12;

            let mainBody = new fabric.Rect({
                width: cardWidth,
                height: cardHeight,
                fill: cardsValues[card.type].color,
                /*stroke: cardsValues[card.type].textColor,
                strokeWidth: 1,*/
                rx: 2,
                ry: 2,
                originX: 'right',
                originY: 'top'
            });
            let mainText = new fabric.Textbox(card.text["ru"], {
                fontSize: mainTextFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: cardHeight / 2,
                fill: cardsValues[card.type].textColor,
                editable: false,
                textAlign: "center"
            });
            let descriptionText = new fabric.Textbox(card.description, {
                fontSize: descriptionFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: padding,
                fill: cardsValues[card.type].textColor,
                editable: false,
                textAlign: "center"
            });
            let priceText = new fabric.Textbox(cardPrice.toString(), {
                fontSize: 18,
                lineHeight: 18,
                width: circleRadius * 2,
                height: circleRadius * 2,
                left: -circleRadius * 2 - padding,
                top: cardHeight - circleRadius * 2 - padding,
                fill: cardsValues[card.type].textColor,
                editable: false,
                textAlign: "center"
            });
            let circle = new fabric.Circle({
                radius: circleRadius,
                fill: cardsValues[card.type].color,
                stroke: cardsValues[card.type].textColor,
                strokeWidth: 1,
                left: -30,
                top: cardHeight - 31
            });


            let loadImage = new Promise(function (resolve, reject) {

                let img = new Image();
                img.src = card.src;


                img.onload = function () {

                    let imgWidth = (cardWidth >= 90) ? 90 : cardWidth - 2 * padding;

                    let image = new fabric.Image(img, {
                        width: imgWidth,
                        height: parseInt(imgWidth / 1.5, 10),
                        left: -parseInt((imgWidth + cardWidth) / 2, 10),
                        top: 30
                    });
                    let group = new fabric.Group([mainBody, descriptionText, image, mainText, circle, priceText], {
                        left: padding,
                        top: that.fabricElement.height - mainBody.getHeight() - 2 * padding,
                        selectable: true,
                        hasBorders:false,
                        subTargetCheck: true,
                        hoverCursor: "pointer"
                    });

                    group.on('mousedown', function () {
                        console.log('mousedown');
                    });
                    group.on('mouseover', function () {
                        console.log('mouseover');
                        group.top -= 5;
                        that.fabricElement.renderAll();
                    });
                    group.on('mouseout', function () {
                        console.log('mouseout');
                        group.top += 5;
                        that.fabricElement.renderAll();
                    });

                    CARDS.all[cardName].object = group;

                    resolve("Images loaded");

                    reject(new Error("Can`t load cards images"));

                };

            });
            that.cardsImagesLoaded.push(loadImage);
        }
        
    } //createCards(CARDS);
    
    createNames(playerOneName, playerTwoName, canvasValues) {

        function getText(text) {

            return new fabric.Textbox(text, {
                fontSize: canvasValues.playersNamesText.fontSize,
                width: canvasValues.playersNamesText.width,
                padding: canvasValues.playersNamesText.padding,
                fontWeight: 'bold',
                textAlign: "center",
                originX: 'right',
                originY: 'top'
            });
        }
        function getMainBody() {
            return new fabric.Rect({
                width: canvasValues.playersNamesText.width,
                height: canvasValues.playersNamesText.height,
                fill:false,
                stroke: "black",
                strokeWidth: 1,
                rx: 3,
                ry: 3,
                originX: 'right',
                originY: 'top'
            });
        }

        let playerOneText = getText(playerOneName);
        let playerTwoText = getText(playerTwoName);

        let groupForPlayerOne = new fabric.Group([getMainBody(), playerOneText], {
            left: 0,
            top:0,
            editable: false,
            selectable: false,
            hoverCursor: "default"
        });

        let groupForPlayerTwo = new fabric.Group([getMainBody(), playerTwoText], {
            left: this.width - canvasValues.playersNamesText.width - 2 * canvasValues.playersNamesText.padding,
            top:0,
            editable: false,
            selectable: false,
            hoverCursor: "default"
        });
        
        this.canvas.add(groupForPlayerOne);
        this.canvas.add(groupForPlayerTwo);
    } // createNames(playerOneName, playerTwoName, cardsValues)

    createSources(playerOne, playerTwo, canvasValues, cardsValues) {

        let that = this;

        let loadImage = new Promise(function (resolve, reject) {


            let img = new Image();
            img.src = canvasValues.sources.mine.src;


            img.onload = function () {

                let imgWidth = img.width;

                let image = new fabric.Image(img, {
                    left: parseInt(canvasValues.sources.width - imgWidth, 10),
                    top: 0
                });

                let mineBody = new fabric.Rect({
                    width: canvasValues.sources.width,
                    height: canvasValues.sources.height,
                    fill:cardsValues.red.color,
                    rx: 1,
                    ry: 1,
                    originX: 'left',
                    originY: 'top'
                });
                let mineValue = new fabric.Textbox(playerOne.sources.mine.toString(), {
                    left:0,
                    top:0,
                    fontWeight: 'bold',
                    textAlign: "center",
                    originX: 'left',
                    originY: 'top'
                });

                let group = new fabric.Group([mineBody, image, mineValue], {
                    left:canvasValues.sources.padding,
                    top:5 * canvasValues.sources.padding,
                    selectable: false,
                    hasBorders:false,
                    hoverCursor: "default"
                });



                function addObjects() {
                    playerOne.sourcesObject.mine = group;
                    that.canvas.add(group);
                }
                resolve(addObjects());

                reject(new Error("Can`t load images"));

            };

        });
        that.sourcesImagesLoaded.push(loadImage);


        

    }



}


