/// <reference path="@types/fabric/index.d.ts" />
class Canvas {
    constructor(containerId, canvasId) {
        this._containerId = containerId;
        this._canvasId = canvasId;
        this._canvas = new fabric.Canvas(canvasId, {
            selection: false
        });
        this._promises = {
            cardsImages: [],
            sourcesImages: []
        };
    }
    get width() {
        let element = document.getElementById(this._containerId);
        return element.getBoundingClientRect().right - element.getBoundingClientRect().left;
    }
    get height() {
        let element = document.getElementById(this._containerId);
        return element.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
    }
    get fabricElement() {
        return this._canvas;
    }
    get cardsImagesLoaded() {
        return this._promises.cardsImages;
    }
    get sourcesImagesLoaded() {
        return this._promises.sourcesImages;
    }
    setCanvasDimensions(width = this.width, height = this.height) {
        this.fabricElement.setDimensions({
            width: width,
            height: height
        });
    }
    createCards(CARDS, cardsValues, relations) {
        let that = this;
        let padding = cardsValues.padding;
        let cardWidth = cardsValues.width;
        let cardHeight = cardsValues.height;
        let cardsNames = CARDS.names;
        for (let i = 0; i < cardsNames.length; i++) {
            let cardName = cardsNames[i];
            let card = CARDS.getSingleCard(cardName);
            let descriptionFontSize = (card.description.length >= 15) ? 14 : 16;
            let mainTextFontSize = (card.text["ru"].length >= 15) ? 14 : 16;
            let cardPrice = card.resource[relations[card.source]];
            let circleRadius = cardsValues.priceCircleRadius;
            let mainBody = new fabric.Rect({
                width: cardWidth,
                height: cardHeight - cardsValues.discardHeight,
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
                top: cardsValues.mainTextPadding,
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
                top: cardHeight - cardsValues.discardHeight - circleRadius * 2 - padding,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let circle = new fabric.Circle({
                radius: circleRadius,
                fill: cardsValues[card.source].color,
                stroke: cardsValues[card.source].textColor,
                strokeWidth: cardsValues.priceStrokeWidth,
                left: -2 * circleRadius - padding - 1,
                top: cardHeight - 2 * circleRadius - cardsValues.discardHeight - padding - 2
            });
            let discardRect = new fabric.Rect({
                width: cardWidth,
                height: cardsValues.discardHeight,
                left: -cardWidth,
                top: cardHeight + 2 - cardsValues.discardHeight,
                fill: "#bdc3c7",
                stroke: cardsValues[card.source].textColor,
                strokeWidth: cardsValues.cardsStrokeWidth,
                rx: cardsValues.cardsBordersRadius,
                ry: cardsValues.cardsBordersRadius,
            });
            let discardText = new fabric.Textbox(CARDS.discardText, {
                fontSize: cardsValues.discardFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: cardHeight - 3 * cardsValues.discardHeight / 4,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let loadImage = new Promise(function (resolve, reject) {
                let img = new Image();
                img.src = card.src;
                img.onload = function () {
                    let imgWidth = cardsValues.imageWidth;
                    let image = new fabric.Image(img, {
                        width: imgWidth,
                        height: cardsValues.imageHeight,
                        left: -(imgWidth + cardWidth) / 2,
                        top: cardsValues.imagePadding
                    });
                    let group = new fabric.Group([
                        mainBody,
                        descriptionText,
                        image,
                        mainText,
                        circle,
                        priceText,
                        discardRect,
                        discardText], {
                        left: padding,
                        top: that.fabricElement.height - mainBody.getHeight() - 2 * padding - cardsValues.discardHeight,
                        selectable: false,
                        hasBorders: false,
                        subTargetCheck: true,
                        hoverCursor: "pointer"
                    });
                    function addCards() {
                        CARDS.getSingleCard(cardName).object = group;
                    }
                    addCards();
                    resolve();
                    reject(new Error("Can`t load cards images"));
                };
            });
            that.cardsImagesLoaded.push(loadImage);
        }
    } //createCards
    createNames(playerOneName, playerTwoName, canvasValues) {
        function createText(text) {
            return new fabric.Textbox(text, {
                fontSize: canvasValues.playersNamesText.fontSize,
                width: canvasValues.playersNamesText.width,
                padding: canvasValues.playersNamesText.padding,
                editable: false,
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
                fill: "white",
                stroke: canvasValues.playersNamesText.textColor,
                strokeWidth: canvasValues.playersNamesText.strokeWidth,
                rx: canvasValues.playersNamesText.borderRadius,
                ry: canvasValues.playersNamesText.borderRadius,
                originX: 'right',
                originY: 'top'
            });
        }
        let groupForPlayerOne = new fabric.Group([createMainBody(), createText(playerOneName)], {
            left: canvasValues.playersNamesText.padding,
            top: 0,
            selectable: false,
            hoverCursor: "default"
        });
        let groupForPlayerTwo = new fabric.Group([createMainBody(), createText(playerTwoName)], {
            left: this.width - canvasValues.playersNamesText.width - canvasValues.playersNamesText.padding - canvasValues.playersNamesText.strokeWidth,
            top: 0,
            selectable: false,
            hoverCursor: "default"
        });
        this._canvas.add(groupForPlayerOne);
        this._canvas.add(groupForPlayerTwo);
    } // createNames
    createOneSource(source, playerOne, playerTwo, canvasValues) {
        let that = this;
        let sources = canvasValues.sources;
        let capitalizeFirstLetter = (string) => {
            return string[0].toUpperCase() + string.slice(1);
        };
        let sourcesTopPadding = sources[source].position * (sources.width + sources.paddingTop);
        let loadImage = new Promise(function (resolve, reject) {
            let img = new Image();
            img.src = sources[source].src;
            img.onload = function () {
                img.width = sources.imgWidth;
                img.height = sources.imgHeight;
                let imageOne = new fabric.Image(img, {
                    left: sources.width - sources.imgWidth,
                    top: 0
                });
                let imageTwo = new fabric.Image(img, {
                    left: sources.width - sources.imgWidth,
                    top: 0
                });
                function createSourceBody() {
                    return new fabric.Rect({
                        width: sources.width,
                        height: sources.height * 0.75,
                        fill: sources[source].color,
                        rx: sources.borderRadius,
                        ry: sources.borderRadius,
                        originX: 'left',
                        originY: 'top'
                    });
                }
                function createSourceValue(player) {
                    return new fabric.Textbox(player.sources[source].toString(), {
                        width: sources.width,
                        left: sources.textPadding,
                        top: sources.imgHeight - sources.fontSize,
                        fontSize: sources.fontSize,
                        fill: sources.textColor,
                        textAlign: "left",
                        originX: 'left',
                        originY: 'top'
                    });
                }
                function createResourcesText() {
                    return new fabric.Textbox(capitalizeFirstLetter(canvasValues.relations[source]), {
                        left: sources.padding / 4,
                        top: sources.height * 0.75 + sources.textPadding,
                        fontSize: sources.fontSize / 2,
                        fill: sources.textColor,
                        textAlign: "center",
                        originX: 'left',
                        originY: 'top'
                    });
                }
                function createResourcesBody() {
                    return new fabric.Rect({
                        width: sources.width,
                        height: sources.height * 0.25,
                        top: sources.height * 0.75 + sources.borderRadius * 2,
                        fill: sources[source].color,
                        rx: sources.borderRadius,
                        ry: sources.borderRadius,
                        originX: 'left',
                        originY: 'top'
                    });
                }
                function createResources(player) {
                    return new fabric.Textbox(player.resources[sources[source].resource].toString(), {
                        width: sources.width - sources.padding / 2,
                        left: sources.padding / 4,
                        top: sources.height * 0.75 + sources.textPadding,
                        fontSize: sources.fontSize / 2,
                        fill: sources.textColor,
                        textAlign: "right",
                        originX: 'left',
                        originY: 'top'
                    });
                }
                let sourceObjectPlayerOne = new fabric.Group([
                    createSourceBody(),
                    imageOne,
                    createSourceValue(playerOne)], {
                    objectCaching: false,
                    left: sources.padding - sources.borderRadius,
                    top: 3 * sources.paddingTop + sourcesTopPadding,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                let resourceObjectPlayerOne = new fabric.Group([
                    createResourcesBody(),
                    createResourcesText(),
                    createResources(playerOne)], {
                    objectCaching: false,
                    left: sources.padding - sources.borderRadius,
                    top: sources.height * 0.75 + 3 * sources.paddingTop +
                        sources.borderRadius * 2 + sourcesTopPadding,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                let sourceObjectPlayerTwo = new fabric.Group([
                    createSourceBody(),
                    imageTwo,
                    createSourceValue(playerTwo)], {
                    objectCaching: false,
                    left: that.width - sources.width - sources.padding - sources.borderRadius,
                    top: 3 * sources.paddingTop + sourcesTopPadding,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                let resourceObjectPlayerTwo = new fabric.Group([
                    createResourcesBody(),
                    createResourcesText(),
                    createResources(playerTwo)], {
                    objectCaching: false,
                    left: that.width - sources.width - sources.padding - sources.borderRadius,
                    top: sources.height * 0.75 + 3 * sources.paddingTop +
                        sources.borderRadius * 2 + sourcesTopPadding,
                    selectable: false,
                    hasBorders: false,
                    hoverCursor: "default"
                });
                function addObjects() {
                    playerOne.sourcesObject[source] = sourceObjectPlayerOne;
                    playerOne.resourcesObject[sources[source].resource] = resourceObjectPlayerOne;
                    that._canvas.add(playerOne.sourcesObject[source]);
                    that._canvas.add(playerOne.resourcesObject[sources[source].resource]);
                    playerTwo.sourcesObject[source] = sourceObjectPlayerTwo;
                    playerTwo.resourcesObject[sources[source].resource] = resourceObjectPlayerTwo;
                    that._canvas.add(playerTwo.sourcesObject[source]);
                    that._canvas.add(playerTwo.resourcesObject[sources[source].resource]);
                }
                addObjects();
                resolve();
                reject(new Error("Can`t load images"));
            };
        });
        that.sourcesImagesLoaded.push(loadImage);
    } // createOneSource
    createSources(playerOne, playerTwo, canvasValues) {
        let sources = Object.keys(canvasValues.relations);
        for (let i = 0; i < sources.length; i++) {
            this.createOneSource(sources[i], playerOne, playerTwo, canvasValues);
        }
    } //createSources
    createTowers(playerOne, playerTwo, canvasValues) {
        let that = this;
        function createTowerRoof(player) {
            let pos1 = `0 ${canvasValues.towers.roofHeight}`;
            let pos2 = `${canvasValues.towers.roofWidth / 2} 0`;
            let pos3 = `${canvasValues.towers.roofWidth} ${canvasValues.towers.roofHeight}`;
            return new fabric.Path(`M ${pos1} L ${pos2} L ${pos3} z`, {
                top: -canvasValues.towers.heightStep * player.towerLife,
                left: -(canvasValues.towers.roofWidth - canvasValues.towers.width) / 2,
                fill: canvasValues.towers.roofColor,
                originX: 'left',
                originY: 'bottom'
            });
        }
        function createTower(player) {
            return new fabric.Rect({
                width: canvasValues.towers.width,
                height: canvasValues.towers.heightStep * player.towerLife,
                fill: canvasValues.towers.towerColor,
                originX: 'left',
                originY: 'bottom'
            });
        }
        function createTowerText(player) {
            return new fabric.Textbox(player.towerLife.toString(), {
                top: (canvasValues.towers.height - canvasValues.towers.fontSize) / 2,
                width: canvasValues.towers.width,
                fontSize: canvasValues.towers.fontSize,
                fill: canvasValues.towers.textColor,
                textAlign: "center",
                originX: 'left',
                originY: 'top'
            });
        }
        function createTextRect() {
            return new fabric.Rect({
                width: canvasValues.towers.width,
                height: canvasValues.towers.height,
                fill: 'white',
                stroke: canvasValues.playersNamesText.textColor,
                strokeWidth: canvasValues.playersNamesText.strokeWidth,
                originX: 'left',
                originY: 'top'
            });
        }
        let towerObjectPlayerOne = new fabric.Group([
            createTowerRoof(playerOne),
            createTower(playerOne),
            createTextRect(),
            createTowerText(playerOne)], {
            objectCaching: false,
            left: canvasValues.towers.padding,
            top: that.height - canvasValues.towers.positionY,
            originX: 'left',
            originY: 'bottom',
            selectable: false,
            hasBorders: false,
            hoverCursor: "default"
        });
        let towerObjectPlayerTwo = new fabric.Group([
            createTowerRoof(playerTwo),
            createTower(playerTwo),
            createTextRect(),
            createTowerText(playerTwo)], {
            objectCaching: false,
            left: that.width - canvasValues.towers.padding,
            top: that.height - canvasValues.towers.positionY,
            originX: 'right',
            originY: 'bottom',
            selectable: false,
            hasBorders: false,
            hoverCursor: "default"
        });
        function addObjects() {
            playerOne.towerObject = towerObjectPlayerOne;
            that._canvas.add(playerOne.towerObject);
            playerTwo.towerObject = towerObjectPlayerTwo;
            that._canvas.add(playerTwo.towerObject);
        }
        addObjects();
    } // createTowers
    createWalls(playerOne, playerTwo, canvasValues) {
        let that = this;
        /*        let img = new Image();
         img.src = canvasValues.walls.src;*/
        function createWall(player) {
            return new fabric.Rect({
                width: canvasValues.walls.width,
                height: canvasValues.walls.heightStep * player.wallLife,
                fill: canvasValues.walls.wallColor,
                originX: 'left',
                originY: 'bottom'
            });
        }
        function createWallText(player) {
            return new fabric.Textbox(player.wallLife.toString(), {
                top: (canvasValues.towers.height - canvasValues.walls.fontSize) / 2,
                width: canvasValues.walls.width,
                fontSize: canvasValues.walls.fontSize,
                fill: canvasValues.walls.textColor,
                textAlign: "center",
                selectable: true,
                originX: 'left',
                originY: 'top'
            });
        }
        function createTextRect() {
            return new fabric.Rect({
                width: canvasValues.walls.width,
                height: canvasValues.towers.height,
                fill: 'white',
                stroke: canvasValues.playersNamesText.textColor,
                strokeWidth: canvasValues.playersNamesText.strokeWidth,
                originX: 'left',
                originY: 'top'
            });
        }
        let wallObjectPlayerOne = new fabric.Group([
            createWall(playerOne),
            createTextRect(),
            createWallText(playerOne)], {
            objectCaching: false,
            left: canvasValues.walls.padding,
            top: that.height - canvasValues.walls.positionY,
            originX: 'left',
            originY: 'bottom',
            selectable: false,
            hasBorders: false,
            hoverCursor: "default"
        });
        let wallObjectPlayerTwo = new fabric.Group([
            createWall(playerTwo),
            createTextRect(),
            createWallText(playerTwo)], {
            objectCaching: false,
            left: that.width - canvasValues.walls.padding,
            top: that.height - canvasValues.walls.positionY,
            originX: 'right',
            originY: 'bottom',
            selectable: false,
            hasBorders: false,
            hoverCursor: "default"
        });
        function addObjects() {
            playerOne.wallObject = wallObjectPlayerOne;
            that._canvas.add(playerOne.wallObject);
            playerTwo.wallObject = wallObjectPlayerTwo;
            that._canvas.add(playerTwo.wallObject);
        }
        addObjects();
    }
    drawAll(CARDS, cardsValues, relations, playerOneName, playerOne, playerTwoName, playerTwo, canvasValues) {
        this.createCards(CARDS, cardsValues, relations);
        this.createNames(playerOneName, playerTwoName, canvasValues);
        this.createSources(playerOne, playerTwo, canvasValues);
        this.createTowers(playerOne, playerTwo, canvasValues);
        this.createWalls(playerOne, playerTwo, canvasValues);
    }
}
