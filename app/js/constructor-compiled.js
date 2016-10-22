"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var Player = function () {
        function Player(name) {
            var tower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
            var wall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
            var resources = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
                "bricks": 10,
                "gems": 10,
                "beasts": 10
            };

            _classCallCheck(this, Player);

            this.playerName = name;
            this.playerTower = tower;
            this.playerWall = wall;
            this.playerResources = resources;
            this.playerCards = [];
        }

        _createClass(Player, [{
            key: "getName",
            value: function getName() {
                return this.playerName;
            }
        }, {
            key: "getTower",
            value: function getTower() {
                return this.playerTower;
            }
        }, {
            key: "getWall",
            value: function getWall() {
                return this.playerWall;
            }
        }, {
            key: "getResources",
            value: function getResources() {
                return this.playerResources;
            }
        }, {
            key: "getCards",
            value: function getCards() {
                return this.playerCards;
            }
        }, {
            key: "updateTower",
            value: function updateTower(value) {
                this.playerTower += parseInt(value, 10);
            }
        }, {
            key: "updateWall",
            value: function updateWall(value) {
                this.playerWall += parseInt(value, 10);
            }
        }, {
            key: "updateResources",
            value: function updateResources(resource) {}
        }]);

        return Player;
    }();

    var player = new Player('Sergey');

    console.log(player.getResources().bricks);
})();

//# sourceMappingURL=constructor-compiled.js.map