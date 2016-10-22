"use strict";
(function () {
    class Player {

        constructor(name,
                    tower = 15,
                    wall = 5,
                    resources = {
                        "bricks"    :10,
                        "gems"      :10,
                        "beasts"    :10
                    }) {
            this.playerName         = name;
            this.playerTower        = tower;
            this.playerWall         = wall;
            this.playerResources    = resources;
            this.playerCards        = [];
        }

        getName() {
            return this.playerName;
        }
        getTower() {
            return this.playerTower;
        }
        getWall() {
            return this.playerWall;
        }
        getResources() {
            return this.playerResources;
        }
        getCards() {
            return this.playerCards;
        }

        updateTower(value) {
            this.playerTower += parseInt(value, 10);
        }
        updateWall(value) {
            this.playerWall += parseInt(value, 10);
        }
        updateResources(resource) {
            
        }


    }



    let player = new Player('Sergey');


    console.log(player.getResources().bricks);


}());