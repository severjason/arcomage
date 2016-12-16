/// <reference path="@types/fabric/index.d.ts" />

import IImage = fabric.IImage;
import ICircle = fabric.ICircle;
import ITextbox = fabric.ITextbox;
import IRect = fabric.IRect;
import IGroup = fabric.IGroup;
import IPath = fabric.IPath;

class Canvas {

    private _containerId:string;
    private _canvasId:string;
    private _canvas:any;
    private _promises:any;

    constructor(containerId:string, canvasId:string) {

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

    get width():number {
        let element:any = document.getElementById(this._containerId);
        return element.getBoundingClientRect().right - element.getBoundingClientRect().left;
    }

    get height():number {
        let element:any = document.getElementById(this._containerId);
        return element.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
    }

    get fabricElement():any {
        return this._canvas;
    }

    get cardsImagesLoaded():any {
        return this._promises.cardsImages;
    }

    get sourcesImagesLoaded():any {
        return this._promises.sourcesImages;
    }

    setCanvasDimensions(width:number = this.width, height:number = this.height):void {
        this.fabricElement.setDimensions({
            width: width,
            height: height
        })
    }

    createCards(CARDS:any, cardsValues:any, relations:any):void {
        let that:Canvas = this;
        let padding:number = cardsValues.padding;
        let cardWidth:number = cardsValues.width;
        let cardHeight:number = cardsValues.height;

        let cardsNames:Array<string> = CARDS.names;

        for (let i = 0; i < cardsNames.length; i++) {

            let cardName:string = cardsNames[i];
            let card:any = CARDS.getSingleCard(cardName);
            let descriptionFontSize:number = (card.description.length >= 15) ? 14 : 16;
            let mainTextFontSize:number = (card.text["ru"].length >= 15) ? 14 : 16;
            let cardPrice:number = card.resource[relations[card.source]];
            let circleRadius:number = cardsValues.priceCircleRadius;

            let mainBody:IRect = new fabric.Rect({
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
            let mainText:ITextbox = new fabric.Textbox(card.text["ru"], {
                fontSize: mainTextFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: cardHeight / 2,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let descriptionText:ITextbox = new fabric.Textbox(card.description, {
                fontSize: descriptionFontSize,
                width: cardWidth,
                left: -cardWidth,
                top: padding,
                fill: cardsValues[card.source].textColor,
                editable: false,
                textAlign: "center"
            });
            let priceText:ITextbox = new fabric.Textbox(cardPrice.toString(), {
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
            let circle:ICircle = new fabric.Circle({
                radius: circleRadius,
                fill: cardsValues[card.source].color,
                stroke: cardsValues[card.source].textColor,
                strokeWidth: cardsValues.priceStrokeWidth,
                left: -2 * circleRadius - padding - 1,
                top: cardHeight - 2 * circleRadius - padding - 2
            });


            let loadImage:Promise<any> = new Promise(function (resolve, reject) {

                let img:HTMLImageElement = new Image();
                img.src = card.src;


                img.onload = function () {

                    let imgWidth:number = cardsValues.imageWidth;

                    let image:IImage = new fabric.Image(img, {
                        width: imgWidth,
                        height: cardsValues.imageHeight,
                        left: -(imgWidth + cardWidth) / 2,
                        top: 30
                    });
                    let group:IGroup = new fabric.Group([
                        mainBody,
                        descriptionText,
                        image,
                        mainText,
                        circle,
                        priceText], {
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

                    function addCards():void {
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

    createNames(playerOneName:string, playerTwoName:string, canvasValues:any):void {

        function createText(text:string):ITextbox {
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

        function createMainBody():IRect {
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

        let groupForPlayerOne:IGroup = new fabric.Group([createMainBody(), createText(playerOneName)], {
            left: canvasValues.playersNamesText.padding,
            top: 0,
            selectable: false,
            hoverCursor: "default"
        });

        let groupForPlayerTwo:IGroup = new fabric.Group([createMainBody(), createText(playerTwoName)], {
            left: this.width - canvasValues.playersNamesText.width - canvasValues.playersNamesText.padding - canvasValues.playersNamesText.strokeWidth,
            top: 0,
            selectable: false,
            hoverCursor: "default"
        });

        this._canvas.add(groupForPlayerOne);
        this._canvas.add(groupForPlayerTwo);
    } // createNames

    createOneSource(source:string, playerOne:Player, playerTwo:Player, canvasValues:any):void {

        let that:Canvas = this;
        let sources:any = canvasValues.sources;

        let capitalizeFirstLetter = (string:string) => {
            return string[0].toUpperCase() + string.slice(1);
        };

        let sourcesTopPadding:number = sources[source].position * (sources.width + sources.paddingTop);

        let loadImage:Promise<any> = new Promise(function (resolve, reject) {

            let img:HTMLImageElement = new Image();
            img.src = sources[source].src;


            img.onload = function () {

                img.width = sources.imgWidth;
                img.height = sources.imgHeight;

                let imageOne:IImage = new fabric.Image(img, {
                    left: sources.width - sources.imgWidth,
                    top: 0
                });
                let imageTwo:IImage = new fabric.Image(img, {
                    left: sources.width - sources.imgWidth,
                    top: 0
                });

                function createSourceBody():IRect {
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

                function createSourceValue(player:Player):ITextbox {
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

                function createResourcesText():ITextbox {
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

                function createResourcesBody():IRect {
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

                function createResources(player:Player):ITextbox {
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

                let sourceObjectPlayerOne:IGroup = new fabric.Group([
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
                let sourceObjectPlayerTwo:IGroup = new fabric.Group([
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
                let resourceObjectPlayerTwo:IGroup = new fabric.Group([
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


                function addObjects():void {
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

    createSources(playerOne:Player, playerTwo:Player, canvasValues:any):void {
        let sources = Object.keys(canvasValues.relations);
        for (let i = 0; i < sources.length; i++) {
            this.createOneSource(sources[i], playerOne, playerTwo, canvasValues);
        }
    } //createSources

    createTowers(playerOne:Player, playerTwo:Player, canvasValues:any):void {

        let that:Canvas = this;

        function createTowerRoof(player:Player):IPath {

            let pos1:string = `0 ${canvasValues.towers.roofHeight}`;
            let pos2:string = `${canvasValues.towers.roofWidth / 2} 0`;
            let pos3:string = `${canvasValues.towers.roofWidth} ${canvasValues.towers.roofHeight}`;

            return new fabric.Path(`M ${pos1} L ${pos2} L ${pos3} z`, {
                top: -canvasValues.towers.heightStep * player.towerLife,
                left: -(canvasValues.towers.roofWidth - canvasValues.towers.width) / 2,
                fill: canvasValues.towers.roofColor,
                originX: 'left',
                originY: 'bottom'
            });
        }

        function createTower(player:Player):IRect {
            return new fabric.Rect({
                width: canvasValues.towers.width,
                height: canvasValues.towers.heightStep * player.towerLife,
                fill: canvasValues.towers.towerColor,
                originX: 'left',
                originY: 'bottom'
            });
        }

        function createTowerText(player:Player):ITextbox {
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

        function createTextRect():IRect {
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

        let towerObjectPlayerOne:IGroup = new fabric.Group([
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

        let towerObjectPlayerTwo:IGroup = new fabric.Group([
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


        function addObjects():void {
            playerOne.towerObject = towerObjectPlayerOne;
            that._canvas.add(playerOne.towerObject);
            playerTwo.towerObject = towerObjectPlayerTwo;
            that._canvas.add(playerTwo.towerObject);
        }

        addObjects();

    } // createTowers


    createWalls(playerOne:Player, playerTwo:Player, canvasValues:any) {

        let that:Canvas = this;
        /*        let img = new Image();
         img.src = canvasValues.walls.src;*/

        function createWall(player:Player):IRect {
            return new fabric.Rect({
                width: canvasValues.walls.width,
                height: canvasValues.walls.heightStep * player.wallLife,
                fill: canvasValues.walls.wallColor,
                originX: 'left',
                originY: 'bottom'
            });
        }

        function createWallText(player:Player):ITextbox {
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

        function createTextRect():IRect {
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

        let wallObjectPlayerOne:IGroup = new fabric.Group([
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

        let wallObjectPlayerTwo:IGroup = new fabric.Group([
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


        function addObjects():void {
            playerOne.wallObject = wallObjectPlayerOne;
            that._canvas.add(playerOne.wallObject);
            playerTwo.wallObject = wallObjectPlayerTwo;
            that._canvas.add(playerTwo.wallObject);
        }

        addObjects();

    }


    drawAll(CARDS:ArcomageCards,
            cardsValues:any,
            relations:any,
            playerOneName:string,
            playerOne:Player,
            playerTwoName:string,
            playerTwo:Player,
            canvasValues:any):void {
        this.createCards(CARDS, cardsValues, relations);
        this.createNames(playerOneName, playerTwoName, canvasValues);
        this.createSources(playerOne, playerTwo, canvasValues);
        this.createTowers(playerOne, playerTwo, canvasValues);
        this.createWalls(playerOne, playerTwo, canvasValues);
    }


}


