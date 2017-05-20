import {Canvas} from "./canvas";
import {ArcomageCards} from "./cards";
import {Cookie} from "./cookie";
import {DOM} from "./dom";
import {Events} from "./events";
import {Arcomage} from "./game";
import {Param} from "./param";

export class Loader {

    /**
     * Hides loader
     */
    public static hideLoader(): void {
        const elem: HTMLElement = document.getElementById("loader");
        elem.style.display = "none";
    }

    /**
     * Shows canvas div
     */
    public static showCanvas(): void {
        const canvas: HTMLElement = document.getElementById("arcomage");
        canvas.style.display = "block";
    }

    /**
     * Analog of htmlspecialchars
     * @param {string} text
     * @returns {string}
     */
    public static escapeHtml(text: string) {
        const map: any = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };
        return text.replace(/[&<>"']/g, (m) => {
            return map[m];
        });
    }

    private paramsObject: Param;
    private cardsObject: ArcomageCards;
    private gameObject: Arcomage;
    private canvasObject: Canvas;
    private eventsObject: Events;
    private domObject: DOM;
    private cookieObject: Cookie;

    /**
     * Get Param class
     * @returns {Param} paramsObject
     */
    get params(): Param {
        return this.paramsObject;
    }

    /**
     * Set Param class
     * @param {Param} newParams
     */
    set params(newParams: Param) {
        this.paramsObject = newParams;
    }

    /**
     * Get ArcomageCards class
     * @returns {ArcomageCards} cardsArray
     */
    get cards(): ArcomageCards {
        return this.cardsObject;
    }

    /**
     * Set ArcomageCards
     * @param {ArcomageCards} newCards
     */
    set cards(newCards: ArcomageCards) {
        this.cardsObject = newCards;
    }

    /**
     * Get Arcomage class
     * @returns {Arcomage} gameObject
     */
    get game(): Arcomage {
        return this.gameObject;
    }

    /**
     * Set Arcomage class
     * @param {Arcomage} newGame
     */
    set game(newGame: Arcomage) {
        this.gameObject = newGame;
    }

    /**
     * Get canvas class
     * @returns {Canvas} canvasObject
     */
    get canvas(): Canvas {
        return this.canvasObject;
    }

    /**
     * Set Canvas class
     * @param {Canvas} newCanvas canvasObject
     */
    set canvas(newCanvas: Canvas) {
        this.canvasObject = newCanvas;
    }

    /**
     * Get Events class
     * @returns {Events} eventsObject
     */
    get events(): Events {
        return this.eventsObject;
    }

    /**
     * Set Events class
     * @param {Events} newEvents
     */
    set events(newEvents: Events) {
        this.eventsObject = newEvents;
    }

    /**
     * Get DOM class
     * @returns {DOM} domObject
     */
    get dom(): DOM {
        return this.domObject;
    }

    /**
     * Set DOM class
     * @param {DOM} newDOM
     */
    set dom(newDOM: DOM) {
        this.domObject = newDOM;
    }

    /**
     * Get Cookie class
     * @returns {Cookie} cookieObject
     */
    get cookie(): Cookie {
        return this.cookieObject;
    }

    /**
     * Set Cookie class
     * @param {Cookie} newCookie
     */
    set cookie(newCookie: Cookie) {
        this.cookieObject = newCookie;
    }

    /**
     * Creates new cookie and erase it when game is over
     */
    public initCookie() {
        this.cookie = new Cookie();
        if (this.cookie.gameIsOff()) {
            this.cookie.removeAll();
        }
    }

    /**
     * Loads all classes step by step
     * @param {string} newPlayerOneName
     * @param {number} difficulty
     * @returns {Promise<Object>}
     */
    public init(newPlayerOneName: string, difficulty: number = 0): Promise<any> {
        const that: Loader = this;

        const promiseChain: Promise<any> = new Promise((resolve, reject) => {

            resolve(new Param());

            reject(new Error("Can`t create Default Parameters!"));

        });

        return promiseChain
            .then((param: Param) => {
                that.params = param;
                that.dom = new DOM();
                return new ArcomageCards();
            })
            .then((cards: ArcomageCards) => {
                that.cards = cards;
                return (that.cookie.cookiesAreSet())
                    ? new Arcomage(
                        that.params,
                        that.cards,
                        that.dom,
                        that.cookie,
                        newPlayerOneName,
                        difficulty,
                        that.cookie.getPlayerTwoName(),
                        that.cookie.getPlayerOneValues(),
                        that.cookie.getPlayerTwoValues())
                    : new Arcomage(
                        that.params,
                        that.cards,
                        that.dom,
                        that.cookie,
                        newPlayerOneName,
                        difficulty);
            })
            .then((game: Arcomage) => {
                that.game = game;
                return new Canvas(that.params.canvasDivId, that.params.canvasId);
            }).then((canvas: Canvas) => {
                that.canvas = canvas;
                that.canvas.setCanvasDimensions();
            })
            .then(() => {
                that.canvas.drawAll(
                    that.cards,
                    that.params.cardsValues,
                    that.params.relations,
                    that.game.playerOne,
                    that.game.playerTwo,
                    that.params.canvasValues);
                return new Events(that.params, that.cards, that.canvas, that.game);
            })
            .then((events: Events) => {
                that.events = events;
                return that.canvas.imagesLoaded;
            })
            .then((imagesPromises: Array<Promise<any>>) => {
                return Promise.all(imagesPromises);
            });
    }

    /**
     * Game launcher
     * @param {string} newPlayerOneName
     * @param {number} difficulty
     */
    public start(newPlayerOneName: string, difficulty: number = 0): void {
        const that = this;
        this.init(Loader.escapeHtml(newPlayerOneName), difficulty).then(() => {
            that.events.init();
            Loader.hideLoader();
            Loader.showCanvas();
            if (that.cookie.cookiesAreSet()) {
                that.game.allotCardsFromCookies();
            } else {
                that.game.allotCards(that.game.playerOne);
                that.game.allotCards(that.game.playerTwo);
            }
            that.game.drawCards(that.canvas, that.game.playerOne);
        });
    }

}
