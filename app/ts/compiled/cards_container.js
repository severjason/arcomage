var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class ArcomageCardsContainer {
        constructor() {
            this.cardsArray = {
                amethyst: {
                    name: "amethyst",
                    source: "magic",
                    description: {
                        eng: "Amethyst",
                    },
                    text: {
                        eng: "+3 tower",
                    },
                    src: "./images/cards/amethyst.png",
                    resource: {
                        gems: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -2 });
                        player.updateTowerLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                apprentice: {
                    name: "apprentice",
                    source: "magic",
                    description: {
                        eng: "Apprentice",
                    },
                    text: {
                        eng: "+4 tower,\nyou lose 3 beasts,\n2 damage to enemy tower",
                    },
                    src: "./images/cards/apprentice.png",
                    resource: {
                        gems: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -5, beasts: -3 });
                        player.updateTowerLife(4);
                        enemy.updateTowerLife(-2);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                barracks: {
                    name: "barracks",
                    source: "mine",
                    description: {
                        eng: "Barracks",
                    },
                    text: {
                        eng: "+6 beasts, +6 wall,\nif dungeon <\nenemy dungeon,\n+1 dungeon",
                    },
                    src: "./images/cards/barracks.png",
                    resource: {
                        bricks: 10,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -10, beasts: 6 });
                        player.updateWallLife(6);
                        if (player.sources.dungeon < enemy.sources.dungeon) {
                            player.updateSources({ dungeon: 1 });
                        }
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                basic_wall: {
                    name: "basic_wall",
                    source: "mine",
                    description: {
                        eng: "Basic wall",
                    },
                    text: {
                        eng: "+3 wall",
                    },
                    src: "./images/cards/basic_wall.png",
                    resource: {
                        bricks: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -2 });
                        player.updateWallLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                battlements: {
                    name: "battlements",
                    source: "mine",
                    description: {
                        eng: "Battlements",
                    },
                    text: {
                        eng: "+7 wall,\n6 damage to enemy",
                    },
                    src: "./images/cards/battlements.png",
                    resource: {
                        bricks: 14,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -14 });
                        player.updateWallLife(7);
                        enemy.takeDamage(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                berserker: {
                    name: "berserker",
                    source: "dungeon",
                    description: {
                        eng: "Berserker",
                    },
                    text: {
                        eng: "8 damage,\n3 damage to your tower",
                    },
                    src: "./images/cards/berserker.png",
                    resource: {
                        beasts: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -4 });
                        enemy.takeDamage(8);
                        player.updateTowerLife(-3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                big_wall: {
                    name: "big_wall",
                    source: "mine",
                    description: {
                        eng: "Big wall",
                    },
                    text: {
                        eng: "+6 wall",
                    },
                    src: "./images/cards/big_wall.png",
                    resource: {
                        bricks: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -5 });
                        player.updateWallLife(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                cave_river: {
                    name: "cave_river",
                    source: "mine",
                    description: {
                        eng: "Cave river",
                    },
                    text: {
                        eng: "Player with\n lowest wall\n-1 dungeon and \n -2 tower",
                    },
                    src: "./images/cards/cave_river.png",
                    resource: {
                        bricks: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -6 });
                        if (player.wallLife < enemy.wallLife) {
                            player.updateTowerLife(-2);
                            player.updateSources({ dungeon: -1 });
                        }
                        else if (player.wallLife === enemy.wallLife) {
                            player.updateTowerLife(-2);
                            player.updateSources({ dungeon: -1 });
                            enemy.updateTowerLife(-2);
                            enemy.updateSources({ dungeon: -1 });
                        }
                        else {
                            enemy.updateTowerLife(-2);
                            enemy.updateSources({ dungeon: -1 });
                        }
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                collapse: {
                    name: "collapse",
                    source: "mine",
                    description: {
                        eng: "Collapse!",
                    },
                    text: {
                        eng: "-1 enemy mine",
                    },
                    src: "./images/cards/collapse.png",
                    resource: {
                        bricks: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -4 });
                        enemy.updateSources({ mine: -1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                corrosion_cloud: {
                    name: "corrosion_cloud",
                    source: "dungeon",
                    description: {
                        eng: "Corrosion cloud",
                    },
                    text: {
                        eng: "If enemy wall > 0\n10 damage, else\n7 damage",
                    },
                    src: "./images/cards/corrosion_cloud.png",
                    resource: {
                        beasts: 11,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -11 });
                        (enemy.wallLife > 0) ? enemy.takeDamage(10) : enemy.takeDamage(7);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                crumblestone: {
                    name: "crumblestone",
                    source: "magic",
                    description: {
                        eng: "crumblestone",
                    },
                    text: {
                        eng: "+5 tower,\nenemy loses 6 bricks",
                    },
                    src: "./images/cards/crumblestone.png",
                    resource: {
                        gems: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -7 });
                        player.updateTowerLife(5);
                        enemy.updateResources({ bricks: -6 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                crystallize: {
                    name: "crystallize",
                    source: "magic",
                    description: {
                        eng: "Crystallize",
                    },
                    text: {
                        eng: "+11 tower,\n-6 wall",
                    },
                    src: "./images/cards/crystallize.png",
                    resource: {
                        gems: 8,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -8 });
                        player.updateTowerLife(11);
                        player.updateWallLife(-6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                crystal_rock: {
                    name: "crystal_rock",
                    source: "mine",
                    description: {
                        eng: "Crystal rock",
                    },
                    text: {
                        eng: "+7 wall,\ngain 7 gems",
                    },
                    src: "./images/cards/crystal_rock.png",
                    resource: {
                        bricks: 9,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -9, gems: 7 });
                        player.updateWallLife(7);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                crystal_shield: {
                    name: "crystal_shield",
                    source: "magic",
                    description: {
                        eng: "Crystal shield",
                    },
                    text: {
                        eng: "+8 tower,\n+3 wall",
                    },
                    src: "./images/cards/crystal_shield.png",
                    resource: {
                        gems: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -7 });
                        player.updateTowerLife(8);
                        player.updateWallLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                defective_ore: {
                    name: "defective_ore",
                    source: "mine",
                    description: {
                        eng: "Defective ore",
                    },
                    text: {
                        eng: "All players\n lose 8 bricks",
                    },
                    src: "./images/cards/defective_ore.png",
                    resource: {
                        bricks: 0,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -8 });
                        enemy.updateResources({ bricks: -8 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                defence_magic: {
                    name: "defence_magic",
                    source: "magic",
                    description: {
                        eng: "Defence magic",
                    },
                    text: {
                        eng: "+20 tower",
                    },
                    src: "./images/cards/defence_magic.png",
                    resource: {
                        gems: 21,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -21 });
                        player.updateTowerLife(20);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                demon_slasher: {
                    name: "demon_slasher",
                    source: "dungeon",
                    description: {
                        eng: "Demon slasher",
                    },
                    text: {
                        eng: "6 damage",
                    },
                    src: "./images/cards/demon_slasher.png",
                    resource: {
                        beasts: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -5 });
                        enemy.takeDamage(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                diamond: {
                    name: "diamond",
                    source: "magic",
                    description: {
                        eng: "Diamond",
                    },
                    text: {
                        eng: "+15 tower",
                    },
                    src: "./images/cards/diamond.png",
                    resource: {
                        gems: 16,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -16 });
                        player.updateTowerLife(15);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                discord: {
                    name: "discord",
                    source: "magic",
                    description: {
                        eng: "Discord",
                    },
                    text: {
                        eng: "7 damage to\n all towers,\n all magic -1",
                    },
                    src: "./images/cards/discord.png",
                    resource: {
                        gems: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -5 });
                        player.updateSources({ magic: -1 });
                        player.updateTowerLife(-7);
                        enemy.updateSources({ magic: -1 });
                        enemy.updateTowerLife(-7);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                dragon: {
                    name: "dragon",
                    source: "dungeon",
                    description: {
                        eng: "Dragon",
                    },
                    text: {
                        eng: "20 damage,\nenemy loses 10 gems,\n-1 enemy dungeon",
                    },
                    src: "./images/cards/dragon.png",
                    resource: {
                        beasts: 25,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -25 });
                        enemy.takeDamage(20);
                        enemy.updateResources({ gems: -10 });
                        enemy.updateSources({ dungeon: -1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                dragon_heart: {
                    name: "dragon_heart",
                    source: "mine",
                    description: {
                        eng: "Dragon heart",
                    },
                    text: {
                        eng: "+20 wall,\n+8 tower",
                    },
                    src: "./images/cards/dragon_heart.png",
                    resource: {
                        bricks: 24,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -24 });
                        player.updateWallLife(20);
                        player.updateTowerLife(8);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                dwarf_merchant: {
                    name: "dwarf_merchant",
                    source: "mine",
                    description: {
                        eng: "Dwarf merchant",
                    },
                    text: {
                        eng: "+5 wall,\nyou lose 6 gems",
                    },
                    src: "./images/cards/dwarf_merchant.png",
                    resource: {
                        bricks: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -2, gems: -6 });
                        player.updateWallLife(5);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                dwarf_miner: {
                    name: "dwarf_miner",
                    source: "mine",
                    description: {
                        eng: "Dwarf miner",
                    },
                    text: {
                        eng: "+4 wall,\n+1 mine",
                    },
                    src: "./images/cards/dwarf_miner.png",
                    resource: {
                        bricks: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -7 });
                        player.updateWallLife(4);
                        player.updateSources({
                            mine: 1,
                        });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                dwarfs: {
                    name: "dwarfs",
                    source: "dungeon",
                    description: {
                        eng: "Dwarfs",
                    },
                    text: {
                        eng: "4 damage,\n+3 wall",
                    },
                    src: "./images/cards/dwarfs.png",
                    resource: {
                        beasts: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -5 });
                        enemy.takeDamage(4);
                        player.updateWallLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                earthquake: {
                    name: "earthquake",
                    source: "mine",
                    description: {
                        eng: "Earthquake",
                    },
                    text: {
                        eng: "-1 to all mines",
                    },
                    src: "./images/cards/earthquake.png",
                    resource: {
                        bricks: 0,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -0 });
                        player.updateSources({ mine: -1 });
                        enemy.updateSources({ mine: -1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                elven_archer: {
                    name: "elven_archer",
                    source: "dungeon",
                    description: {
                        eng: "Elven archer",
                    },
                    text: {
                        eng: "If wall > enemy\nwall, 6 damage\nto enemy tower\nelse 6 damage",
                    },
                    src: "./images/cards/elven_archer.png",
                    resource: {
                        beasts: 10,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -10 });
                        (player.wallLife > enemy.wallLife) ? enemy.updateTowerLife(-6) : enemy.takeDamage(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                emerald: {
                    name: "emerald",
                    source: "magic",
                    description: {
                        eng: "Emerald",
                    },
                    text: {
                        eng: "+8 tower",
                    },
                    src: "./images/cards/emerald.png",
                    resource: {
                        gems: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -6 });
                        player.updateTowerLife(8);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                faerie: {
                    name: "faerie",
                    source: "dungeon",
                    description: {
                        eng: "Faerie",
                    },
                    text: {
                        eng: "2 damage,\nplay again",
                    },
                    src: "./images/cards/faerie.png",
                    resource: {
                        beasts: 1,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -1 });
                        enemy.takeDamage(2);
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                fire_ruby: {
                    name: "fire_ruby",
                    source: "magic",
                    description: {
                        eng: "Fire ruby",
                    },
                    text: {
                        eng: "+6 tower,\n4 damage to\n enemy wall\nand tower",
                    },
                    src: "./images/cards/fire_ruby.png",
                    resource: {
                        gems: 13,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -13 });
                        player.updateTowerLife(6);
                        enemy.updateWallLife(-4);
                        enemy.updateTowerLife(-4);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                focused_designs: {
                    name: "focused_designs",
                    source: "mine",
                    description: {
                        eng: "Focused designs",
                    },
                    text: {
                        eng: "+8 wall,\n+5 tower",
                    },
                    src: "./images/cards/focused_designs.png",
                    resource: {
                        bricks: 15,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -15 });
                        player.updateWallLife(8);
                        player.updateTowerLife(5);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                forced_labor: {
                    name: "forced_labor",
                    source: "mine",
                    description: {
                        eng: "Forced labor",
                    },
                    text: {
                        eng: "+9 wall,\nlose 5 beasts",
                    },
                    src: "./images/cards/forced_labor.png",
                    resource: {
                        bricks: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -7, beasts: -5 });
                        player.updateWallLife(9);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                foundations: {
                    name: "foundations",
                    source: "mine",
                    description: {
                        eng: "Foundations",
                    },
                    text: {
                        eng: "If wall = 0,\n+6 wall,\nelse +3 wall",
                    },
                    src: "./images/cards/foundations.png",
                    resource: {
                        bricks: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -3 });
                        (player.wallLife === 0) ? player.updateWallLife(6) : player.updateWallLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                friendly_terrain: {
                    name: "friendly_terrain",
                    source: "mine",
                    description: {
                        eng: "Friendly terrain",
                    },
                    text: {
                        eng: "+1 wall,\nplay again",
                    },
                    src: "./images/cards/friendly_terrain.png",
                    resource: {
                        bricks: 1,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -1 });
                        player.updateWallLife(1);
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                full_moon: {
                    name: "full_moon",
                    source: "dungeon",
                    description: {
                        eng: "Full moon",
                    },
                    text: {
                        eng: "+1 to all dungeons,\nyou gain 3 beasts",
                    },
                    src: "./images/cards/full_moon.png",
                    resource: {
                        beasts: 0,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: 3 });
                        enemy.updateSources({ dungeon: 1 });
                        player.updateSources({ dungeon: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                gargoyle: {
                    name: "gargoyle",
                    source: "dungeon",
                    description: {
                        eng: "Gargoyle",
                    },
                    text: {
                        eng: "2 damage,\n+4 wall,\n+2 tower",
                    },
                    src: "./images/cards/gargoyle.png",
                    resource: {
                        beasts: 8,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -8 });
                        player.updateWallLife(4);
                        player.updateTowerLife(2);
                        enemy.takeDamage(2);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                gem_spear: {
                    name: "gem_spear",
                    source: "magic",
                    description: {
                        eng: "Gem spear",
                    },
                    text: {
                        eng: "5 damage to\nenemy tower",
                    },
                    src: "./images/cards/gem_spear.png",
                    resource: {
                        gems: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -4 });
                        enemy.updateTowerLife(-5);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                gemstone_flaw: {
                    name: "gemstone_flaw",
                    source: "magic",
                    description: {
                        eng: "Gemstone flaw",
                    },
                    text: {
                        eng: "3 damage to\nenemy tower",
                    },
                    src: "./images/cards/gemstone_flaw.png",
                    resource: {
                        gems: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -2 });
                        enemy.updateTowerLife(-3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                gnoll: {
                    name: "gnoll",
                    source: "dungeon",
                    description: {
                        eng: "Gnoll",
                    },
                    text: {
                        eng: "3 damage,\n+1 gem",
                    },
                    src: "./images/cards/gnoll.png",
                    resource: {
                        beasts: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -2, gems: 1 });
                        enemy.takeDamage(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                goblin_archer: {
                    name: "goblin_archer",
                    source: "dungeon",
                    description: {
                        eng: "Goblin archer",
                    },
                    text: {
                        eng: "3 damage to\nenemy tower,\nyou take\n1 damage",
                    },
                    src: "./images/cards/goblin_archer.png",
                    resource: {
                        beasts: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -4 });
                        enemy.updateTowerLife(-3);
                        player.takeDamage(1);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                goblin_mob: {
                    name: "goblin_mob",
                    source: "dungeon",
                    description: {
                        eng: "Goblin mob",
                    },
                    text: {
                        eng: "6 damage,\n you take\n3 damage",
                    },
                    src: "./images/cards/goblin_mob.png",
                    resource: {
                        beasts: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -3 });
                        enemy.takeDamage(6);
                        player.takeDamage(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                gold_mine: {
                    name: "gold_mine",
                    source: "mine",
                    description: {
                        eng: "Gold mine",
                    },
                    text: {
                        eng: "If mine < enemy\nmine, +2 mine,\nelse +1 mine",
                    },
                    src: "./images/cards/gold_mine.png",
                    resource: {
                        bricks: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -4 });
                        (player.sources.mine < enemy.sources.mine)
                            ? player.updateSources({ mine: 2 })
                            : player.updateSources({ mine: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                great_wall: {
                    name: "great_wall",
                    source: "mine",
                    description: {
                        eng: "Great wall",
                    },
                    text: {
                        eng: "+15 wall",
                    },
                    src: "./images/cards/great_wall.png",
                    resource: {
                        bricks: 16,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -16 });
                        player.updateWallLife(15);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                harmonic_ore: {
                    name: "harmonic_ore",
                    source: "mine",
                    description: {
                        eng: "Harmonic ore",
                    },
                    text: {
                        eng: "+6 wall,\n+3 tower",
                    },
                    src: "./images/cards/harmonic_ore.png",
                    resource: {
                        bricks: 11,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -11 });
                        player.updateWallLife(6);
                        player.updateTowerLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                harmony: {
                    name: "harmony",
                    source: "magic",
                    description: {
                        eng: "Harmony",
                    },
                    text: {
                        eng: "+1 magic,\n+3 tower,\n+3 wall",
                    },
                    src: "./images/cards/harmony.png",
                    resource: {
                        gems: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -7 });
                        player.updateSources({ magic: 1 });
                        player.updateWallLife(3);
                        player.updateTowerLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                hydralisk: {
                    name: "hydralisk",
                    source: "dungeon",
                    description: {
                        eng: "Hydralisk",
                    },
                    text: {
                        eng: "If enemy wall\n=0, 10 damage,\nelse 6 damage",
                    },
                    src: "./images/cards/hydralisk.png",
                    resource: {
                        beasts: 8,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -8 });
                        (enemy.wallLife === 0) ? enemy.takeDamage(10) : enemy.takeDamage(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                imp: {
                    name: "imp",
                    source: "dungeon",
                    description: {
                        eng: "Imp",
                    },
                    text: {
                        eng: "6 damage, all\nplayers lose 5 bricks, gems and beasts",
                    },
                    src: "./images/cards/imp.png",
                    resource: {
                        beasts: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -10, bricks: -5, gems: -5 });
                        enemy.updateResources({ beasts: -5, bricks: -5, gems: -5 });
                        enemy.takeDamage(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                innovations: {
                    name: "innovations",
                    source: "mine",
                    description: {
                        eng: "Innovations",
                    },
                    text: {
                        eng: "+1 to all player`s mines, you gain 4 gems",
                    },
                    src: "./images/cards/innovations.png",
                    resource: {
                        bricks: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -2, gems: 4 });
                        player.updateSources({ mine: 1 });
                        enemy.updateSources({ mine: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                lightning_shard: {
                    name: "lightning_shard",
                    source: "magic",
                    description: {
                        eng: "Lightning shard",
                    },
                    text: {
                        eng: "If tower > enemy\nwall, 8 damage\nto enemy tower,\nelse 8 damage",
                    },
                    src: "./images/cards/lightning_shard.png",
                    resource: {
                        gems: 11,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -11 });
                        (player.towerLife > enemy.wallLife) ? enemy.updateTowerLife(-8) : enemy.takeDamage(8);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                lodestone: {
                    name: "lodestone",
                    source: "magic",
                    description: {
                        eng: "Lodestone",
                    },
                    text: {
                        eng: "+3 tower, this\n card can`t be discarded without playing it",
                    },
                    src: "./images/cards/lodestone.png",
                    resource: {
                        gems: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -5 });
                        player.updateTowerLife(3);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                lucky_coin: {
                    name: "lucky_coin",
                    source: "mine",
                    description: {
                        eng: "Lucky coin",
                    },
                    text: {
                        eng: "+2 bricks,\n+2 gems,\nplay again",
                    },
                    src: "./images/cards/lucky_coin.png",
                    resource: {
                        bricks: 0,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: 2, gems: 2 });
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                mad_cow_disease: {
                    name: "mad_cow_disease",
                    source: "dungeon",
                    description: {
                        eng: "Mad cow disease",
                    },
                    text: {
                        eng: "All players lose 6 beasts",
                    },
                    src: "./images/cards/mad_cow_disease.png",
                    resource: {
                        beasts: 0,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -6 });
                        enemy.updateResources({ beasts: -6 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                magic_book: {
                    name: "magic_book",
                    source: "magic",
                    description: {
                        eng: "Magic book",
                    },
                    text: {
                        eng: "+8 tower,\n+1 dungeon",
                    },
                    src: "./images/cards/magic_book.png",
                    resource: {
                        gems: 14,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -14 });
                        player.updateSources({ dungeon: 1 });
                        player.updateTowerLife(8);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                meditation: {
                    name: "meditation",
                    source: "magic",
                    description: {
                        eng: "Meditation",
                    },
                    text: {
                        eng: "+13 tower,\n+6 beasts,\n+6 bricks",
                    },
                    src: "./images/cards/meditation.png",
                    resource: {
                        gems: 18,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: 6, bricks: 6, gems: -18 });
                        player.updateTowerLife(13);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                medusa: {
                    name: "medusa",
                    source: "dungeon",
                    description: {
                        eng: "Medusa",
                    },
                    text: {
                        eng: "6 damage,\n enemy loses\n 3 beasts",
                    },
                    src: "./images/cards/medusa.png",
                    resource: {
                        beasts: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -6 });
                        enemy.updateResources({ beasts: -3 });
                        enemy.takeDamage(6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                miners: {
                    name: "miners",
                    source: "mine",
                    description: {
                        eng: "Miners",
                    },
                    text: {
                        eng: "+1 mine",
                    },
                    src: "./images/cards/miners.png",
                    resource: {
                        bricks: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -3 });
                        player.updateSources({ mine: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                minotaur: {
                    name: "minotaur",
                    source: "dungeon",
                    description: {
                        eng: "Minotaur",
                    },
                    text: {
                        eng: "+1 dungeon",
                    },
                    src: "./images/cards/minotaur.png",
                    resource: {
                        beasts: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -3 });
                        player.updateSources({ dungeon: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                mondo_wall: {
                    name: "mondo_wall",
                    source: "mine",
                    description: {
                        eng: "Mondo wall",
                    },
                    text: {
                        eng: "+12 wall",
                    },
                    src: "./images/cards/mondo_wall.png",
                    resource: {
                        bricks: 13,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -13 });
                        player.updateWallLife(12);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                moody_goblins: {
                    name: "moody_goblins",
                    source: "dungeon",
                    description: {
                        eng: "Moody goblins",
                    },
                    text: {
                        eng: "4 damage,\nyou lose 3 gems",
                    },
                    src: "./images/cards/moody_goblins.png",
                    resource: {
                        beasts: 1,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -1, gems: -3 });
                        enemy.takeDamage(4);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                new_equipment: {
                    name: "new_equipment",
                    source: "mine",
                    description: {
                        eng: "New equipment",
                    },
                    text: {
                        eng: "+2 mine",
                    },
                    src: "./images/cards/new_equipment.png",
                    resource: {
                        bricks: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -6 });
                        player.updateSources({ mine: 2 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                ogre: {
                    name: "ogre",
                    source: "dungeon",
                    description: {
                        eng: "Ogre",
                    },
                    text: {
                        eng: "7 damage",
                    },
                    src: "./images/cards/ogre.png",
                    resource: {
                        beasts: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -6 });
                        enemy.takeDamage(7);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                orc: {
                    name: "orc",
                    source: "dungeon",
                    description: {
                        eng: "Orc",
                    },
                    text: {
                        eng: "5 damage",
                    },
                    src: "./images/cards/orc.png",
                    resource: {
                        beasts: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -3 });
                        enemy.takeDamage(5);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                parity: {
                    name: "parity",
                    source: "magic",
                    description: {
                        eng: "Parity",
                    },
                    text: {
                        eng: "All player`s magic equals the highest player`s magic",
                    },
                    src: "./images/cards/parity.png",
                    resource: {
                        gems: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -7 });
                        (player.sources.magic > enemy.sources.magic)
                            ? enemy.updateSources({ magic: player.sources.magic - enemy.sources.magic })
                            : player.updateSources({ magic: enemy.sources.magic - player.sources.magic });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                pearl_of_wisdom: {
                    name: "pearl_of_wisdom",
                    source: "magic",
                    description: {
                        eng: "Pearl of wisdom",
                    },
                    text: {
                        eng: "+5 tower\n+1 magic",
                    },
                    src: "./images/cards/pearl_of_wisdom.png",
                    resource: {
                        gems: 9,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -9 });
                        player.updateTowerLife(5);
                        player.updateSources({ magic: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                pegasus: {
                    name: "pegasus",
                    source: "dungeon",
                    description: {
                        eng: "Pegasus",
                    },
                    text: {
                        eng: "12 damage to\n enemy tower",
                    },
                    src: "./images/cards/pegasus.png",
                    resource: {
                        beasts: 18,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -18 });
                        enemy.updateTowerLife(-12);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                portcullis: {
                    name: "portcullis",
                    source: "mine",
                    description: {
                        eng: "Portcullis",
                    },
                    text: {
                        eng: "+5 wall\n+1 dungeon",
                    },
                    src: "./images/cards/portcullis.png",
                    resource: {
                        bricks: 9,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -9 });
                        player.updateWallLife(5);
                        player.updateSources({ dungeon: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                power_burn: {
                    name: "power_burn",
                    source: "magic",
                    description: {
                        eng: "Power burn",
                    },
                    text: {
                        eng: "5 damage to\nyour tower,\n+2 magic",
                    },
                    src: "./images/cards/power_burn.png",
                    resource: {
                        gems: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -3 });
                        player.updateTowerLife(-5);
                        player.updateSources({ magic: 2 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                prism: {
                    name: "prism",
                    source: "magic",
                    description: {
                        eng: "Prism",
                    },
                    text: {
                        eng: "If tower <\nenemy tower\n+2 tower,\nelse +1 tower",
                    },
                    src: "./images/cards/prism.png",
                    resource: {
                        gems: 0,
                    },
                    action: (player, enemy) => {
                        (player.towerLife < enemy.towerLife) ? player.updateTowerLife(2) : player.updateTowerLife(1);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                quarrys_help: {
                    name: "quarrys_help",
                    source: "magic",
                    description: {
                        eng: "Quarry`s help",
                    },
                    text: {
                        eng: "+7 tower,\nlose 10 bricks",
                    },
                    src: "./images/cards/quarrys_help.png",
                    resource: {
                        gems: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -4, bricks: -10 });
                        player.updateTowerLife(7);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                quartz: {
                    name: "quartz",
                    source: "magic",
                    description: {
                        eng: "Quartz",
                    },
                    text: {
                        eng: "+1 tower,\nplay again",
                    },
                    src: "./images/cards/quartz.png",
                    resource: {
                        gems: 1,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -1 });
                        player.updateTowerLife(1);
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                rainbow: {
                    name: "rainbow",
                    source: "magic",
                    description: {
                        eng: "Rainbow",
                    },
                    text: {
                        eng: "+1 tower to\nall players,\nyou gain 3 gems",
                    },
                    src: "./images/cards/rainbow.png",
                    resource: {
                        gems: 0,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: 3 });
                        player.updateTowerLife(1);
                        enemy.updateTowerLife(1);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                rare_ring: {
                    name: "rare_ring",
                    source: "magic",
                    description: {
                        eng: "Rare ring",
                    },
                    text: {
                        eng: "+1 magic,\n+3 tower,\n+1 enemy tower",
                    },
                    src: "./images/cards/rare_ring.png",
                    resource: {
                        gems: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -6 });
                        player.updateSources({ magic: 1 });
                        player.updateTowerLife(3);
                        enemy.updateTowerLife(1);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                reinforced_wall: {
                    name: "reinforced_wall",
                    source: "mine",
                    description: {
                        eng: "Reinforced wall",
                    },
                    text: {
                        eng: "+8 wall",
                    },
                    src: "./images/cards/reinforced_wall.png",
                    resource: {
                        bricks: 8,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -8 });
                        player.updateWallLife(8);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                rock_garden: {
                    name: "rock_garden",
                    source: "mine",
                    description: {
                        eng: "Rock garden",
                    },
                    text: {
                        eng: "+1 wall,\n+1 tower,\n+2 beasts",
                    },
                    src: "./images/cards/rock_garden.png",
                    resource: {
                        bricks: 1,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -1, beasts: 2 });
                        player.updateTowerLife(1);
                        player.updateWallLife(1);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                rock_launcher: {
                    name: "rock_launcher",
                    source: "mine",
                    description: {
                        eng: "Rock launcher",
                    },
                    text: {
                        eng: "+6 wall,\n10 damage",
                    },
                    src: "./images/cards/rock_launcher.png",
                    resource: {
                        bricks: 18,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -18 });
                        player.updateWallLife(6);
                        enemy.takeDamage(10);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                ruby: {
                    name: "ruby",
                    source: "magic",
                    description: {
                        eng: "Ruby",
                    },
                    text: {
                        eng: "+5 tower",
                    },
                    src: "./images/cards/ruby.png",
                    resource: {
                        gems: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -3 });
                        player.updateTowerLife(5);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                sapphire: {
                    name: "sapphire",
                    source: "magic",
                    description: {
                        eng: "Sapphire",
                    },
                    text: {
                        eng: "+11 tower",
                    },
                    src: "./images/cards/sapphire.png",
                    resource: {
                        gems: 10,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -10 });
                        player.updateTowerLife(11);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                secret_cave: {
                    name: "secret_cave",
                    source: "mine",
                    description: {
                        eng: "Secret cave",
                    },
                    text: {
                        eng: "+1 magic,\nplay again",
                    },
                    src: "./images/cards/secret_cave.png",
                    resource: {
                        bricks: 8,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -8 });
                        player.updateSources({ magic: 1 });
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                shadow_fairy: {
                    name: "shadow_fairy",
                    source: "magic",
                    description: {
                        eng: "Shadow fairy",
                    },
                    text: {
                        eng: "2 damage to\nenemy tower,\nplay again",
                    },
                    src: "./images/cards/shadow_fairy.png",
                    resource: {
                        gems: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -6 });
                        enemy.updateTowerLife(-2);
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                shatterer: {
                    name: "shatterer",
                    source: "magic",
                    description: {
                        eng: "Shatterer",
                    },
                    text: {
                        eng: "-1 magic,\n9 damage to\nenemy tower",
                    },
                    src: "./images/cards/shatterer.png",
                    resource: {
                        gems: 8,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -8 });
                        player.updateSources({ magic: -1 });
                        enemy.updateTowerLife(-9);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                shift: {
                    name: "shift",
                    source: "mine",
                    description: {
                        eng: "Shift",
                    },
                    text: {
                        eng: "Switch your wall with enemy wall",
                    },
                    src: "./images/cards/shift.png",
                    resource: {
                        bricks: 17,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -17 });
                        let playerWall = player.wallLife;
                        let enemyWall = enemy.wallLife;
                        player.updateWallLife(enemyWall - playerWall);
                        enemy.updateWallLife(playerWall - enemyWall);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                smoky_quartz: {
                    name: "smoky_quartz",
                    source: "magic",
                    description: {
                        eng: "Smoky quartz",
                    },
                    text: {
                        eng: "1 damage to\nenemy tower,\nplay again",
                    },
                    src: "./images/cards/smoky_quartz.png",
                    resource: {
                        gems: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -2 });
                        enemy.updateTowerLife(-1);
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                snake: {
                    name: "snake",
                    source: "dungeon",
                    description: {
                        eng: "Snake",
                    },
                    text: {
                        eng: "4 damage to\n enemy tower",
                    },
                    src: "./images/cards/snake.png",
                    resource: {
                        beasts: 6,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -6 });
                        enemy.updateTowerLife(-4);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                solar_flare: {
                    name: "solar_flare",
                    source: "magic",
                    description: {
                        eng: "Solar flare",
                    },
                    text: {
                        eng: "+2 tower,\n2 damage to\nenemy tower",
                    },
                    src: "./images/cards/solar_flare.png",
                    resource: {
                        gems: 4,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -4 });
                        player.updateTowerLife(2);
                        enemy.updateTowerLife(-2);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                spearman: {
                    name: "spearman",
                    source: "dungeon",
                    description: {
                        eng: "Spearman",
                    },
                    text: {
                        eng: "If wall > enemy\nwall do 3 damage,\nelse do 2 damage",
                    },
                    src: "./images/cards/spearman.png",
                    resource: {
                        beasts: 2,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -2 });
                        (player.wallLife > enemy.wallLife) ? enemy.takeDamage(3) : enemy.takeDamage(2);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                spell_weavers: {
                    name: "spell_weavers",
                    source: "magic",
                    description: {
                        eng: "Spell weavers",
                    },
                    text: {
                        eng: "+1 magic",
                    },
                    src: "./images/cards/spell_weavers.png",
                    resource: {
                        gems: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -3 });
                        player.updateSources({ magic: 1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                stone_giant: {
                    name: "stone_giant",
                    source: "dungeon",
                    description: {
                        eng: "Stone giant",
                    },
                    text: {
                        eng: "10 damage,\n+4 wall",
                    },
                    src: "./images/cards/stone_giant.png",
                    resource: {
                        beasts: 15,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -15 });
                        player.updateWallLife(4);
                        enemy.takeDamage(10);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                strudy_wall: {
                    name: "strudy_wall",
                    source: "mine",
                    description: {
                        eng: "Strudy wall",
                    },
                    text: {
                        eng: "+4 wall",
                    },
                    src: "./images/cards/strudy_wall.png",
                    resource: {
                        bricks: 3,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -3 });
                        player.updateWallLife(4);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                succubus: {
                    name: "succubus",
                    source: "dungeon",
                    description: {
                        eng: "Succubus",
                    },
                    text: {
                        eng: "5 damage to\nenemy tower,\nenemy loses\n8 beasts",
                    },
                    src: "./images/cards/succubus.png",
                    resource: {
                        beasts: 14,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -14 });
                        enemy.updateResources({ beasts: -8 });
                        enemy.updateTowerLife(-5);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                technology_copping: {
                    name: "technology_copping",
                    source: "mine",
                    description: {
                        eng: "Technology copping",
                    },
                    text: {
                        eng: "If mine < enemy\nmine, mine =\nenemy mine",
                    },
                    src: "./images/cards/technology_copping.png",
                    resource: {
                        bricks: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -5 });
                        if (player.sources.mine < enemy.sources.mine) {
                            player.updateSources({ mine: enemy.sources.mine - player.sources.mine });
                        }
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                thief: {
                    name: "thief",
                    source: "dungeon",
                    description: {
                        eng: "Thief",
                    },
                    text: {
                        eng: "Enemy loses 10 gems,\n 6 bricks, you gain half of that",
                    },
                    src: "./images/cards/thief.png",
                    resource: {
                        beasts: 12,
                    },
                    action: (player, enemy) => {
                        let enemyGems = ((enemy.resources.gems - 10) > 0)
                            ? (enemy.resources.gems - 10)
                            : enemy.resources.gems;
                        let enemyBricks = ((enemy.resources.bricks - 6) > 0)
                            ? (enemy.resources.bricks - 6)
                            : enemy.resources.bricks;
                        player.updateResources({
                            beasts: -12,
                            gems: Math.floor(enemyGems / 2),
                            bricks: Math.floor(enemyBricks / 2),
                        });
                        enemy.updateResources({ gems: -10, bricks: -6 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                topaz: {
                    name: "topaz",
                    source: "magic",
                    description: {
                        eng: "Topaz",
                    },
                    text: {
                        eng: "+12 tower,\n6 damage to\nenemy wall and tower",
                    },
                    src: "./images/cards/topaz.png",
                    resource: {
                        gems: 17,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ gems: -17 });
                        player.updateTowerLife(12);
                        enemy.updateWallLife(-6);
                        enemy.updateTowerLife(-6);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                tremor: {
                    name: "tremor",
                    source: "mine",
                    description: {
                        eng: "Tremor",
                    },
                    text: {
                        eng: "All walls take\n 5 damage,\nplay again",
                    },
                    src: "./images/cards/tremor.png",
                    resource: {
                        bricks: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ bricks: -7 });
                        player.updateWallLife(-5);
                        enemy.updateWallLife(-5);
                    },
                    isActive: false,
                    playAgain: true,
                    object: {},
                    backObject: {},
                },
                troll: {
                    name: "troll",
                    source: "dungeon",
                    description: {
                        eng: "Troll",
                    },
                    text: {
                        eng: "+2 dungeon",
                    },
                    src: "./images/cards/troll.png",
                    resource: {
                        beasts: 7,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -7 });
                        player.updateSources({ dungeon: 2 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                unicorn: {
                    name: "unicorn",
                    source: "dungeon",
                    description: {
                        eng: "Unicorn",
                    },
                    text: {
                        eng: "If magic > enemy\nmagic, 12 damage,\nelse 8 damage",
                    },
                    src: "./images/cards/unicorn.png",
                    resource: {
                        beasts: 9,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -9 });
                        (player.sources.magic > enemy.sources.magic) ? enemy.takeDamage(12) : enemy.takeDamage(8);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                vampire: {
                    name: "vampire",
                    source: "dungeon",
                    description: {
                        eng: "Vampire",
                    },
                    text: {
                        eng: "10 damage,\nenemy loses 5 beasts,\n-1 enemy dungeon",
                    },
                    src: "./images/cards/vampire.png",
                    resource: {
                        beasts: 17,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -17 });
                        enemy.takeDamage(10);
                        enemy.updateResources({ beasts: -5 });
                        enemy.updateSources({ dungeon: -1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                warlord: {
                    name: "warlord",
                    source: "dungeon",
                    description: {
                        eng: "Warlord",
                    },
                    text: {
                        eng: "13 damage,\nyou lose 3 gems",
                    },
                    src: "./images/cards/warlord.png",
                    resource: {
                        beasts: 13,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -13, gems: 3 });
                        enemy.takeDamage(13);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                werewolf: {
                    name: "werewolf",
                    source: "dungeon",
                    description: {
                        eng: "Werewolf",
                    },
                    text: {
                        eng: "9 damage",
                    },
                    src: "./images/cards/werewolf.png",
                    resource: {
                        beasts: 5,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -5 });
                        enemy.takeDamage(9);
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
                wolf_sign: {
                    name: "wolf_sign",
                    source: "dungeon",
                    description: {
                        eng: "Wolf sign",
                    },
                    text: {
                        eng: "8 damage,\n-1 enemy mine",
                    },
                    src: "./images/cards/wolf_sign.png",
                    resource: {
                        beasts: 11,
                    },
                    action: (player, enemy) => {
                        player.updateResources({ beasts: -11 });
                        enemy.takeDamage(8);
                        enemy.updateSources({ mine: -1 });
                    },
                    isActive: false,
                    object: {},
                    backObject: {},
                },
            };
            this.discardTxt = "DISCARD";
            this.backOfCardSrc = "./images/cards/back.png";
        }
    }
    ArcomageGame.ArcomageCardsContainer = ArcomageCardsContainer;
})(ArcomageGame || (ArcomageGame = {}));
