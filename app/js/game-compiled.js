"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arcomage = function () {
    function Arcomage() {
        var player = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Player";

        _classCallCheck(this, Arcomage);

        this.player = new Player(player);
        this.CPU = new Player("CPU");

        this.CARDS_QUANTITY = 2;
    }

    _createClass(Arcomage, null, [{
        key: "applyCard",
        value: function applyCard(cardName, player, enemy) {
            CARDS[cardName].action(player, enemy);
            CARDS[cardName].active = true;
        }
    }, {
        key: "allotCards",
        value: function allotCards(player) {
            if (player.getCards().length < this.CARDS_QUANTITY) {

                var randomCard = Math.floor(Math.random() * getCardsNames().length);

                if (!CARDS[getCardsNames()[randomCard]].isActive) {
                    CARDS[getCardsNames()[randomCard]].isActive = true;
                    player.updateCards(CARDS[getCardsNames()[randomCard]]);
                } else this.allotCards(player);
            }
        }
    }]);

    return Arcomage;
}();

var game = new Arcomage();

Arcomage.applyCard("new_equipment", game.player, game.CPU);

Arcomage.allotCards(game.player);
Arcomage.allotCards(game.player);
console.log(game.player);
//Arcomage.allotCards(game.CPU);

//# sourceMappingURL=game-compiled.js.map