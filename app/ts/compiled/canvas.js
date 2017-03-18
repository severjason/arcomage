var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class Canvas {
        constructor(containerId, canvasId) {
            this.containerId = containerId;
            this.canvasId = canvasId;
            this.canvas = new fabric.Canvas(canvasId, {
                selection: false,
            });
            this.promises = {
                cardsImages: [],
                sourcesImages: [],
            };
        }
        get width() {
            return document.getElementById(this.containerId).getBoundingClientRect().width;
        }
        get height() {
            return document.getElementById(this.containerId).getBoundingClientRect().height;
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
            this.fabricElement.setHeight(height);
            this.fabricElement.setWidth(width);
        }
        createCards(CARDS, cardsValues, relations) {
            let that = this;
            let padding = cardsValues.padding;
            let cardWidth = cardsValues.width;
            let cardHeight = cardsValues.height;
            // let cardWidth:number = (this.width >= 800) ? cardsValues.width : Math.floor(this.width / 5);
            // let cardHeight:number = (this.height >= 800) ? cardsValues.height : Math.floor(this.width * 0.5);
            let cardsNames = CARDS.names;
            for (let cardName of cardsNames) {
                let card = CARDS.getSingleCard(cardName);
                let descriptionFontSize = (card.description.eng.length >= 15) ? 14 : 15;
                let mainTextFontSize = (card.text.eng.length >= 20) ? 14 : 15;
                let cardPrice = card.resource[relations[card.source]];
                let circleRadius = cardsValues.priceCircleRadius;
                let mainBody = new fabric.Rect({
                    width: cardWidth,
                    height: cardHeight - cardsValues.discardHeight,
                    fill: cardsValues.cardsBodyColor,
                    stroke: cardsValues[card.source].color,
                    strokeWidth: cardsValues.cardsStrokeWidth,
                    rx: cardsValues.cardsBordersRadius,
                    ry: cardsValues.cardsBordersRadius,
                    originX: "right",
                    originY: "top",
                });
                let mainText = new fabric.Textbox(card.text.eng, {
                    fontSize: mainTextFontSize,
                    width: cardWidth - cardsValues.cardsStrokeWidth,
                    left: -cardWidth - cardsValues.cardsStrokeWidth,
                    top: cardsValues.mainTextPadding,
                    fill: cardsValues[card.source].textColor,
                    editable: false,
                    textAlign: "center",
                });
                let descriptionText = new fabric.Textbox(card.description.eng, {
                    fontSize: descriptionFontSize,
                    width: cardWidth - cardsValues.cardsStrokeWidth,
                    left: -cardWidth - cardsValues.cardsStrokeWidth,
                    top: padding,
                    fill: cardsValues[card.source].textColor,
                    editable: false,
                    textAlign: "center",
                });
                let priceText = new fabric.Textbox(cardPrice.toString(), {
                    fontSize: cardsValues.priceFontSize,
                    fontWeight: "bold",
                    lineHeight: cardsValues.priceFontSize,
                    width: circleRadius * 2,
                    height: circleRadius * 2,
                    left: -circleRadius * 2 - padding,
                    top: cardHeight - cardsValues.discardHeight - circleRadius * 2 - padding,
                    fill: cardsValues[card.source].color,
                    editable: false,
                    textAlign: "center",
                });
                /*            let circle: ICircle = new fabric.Circle({
                 radius: circleRadius,
                 fill: cardsValues[card.source].color,
                 stroke: cardsValues[card.source].textColor,
                 strokeWidth: cardsValues.priceStrokeWidth,
                 left: -2 * circleRadius - padding - 1,
                 top: cardHeight - 2 * circleRadius - cardsValues.discardHeight - padding - 2,
                 });*/
                let discardRect = new fabric.Rect({
                    width: cardWidth + cardsValues.priceStrokeWidth,
                    height: cardsValues.discardHeight,
                    left: -cardWidth - padding / 2,
                    top: cardHeight + padding / 2 - cardsValues.discardHeight,
                    fill: "#bdc3c7",
                    // stroke: cardsValues[card.source].textColor,
                    // strokeWidth:0,
                    rx: cardsValues.cardsBordersRadius,
                    ry: cardsValues.cardsBordersRadius,
                });
                let discardText = new fabric.Textbox(CARDS.discardText, {
                    fontSize: cardsValues.discardFontSize,
                    width: cardWidth,
                    left: -cardWidth - padding / 2,
                    top: cardHeight - 3 * cardsValues.discardHeight / 4,
                    fill: cardsValues[card.source].textColor,
                    editable: false,
                    textAlign: "center",
                });
                let loadImage = new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = card.src;
                    img.onload = () => {
                        /*let imgWidth:number = (cardWidth >= img.width)
                         ? cardsValues.imageWidth
                         : Math.floor(that.width / 5);*/
                        let imgWidth = cardsValues.imageWidth;
                        let image = new fabric.Image(img, {
                            width: imgWidth,
                            height: cardsValues.imageHeight,
                            left: -(imgWidth + cardWidth + padding) / 2,
                            top: cardsValues.imagePadding,
                        });
                        let group = new fabric.Group([
                            mainBody,
                            descriptionText,
                            image,
                            mainText,
                            /*circle,*/
                            priceText,
                            discardRect,
                            discardText
                        ], {
                            left: padding,
                            top: that.fabricElement.height - mainBody.getHeight()
                                - 2 * padding - cardsValues.discardHeight,
                            selectable: false,
                            lockMovementY: true,
                            hasControls: false,
                            hasBorders: false,
                            subTargetCheck: true,
                            hoverCursor: "pointer",
                        });
                        CARDS.setCardObject(cardName, group);
                        resolve();
                        reject(new Error("Can`t load cards images"));
                    };
                });
                that.cardsImagesLoaded.push(loadImage);
            }
        } // createCards
        createBackOfCard(CARDS, cardsValues) {
            let that = this;
            let padding = cardsValues.padding;
            let cardWidth = cardsValues.width;
            let cardHeight = cardsValues.height;
            let cardsNames = CARDS.names;
            for (let cardName of cardsNames) {
                // let card: any = CARDS.getSingleCard(cardName);
                let mainBody = new fabric.Rect({
                    width: cardWidth,
                    height: cardHeight,
                    fill: cardsValues.backColor,
                    stroke: cardsValues.backTextColor,
                    strokeWidth: cardsValues.cardsStrokeWidth,
                    rx: cardsValues.cardsBordersRadius,
                    ry: cardsValues.cardsBordersRadius,
                    originX: "right",
                    originY: "top",
                });
                let text = new fabric.Textbox("ARCOMAGE", {
                    fontSize: cardsValues.backTextFontSize,
                    width: cardWidth,
                    left: -cardWidth,
                    top: cardHeight - cardsValues.backTextPadding,
                    fill: cardsValues.backTextColor,
                    editable: false,
                    textAlign: "center",
                });
                let loadImage = new Promise((resolve, reject) => {
                    let img = new Image();
                    let imageWidthAndHeight = cardWidth;
                    img.src = CARDS.backOfCardSource;
                    img.onload = () => {
                        let image = new fabric.Image(img, {
                            width: imageWidthAndHeight,
                            height: imageWidthAndHeight,
                            left: -cardWidth,
                            top: img.height / 8,
                        });
                        let group = new fabric.Group([
                            mainBody,
                            image,
                            text
                        ], {
                            left: padding,
                            top: that.fabricElement.height - mainBody.getHeight() - 2 * padding,
                            selectable: false,
                            hasBorders: false,
                            hoverCursor: "default",
                        });
                        CARDS.setBackOfCardObject(cardName, group);
                        resolve();
                        reject(new Error("Can`t load cards images"));
                    };
                });
                that.cardsImagesLoaded.push(loadImage);
            }
        } // createBackOfCard
        createNames(playerOne, playerTwo, canvasValues) {
            function createText(text) {
                return new fabric.Textbox(text, {
                    fontSize: canvasValues.playersNamesText.fontSize,
                    width: canvasValues.playersNamesText.width,
                    editable: false,
                    fontWeight: "bold",
                    fontFamily: "'Lato', sans-serif",
                    textAlign: "center",
                    originX: "left",
                    originY: "top",
                });
            }
            function createMainBody() {
                return new fabric.Rect({
                    width: canvasValues.playersNamesText.width,
                    height: canvasValues.playersNamesText.height,
                    fill: canvasValues.playersNamesText.fillColor,
                    stroke: canvasValues.playersNamesText.strokeColor,
                    strokeWidth: canvasValues.playersNamesText.strokeWidth,
                    rx: canvasValues.playersNamesText.borderRadius,
                    ry: canvasValues.playersNamesText.borderRadius,
                    originX: "left",
                    originY: "top",
                });
            }
            let groupForPlayerOne = new fabric.Group([
                createMainBody(),
                createText(playerOne.name.substring(0, canvasValues.playersNamesText.maxLetters))
            ], {
                left: canvasValues.playersNamesText.padding,
                top: 0,
                selectable: false,
                objectCaching: false,
                hoverCursor: "default",
            });
            let groupForPlayerTwo = new fabric.Group([createMainBody(),
                createText(playerTwo.name.substring(0, canvasValues.playersNamesText.maxLetters))], {
                left: this.width - canvasValues.playersNamesText.width
                    - canvasValues.playersNamesText.padding - canvasValues.playersNamesText.strokeWidth,
                top: 0,
                selectable: false,
                objectCaching: false,
                hoverCursor: "default",
            });
            playerOne.nameObject = groupForPlayerOne;
            playerTwo.nameObject = groupForPlayerTwo;
            this.fabricElement.add(playerOne.nameObject);
            this.fabricElement.add(playerTwo.nameObject);
        } // createNames
        createOneSource(source, playerOne, playerTwo, canvasValues) {
            let that = this;
            let sources = canvasValues.sources;
            let capitalizeFirstLetter = (text) => {
                return text[0].toUpperCase() + text.slice(1);
            };
            let sourcesTopPadding = sources[source].position * (sources.height + sources.paddingTop);
            let sourcesTopPadding1 = canvasValues.playersNamesText.height +
                canvasValues.playersNamesText.padding +
                sources[source].position * (sources.height + sources.paddingTop);
            let loadImage = new Promise((resolve, reject) => {
                let img = new Image();
                img.src = sources[source].src;
                img.onload = () => {
                    img.width = sources.imgWidth;
                    img.height = sources.imgHeight;
                    let imageOne = new fabric.Image(img, {
                        left: sources.width - sources.imgWidth,
                        top: 0,
                    });
                    let imageTwo = new fabric.Image(img, {
                        left: sources.width - sources.imgWidth,
                        top: 0,
                    });
                    function createSourceBody() {
                        return new fabric.Rect({
                            width: sources.width,
                            height: sources.height * 0.75,
                            fill: sources[source].color,
                            rx: sources.borderRadius,
                            ry: sources.borderRadius,
                            originX: "left",
                            originY: "top",
                        });
                    }
                    function createSourceValue(player) {
                        let leftPosition = (player === playerOne)
                            ? sources.padding - sources.borderRadius + sources.textPadding
                            : that.width - sources.width - sources.padding - sources.borderRadius + sources.textPadding;
                        return new fabric.Textbox(player.sources[source].toString(), {
                            width: sources.width,
                            left: leftPosition,
                            top: sourcesTopPadding1 + sources.paddingTop + sources.imgHeight - sources.fontSize,
                            fontSize: sources.fontSize,
                            fill: sources.textColor,
                            objectCaching: false,
                            selectable: false,
                            hasBorders: false,
                            hoverCursor: "default",
                            textAlign: "left",
                            originX: "left",
                            originY: "top",
                        });
                    }
                    function createResourcesText() {
                        return new fabric.Textbox(capitalizeFirstLetter(canvasValues.relations[source]), {
                            left: sources.padding / 4,
                            top: sources.height * 0.75 + sources.textPadding,
                            fontSize: sources.fontSize / 2,
                            fill: sources.textColor,
                            textAlign: "center",
                            originX: "left",
                            originY: "top",
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
                            originX: "left",
                            originY: "top",
                        });
                    }
                    function createResources(player) {
                        let leftPosition = (player === playerOne)
                            ? sources.padding
                            : that.width - sources.width - sources.padding - sources.borderRadius;
                        return new fabric.Textbox(player.resources[sources[source].resource].toString(), {
                            width: sources.width - sources.padding / 2,
                            left: leftPosition,
                            top: sourcesTopPadding1 + sources.height + sources.textPadding / 2,
                            fontSize: sources.fontSize / 2,
                            fill: sources.textColor,
                            objectCaching: false,
                            selectable: false,
                            hasBorders: false,
                            hoverCursor: "default",
                            textAlign: "right",
                            originX: "left",
                            originY: "top",
                        });
                    }
                    let sourceObjectPlayerOne = new fabric.Group([
                        createSourceBody(),
                        imageOne
                    ], {
                        objectCaching: true,
                        left: sources.padding - sources.borderRadius,
                        top: 3 * sources.paddingTop + sourcesTopPadding,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });
                    let resourceObjectPlayerOne = new fabric.Group([
                        createResourcesBody(),
                        createResourcesText()
                    ], {
                        objectCaching: true,
                        left: sources.padding - sources.borderRadius,
                        top: sources.height * 0.75 + 3 * sources.paddingTop +
                            sources.borderRadius * 2 + sourcesTopPadding,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });
                    let sourceObjectPlayerTwo = new fabric.Group([
                        createSourceBody(),
                        imageTwo
                    ], {
                        objectCaching: true,
                        left: that.width - sources.width - sources.padding - sources.borderRadius,
                        top: 3 * sources.paddingTop + sourcesTopPadding,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });
                    let resourceObjectPlayerTwo = new fabric.Group([
                        createResourcesBody(),
                        createResourcesText()
                    ], {
                        objectCaching: true,
                        left: that.width - sources.width - sources.padding - sources.borderRadius,
                        top: sources.height * 0.75 + 3 * sources.paddingTop +
                            sources.borderRadius * 2 + sourcesTopPadding,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });
                    function addObjects() {
                        playerOne.sourcesObject[source] = createSourceValue(playerOne);
                        playerOne.resourcesObject[sources[source].resource] = createResources(playerOne);
                        that.fabricElement.add(sourceObjectPlayerOne);
                        that.fabricElement.add(playerOne.sourcesObject[source]);
                        that.fabricElement.add(resourceObjectPlayerOne);
                        that.fabricElement.add(playerOne.resourcesObject[sources[source].resource]);
                        playerTwo.sourcesObject[source] = createSourceValue(playerTwo);
                        playerTwo.resourcesObject[sources[source].resource] = createResources(playerTwo);
                        that.fabricElement.add(sourceObjectPlayerTwo);
                        that.fabricElement.add(playerTwo.sourcesObject[source]);
                        that.fabricElement.add(resourceObjectPlayerTwo);
                        that.fabricElement.add(playerTwo.resourcesObject[sources[source].resource]);
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
            for (let source of sources) {
                this.createOneSource(source, playerOne, playerTwo, canvasValues);
            }
        } // createSources
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
                    originX: "left",
                    originY: "bottom",
                });
            }
            function createTowerText(player) {
                return new fabric.Textbox(player.towerLife.toString(), {
                    top: (canvasValues.towers.height - canvasValues.towers.fontSize) / 2,
                    width: canvasValues.towers.width,
                    fontSize: canvasValues.towers.fontSize,
                    fill: canvasValues.towers.textColor,
                    textAlign: "center",
                    originX: "left",
                    originY: "top",
                });
            }
            function createTextRect() {
                return new fabric.Rect({
                    width: canvasValues.towers.width,
                    height: canvasValues.towers.height,
                    fill: "white",
                    originX: "left",
                    originY: "top",
                });
            }
            function createTower(player) {
                return new fabric.Rect({
                    width: canvasValues.towers.width,
                    height: canvasValues.towers.heightStep * player.towerLife,
                    fill: canvasValues.towers.towerColor,
                    originX: "left",
                    originY: "bottom",
                });
            }
            let towerObjectPlayerOne = new fabric.Group([
                createTowerRoof(playerOne),
                createTower(playerOne),
                createTextRect(),
                createTowerText(playerOne)
            ], {
                objectCaching: false,
                left: canvasValues.towers.padding,
                top: that.height - canvasValues.towers.positionY,
                originX: "left",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });
            let towerObjectPlayerTwo = new fabric.Group([
                createTowerRoof(playerTwo),
                createTower(playerTwo),
                createTextRect(),
                createTowerText(playerTwo)
            ], {
                objectCaching: false,
                left: that.width - canvasValues.towers.padding,
                top: that.height - canvasValues.towers.positionY,
                originX: "right",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });
            function addObjects() {
                playerOne.towerObject = towerObjectPlayerOne;
                that.fabricElement.add(playerOne.towerObject);
                playerTwo.towerObject = towerObjectPlayerTwo;
                that.fabricElement.add(playerTwo.towerObject);
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
                    originX: "left",
                    originY: "bottom",
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
                    originX: "left",
                    originY: "top",
                });
            }
            function createTextRect() {
                return new fabric.Rect({
                    width: canvasValues.walls.width,
                    height: canvasValues.towers.height,
                    fill: "white",
                    originX: "left",
                    originY: "top",
                });
            }
            let wallObjectPlayerOne = new fabric.Group([
                createWall(playerOne),
                createTextRect(),
                createWallText(playerOne)
            ], {
                objectCaching: false,
                left: canvasValues.walls.padding,
                top: that.height - canvasValues.walls.positionY,
                originX: "left",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });
            let wallObjectPlayerTwo = new fabric.Group([
                createWall(playerTwo),
                createTextRect(),
                createWallText(playerTwo)
            ], {
                objectCaching: false,
                left: that.width - canvasValues.walls.padding,
                top: that.height - canvasValues.walls.positionY,
                originX: "right",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });
            function addObjects() {
                playerOne.wallObject = wallObjectPlayerOne;
                that.fabricElement.add(playerOne.wallObject);
                playerTwo.wallObject = wallObjectPlayerTwo;
                that.fabricElement.add(playerTwo.wallObject);
            }
            addObjects();
        }
        drawAll(CARDS, cardsValues, relations, playerOne, playerTwo, canvasValues) {
            this.createCards(CARDS, cardsValues, relations);
            this.createBackOfCard(CARDS, cardsValues);
            this.createNames(playerOne, playerTwo, canvasValues);
            this.createSources(playerOne, playerTwo, canvasValues);
            this.createTowers(playerOne, playerTwo, canvasValues);
            this.createWalls(playerOne, playerTwo, canvasValues);
        }
    }
    ArcomageGame.Canvas = Canvas;
})(ArcomageGame || (ArcomageGame = {}));
