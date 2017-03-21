namespace ArcomageGame {
    "use strict";

    import IImage = fabric.IImage;
    import ICircle = fabric.ICircle;
    import ITextbox = fabric.ITextbox;
    import IRect = fabric.IRect;
    import IGroup = fabric.IGroup;
    import IPath = fabric.IPath;

    export class Canvas {

        private containerId: string;
        private canvasId: string;
        private canvas: any;
        private promises: any;

        constructor(containerId: string, canvasId: string) {
            this.containerId = containerId;
            this.canvasId = canvasId;
            this.canvas = new fabric.Canvas(canvasId, {
                selection: false,
            });
            this.promises = [];
        }

        get width(): number {
            return document.getElementById(this.containerId).getBoundingClientRect().width;
        }

        get height(): number {
            return document.getElementById(this.containerId).getBoundingClientRect().height;
        }

        get fabricElement(): any {
            return this.canvas;
        }

        get imagesLoaded(): any {
            return this.promises;
        }

        public setCanvasDimensions(width: number = this.width, height: number = this.height): void {
            this.fabricElement.setHeight(height);
            this.fabricElement.setWidth(width);
        }

        public createCards(CARDS: any, cardsValues: any, relations: any): void {
            let that: Canvas = this;
            let padding: number = cardsValues.padding;
            let cardWidth: number = cardsValues.width;
            let cardHeight: number = cardsValues.height;
            // let cardWidth:number = (this.width >= 800) ? cardsValues.width : Math.floor(this.width / 5);
            // let cardHeight:number = (this.height >= 800) ? cardsValues.height : Math.floor(this.width * 0.5);

            let cardsNames: string[] = CARDS.names;

            for (let cardName of cardsNames) {

                let card: any = CARDS.getSingleCard(cardName);
                let descriptionFontSize: number = (card.description.eng.length >= 15) ? 14 : 15;
                let mainTextFontSize: number = (card.text.eng.length >= 20) ? 14 : 15;
                let cardPrice: number = card.resource[relations[card.source]];
                let circleRadius: number = cardsValues.priceCircleRadius;

                let mainBody: IRect = new fabric.Rect({
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
                let mainText: ITextbox = new fabric.Textbox(card.text.eng, {
                    fontSize: mainTextFontSize,
                    width: cardWidth - cardsValues.cardsStrokeWidth,
                    left: -cardWidth - cardsValues.cardsStrokeWidth,
                    top: cardsValues.mainTextPadding,
                    fill: cardsValues[card.source].textColor,
                    editable: false,
                    textAlign: "center",
                });
                let descriptionText: ITextbox = new fabric.Textbox(card.description.eng, {
                    fontSize: descriptionFontSize,
                    width: cardWidth - cardsValues.cardsStrokeWidth,
                    left: -cardWidth - cardsValues.cardsStrokeWidth,
                    top: padding,
                    fill: cardsValues[card.source].textColor,
                    editable: false,
                    textAlign: "center",
                });
                let priceText: ITextbox = new fabric.Textbox(cardPrice.toString(), {
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
                let discardRect: IRect = new fabric.Rect({
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
                let discardText: ITextbox = new fabric.Textbox(CARDS.discardText, {
                    fontSize: cardsValues.discardFontSize,
                    width: cardWidth,
                    left: -cardWidth - padding / 2,
                    top: cardHeight - 3 * cardsValues.discardHeight / 4,
                    fill: cardsValues[card.source].textColor,
                    editable: false,
                    textAlign: "center",
                });

                let loadImage: Promise<any> = new Promise((resolve, reject) => {

                    let img: HTMLImageElement = new Image();
                    img.src = card.src;
                    img.onload = () => {
                        /*let imgWidth:number = (cardWidth >= img.width)
                         ? cardsValues.imageWidth
                         : Math.floor(that.width / 5);*/
                        let imgWidth: number = cardsValues.imageWidth;

                        let image: IImage = new fabric.Image(img, {
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
                            discardText], {
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
                that.imagesLoaded.push(loadImage);
            }

        } // createCards

        public createBackOfCard(CARDS: any, cardsValues: any): void {
            let that: Canvas = this;
            let padding: number = cardsValues.padding;
            let cardWidth: number = cardsValues.width;
            let cardHeight: number = cardsValues.height;

            let cardsNames: string[] = CARDS.names;

            for (let cardName of cardsNames) {

                // let card: any = CARDS.getSingleCard(cardName);

                let mainBody: IRect = new fabric.Rect({
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

                let text: ITextbox = new fabric.Textbox("ARCOMAGE", {
                    fontSize: cardsValues.backTextFontSize,
                    width: cardWidth,
                    left: -cardWidth,
                    top: cardHeight - cardsValues.backTextPadding,
                    fill: cardsValues.backTextColor,
                    editable: false,
                    textAlign: "center",
                });

                let loadImage: Promise<any> = new Promise((resolve, reject) => {

                    let img: HTMLImageElement = new Image();
                    let imageWidthAndHeight: number = cardWidth;
                    img.src = CARDS.backOfCardSource;
                    img.onload = () => {

                        let image: IImage = new fabric.Image(img, {
                            width: imageWidthAndHeight,
                            height: imageWidthAndHeight,
                            left: -cardWidth,
                            top: img.height / 8,
                        });
                        let group = new fabric.Group([
                            mainBody,
                            image,
                            text], {
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
                that.imagesLoaded.push(loadImage);
            }

        } // createBackOfCard

        public createNames(playerOne: Player, playerTwo: Player, canvasValues: any): void {

            function createText(text: string): ITextbox {
                return new fabric.Textbox(text, {
                    fontSize: canvasValues.playersNamesText.fontSize,
                    fill: canvasValues.playersNamesText.fillColor,
                    width: canvasValues.playersNamesText.width,
                    editable: false,
                    fontWeight: "bold",
                    fontFamily: "'Lato', sans-serif",
                    textAlign: "center",
                    originX: "left",
                    originY: "top",
                });
            }

            /*function createMainBody(): IRect {
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
             }*/

            let groupForPlayerOne: IGroup = new fabric.Group([
                createText(playerOne.name.substring(0, canvasValues.playersNamesText.maxLetters))], {
                left: canvasValues.playersNamesText.padding,
                top: 0,
                selectable: false,
                objectCaching: false,
                hoverCursor: "default",
            });

            let groupForPlayerTwo: IGroup = new fabric.Group([
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

        public createOneSandR(source: string, playerOne: Player, playerTwo: Player, canvasValues: any): void {

            let that: Canvas = this;
            let sources: any = canvasValues.sources;

            let capitalizeFirstLetter = (text: string) => {
                return text[0].toUpperCase() + text.slice(1);
            };

            let sourcesTopPadding: number = sources[source].position * (sources.height + sources.paddingTop);
            let sourcesTopPadding1: number = canvasValues.playersNamesText.height +
                canvasValues.playersNamesText.padding +
                sources[source].position * (sources.height + sources.paddingTop);

            let loadSourceImage: Promise<any> = new Promise((resolve, reject) => {

                let sourceImg: HTMLImageElement = new Image();
                sourceImg.src = sources[source].src;
                sourceImg.onload = () => {

                    sourceImg.width = sources.imgWidth;
                    sourceImg.height = sources.imgHeight;

                    let sourceImagePlayerOne: IImage = new fabric.Image(sourceImg, {
                        left: 0,
                        top: 0,
                    });
                    let sourceImagePlayerTwo: IImage = new fabric.Image(sourceImg, {
                        left: sources.width - sources.imgWidth,
                        top: 0,
                    });

                    /*function createSourceBody(): IRect {
                        return new fabric.Rect({
                     top: - sources.descFontSize - sources.padding,
                     left: 0,
                     width: sources.imgWidth + sources.resImgWidth,
                     height: sources.descFontSize + sources.imgHeight + sources.fontSize + sources.padding,
                     fill: "transparent",
                     stroke: sources[source].color,
                     strokeWidth: 2,
                            rx: sources.borderRadius,
                            ry: sources.borderRadius,
                            originX: "left",
                            originY: "top",
                        });
                     }*/

                    function createSourcesText(player: Player): ITextbox {
                        let leftPosition = (player === playerOne)
                            ? 0
                            : sources.descFontSize;
                        return new fabric.Textbox(capitalizeFirstLetter(source), {
                            width: sources.imgWidth,
                            left: leftPosition,
                            top: -sources.descFontSize,
                            fontSize: sources.descFontSize,
                            fontWeight: "bold",
                            fill: sources[source].color,
                            selectable: false,
                            hasBorders: false,
                            textAlign: "center",
                            originX: "left",
                            originY: "top",
                        });
                    }

                    function createSourceValue(player: Player): ITextbox {
                        let leftPosition = (player === playerOne)
                            ? sources.padding - sources.borderRadius
                            : that.width - sources.imgWidth - sources.resImgWidth
                            - sources.padding - sources.borderRadius;
                        return new fabric.Textbox(player.sources[source].toString(), {
                            width: sources.imgWidth,
                            left: leftPosition,
                            top: sourcesTopPadding1 + sources.paddingTop + sources.imgHeight + sources.descFontSize / 2,
                            fontSize: sources.fontSize,
                            fontWeight: "bold",
                            fill: sources[source].color,
                            objectCaching: false,
                            selectable: false,
                            hasBorders: false,
                            hoverCursor: "default",
                            textAlign: "center",
                            originX: "left",
                            originY: "top",
                        });
                    }

                    let sourceObjectPlayerOne: IGroup = new fabric.Group([
                        createSourcesText(playerOne),
                        sourceImagePlayerOne], {
                        objectCaching: true,
                        left: sources.padding - sources.borderRadius,
                        top: 3 * sources.paddingTop + sourcesTopPadding - sources.descFontSize,
                        selectable: true,
                        hasBorders: true,
                        hoverCursor: "default",
                    });

                    let sourceObjectPlayerTwo: IGroup = new fabric.Group([
                        /*createSourceBody(),*/
                        createSourcesText(playerTwo),
                        sourceImagePlayerTwo], {
                        objectCaching: true,
                        left: that.width - sources.imgWidth - sources.resImgWidth
                        - sources.padding - sources.borderRadius,
                        top: 3 * sources.paddingTop + sourcesTopPadding - sources.descFontSize,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });

                    function addObjects(): void {
                        playerOne.sourcesObject[source] = createSourceValue(playerOne);

                        that.fabricElement.add(sourceObjectPlayerOne);
                        that.fabricElement.add(playerOne.sourcesObject[source]);

                        playerTwo.sourcesObject[source] = createSourceValue(playerTwo);

                        that.fabricElement.add(sourceObjectPlayerTwo);
                        that.fabricElement.add(playerTwo.sourcesObject[source]);
                    }

                    addObjects();

                    resolve();

                    reject(new Error("Can`t load source images"));

                };

            });
            let loadResourceImage: Promise<any> = new Promise((resolve, reject) => {

                let resourceImg: HTMLImageElement = new Image();
                resourceImg.src = sources[source].resSrc;

                resourceImg.onload = () => {

                    resourceImg.width = sources.resImgWidth;
                    resourceImg.height = sources.resImgHeight;

                    let sourceImagePlayerOne: IImage = new fabric.Image(resourceImg, {
                        left: 0,
                        top: 0,
                    });
                    let sourceImagePlayerTwo: IImage = new fabric.Image(resourceImg, {
                        left: sources.width - sources.imgWidth,
                        top: 0,
                    });

                    function createResourcesText(player: Player): ITextbox {
                        let leftPosition = (player === playerOne)
                            ? 0
                            : sources.descFontSize;
                        return new fabric.Textbox(capitalizeFirstLetter(canvasValues.relations[source]), {
                            width: sources.resImgWidth,
                            left: leftPosition,
                            top: -sources.descFontSize,
                            fontSize: sources.descFontSize,
                            fill: sources[source].color,
                            selectable: false,
                            hasBorders: false,
                            textAlign: "center",
                            originX: "left",
                            originY: "top",
                        });
                    }

                    function createResourcesValue(player: Player): ITextbox {
                        let leftPosition = (player === playerOne)
                            ? sources.padding + sources.imgWidth
                            : that.width - sources.resImgWidth - sources.padding - sources.borderRadius;

                        return new fabric.Textbox(player.resources[sources[source].resource].toString(), {
                            width: sources.resImgWidth,
                            left: leftPosition,
                            top: sourcesTopPadding1 + sources.paddingTop + sources.imgHeight + sources.descFontSize / 2,
                            fontSize: sources.fontSize,
                            fill: sources[source].color,
                            objectCaching: false,
                            selectable: false,
                            hasBorders: false,
                            hoverCursor: "default",
                            textAlign: "center",
                            originX: "left",
                            originY: "top",
                        });
                    }

                    let resourceObjectPlayerOne = new fabric.Group([
                        createResourcesText(playerOne),
                        sourceImagePlayerOne], {
                        objectCaching: true,
                        left: sources.padding - sources.borderRadius + sources.imgWidth,
                        top: 3 * sources.paddingTop + sourcesTopPadding + sources.imgHeight
                        - sources.resImgHeight - sources.descFontSize,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });

                    let resourceObjectPlayerTwo: IGroup = new fabric.Group([
                        createResourcesText(playerTwo),
                        sourceImagePlayerTwo], {
                        objectCaching: true,
                        left: that.width - sources.resImgWidth
                        - sources.padding - sources.borderRadius,
                        top: 3 * sources.paddingTop + sourcesTopPadding + sources.imgHeight
                        - sources.resImgHeight - sources.descFontSize,
                        selectable: false,
                        hasBorders: false,
                        hoverCursor: "default",
                    });

                    function addObjects(): void {
                        playerOne.resourcesObject[sources[source].resource] = createResourcesValue(playerOne);

                        that.fabricElement.add(resourceObjectPlayerOne);
                        that.fabricElement.add(playerOne.resourcesObject[sources[source].resource]);

                        playerTwo.resourcesObject[sources[source].resource] = createResourcesValue(playerTwo);

                        that.fabricElement.add(resourceObjectPlayerTwo);
                        that.fabricElement.add(playerTwo.resourcesObject[sources[source].resource]);
                    }

                    addObjects();

                    resolve();

                    reject(new Error("Can`t load resources images"));

                };

            });
            that.imagesLoaded.push(loadSourceImage);
            that.imagesLoaded.push(loadResourceImage);

        } // create one Source and Resource

        public createAllSAndR(playerOne: Player, playerTwo: Player, canvasValues: any): void {
            let sources = Object.keys(canvasValues.relations);
            for (let source of sources) {
                this.createOneSandR(source, playerOne, playerTwo, canvasValues);
            }
        } // create all sources and resources

        public createTowers(playerOne: Player, playerTwo: Player, canvasValues: any): void {

            let that: Canvas = this;
            function createTowerRoof(player: Player): IPath {

                let pos1: string = `0 ${canvasValues.towers.roofHeight}`;
                let pos2: string = `${canvasValues.towers.roofWidth / 2} 0`;
                let pos3: string = `${canvasValues.towers.roofWidth} ${canvasValues.towers.roofHeight}`;

                return new fabric.Path(`M ${pos1} L ${pos2} L ${pos3} z`, {
                    top: -canvasValues.towers.heightStep * player.towerLife,
                    left: -(canvasValues.towers.roofWidth - canvasValues.towers.width) / 2,
                    fill: canvasValues.towers.roofColor,
                    originX: "left",
                    originY: "bottom",
                });
            }
            function createTowerText(player: Player): ITextbox {
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

            function createTextRect(): IRect {
                return new fabric.Rect({
                    width: canvasValues.towers.width,
                    height: canvasValues.towers.height,
                    fill: "white",
                    originX: "left",
                    originY: "top",
                });
            }

            function createTower(player: Player): IRect {

                return new fabric.Rect({
                    width: canvasValues.towers.width,
                    height: canvasValues.towers.heightStep * player.towerLife,
                    fill: canvasValues.towers.towerColor,
                    originX: "left",
                    originY: "bottom",
                });

            }

            let towerObjectPlayerOne: IGroup = new fabric.Group([
                createTowerRoof(playerOne),
                createTower(playerOne),
                createTextRect(),
                createTowerText(playerOne)], {
                objectCaching: false,
                left: canvasValues.towers.padding,
                top: that.height - canvasValues.towers.positionY,
                originX: "left",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });

            let towerObjectPlayerTwo: IGroup = new fabric.Group([
                createTowerRoof(playerTwo),
                createTower(playerTwo),
                createTextRect(),
                createTowerText(playerTwo)], {
                objectCaching: false,
                left: that.width - canvasValues.towers.padding,
                top: that.height - canvasValues.towers.positionY,
                originX: "right",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });

            function addObjects(): void {
                playerOne.towerObject = towerObjectPlayerOne;
                that.fabricElement.add(playerOne.towerObject);
                playerTwo.towerObject = towerObjectPlayerTwo;
                that.fabricElement.add(playerTwo.towerObject);
            }

            addObjects();

        } // createTowers

        public createWalls(playerOne: Player, playerTwo: Player, canvasValues: any) {

            let that: Canvas = this;
            /*        let img = new Image();
             img.src = canvasValues.walls.src;*/

            function createWall(player: Player): IRect {
                return new fabric.Rect({
                    width: canvasValues.walls.width,
                    height: canvasValues.walls.heightStep * player.wallLife,
                    fill: canvasValues.walls.wallColor,
                    originX: "left",
                    originY: "bottom",
                });
            }

            function createWallText(player: Player): ITextbox {
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

            function createTextRect(): IRect {
                return new fabric.Rect({
                    width: canvasValues.walls.width,
                    height: canvasValues.towers.height,
                    fill: "white",
                    originX: "left",
                    originY: "top",
                });
            }

            let wallObjectPlayerOne: IGroup = new fabric.Group([
                createWall(playerOne),
                createTextRect(),
                createWallText(playerOne)], {
                objectCaching: false,
                left: canvasValues.walls.padding,
                top: that.height - canvasValues.walls.positionY,
                originX: "left",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });

            let wallObjectPlayerTwo: IGroup = new fabric.Group([
                createWall(playerTwo),
                createTextRect(),
                createWallText(playerTwo)], {
                objectCaching: false,
                left: that.width - canvasValues.walls.padding,
                top: that.height - canvasValues.walls.positionY,
                originX: "right",
                originY: "bottom",
                selectable: false,
                hasBorders: false,
                hoverCursor: "default",
            });

            function addObjects(): void {
                playerOne.wallObject = wallObjectPlayerOne;
                that.fabricElement.add(playerOne.wallObject);
                playerTwo.wallObject = wallObjectPlayerTwo;
                that.fabricElement.add(playerTwo.wallObject);
            }

            addObjects();

        }

        public drawAll(CARDS: ArcomageCards, cardsValues: any, relations: any,
                       playerOne: Player, playerTwo: Player, canvasValues: any): void {
            this.createCards(CARDS, cardsValues, relations);
            this.createBackOfCard(CARDS, cardsValues);
            this.createNames(playerOne, playerTwo, canvasValues);
            this.createAllSAndR(playerOne, playerTwo, canvasValues);
            this.createTowers(playerOne, playerTwo, canvasValues);
            this.createWalls(playerOne, playerTwo, canvasValues);
        }

    }
}
