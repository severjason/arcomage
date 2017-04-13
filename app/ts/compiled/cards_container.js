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
                        rus: "Аметист",
                        eng: "Amethyst",
                    },
                    text: {
                        rus: "+3 башня",
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
                        rus: "Ученик",
                        eng: "Apprentice",
                    },
                    text: {
                        rus: "+4 башня,\nвы теряете 3 зверя,\n2 урона башне врага",
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
                        rus: "Барраки",
                        eng: "Barracks",
                    },
                    text: {
                        rus: "+6 зверей, +6 стена,\nесли темница <\nтемницы врага,\n+1 темница",
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
                        rus: "Базовая стена",
                        eng: "Basic wall",
                    },
                    text: {
                        rus: "+3 стена",
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
                        rus: "Амбразура",
                        eng: "Battlements",
                    },
                    text: {
                        rus: "+7 стена,\n6 урона врагу",
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
                        rus: "Берсерк",
                        eng: "Berserker",
                    },
                    text: {
                        rus: "8 урона,\n3 урона вашей башне",
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
                        rus: "Большая стена",
                        eng: "Big wall",
                    },
                    text: {
                        rus: "+6 стена",
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
                        rus: "Пещерная река",
                        eng: "Cave river",
                    },
                    text: {
                        rus: "Игрок с меньшей\nстеной -1 темница\nи -2 башня",
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
                        rus: "Коллапс!",
                        eng: "Collapse!",
                    },
                    text: {
                        rus: "-1 шахта врага",
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
                        rus: "Коррозионное облако",
                        eng: "Corrosion cloud",
                    },
                    text: {
                        rus: "Если стена врага > 0\n10 урона, иначе 7 урона",
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
                        rus: "Раскрошенный камень",
                        eng: "Crumblestone",
                    },
                    text: {
                        rus: "+5 башня,\nвраг теряет 6 зверей",
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
                        rus: "Кристализация",
                        eng: "Crystallize",
                    },
                    text: {
                        rus: "+11 башня,\n-6 стена",
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
                        rus: "Кристаллический камень",
                        eng: "Crystal rock",
                    },
                    text: {
                        rus: "+7 стена,\nполучаете 7 самоцветов",
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
                        rus: "Кристаллический щит",
                        eng: "Crystal shield",
                    },
                    text: {
                        rus: "+8 башня,\n+ стена",
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
                        rus: "Дефектная руда",
                        eng: "Defective ore",
                    },
                    text: {
                        rus: "Все игроки\nтеряют 8 камней",
                        eng: "All players\nlose 8 bricks",
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
                        rus: "Защитная магия",
                        eng: "Defence magic",
                    },
                    text: {
                        rus: "+20 башня",
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
                        rus: "Демон-воин",
                        eng: "Demon slasher",
                    },
                    text: {
                        rus: "6 урона",
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
                        rus: "Бриллиант",
                        eng: "Diamond",
                    },
                    text: {
                        rus: "+15 башня",
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
                        rus: "Спор",
                        eng: "Discord",
                    },
                    text: {
                        rus: "7 урона всем башням,\nвся магия -1",
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
                        rus: "Дракон",
                        eng: "Dragon",
                    },
                    text: {
                        rus: "20 урона,\nвраг теряет 10 самоцветов,\n-1 темница врага",
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
                        rus: "Сердце дракона",
                        eng: "Dragon heart",
                    },
                    text: {
                        rus: "+20 стена,\n+8 башня",
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
                        rus: "Гном-торговец",
                        eng: "Dwarf merchant",
                    },
                    text: {
                        rus: "+5 стена,\nвы теряете 6 самоцветов",
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
                        rus: "Гном-шахтер",
                        eng: "Dwarf miner",
                    },
                    text: {
                        rus: "+4 стена,\n+1 шахта",
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
                        rus: "Гномы",
                        eng: "Dwarfs",
                    },
                    text: {
                        rus: "4 урона,\n+3 стена",
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
                        rus: "Землетрясение",
                        eng: "Earthquake",
                    },
                    text: {
                        rus: "+1 всем шахтам",
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
                        rus: "Эльф-лучник",
                        eng: "Elven archer",
                    },
                    text: {
                        rus: "Если стена > стены\nврага, 6 урона\nбашне врага,\nиначе 6 урона",
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
                        rus: "Изумруд",
                        eng: "Emerald",
                    },
                    text: {
                        rus: "+8 башня",
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
                        rus: "Фея",
                        eng: "Faerie",
                    },
                    text: {
                        rus: "2 урона,\nходить еще раз",
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
                        rus: "Огненный рубин",
                        eng: "Fire ruby",
                    },
                    text: {
                        rus: "+6 башня,\n4 урона башне\nи стене врага",
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
                        rus: "Новые чертежи",
                        eng: "Focused designs",
                    },
                    text: {
                        rus: "+8 стена,\n+5 башня",
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
                        rus: "Рабский труд",
                        eng: "Forced labor",
                    },
                    text: {
                        rus: "+9 стена,\nтеряете 5 зверей",
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
                        rus: "Фундамент",
                        eng: "Foundations",
                    },
                    text: {
                        rus: "Если стена = 0,\n+6 стена,\nиначе +3 стена",
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
                        rus: "Благодатная почва",
                        eng: "Friendly terrain",
                    },
                    text: {
                        rus: "+1 стена,\nходить еще раз",
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
                        rus: "Полнолуние",
                        eng: "Full moon",
                    },
                    text: {
                        rus: "+1 ко всем темницам,\nвы получаете 3 зверей",
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
                        rus: "Гаргулия",
                        eng: "Gargoyle",
                    },
                    text: {
                        rus: "2 урона,\n+4 стена,\n+2 башня",
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
                        rus: "Рунное копье",
                        eng: "Gem spear",
                    },
                    text: {
                        rus: "5 урона\nбашне врага",
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
                        rus: "Дефектный самоцвет",
                        eng: "Gemstone flaw",
                    },
                    text: {
                        rus: "3 урона\nбашне врага",
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
                        rus: "Гнолл",
                        eng: "Gnoll",
                    },
                    text: {
                        rus: "3 урона,\n+1 самоцвет",
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
                        rus: "Гоблин-лучник",
                        eng: "Goblin archer",
                    },
                    text: {
                        rus: "3 урона башне\nврага, вы получаете\n1 урона",
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
                        rus: "Гоблин",
                        eng: "Goblin mob",
                    },
                    text: {
                        rus: "6 урона,\nвы получаете\n3 урона",
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
                        rus: "Золотая шахта",
                        eng: "Gold mine",
                    },
                    text: {
                        rus: "Если шахта < шахты\nврага, +2 шахта,\nиначе +1 шахта",
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
                        rus: "Великая стена",
                        eng: "Great wall",
                    },
                    text: {
                        rus: "+15 стена",
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
                        rus: "Гармоническая руда",
                        eng: "Harmonic ore",
                    },
                    text: {
                        rus: "+6 стена,\n+3 башня",
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
                        rus: "Гармония",
                        eng: "Harmony",
                    },
                    text: {
                        rus: "+1 магия,\n+3 башня,\n+3 стена",
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
                        rus: "Гидралиск",
                        eng: "Hydralisk",
                    },
                    text: {
                        rus: "Если стена врага = 0,\n10 урона,\nиначе 6 урона",
                        eng: "If enemy wall=0,\n10 damage,\nelse 6 damage",
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
                        rus: "Имп",
                        eng: "Imp",
                    },
                    text: {
                        rus: "6 урона, все\nигроки теряют 5 камней, самоцветов и зверей",
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
                        rus: "Инновации",
                        eng: "Innovations",
                    },
                    text: {
                        rus: "+1 ко всем шахтам,\nвы получаете 4 самоцвета",
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
                        rus: "Удар молнии",
                        eng: "Lightning shard",
                    },
                    text: {
                        rus: "Если башня > башни\nврага, 8 урона, башне врага,\nиначе 8 урона",
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
                        rus: "Магнитная руда",
                        eng: "Lodestone",
                    },
                    text: {
                        rus: "+3 башня",
                        eng: "+3 tower",
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
                        rus: "Счастливая монета",
                        eng: "Lucky coin",
                    },
                    text: {
                        rus: "+2 камня,\n+2 самоцвета,\nходить еще раз",
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
                        rus: "Коровье бешенство",
                        eng: "Mad cow disease",
                    },
                    text: {
                        rus: "Все игроки теряют 6 зверей",
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
                        rus: "Магическая книга",
                        eng: "Magic book",
                    },
                    text: {
                        rus: "+8 башня,\n+1 темница",
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
                        rus: "Медитация",
                        eng: "Meditation",
                    },
                    text: {
                        rus: "+13 башня,\n+6 зверей,\n+6 камней",
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
                        rus: "Медуза",
                        eng: "Medusa",
                    },
                    text: {
                        rus: "6 урона,\nвраг теряет\n3 зверя",
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
                        rus: "Шахтеры",
                        eng: "Miners",
                    },
                    text: {
                        rus: "+1 шахта",
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
                        rus: "Минотавр",
                        eng: "Minotaur",
                    },
                    text: {
                        rus: "+1 темница",
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
                        rus: "Отличная стена",
                        eng: "Mondo wall",
                    },
                    text: {
                        rus: "+12 стена",
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
                        rus: "Угрюмые гоблины",
                        eng: "Moody goblins",
                    },
                    text: {
                        rus: "4 урона,\nвы теряете 3 самоцвета",
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
                        rus: "Новое оборудование",
                        eng: "New equipment",
                    },
                    text: {
                        rus: "+2 шахта",
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
                        rus: "Огр",
                        eng: "Ogre",
                    },
                    text: {
                        rus: "7 урона",
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
                        rus: "Орк",
                        eng: "Orc",
                    },
                    text: {
                        rus: "5 урона",
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
                        rus: "Паритет",
                        eng: "Parity",
                    },
                    text: {
                        rus: "Магия всех игроков равняется магии игрока с большей магией",
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
                        rus: "Жемчужина мудрости",
                        eng: "Pearl of wisdom",
                    },
                    text: {
                        rus: "+5 башня,\n+1 магия",
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
                        rus: "Пегас",
                        eng: "Pegasus",
                    },
                    text: {
                        rus: "12 урона башне врага",
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
                        rus: "Решетка",
                        eng: "Portcullis",
                    },
                    text: {
                        rus: "+5 стена,\n+1 темница",
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
                        rus: "Силовой взрыв",
                        eng: "Power burn",
                    },
                    text: {
                        rus: "5 урона вашей\nбашни, +2 магия",
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
                        rus: "Призма",
                        eng: "Prism",
                    },
                    text: {
                        rus: "Если башня <\nбашни врага\n+2 башния,\nиначе +1 башня",
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
                        rus: "Помощь из карьера",
                        eng: "Quarry`s help",
                    },
                    text: {
                        rus: "+7 башня,\nвы теряете 10 камней",
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
                        rus: "Кварц",
                        eng: "Quartz",
                    },
                    text: {
                        rus: "+1 башня,\nходить еще раз",
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
                        rus: "Радуга",
                        eng: "Rainbow",
                    },
                    text: {
                        rus: "+1 башня всех\nигроков, вы получаете\n3 самоцвета",
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
                        rus: "Редкое кольцо",
                        eng: "Rare ring",
                    },
                    text: {
                        rus: "+1 магия,\n+3 башня,\n+1 башня врага",
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
                        rus: "Усиленная стена",
                        eng: "Reinforced wall",
                    },
                    text: {
                        rus: "+8 стена",
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
                        rus: "Сад камней",
                        eng: "Rock garden",
                    },
                    text: {
                        rus: "+1 стена,\n+1 башня,\n+2 зверя",
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
                        rus: "Камнемет",
                        eng: "Rock launcher",
                    },
                    text: {
                        rus: "+6 стена,\n10 урона",
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
                        rus: "Рубин",
                        eng: "Ruby",
                    },
                    text: {
                        rus: "+5 башня",
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
                        rus: "Сапфир",
                        eng: "Sapphire",
                    },
                    text: {
                        rus: "+11 башня",
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
                        rus: "Секретная пещера",
                        eng: "Secret cave",
                    },
                    text: {
                        rus: "+1 магия,\nходить еще раз",
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
                        rus: "Темная фея",
                        eng: "Shadow fairy",
                    },
                    text: {
                        rus: "2 урона\nбашне врага,\nходить еще раз",
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
                        rus: "Обломки",
                        eng: "Shatterer",
                    },
                    text: {
                        rus: "-1 магия,\n9 урона\nбашне врага",
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
                        rus: "Сдвиг",
                        eng: "Shift",
                    },
                    text: {
                        rus: "Поменяй свою стену со стеной врага",
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
                        rus: "Дымчатый кварц",
                        eng: "Smoky quartz",
                    },
                    text: {
                        rus: "1 урона\nбашне врага,\nходить еще раз",
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
                        rus: "Змея",
                        eng: "Snake",
                    },
                    text: {
                        rus: "4 урона\nбашне врага",
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
                        rus: "Солнечное затмение",
                        eng: "Solar flare",
                    },
                    text: {
                        rus: "+2 башня,\n2 урона\nбашне врага",
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
                        rus: "Копьеносец",
                        eng: "Spearman",
                    },
                    text: {
                        rus: "Если стена > стены\nврага 3 урона,\nиначе 2 урона",
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
                        rus: "Заклинатели",
                        eng: "Spell weavers",
                    },
                    text: {
                        rus: "+1 магия",
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
                        rus: "Каменный гигант",
                        eng: "Stone giant",
                    },
                    text: {
                        rus: "10 урона,\n+4 стена",
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
                    name: "sturdy_wall",
                    source: "mine",
                    description: {
                        rus: "Крепкая стена",
                        eng: "Sturdy wall",
                    },
                    text: {
                        rus: "+4 стена",
                        eng: "+4 wall",
                    },
                    src: "./images/cards/sturdy_wall.png",
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
                        rus: "Суккуб",
                        eng: "Succubus",
                    },
                    text: {
                        rus: "5 урона\nбашне врага,\nвраг теряет\n8 зверей",
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
                        rus: "Кража технологий",
                        eng: "Technology copping",
                    },
                    text: {
                        rus: "Если шахта < шахты\nврага, шахта =\nшахте врага",
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
                        rus: "Вор",
                        eng: "Thief",
                    },
                    text: {
                        rus: "Враг теряет 10 самоцветов, 6 камней, вы получаете половину",
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
                        rus: "Топаз",
                        eng: "Topaz",
                    },
                    text: {
                        rus: "+12 башня,\n6 урона башне\nи стене врага",
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
                        rus: "Дрожь",
                        eng: "Tremor",
                    },
                    text: {
                        rus: "Все стены\nполучают 5 урона,\nходить еще раз",
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
                        rus: "Тролль",
                        eng: "Troll",
                    },
                    text: {
                        rus: "+2 темницы",
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
                        rus: "Единорог",
                        eng: "Unicorn",
                    },
                    text: {
                        rus: "Если магия > магии\nврага, 12 урона,\nиначе 8 урона",
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
                        rus: "Вампир",
                        eng: "Vampire",
                    },
                    text: {
                        rus: "10 урона,\nвраг теряет 5 камней,\n-1 темница врага",
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
                        rus: "Полководец",
                        eng: "Warlord",
                    },
                    text: {
                        rus: "13 урона,\nвы теряете 3 самоцвета",
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
                        rus: "Обротень",
                        eng: "Werewolf",
                    },
                    text: {
                        rus: "9 урона",
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
                        rus: "Знак волка",
                        eng: "Wolf sign",
                    },
                    text: {
                        rus: "8 урона,\n-1 шахта врага",
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
