import { Canvas } from "./canvas";
import { ArcomageCards } from "./cards";
import { Cookie } from "./cookie";
import { DOM } from "./dom";
import { Events } from "./events";
import { Arcomage } from "./game";
import { Param } from "./param";
export class Loader {
    /**
     * Hides loader
     */
    static hideLoader() {
        const elem = document.getElementById("loader");
        elem.style.display = "none";
    }
    /**
     * Shows canvas div
     */
    static showCanvas() {
        const canvas = document.getElementById("arcomage");
        canvas.style.display = "block";
    }
    /**
     * Analog of htmlspecialchars
     * @param {string} text
     * @returns {string}
     */
    static escapeHtml(text) {
        const map = {
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
    /**
     * Get Param class
     * @returns {Param} paramsObject
     */
    get params() {
        return this.paramsObject;
    }
    /**
     * Set Param class
     * @param {Param} newParams
     */
    set params(newParams) {
        this.paramsObject = newParams;
    }
    /**
     * Get ArcomageCards class
     * @returns {ArcomageCards} cardsArray
     */
    get cards() {
        return this.cardsObject;
    }
    /**
     * Set ArcomageCards
     * @param {ArcomageCards} newCards
     */
    set cards(newCards) {
        this.cardsObject = newCards;
    }
    /**
     * Get Arcomage class
     * @returns {Arcomage} gameObject
     */
    get game() {
        return this.gameObject;
    }
    /**
     * Set Arcomage class
     * @param {Arcomage} newGame
     */
    set game(newGame) {
        this.gameObject = newGame;
    }
    /**
     * Get canvas class
     * @returns {Canvas} canvasObject
     */
    get canvas() {
        return this.canvasObject;
    }
    /**
     * Set Canvas class
     * @param {Canvas} newCanvas canvasObject
     */
    set canvas(newCanvas) {
        this.canvasObject = newCanvas;
    }
    /**
     * Get Events class
     * @returns {Events} eventsObject
     */
    get events() {
        return this.eventsObject;
    }
    /**
     * Set Events class
     * @param {Events} newEvents
     */
    set events(newEvents) {
        this.eventsObject = newEvents;
    }
    /**
     * Get DOM class
     * @returns {DOM} domObject
     */
    get dom() {
        return this.domObject;
    }
    /**
     * Set DOM class
     * @param {DOM} newDOM
     */
    set dom(newDOM) {
        this.domObject = newDOM;
    }
    /**
     * Get Cookie class
     * @returns {Cookie} cookieObject
     */
    get cookie() {
        return this.cookieObject;
    }
    /**
     * Set Cookie class
     * @param {Cookie} newCookie
     */
    set cookie(newCookie) {
        this.cookieObject = newCookie;
    }
    /**
     * Creates new cookie and erase it when game is over
     */
    initCookie() {
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
    init(newPlayerOneName, difficulty = 0) {
        const that = this;
        const promiseChain = new Promise((resolve, reject) => {
            resolve(new Param());
            reject(new Error("Can`t create Default Parameters!"));
        });
        return promiseChain
            .then((param) => {
            that.params = param;
            that.dom = new DOM();
            return new ArcomageCards();
        })
            .then((cards) => {
            that.cards = cards;
            return (that.cookie.cookiesAreSet())
                ? new Arcomage(that.params, that.cards, that.dom, that.cookie, newPlayerOneName, difficulty, that.cookie.getPlayerTwoName(), that.cookie.getPlayerOneValues(), that.cookie.getPlayerTwoValues())
                : new Arcomage(that.params, that.cards, that.dom, that.cookie, newPlayerOneName, difficulty);
        })
            .then((game) => {
            that.game = game;
            return new Canvas(that.params.canvasDivId, that.params.canvasId);
        }).then((canvas) => {
            that.canvas = canvas;
            that.canvas.setCanvasDimensions();
        })
            .then(() => {
            that.canvas.drawAll(that.cards, that.params.cardsValues, that.params.relations, that.game.playerOne, that.game.playerTwo, that.params.canvasValues);
            return new Events(that.params, that.cards, that.canvas, that.game);
        })
            .then((events) => {
            that.events = events;
            return that.canvas.imagesLoaded;
        })
            .then((imagesPromises) => {
            return Promise.all(imagesPromises);
        });
    }
    /**
     * Game launcher
     * @param {string} newPlayerOneName
     * @param {number} difficulty
     */
    start(newPlayerOneName, difficulty = 0) {
        const that = this;
        this.init(Loader.escapeHtml(newPlayerOneName), difficulty).then(() => {
            that.events.init();
            Loader.hideLoader();
            Loader.showCanvas();
            if (that.cookie.cookiesAreSet()) {
                that.game.allotCardsFromCookies();
            }
            else {
                that.game.allotCards(that.game.playerOne);
                that.game.allotCards(that.game.playerTwo);
            }
            that.game.drawCards(that.canvas, that.game.playerOne);
        });
    }
}
