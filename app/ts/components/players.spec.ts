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
                towerLife: [10, 10, 10],
                wallLife: [10, 15, 5],
                resources: [
                    {bricks: 10, gems: 10, beasts: 10},
                    {bricks: 10, gems: 5, beasts: 10},
                    {bricks: 10, gems: 5, beasts: 5},
                ],
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

    it("properly sources update", () => {
        setTimeout(() => {
            canvas.createAllSAndR(player, player, param.canvasValues);
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
        }, 2000);
    });

});
