import {Canvas} from "./canvas";
import {Param} from "./param";
import {Player} from "./players";

describe("Players class test", () => {

    let canvas: Canvas;
    let param: Param;
    let player: Player;

    beforeEach(() => {
        canvas = new Canvas("", "");
        param = new Param();
        player = new Player(
            "Player",
            {
                towerLife: 10,
                wallLife: 10,
                resources: {
                    bricks: 10,
                    gems: 10,
                    beasts: 10,
                },
                sources: {
                    mine: 1,
                    magic: 1,
                    dungeon: 1,
                },
            },
            param.maxValues,
            param.canvasValues,
            0);
    });

    it("towerLife can`t be more then max value", () => {
        canvas.createTowers(player, player, param.canvasValues);
        player.updateTowerLife(1000);
        expect(player.towerLife).toEqual(param.maxValues.tower);
    });

    it("towerLife can`t be less then 0", () => {
        canvas.createTowers(player, player, param.canvasValues);
        player.updateTowerLife(-1000);
        expect(player.towerLife).toEqual(0);
    });

    it("wallLife can`t be more then max value", () => {
        canvas.createWalls(player, player, param.canvasValues);
        player.updateWallLife(1000);
        expect(player.wallLife).toEqual(param.maxValues.wall);
    });

    it("wallLife can`t be less then 0", () => {
        canvas.createWalls(player, player, param.canvasValues);
        player.updateWallLife(-1000);
        expect(player.wallLife).toEqual(0);
    });

    it("properly sources update", (done) => {
        canvas.createAllSAndR(player, player, param.canvasValues);
        Promise.all(canvas.imagesLoaded).then(() => {
            player.updateSources({
                mine: 1,
                magic: 2,
                dungeon: 3,
            });
            expect(player.sources).toEqual({
                mine: 2,
                magic: 3,
                dungeon: 4,
            });
            done();
        });
    });

    it("sources can`t be less then 1", (done) => {
        canvas.createAllSAndR(player, player, param.canvasValues);
        Promise.all(canvas.imagesLoaded).then(() => {
            player.updateSources({
                mine: -10,
                magic: -10,
                dungeon: -10,
            });
            expect(player.sources).toEqual({
                mine: 1,
                magic: 1,
                dungeon: 1,
            });
            done();
        });
    });

    it("sources can`t be more the max value", (done) => {
        canvas.createAllSAndR(player, player, param.canvasValues);
        Promise.all(canvas.imagesLoaded).then(() => {
            player.updateSources({
                mine: 1000,
                magic: 1000,
                dungeon: 1000,
            });
            expect(player.sources).toEqual({
                mine: param.maxValues.sources,
                magic: param.maxValues.sources,
                dungeon: param.maxValues.sources,
            });
            done();
        });
    });

    it("properly resources update", (done) => {
        canvas.createAllSAndR(player, player, param.canvasValues);
        Promise.all(canvas.imagesLoaded).then(() => {
            player.updateResources({
                bricks: 1,
                gems: 2,
                beasts: 3,
            });
            expect(player.resources).toEqual({
                bricks: 11,
                gems: 12,
                beasts: 13,
            });
            done();
        });
    });

    it("resources can`t be less then 0", (done) => {
        canvas.createAllSAndR(player, player, param.canvasValues);
        Promise.all(canvas.imagesLoaded).then(() => {
            player.updateResources({
                bricks: -10,
                gems: -10,
                beasts: -10,
            });
            expect(player.resources).toEqual({
                bricks: 0,
                gems: 0,
                beasts: 0,
            });
            done();
        });
    });

    it("resources can`t be more then max values", (done) => {
        canvas.createAllSAndR(player, player, param.canvasValues);
        Promise.all(canvas.imagesLoaded).then(() => {
            player.updateResources({
                bricks: 1000,
                gems: 1000,
                beasts: 1000,
            });
            expect(player.resources).toEqual({
                bricks: param.maxValues.resources,
                gems: param.maxValues.resources,
                beasts: param.maxValues.resources,
            });
            done();
        });
    });

    it("player takes damage: less then wallLife", () => {
        canvas.createWalls(player, player, param.canvasValues);
        canvas.createTowers(player, player, param.canvasValues);
        player.takeDamage(5);
        expect(player.wallLife).toEqual(5);
    });

    it("player takes damage: more then wallLife less then towerLife", () => {
        canvas.createWalls(player, player, param.canvasValues);
        canvas.createTowers(player, player, param.canvasValues);
        player.takeDamage(15);
        expect(player.wallLife).toEqual(0);
        expect(player.towerLife).toEqual(5);
    });

    it("player takes damage: more then wallLife plus towerLife", () => {
        canvas.createWalls(player, player, param.canvasValues);
        canvas.createTowers(player, player, param.canvasValues);
        player.takeDamage(1000);
        expect(player.wallLife).toEqual(0);
        expect(player.towerLife).toEqual(0);
    });

});
