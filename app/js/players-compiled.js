"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(name) {
        var tower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
        var wall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
        var resources = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
            "bricks": 10,
            "gems": 10,
            "beasts": 10
        };
        var sources = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
            "mine": 1,
            "magic": 1,
            "dungeon": 1
        };

        _classCallCheck(this, Player);

        this.name = name;
        this.tower = parseInt(tower, 10);
        this.wall = parseInt(wall, 10);
        this.resources = resources;
        this.sources = sources;
        this.cards = [];
    }

    _createClass(Player, [{
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "getTower",
        value: function getTower() {
            return this.tower;
        }
    }, {
        key: "getWall",
        value: function getWall() {
            return this.wall;
        }
    }, {
        key: "getResources",
        value: function getResources() {
            return this.resources;
        }
    }, {
        key: "getCards",
        value: function getCards() {
            return this.cards;
        }
    }, {
        key: "updateTower",
        value: function updateTower(value) {
            var newValue = parseInt(value, 10);
            newValue < 0 && Math.abs(newValue) > this.tower ? this.tower = 0 : this.tower += newValue;
        }
    }, {
        key: "updateWall",
        value: function updateWall(value) {
            var newValue = parseInt(value, 10);
            if (newValue < 0 && Math.abs(newValue) > this.wall) {
                var remainder = newValue + this.wall;
                this.wall = 0;
                return remainder;
            } else this.wall += newValue;
        }
    }, {
        key: "updateSources",
        value: function updateSources(newSources) {
            for (var key in newSources) {
                if (newSources.hasOwnProperty(key)) {
                    this.sources[key] += parseInt(newSources[key], 10);
                }
            }
        }
    }, {
        key: "updateResources",
        value: function updateResources(newResources) {
            for (var key in newResources) {
                if (newResources.hasOwnProperty(key)) {
                    this.resources[key] += parseInt(newResources[key], 10);
                }
            }
        }
    }, {
        key: "takeDamage",
        value: function takeDamage(value) {
            var damage = parseInt(value, 10);
            damage <= this.wall ? this.updateWall(-damage) : this.updateTower(this.updateWall(-damage));
        }
    }, {
        key: "updateCards",
        value: function updateCards(card) {
            this.cards.push(card);
        }
    }]);

    return Player;
}();

//# sourceMappingURL=players-compiled.js.map