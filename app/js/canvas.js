"use strict";

class Canvas {

    constructor(containerId, canvasId) {

        this.divId = containerId;
        this.ID = canvasId;
        this.canvas = new fabric.Canvas(canvasId, {
            selection: false
        });
        this.promises = {
            cardsImages: [],
            sourcesImages: []
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

    createCards(CARDS, cardsValues, relations) {
        let that = this;
        let padding = cardsValues.padding;
        let cardWidth = cardsValues.width;
        let cardHeight = cardsValues.height;

        let cardsNames = CARDS.names;

        for (let i = 0, cardsArrayLength = cardsNames.length; i < cardsArrayLength; i++) {

            let cardName = cardsNames[i];
            let card = CARDS.all[cardName];
            let descriptionFontSize = (card.description.length >= 15) ? 14 : 16;
            let mainTextFontSize = (card.text["ru"].length >= 15) ? 14 : 16;
            let cardPrice = card.resource[relations[card.source]];
            let circleRadius = cardsValues.priceCircleRadius;

            let mainBody = new fabric.Rect({
                width: cardWidth,
                height: cardHeight,
                fill: cardsValues[card.source].color,
                stroke: cardsValues[card.source].textColor,
                strokeWidth: cardsValues.cardsStrokeWidth,
                rx: cardsValues.cardsBordersRadius,
                ry: cardsValues.cardsBordersRadius,
                originX: 'right',
                originY: 'top'
            });
            let mainText = new fabric.Textbox(card.text["ru"], {
                fontSize: mainTextFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: cardHeight / 2,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let descriptionText = new fabric.Textbox(card.description, {
                fontSize: descriptionFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: padding,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let priceText = new fabric.Textbox(cardPrice.toString(), {
                fontSize: cardsValues.priceFontSize,
                lineHeight: cardsValues.priceFontSize,
                width: circleRadius * 2,
                height: circleRadius * 2,
                left: -circleRadius * 2 - padding,
                top: cardHeight - circleRadius * 2 - padding,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let circle = new fabric.Circle({
                radius: circleRadius,
                fill: cardsValues[card.source].color,
                stroke: cardsValues[card.source].textColor,
                strokeWidth: cardsValues.priceStrokeWidth,
                left: - 2 * circleRadius - padding - 1,
                top: cardHeight - 2 * circleRadius - padding - 2
            });


            let loadImage = new Promise(function (resolve, reject) {

                let img = new Image();
                img.src = card.src;


                img.onload = function () {

                    let imgWidth = cardsValues.imageWidth;

                    let image = new fabric.Image(img, {
                        width: imgWidth,
                        height: cardsValues.imageHeight,
                        left: -parseInt((imgWidth + cardWidth) / 2, 10),
                        top: 30
                    });
                    let group = new fabric.Group([mainBody, descriptionText, image, mainText, circle, priceText], {
                        left: padding,
                        top: that.fabricElement.height - mainBody.getHeight() - 2 * padding,
                        selectable: true,
                        hasBorders: false,
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

                    function addCards() {
                        CARDS.all[cardName].object = group;
                    }

                    resolve(addCards());

                    reject(new Error("Can`t load cards images"));

                };

            });
            that.cardsImagesLoaded.push(loadImage);
        }

    } //createCards(CARDS);

    createNames(playerOneName, playerTwoName, canvasValues) {

        function createText(text) {

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

        function createMainBody() {
            return new fabric.Rect({
                width: canvasValues.playersNamesText.width,
                height: canvasValues.playersNamesText.height,
                fill: false,
                stroke:  canvasValues.playersNamesText.textColor,
                strokeWidth: canvasValues.playersNamesText.strokeWidth,
                rx: canvasValues.playersNamesText.borderRadius,
                ry: canvasValues.playersNamesText.borderRadius,
                originX: 'right',
                originY: 'top'
            });
        }

        let playerOneText = createText(playerOneName);
        let playerTwoText = createText(playerTwoName);

        let groupForPlayerOne = new fabric.Group([createMainBody(), playerOneText], {
            left: 0,
            top: 0,
            editable: false,
            selectable: false,
            hoverCursor: "default"
        });

        let groupForPlayerTwo = new fabric.Group([createMainBody(), playerTwoText], {
            left: this.width - canvasValues.playersNamesText.width - 2 * canvasValues.playersNamesText.padding,
            top: 0,
            editable: false,
            selectable: false,
            hoverCursor: "default"
        });

        this.canvas.add(groupForPlayerOne);
        this.canvas.add(groupForPlayerTwo);
    } // createNames(playerOneName, playerTwoName, cardsValues)

    createSources(source, playerOne, playerTwo, canvasValues) {

        let that = this;
        let sources = canvasValues.sources;

        let loadImage = new Promise(function (resolve, reject) {

            let img = new Image();
            img.src = sources[source].src;


            img.onload = function () {

                img.width = sources.imgWidth;
                img.height = sources.imgHeight;

                let imageOne = new fabric.Image(img, {
                    left: parseInt(sources.width - sources.imgWidth, 10),
                    top: 0
                });
                let imageTwo = new fabric.Image(img, {
                    left: parseInt(sources.width - sources.imgWidth, 10),
                    top: 0
                });

                function createSourceBody() {
                    return new fabric.Rect({
                        width: sources.width,
                        height: sources.height * 0.75,
                        fill: sources[source].color,
                        originX: 'left',
                        originY: 'top'
                    });
                }

                function createSourceValue(player) {
                    return new fabric.Textbox(player.sources[source].toString(), {
                        width: sources.width,
                        left: parseInt(sources.padding / 2, 10),
                        top: sources.imgHeight - sources.fontSize,
                        fontSize: sources.fontSize,
                        fill:sources.textColor,
                        textAlign: "left",
                        originX: 'left',
                        originY: 'top'
                    });
                }

                function createResourcesText() {
                    return new fabric.Textbox("Bricks", {
                        left: parseInt(sources.padding / 4, 10),
                        top: parseInt(sources.height * 0.75 + sources.padding / 4,10),
                        fontSize: sources.fontSize / 2,
                        fill:sources.textColor,
                        textAlign: "center",
                        originX: 'left',
                        originY: 'top'
                    });
                }
                function createResourcesBody() {
                    return new fabric.Rect({
                        width: sources.width,
                        height: sources.height * 0.25,
                        top: parseInt(sources.height * 0.75 + sources.borderRadius * 2, 10),
                        fill: sources[source].color,
                        originX: 'left',
                        originY: 'top'
                    });
                }
                function createResources(player) {
                    return new fabric.Textbox(player.resources[sources[source].resource].toString(), {
                        width:sources.width - sources.padding / 2 ,
                        left: sources.padding / 4,
                        top: parseInt(sources.height * 0.75 + sources.padding / 4,10),
                        fontSize: sources.fontSize / 2,
                        fill:sources.textColor,
                        textAlign: "right",
                        originX: 'left',
                        originY: 'top'
                    });
                }

                let sourceObjectPlayerOne = new fabric.Group([
                    createSourceBody(),
                    imageOne,
                    createSourceValue(playerOne)], {
                    left: sources.padding,
                    top: 5 * sources.padding,
                    rx: sources.borderRadius,
                    ry: sources.borderRadius,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                let resourceObjectPlayerOne = new fabric.Group([
                    createResourcesBody(),
                    createResourcesText(),
                    createResources(playerOne)], {
                    left: sources.padding,
                    top: parseInt(sources.height * 0.75 + 5 * sources.padding +
                        sources.borderRadius * 2, 10),
                    rx: sources.borderRadius,
                    ry: sources.borderRadius,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                let sourceObjectPlayerTwo = new fabric.Group([
                    createSourceBody(),
                    imageTwo,
                    createSourceValue(playerTwo)], {
                    left: that.width - sources.width - sources.padding,
                    top: 5 * sources.padding,
                    rx: sources.borderRadius,
                    ry: sources.borderRadius,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                let resourceObjectPlayerTwo = new fabric.Group([
                    createResourcesBody(),
                    createResourcesText(),
                    createResources(playerTwo)], {
                    left: that.width - sources.width - sources.padding,
                    top: parseInt(sources.height * 0.75 + 5 * sources.padding +
                        sources.borderRadius * 2, 10),
                    rx: sources.borderRadius,
                    ry: sources.borderRadius,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });


                function addObjects() {
                    playerOne.sourcesObject[source] = sourceObjectPlayerOne;
                    playerOne.resourcesObject[sources[source].resource] = resourceObjectPlayerOne;
                    that.canvas.add(playerOne.sourcesObject[source]);
                    that.canvas.add(playerOne.resourcesObject[sources[source].resource]);
                    playerTwo.sourcesObject[source] = sourceObjectPlayerTwo;
                    playerTwo.resourcesObject[sources[source].resource] = resourceObjectPlayerTwo;
                    that.canvas.add(playerTwo.sourcesObject[source]);
                    that.canvas.add(playerTwo.resourcesObject[sources[source].resource]);
                }

                resolve(addObjects());

                reject(new Error("Can`t load images"));

            };

        });
        that.sourcesImagesLoaded.push(loadImage);


    }


}


