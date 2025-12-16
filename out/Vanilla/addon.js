"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanillaSchematicAddon = exports.BlockMap = exports.Fluids = exports.Items = void 0;
exports.ImageRequester = ImageRequester;
const canvas_1 = require("canvas");
const blocks_1 = require("./blocks");
const index_1 = require("../index");
const minified_sprites_json_1 = __importDefault(require("./minified_sprites.json"));
const ImagesObject = {};
for (const key of Object.keys(minified_sprites_json_1.default)) {
    const img = new canvas_1.Image();
    img.src = minified_sprites_json_1.default[key];
    ImagesObject[key] = img;
}
function ImageRequester(blockName) {
    return ImagesObject[blockName];
}
exports.Items = new Map([
    ["copper", new index_1.Item("copper", 0xd99d73),],
    ["lead", new index_1.Item("lead", 0x8c7fa9),],
    ["metaglass", new index_1.Item("metaglass", 0xebeef5),],
    ["graphite", new index_1.Item("graphite", 0xb2c6d2),],
    ["sand", new index_1.Item("sand", 0xf7cba4),],
    ["coal", new index_1.Item("coal", 0x272727),],
    ["titanium", new index_1.Item("titanium", 0x8da1e3),],
    ["thorium", new index_1.Item("thorium", 0xf9a3c7),],
    ["scrap", new index_1.Item("scrap", 0x777777),],
    ["silicon", new index_1.Item("silicon", 0x53565c),],
    ["plastanium", new index_1.Item("plastanium", 0xcbd97f),],
    ["phase-fabric", new index_1.Item("phase-fabric", 0xf4ba6e),],
    ["surge-alloy", new index_1.Item("surge-alloy", 0xf3e979),],
    ["spore-pod", new index_1.Item("spore-pod", 0x7457ce),],
    ["blast-compound", new index_1.Item("blast-compound", 0xff795e),],
    ["pyratite", new index_1.Item("pyratite", 0xffaa5f),],
    ["beryllium", new index_1.Item("beryllium", 0x3a8f64),],
    ["tungsten", new index_1.Item("tungsten", 0x768a9a),],
    ["oxide", new index_1.Item("oxide", 0xe4ffd6),],
    ["carbide", new index_1.Item("carbide", 0x89769a),],
    ["fissile-matter", new index_1.Item("fissile-matter", 0x5e988d),],
    ["dormant-cyst", new index_1.Item("dormant-cyst", 0xdf824d)],
]);
exports.Fluids = new Map([
    ["water", new index_1.Fluid("water", 0x596ab8)],
    ["slag", new index_1.Fluid("slag", 0xffa166)],
    ["oil", new index_1.Fluid("oil", 0x313131)],
    ["cryofluid", new index_1.Fluid("cryofluid", 0x6ecdec)],
    ["neoplasm", new index_1.Fluid("neoplasm", 0xc33e2b)],
    ["arkycite", new index_1.Fluid("arkycite", 0x84a94b)],
    ["gallium", new index_1.Fluid("gallium", 0x9a9dbf)],
    ["ozone", new index_1.Fluid("ozone", 0xfc81dd)],
    ["hydrogen", new index_1.Fluid("hydrogen", 0x9eabf7)],
    ["nitrogen", new index_1.Fluid("nitrogen", 0xefe3ff)],
    ["cyanogen", new index_1.Fluid("cyanogen", 0x89e8b6)],
]);
// https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/content/Blocks.java
exports.BlockMap = {
    // Environment
    // Boulders
    // old metal floors
    // new metal floors
    // new metal walls
    // ores
    // wall ores
    // #region crafting
    "graphite-press": new blocks_1.CrafterBlock("graphite-press", {
        size: 2,
        craftTime: 90,
        requirements: [{ content: exports.Items.get("lead"), amount: 75 }, { content: exports.Items.get("metaglass"), amount: 30 }],
        input: [{ item: exports.Items.get("coal"), amount: 3 }],
        output: [{ item: exports.Items.get("graphite"), amount: 1 }],
    }),
    "multi-press": new blocks_1.CrafterBlock("multi-press", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 100 }, { content: exports.Items.get("silicon"), amount: 25 }, { content: exports.Items.get("lead"), amount: 100 }, { content: exports.Items.get("graphite"), amount: 50 }],
        output: [{ item: exports.Items.get("graphite"), amount: 2 }],
        craftTime: 30,
        size: 3,
        powerConsumption: 108,
        input: [{ item: exports.Items.get("coal"), amount: 3 }, { item: exports.Fluids.get("water"), amount: 0.1 }],
    }),
    "silicon-smelter": new blocks_1.CrafterBlock("silicon-smelter", {
        requirements: [{ content: exports.Items.get("copper"), amount: 30 }, { content: exports.Items.get("lead"), amount: 25 }],
        size: 2,
        craftTime: 40,
        input: [{ item: exports.Items.get("coal"), amount: 1 }, { item: exports.Items.get("sand"), amount: 2 }],
        output: [{ item: exports.Items.get("silicon"), amount: 1 }],
        powerConsumption: 30
    }),
    "silicon-crucible": new blocks_1.CrafterBlock("silicon-crucible", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 120 }, { content: exports.Items.get("metaglass"), amount: 80 }, { content: exports.Items.get("plastanium"), amount: 35 }, { content: exports.Items.get("silicon"), amount: 60 }],
        output: [{ item: exports.Items.get("silicon"), amount: 8 }],
        craftTime: 90,
        size: 3,
        // 		boostScale = 0.15f;,
        input: [{ item: exports.Items.get("coal"), amount: 4 }, { item: exports.Items.get("sand"), amount: 6 }, { item: exports.Items.get("pyratite"), amount: 1 }],
        powerConsumption: 240
    }),
    "kiln": new blocks_1.CrafterBlock("kiln", {
        requirements: [{ content: exports.Items.get("copper"), amount: 60 }, { content: exports.Items.get("graphite"), amount: 30 }, { content: exports.Items.get("lead"), amount: 30 }],
        output: [{ item: exports.Items.get("metaglass"), amount: 1 }],
        craftTime: 30,
        size: 2,
        input: [{ item: exports.Items.get("lead"), amount: 1 }, { item: exports.Items.get("sand"), amount: 1 }],
        powerConsumption: 36
    }),
    "plastanium-compressor": new blocks_1.CrafterBlock("plastanium-compressor", {
        requirements: [{ content: exports.Items.get("silicon"), amount: 80 }, { content: exports.Items.get("lead"), amount: 115 }, { content: exports.Items.get("graphite"), amount: 60 }, { content: exports.Items.get("titanium"), amount: 80 }],
        craftTime: 60,
        output: [{ item: exports.Items.get("plastanium"), amount: 1 }],
        size: 2,
        powerConsumption: 180,
        input: [{ item: exports.Fluids.get("oil"), amount: 0.25 }, { item: exports.Items.get("titanium"), amount: 2 }]
    }),
    "phase-weaver": new blocks_1.PhaseWaverBlock("phase-weaver", {
        requirements: [{ content: exports.Items.get("silicon"), amount: 130 }, { content: exports.Items.get("lead"), amount: 120 }, { content: exports.Items.get("thorium"), amount: 75 }],
        output: [{ item: exports.Items.get("phase-fabric"), amount: 1 }],
        craftTime: 120,
        size: 2,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawWeave(), new DrawDefault());,
        input: [{ item: exports.Items.get("thorium"), amount: 4 }, { item: exports.Items.get("sand"), amount: 10 }],
        powerConsumption: 300,
        // 		itemCapacity = 30;
    }),
    "surge-smelter": new blocks_1.CrafterBlock("surge-smelter", {
        requirements: [{ content: exports.Items.get("silicon"), amount: 80 }, { content: exports.Items.get("lead"), amount: 80 }, { content: exports.Items.get("thorium"), amount: 70 }],
        output: [{ item: exports.Items.get("surge-alloy"), amount: 1 }],
        craftTime: 75,
        size: 3,
        // 		itemCapacity = 20;,
        // 		drawer = new DrawMulti(new DrawDefault(), new DrawFlame());,
        powerConsumption: 4,
        input: [{ item: exports.Items.get("copper"), amount: 3 }, { item: exports.Items.get("lead"), amount: 4 }, { item: exports.Items.get("titanium"), amount: 2 }, { item: exports.Items.get("silicon"), amount: 3 }]
    }),
    "cryofluid-mixer": new blocks_1.CrafterBlock("cryofluid-mixer", {
        requirements: [{ content: exports.Items.get("lead"), amount: 65 }, { content: exports.Items.get("silicon"), amount: 40 }, { content: exports.Items.get("titanium"), amount: 60 }],
        output: [{ item: exports.Fluids.get("cryofluid"), amount: 12 }],
        size: 2,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawLiquidTile(Liquids.water), new DrawLiquidTile(Liquids.cryofluid, {drawLiquidLight = true;}}, new DrawDefault());,
        // 		liquidCapacity = 36f;,
        craftTime: 120,
        // 		lightLiquid = Liquids.cryofluid;,
        powerConsumption: 60,
        input: [{ item: exports.Fluids.get("water"), amount: 12 }, { item: exports.Items.get("titanium"), amount: 1 }]
    }),
    "pyratite-mixer": new blocks_1.CrafterBlock("pyratite-mixer", {
        requirements: [{ content: exports.Items.get("copper"), amount: 50 }, { content: exports.Items.get("lead"), amount: 25 }],
        output: [{ item: exports.Items.get("pyratite"), amount: 1 }],
        size: 2,
        powerConsumption: 12,
        input: [{ item: exports.Items.get("coal"), amount: 1 }, { item: exports.Items.get("lead"), amount: 2 }, { item: exports.Items.get("sand"), amount: 2 }]
    }),
    "blast-mixer": new blocks_1.CrafterBlock("blast-mixer", {
        requirements: [{ content: exports.Items.get("lead"), amount: 30 }, { content: exports.Items.get("titanium"), amount: 20 }],
        output: [{ item: exports.Items.get("blast-compound"), amount: 1 }],
        size: 2,
        input: [{ item: exports.Items.get("pyratite"), amount: 1 }, { item: exports.Items.get("spore-pod"), amount: 1 }],
        powerConsumption: 24
    }),
    "melter": new blocks_1.CrafterBlock("melter", {
        requirements: [{ content: exports.Items.get("copper"), amount: 30 }, { content: exports.Items.get("lead"), amount: 35 }, { content: exports.Items.get("graphite"), amount: 45 }],
        output: [{ item: exports.Fluids.get("slag"), amount: 12 }],
        craftTime: 10,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawLiquidTile(), new DrawDefault());,
        powerConsumption: 60,
        input: [{ item: exports.Items.get("scrap"), amount: 1 }]
    }),
    "separator": new blocks_1.SeparatorBlock("separator", {
        requirements: [{ content: exports.Items.get("copper"), amount: 30 }, { content: exports.Items.get("titanium"), amount: 25 }],
        output: [
            { item: exports.Items.get("copper"), weight: 5 },
            { item: exports.Items.get("lead"), weight: 3 },
            { item: exports.Items.get("graphite"), weight: 2 },
            { item: exports.Items.get("titanium"), weight: 2 }
        ],
        craftTime: 35,
        size: 2,
        powerConsumption: 66,
        input: [{ item: exports.Fluids.get("slag"), amount: 4 }],
    }),
    "disassembler": new blocks_1.SeparatorBlock("disassembler", {
        requirements: [{ content: exports.Items.get("plastanium"), amount: 40 }, { content: exports.Items.get("titanium"), amount: 100 }, { content: exports.Items.get("silicon"), amount: 150 }, { content: exports.Items.get("thorium"), amount: 80 }],
        output: [
            { item: exports.Items.get("sand"), weight: 2 },
            { item: exports.Items.get("graphite"), weight: 1 },
            { item: exports.Items.get("titanium"), weight: 1 },
            { item: exports.Items.get("thorium"), weight: 1 }
        ],
        craftTime: 15,
        size: 3,
        powerConsumption: 240,
        input: [{ item: exports.Fluids.get("slag"), amount: 7.2 }, { item: exports.Items.get("scrap"), amount: 1 }],
        // 		itemCapacity = 20;,
    }),
    "spore-press": new blocks_1.MultiPressBlock("spore-press", {
        requirements: [{ content: exports.Items.get("lead"), amount: 35 }, { content: exports.Items.get("silicon"), amount: 30 }],
        // 		liquidCapacity = 60f;,
        craftTime: 20,
        output: [{ item: exports.Fluids.get("oil"), amount: 18 }],
        size: 2,
        input: [{ item: exports.Items.get("spore-pod"), amount: 1 }],
        powerConsumption: 42
    }),
    "pulverizer": new blocks_1.PulverizerBlock("pulverizer", {
        requirements: [{ content: exports.Items.get("copper"), amount: 30 }, { content: exports.Items.get("lead"), amount: 25 }],
        output: [{ item: exports.Items.get("sand"), amount: 1 }],
        craftTime: 40,
        input: [{ item: exports.Items.get("scrap"), amount: 1 }],
        powerConsumption: 30,
    }),
    "coal-centrifuge": new blocks_1.CrafterBlock("coal-centrifuge", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 20 }, { content: exports.Items.get("graphite"), amount: 40 }, { content: exports.Items.get("lead"), amount: 30 }],
        output: [{ item: exports.Items.get("coal"), amount: 1 }],
        craftTime: 30,
        size: 2,
        input: [{ item: exports.Fluids.get("oil"), amount: 6 }],
        powerConsumption: 42
    }),
    "incinerator": new index_1.DefaultBlock("incinerator", {
        requirements: [{ content: exports.Items.get("graphite"), amount: 5 }, { content: exports.Items.get("lead"), amount: 15 }],
        powerConsumption: 30
    }),
    // #endregion
    // #region crafting - erekir
    // #endregion
    // #region Sandbox
    "item-source": new blocks_1.SorterLikeBlock('item-source'),
    // #endregion
    // #region Defense
    "copper-wall": new index_1.DefaultBlock("copper-wall", {
        requirements: [{ content: exports.Items.get("copper"), amount: 6 }],
    }),
    "copper-wall-large": new index_1.DefaultBlock("copper-wall-large", {
        requirements: [{ content: exports.Items.get("copper"), amount: 24 }],
        size: 2
    }),
    "titanium-wall": new index_1.DefaultBlock("titanium-wall", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 6 }],
    }),
    "titanium-wall-large": new index_1.DefaultBlock("titanium-wall-large", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 24 }],
        size: 2
    }),
    "plastanium-wall": new index_1.DefaultBlock("plastanium-wall", {
        requirements: [{ content: exports.Items.get("plastanium"), amount: 5 }, { content: exports.Items.get("metaglass"), amount: 2 }],
    }),
    "plastanium-wall-large": new index_1.DefaultBlock("plastanium-wall-large", {
        requirements: [{ content: exports.Items.get("plastanium"), amount: 20 }, { content: exports.Items.get("metaglass"), amount: 8 }],
        size: 2
    }),
    "thorium-wall": new index_1.DefaultBlock("thorium-wall", {
        requirements: [{ content: exports.Items.get("thorium"), amount: 6 }],
    }),
    "thorium-wall-large": new index_1.DefaultBlock("thorium-wall-large", {
        requirements: [{ content: exports.Items.get("thorium"), amount: 24 }],
        size: 2
    }),
    "phase-wall": new index_1.DefaultBlock("phase-wall", {
        requirements: [{ content: exports.Items.get("phase-fabric"), amount: 6 }],
    }),
    "phase-wall-large": new index_1.DefaultBlock("phase-wall-large", {
        requirements: [{ content: exports.Items.get("phase-fabric"), amount: 24 }],
        size: 2
    }),
    "surge-wall": new index_1.DefaultBlock("surge-wall", {
        requirements: [{ content: exports.Items.get("surge-alloy"), amount: 6 }],
        size: 2
    }),
    "surge-wall-large": new index_1.DefaultBlock("surge-wall-large", {
        requirements: [{ content: exports.Items.get("surge-alloy"), amount: 24 }],
        size: 2
    }),
    "door": new index_1.DefaultBlock("door", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 6 }, { content: exports.Items.get("silicon"), amount: 4 }],
    }),
    "door-large": new index_1.DefaultBlock("door-large", {
        requirements: [{ content: exports.Items.get("titanium"), amount: 24 }, { content: exports.Items.get("silicon"), amount: 16 }],
        size: 2
    }),
    "scrap-wall": new index_1.DefaultBlock("scrap-wall", {
        requirements: [{ content: exports.Items.get("scrap"), amount: 6 }],
        // variants = 5;
    }),
    "scrap-wall-large": new index_1.DefaultBlock("scrap-wall-large", {
        requirements: [{ content: exports.Items.get("scrap"), amount: 24 }],
        size: 2
        // variants = 4;
    }),
    "scrap-wall-huge": new index_1.DefaultBlock("scrap-wall-huge", {
        requirements: [{ content: exports.Items.get("scrap"), amount: 54 }],
        size: 3,
        // variants = 3;
    }),
    "scrap-wall-gigantic": new index_1.DefaultBlock("scrap-wall-gigantic", {
        requirements: [{ content: exports.Items.get("scrap"), amount: 96 }],
        size: 4,
    }),
    "thruster": new index_1.DefaultBlock("thruster", {
        requirements: [{ content: exports.Items.get("scrap"), amount: 96 }],
        size: 4,
    }),
    "beryllium-wall": new index_1.DefaultBlock("beryllium-wall", {
        requirements: [{ content: exports.Items.get("beryllium"), amount: 6 }],
    }),
    "beryllium-wall-large": new index_1.DefaultBlock("beryllium-wall-large", {
        requirements: [{ content: exports.Items.get("beryllium"), amount: 24 }],
        size: 2
    }),
    "tungsten-wall": new index_1.DefaultBlock("tungsten-wall", {
        requirements: [{ content: exports.Items.get("tungsten"), amount: 6 }],
    }),
    "tungsten-wall-large": new index_1.DefaultBlock("tungsten-wall-large", {
        requirements: [{ content: exports.Items.get("tungsten"), amount: 24 }],
        size: 2
    }),
    "blast-door": new index_1.DefaultBlock("blast-door", {
        requirements: [{ content: exports.Items.get("tungsten"), amount: 24 }, { content: exports.Items.get("silicon"), amount: 24 }],
        size: 2
    }),
    "reinforced-surge-wall": new index_1.DefaultBlock("reinforced-surge-wall", {
        requirements: [{ content: exports.Items.get("surge-alloy"), amount: 6 }, { content: exports.Items.get("tungsten"), amount: 2 }],
    }),
    "reinforced-surge-wall-large": new index_1.DefaultBlock("reinforced-surge-wall-large", {
        requirements: [{ content: exports.Items.get("surge-alloy"), amount: 24 }, { content: exports.Items.get("tungsten"), amount: 8 }],
        size: 2
    }),
    "carbide-wall": new index_1.DefaultBlock("carbide-wall", {
        requirements: [{ content: exports.Items.get("thorium"), amount: 6 }, { content: exports.Items.get("carbide"), amount: 6 }],
    }),
    "carbide-wall-large": new index_1.DefaultBlock("carbide-wall-large", {
        requirements: [{ content: exports.Items.get("thorium"), amount: 24 }, { content: exports.Items.get("carbide"), amount: 24 }],
        size: 2
    }),
    "shielded-wall": new index_1.DefaultBlock("shielded-wall", {
        requirements: [{ content: exports.Items.get("phase-fabric"), amount: 20 }, { content: exports.Items.get("surge-alloy"), amount: 12 }, { content: exports.Items.get("beryllium"), amount: 12 }],
        powerConsumption: 180,
        size: 2
    }),
    "mender": new blocks_1.ConsumerBlock("mender", {
        requirements: [{ content: exports.Items.get("lead"), amount: 30 }, { content: exports.Items.get("copper"), amount: 25 }],
        powerConsumption: 18,
        input: [{ content: exports.Items.get("silicon"), optional: true, amount: 1 / 400 * 60 }],
    }),
    "mend-projector": new blocks_1.ConsumerBlock("mend-projector", {
        requirements: [{ content: exports.Items.get("lead"), amount: 100 }, { content: exports.Items.get("titanium"), amount: 25 }, { content: exports.Items.get("silicon"), amount: 40 }, { content: exports.Items.get("copper"), amount: 50 }],
        powerConsumption: 90,
        size: 2,
        input: [{ content: exports.Items.get("phase-fabric"), optional: true, amount: 1 / 400 * 60 }],
    }),
    "overdrive-projector": new blocks_1.ConsumerBlock("overdrive-projector", {
        requirements: [{ content: exports.Items.get("lead"), amount: 100 }, { content: exports.Items.get("titanium"), amount: 75 }, { content: exports.Items.get("silicon"), amount: 75 }, { content: exports.Items.get("plastanium"), amount: 30 }],
        powerConsumption: 210,
        size: 2,
        input: [{ content: exports.Items.get("phase-fabric"), optional: true, amount: 1 / 400 * 60 }],
    }),
    "overdrive-dome": new blocks_1.ConsumerBlock("overdrive-dome", {
        requirements: [{ content: exports.Items.get("lead"), amount: 200 }, { content: exports.Items.get("titanium"), amount: 130 }, { content: exports.Items.get("silicon"), amount: 130 }, { content: exports.Items.get("plastanium"), amount: 80 }, { content: exports.Items.get("surge-alloy"), amount: 120 }],
        powerConsumption: 450,
        size: 3,
        input: [{ content: exports.Items.get("phase-fabric"), amount: 1 / 400 * 60 }, { content: exports.Items.get("silicon"), amount: 1 / 400 * 60 }],
    }),
    "force-projector": new blocks_1.ConsumerBlock("force-projector", {
        requirements: [{ content: exports.Items.get("lead"), amount: 100 }, { content: exports.Items.get("titanium"), amount: 75 }, { content: exports.Items.get("silicon"), amount: 125 }],
        size: 3,
        powerConsumption: 240,
        input: [{ content: exports.Items.get("phase-fabric"), optional: true, amount: 1 / 350 * 60 }],
    }),
    "shock-mine": new index_1.DefaultBlock("shock-mine", {
        requirements: [{ content: exports.Items.get("lead"), amount: 25 }, { content: exports.Items.get("silicon"), amount: 12 }],
    }),
    "radar": new index_1.DefaultBlock("radar", {
        requirements: [{ content: exports.Items.get("silicon"), amount: 60 }, { content: exports.Items.get("graphite"), amount: 50 }, { content: exports.Items.get("beryllium"), amount: 10 }],
        powerConsumption: 36,
    }),
    "build-tower": new blocks_1.ConsumerBlock("build-tower", {
        requirements: [{ content: exports.Items.get("silicon"), amount: 150 }, { content: exports.Items.get("oxide"), amount: 40 }, { content: exports.Items.get("thorium"), amount: 60 }],
        size: 3,
        powerConsumption: 180,
        input: [{ content: exports.Fluids.get("nitrogen"), amount: 3 }]
    }),
    "regen-projector": new blocks_1.ConsumerBlock("regen-projector", {
        requirements: [{ content: exports.Items.get("silicon"), amount: 80 }, { content: exports.Items.get("tungsten"), amount: 60 }, { content: exports.Items.get("oxide"), amount: 40 }, { content: exports.Items.get("beryllium"), amount: 80 }],
        size: 3,
        powerConsumption: 60,
        input: [{ content: exports.Fluids.get("hydrogen"), amount: 1 }, { content: exports.Items.get("phase-fabric"), optional: true, amount: 1 / 400 * 60 }],
    }),
    "shockwave-tower": new blocks_1.ConsumerBlock("shockwave-tower", {
        requirements: [{ content: exports.Items.get("surge-alloy"), amount: 50 }, { content: exports.Items.get("silicon"), amount: 150 }, { content: exports.Items.get("oxide"), amount: 30 }, { content: exports.Items.get("tungsten"), amount: 100 }],
        size: 3,
        input: [{ content: exports.Fluids.get("cyanogen"), amount: 1.5 }],
        powerConsumption: 100,
    }),
    // #endregion
    // walls erekir
    // defense - erekir
    // #region distribution
    "conveyor": new blocks_1.ArmoredConveyorBlock('conveyor', { requirements: [{ content: exports.Items.get("copper"), amount: 1 }] }),
    "titanium-conveyor": new blocks_1.ArmoredConveyorBlock('titanium-conveyor', { requirements: [{ content: exports.Items.get("titanium"), amount: 1 }, { content: exports.Items.get("copper"), amount: 1 }, { content: exports.Items.get("lead"), amount: 1 }] }),
    "plastanium-conveyor": new blocks_1.StackConveyorBlock('plastanium-conveyor', { requirements: [{ content: exports.Items.get("plastanium"), amount: 1 }, { content: exports.Items.get("silicon"), amount: 1 }, { content: exports.Items.get("graphite"), amount: 1 }] }),
    "armored-conveyor": new blocks_1.ArmoredConveyorBlock('armored-conveyor', { requirements: [{ content: exports.Items.get("plastanium"), amount: 1 }, { content: exports.Items.get("thorium"), amount: 1 }, { content: exports.Items.get("metaglass"), amount: 1 }] }),
    "junction": new index_1.DefaultBlock('junction', { requirements: [{ content: exports.Items.get("copper"), amount: 3 }] }),
    "bridge-conveyor": new blocks_1.BridgeBlock('bridge-conveyor', { requirements: [{ content: exports.Items.get("copper"), amount: 6 }, { content: exports.Items.get("lead"), amount: 6 }] }),
    "phase-conveyor": new blocks_1.BridgeBlock('phase-conveyor', {
        requirements: [
            { content: exports.Items.get("phase-fabric"), amount: 5 },
            { content: exports.Items.get("silicon"), amount: 7 },
            { content: exports.Items.get("lead"), amount: 10 },
            { content: exports.Items.get("graphite"), amount: 10 }
        ]
    }),
    "sorter": new blocks_1.SorterLikeBlock('sorter', { requirements: [{ content: exports.Items.get("lead"), amount: 2 }, { content: exports.Items.get("copper"), amount: 2 }] }),
    "inverted-sorter": new blocks_1.SorterLikeBlock('inverted-sorter', { requirements: [{ content: exports.Items.get("lead"), amount: 2 }, { content: exports.Items.get("copper"), amount: 2 }] }),
    "router": new index_1.DefaultBlock('router', { requirements: [{ content: exports.Items.get("copper"), amount: 3 }] }),
    "distributor": new index_1.DefaultBlock('distributor', { requirements: [{ content: exports.Items.get("copper"), amount: 4 }, { content: exports.Items.get("lead"), amount: 4 }] }),
    "overflow-gate": new index_1.DefaultBlock('overflow-gate', { requirements: [{ content: exports.Items.get("copper"), amount: 4 }, { content: exports.Items.get("lead"), amount: 2 }] }),
    "underflow-gate": new index_1.DefaultBlock('underflow-gate', { requirements: [{ content: exports.Items.get("copper"), amount: 4 }, { content: exports.Items.get("lead"), amount: 2 }] }),
    "unloader": new blocks_1.SorterLikeBlock('unloader', { requirements: [{ content: exports.Items.get("titanium"), amount: 25 }, { content: exports.Items.get("silicon"), amount: 30 }] }),
    "mass-driver": new index_1.DefaultBlock('mass-driver', {
        requirements: [
            { content: exports.Items.get("titanium"), amount: 125 },
            { content: exports.Items.get("silicon"), amount: 75 },
            { content: exports.Items.get("lead"), amount: 125 },
            { content: exports.Items.get("thorium"), amount: 50 }
        ]
    }),
    // #endregion
    // #region transport - erekir
    // #endregion
    // liquid
    "conduit": new blocks_1.ConduitBlock('conduit'),
    "pulse-conduit": new blocks_1.ConduitBlock('pulse-conduit'),
    // liquid - reinforced
    // power
    // power - erekir
    // production
    "mechanical-drill": new blocks_1.DrillBlock('mechanical-drill', { size: 2 }),
    "pneumatic-drill": new blocks_1.DrillBlock('pneumatic-drill', { size: 2 }),
    "laser-drill": new blocks_1.DrillBlock('laser-drill', { size: 3 }),
    "blast-drill": new blocks_1.DrillBlock('blast-drill', { size: 4 }),
    "water-extractor": new blocks_1.DrillBlock('water-extractor', { size: 2 }),
    "oil-extractor": new blocks_1.DrillBlock('oil-extractor', { size: 3, out: exports.Fluids.get("oil") }),
    // cultivator
    // storage
    // storage - erekir
    // turrets
    "duo": new blocks_1.TurretBlock("duo", { size: 1, parts: { "-barrel-l": {}, "-barrel-r": {} } }),
    "scatter": new blocks_1.TurretBlock("scatter", { size: 2, parts: { "-mid": {} } }),
    "scorch": new blocks_1.TurretBlock("scorch", { size: 1, }),
    "hail": new blocks_1.TurretBlock("hail", { size: 1 }),
    "arc": new blocks_1.TurretBlock("arc", { size: 1 }),
    "wave": new blocks_1.TurretBlock("wave", { size: 2 }),
    "lancer": new blocks_1.TurretBlock("lancer", { size: 2 }),
    "swarmer": new blocks_1.TurretBlock("swarmer", { size: 2 }),
    "salvo": new blocks_1.TurretBlock("salvo", { size: 2, parts: { "-barrel": { moveY: -2.5 }, "-side": { moveX: 0.6, moveRot: -15, mirror: true } } }),
    "fuse": new blocks_1.TurretBlock("fuse", { size: 3 }),
    "ripple": new blocks_1.TurretBlock("ripple", { size: 3 }),
    "cyclone": new blocks_1.TurretBlock("cyclone", { size: 3, parts: { "-barrel-1": {}, "-barrel-2": {}, "-barrel-3": {} } }),
    "foreshadow": new blocks_1.TurretBlock("foreshadow", { size: 4 }),
    "spectre": new blocks_1.TurretBlock("spectre", { size: 4 }),
    "meltdown": new blocks_1.TurretBlock("meltdown", { size: 4 }),
    "segment": new blocks_1.TurretBlock("segment", { size: 2 }),
    "parallax": new blocks_1.TurretBlock("parallax", { size: 2 }),
    "tsunami": new blocks_1.TurretBlock("tsunami", { size: 3 }),
    // turrets - erekir
    // units
    // units - erekir
    // payloads
    // logic
    "logic-display": new index_1.DefaultBlock('logic-display'),
    "large-logic-display": new index_1.DefaultBlock('large-logic-display'),
    "micro-processor": new blocks_1.ProcessorBlock('micro-processor'),
    "logic-processor": new blocks_1.ProcessorBlock('logic-processor'),
    "hyper-processor": new blocks_1.ProcessorBlock('hyper-processor'),
    // campaign
};
exports.vanillaSchematicAddon = new index_1.SchematicAddons({
    ImageRequester, BlockMap: exports.BlockMap, Items: exports.Items, Fluids: exports.Fluids
});
