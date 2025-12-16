import { Image } from "canvas";
import { BridgeBlock, ConduitBlock, StackConveyorBlock, DrillBlock, ProcessorBlock, SorterLikeBlock, ArmoredConveyorBlock, TurretBlock, CrafterBlock, SeparatorBlock, PhaseWaverBlock, PulverizerBlock, MultiPressBlock, StorageLikeBlock, ConsumerBlock, PowerNodeBlock, DiodeBlock, BatteryBlock, GeneratorBlock, ConveyorBlock } from "./blocks";
import { DefaultBlock, Fluid, Item, SchematicAddons } from "../index";
import obj from "./minified_sprites.json"
import { ItemTags } from "../helpers";

const ImagesObject: Record<string, Image> = {};

for (const key of Object.keys(obj)) {
    const img = new Image();
    img.src = obj[key as keyof typeof obj];
    ImagesObject[key] = img;
}

export function ImageRequester(blockName: string) {
    return ImagesObject[blockName];
}
export const Items = new Map(([
    ["copper", new Item("copper", 0xd99d73)],
    ["lead", new Item("lead", 0x8c7fa9)],
    ["metaglass", new Item("metaglass", 0xebeef5)],
    ["graphite", new Item("graphite", 0xb2c6d2)],
    ["sand", new Item("sand", 0xf7cba4)],
    ["coal", new Item("coal", 0x272727, { flammability: 1, explosiveness: 0.8 })],
    ["titanium", new Item("titanium", 0x8da1e3)],
    ["thorium", new Item("thorium", 0xf9a3c7, { explosiveness: 0.2, radioactivity: 1 })],
    ["scrap", new Item("scrap", 0x777777)],
    ["silicon", new Item("silicon", 0x53565c, { flammability: 0.1, explosiveness: 0.2 })],
    ["plastanium", new Item("plastanium", 0xcbd97f)],
    ["phase-fabric", new Item("phase-fabric", 0xf4ba6e, { radioactivity: 0.6 })],
    ["surge-alloy", new Item("surge-alloy", 0xf3e979)],
    ["spore-pod", new Item("spore-pod", 0x7457ce, { flammability: 1.15 })],
    ["blast-compound", new Item("blast-compound", 0xff795e, { flammability: 0.4, explosiveness: 1.2 })],
    ["pyratite", new Item("pyratite", 0xffaa5f, { flammability: 1.4, explosiveness: 0.4 })],
    ["beryllium", new Item("beryllium", 0x3a8f64)],
    ["tungsten", new Item("tungsten", 0x768a9a)],
    ["oxide", new Item("oxide", 0xe4ffd6)],
    ["carbide", new Item("carbide", 0x89769a)],
    ["fissile-matter", new Item("fissile-matter", 0x5e988d, { radioactivity: 1.5 })],
    ["dormant-cyst", new Item("dormant-cyst", 0xdf824d, { flammability: 0.1 })],
] as const));

export const Fluids = new Map([
    ["water", new Fluid("water", 0x596ab8)],
    ["slag", new Fluid("slag", 0xffa166)],
    ["oil", new Fluid("oil", 0x313131)],
    ["cryofluid", new Fluid("cryofluid", 0x6ecdec)],
    ["neoplasm", new Fluid("neoplasm", 0xc33e2b)],
    ["arkycite", new Fluid("arkycite", 0x84a94b)],
    ["gallium", new Fluid("gallium", 0x9a9dbf)],
    ["ozone", new Fluid("ozone", 0xfc81dd)],
    ["hydrogen", new Fluid("hydrogen", 0x9eabf7)],
    ["nitrogen", new Fluid("nitrogen", 0xefe3ff)],
    ["cyanogen", new Fluid("cyanogen", 0x89e8b6)],
] as const);

// https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/content/Blocks.java
export const BlockMap = {
    // Environment
    // Boulders
    // old metal floors
    // new metal floors
    // new metal walls
    // ores
    // wall ores
    // #region crafting
    "graphite-press": new CrafterBlock("graphite-press", {
        size: 2,
        craftTime: 90,
        requirements: [{ content: Items.get("lead")!, amount: 75 }, { content: Items.get("metaglass")!, amount: 30 }],
        input: [{ item: Items.get("coal")!, amount: 3 }],
        output: [{ item: Items.get("graphite")!, amount: 1 }],
    }),

    "multi-press": new CrafterBlock("multi-press", {
        requirements: [{ content: Items.get("titanium")!, amount: 100 }, { content: Items.get("silicon")!, amount: 25 }, { content: Items.get("lead")!, amount: 100 }, { content: Items.get("graphite")!, amount: 50 }],
        output: [{ item: Items.get("graphite")!, amount: 2 }],
        craftTime: 30,
        size: 3,
        powerConsumption: 108,
        input: [{ item: Items.get("coal")!, amount: 3 }, { item: Fluids.get("water")!, amount: 0.1 }],
    }),

    "silicon-smelter": new CrafterBlock("silicon-smelter", {
        requirements: [{ content: Items.get("copper")!, amount: 30 }, { content: Items.get("lead")!, amount: 25 }],
        size: 2,
        craftTime: 40,
        input: [{ item: Items.get("coal")!, amount: 1 }, { item: Items.get("sand")!, amount: 2 }],
        output: [{ item: Items.get("silicon")!, amount: 1 }],
        powerConsumption: 30
    }),
    "silicon-crucible": new CrafterBlock("silicon-crucible", {
        requirements: [{ content: Items.get("titanium")!, amount: 120 }, { content: Items.get("metaglass")!, amount: 80 }, { content: Items.get("plastanium")!, amount: 35 }, { content: Items.get("silicon")!, amount: 60 }],
        output: [{ item: Items.get("silicon")!, amount: 8 }],
        craftTime: 90,
        size: 3,
        // 		boostScale = 0.15f;,
        input: [{ item: Items.get("coal")!, amount: 4 }, { item: Items.get("sand")!, amount: 6 }, { item: Items.get("pyratite")!, amount: 1 }],
        powerConsumption: 240
    }),

    "kiln": new CrafterBlock("kiln", {
        requirements: [{ content: Items.get("copper")!, amount: 60 }, { content: Items.get("graphite")!, amount: 30 }, { content: Items.get("lead")!, amount: 30 }],
        output: [{ item: Items.get("metaglass")!, amount: 1 }],
        craftTime: 30,
        size: 2,
        input: [{ item: Items.get("lead")!, amount: 1 }, { item: Items.get("sand")!, amount: 1 }],
        powerConsumption: 36
    }),

    "plastanium-compressor": new CrafterBlock("plastanium-compressor", {
        requirements: [{ content: Items.get("silicon")!, amount: 80 }, { content: Items.get("lead")!, amount: 115 }, { content: Items.get("graphite")!, amount: 60 }, { content: Items.get("titanium")!, amount: 80 }],
        craftTime: 60,
        output: [{ item: Items.get("plastanium")!, amount: 1 }],
        size: 2,
        powerConsumption: 180,
        input: [{ item: Fluids.get("oil")!, amount: 0.25 }, { item: Items.get("titanium")!, amount: 2 }]
    }),

    "phase-weaver": new PhaseWaverBlock("phase-weaver", {
        requirements: [{ content: Items.get("silicon")!, amount: 130 }, { content: Items.get("lead")!, amount: 120 }, { content: Items.get("thorium")!, amount: 75 }],
        output: [{ item: Items.get("phase-fabric")!, amount: 1 }],
        craftTime: 120,
        size: 2,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawWeave(), new DrawDefault());,
        input: [{ item: Items.get("thorium")!, amount: 4 }, { item: Items.get("sand")!, amount: 10 }],
        powerConsumption: 300,
        // 		itemCapacity = 30;
    }),
    "surge-smelter": new CrafterBlock("surge-smelter", {
        requirements: [{ content: Items.get("silicon")!, amount: 80 }, { content: Items.get("lead")!, amount: 80 }, { content: Items.get("thorium")!, amount: 70 }],
        output: [{ item: Items.get("surge-alloy")!, amount: 1 }],
        craftTime: 75,
        size: 3,
        // 		itemCapacity = 20;,
        powerConsumption: 4,
        input: [{ item: Items.get("copper")!, amount: 3 }, { item: Items.get("lead")!, amount: 4 }, { item: Items.get("titanium")!, amount: 2 }, { item: Items.get("silicon")!, amount: 3 }]
    }),
    "cryofluid-mixer": new CrafterBlock("cryofluid-mixer", {
        requirements: [{ content: Items.get("lead")!, amount: 65 }, { content: Items.get("silicon")!, amount: 40 }, { content: Items.get("titanium")!, amount: 60 }],
        output: [{ item: Fluids.get("cryofluid")!, amount: 12 }],
        size: 2,
        // 		liquidCapacity = 36f;,
        craftTime: 120,
        // 		lightLiquid = Liquids.cryofluid;,
        powerConsumption: 60,
        input: [{ item: Fluids.get("water")!, amount: 12 }, { item: Items.get("titanium")!, amount: 1 }]
    }),
    "pyratite-mixer": new CrafterBlock("pyratite-mixer", {
        requirements: [{ content: Items.get("copper")!, amount: 50 }, { content: Items.get("lead")!, amount: 25 }],
        output: [{ item: Items.get("pyratite")!, amount: 1 }],
        size: 2,
        powerConsumption: 12,
        input: [{ item: Items.get("coal")!, amount: 1 }, { item: Items.get("lead")!, amount: 2 }, { item: Items.get("sand")!, amount: 2 }]
    }),
    "blast-mixer": new CrafterBlock("blast-mixer", {
        requirements: [{ content: Items.get("lead")!, amount: 30 }, { content: Items.get("titanium")!, amount: 20 }],
        output: [{ item: Items.get("blast-compound")!, amount: 1 }],
        size: 2,
        input: [{ item: Items.get("pyratite")!, amount: 1 }, { item: Items.get("spore-pod")!, amount: 1 }],
        powerConsumption: 24
    }),
    "melter": new CrafterBlock("melter", {
        requirements: [{ content: Items.get("copper")!, amount: 30 }, { content: Items.get("lead")!, amount: 35 }, { content: Items.get("graphite")!, amount: 45 }],
        output: [{ item: Fluids.get("slag")!, amount: 12 }],
        craftTime: 10,
        powerConsumption: 60,
        input: [{ item: Items.get("scrap")!, amount: 1 }]
    }),
    "separator": new SeparatorBlock("separator", {
        requirements: [{ content: Items.get("copper")!, amount: 30 }, { content: Items.get("titanium")!, amount: 25 }],
        output: [
            { item: Items.get("copper")!, weight: 5 },
            { item: Items.get("lead")!, weight: 3 },
            { item: Items.get("graphite")!, weight: 2 },
            { item: Items.get("titanium")!, weight: 2 }
        ],
        craftTime: 35,
        size: 2,
        powerConsumption: 66,
        input: [{ item: Fluids.get("slag")!, amount: 4 }],
    }),
    "disassembler": new SeparatorBlock("disassembler", {
        requirements: [{ content: Items.get("plastanium")!, amount: 40 }, { content: Items.get("titanium")!, amount: 100 }, { content: Items.get("silicon")!, amount: 150 }, { content: Items.get("thorium")!, amount: 80 }],
        output: [
            { item: Items.get("sand")!, weight: 2 },
            { item: Items.get("graphite")!, weight: 1 },
            { item: Items.get("titanium")!, weight: 1 },
            { item: Items.get("thorium")!, weight: 1 }
        ],
        craftTime: 15,
        size: 3,
        powerConsumption: 240,
        input: [{ item: Fluids.get("slag")!, amount: 7.2 }, { item: Items.get("scrap")!, amount: 1 }],
        // 		itemCapacity = 20;,
    }),
    "spore-press": new MultiPressBlock("spore-press", {
        requirements: [{ content: Items.get("lead")!, amount: 35 }, { content: Items.get("silicon")!, amount: 30 }],
        // 		liquidCapacity = 60f;,
        craftTime: 20,
        output: [{ item: Fluids.get("oil")!, amount: 18 }],
        size: 2,
        input: [{ item: Items.get("spore-pod")!, amount: 1 }],
        powerConsumption: 42
    }),
    "pulverizer": new PulverizerBlock("pulverizer", {
        requirements: [{ content: Items.get("copper")!, amount: 30 }, { content: Items.get("lead")!, amount: 25 }],
        output: [{ item: Items.get("sand")!, amount: 1 }],
        craftTime: 40,
        input: [{ item: Items.get("scrap")!, amount: 1 }],
        powerConsumption: 30,
    }),
    "coal-centrifuge": new CrafterBlock("coal-centrifuge", {
        requirements: [{ content: Items.get("titanium")!, amount: 20 }, { content: Items.get("graphite")!, amount: 40 }, { content: Items.get("lead")!, amount: 30 }],
        output: [{ item: Items.get("coal")!, amount: 1 }],
        craftTime: 30,
        size: 2,
        input: [{ item: Fluids.get("oil")!, amount: 6 }],
        powerConsumption: 42
    }),
    "incinerator": new DefaultBlock("incinerator", {
        requirements: [{ content: Items.get("graphite")!, amount: 5 }, { content: Items.get("lead")!, amount: 15 }],
        powerConsumption: 30
    }),
    // #endregion
    // #region crafting - erekir
    // #endregion
    // #region Sandbox
    "item-source": new SorterLikeBlock('item-source'),
    // #endregion
    // #region Defense
    "copper-wall": new DefaultBlock("copper-wall", {
        requirements: [{ content: Items.get("copper")!, amount: 6 }],
    }),

    "copper-wall-large": new DefaultBlock("copper-wall-large", {
        requirements: [{ content: Items.get("copper")!, amount: 24 }],
        size: 2
    }),

    "titanium-wall": new DefaultBlock("titanium-wall", {
        requirements: [{ content: Items.get("titanium")!, amount: 6 }],
    }),

    "titanium-wall-large": new DefaultBlock("titanium-wall-large", {
        requirements: [{ content: Items.get("titanium")!, amount: 24 }],
        size: 2
    }),

    "plastanium-wall": new DefaultBlock("plastanium-wall", {
        requirements: [{ content: Items.get("plastanium")!, amount: 5 }, { content: Items.get("metaglass")!, amount: 2 }],
    }),

    "plastanium-wall-large": new DefaultBlock("plastanium-wall-large", {
        requirements: [{ content: Items.get("plastanium")!, amount: 20 }, { content: Items.get("metaglass")!, amount: 8 }],
        size: 2
    }),

    "thorium-wall": new DefaultBlock("thorium-wall", {
        requirements: [{ content: Items.get("thorium")!, amount: 6 }],
    }),

    "thorium-wall-large": new DefaultBlock("thorium-wall-large", {
        requirements: [{ content: Items.get("thorium")!, amount: 24 }],
        size: 2
    }),

    "phase-wall": new DefaultBlock("phase-wall", {
        requirements: [{ content: Items.get("phase-fabric")!, amount: 6 }],
    }),

    "phase-wall-large": new DefaultBlock("phase-wall-large", {
        requirements: [{ content: Items.get("phase-fabric")!, amount: 24 }],
        size: 2
    }),

    "surge-wall": new DefaultBlock("surge-wall", {
        requirements: [{ content: Items.get("surge-alloy")!, amount: 6 }],
        size: 2
    }),

    "surge-wall-large": new DefaultBlock("surge-wall-large", {
        requirements: [{ content: Items.get("surge-alloy")!, amount: 24 }],
        size: 2
    }),

    "door": new DefaultBlock("door", {
        requirements: [{ content: Items.get("titanium")!, amount: 6 }, { content: Items.get("silicon")!, amount: 4 }],
    }),

    "door-large": new DefaultBlock("door-large", {
        requirements: [{ content: Items.get("titanium")!, amount: 24 }, { content: Items.get("silicon")!, amount: 16 }],
        size: 2
    }),

    "scrap-wall": new DefaultBlock("scrap-wall", {
        requirements: [{ content: Items.get("scrap")!, amount: 6 }],
        // variants = 5;
    }),

    "scrap-wall-large": new DefaultBlock("scrap-wall-large", {
        requirements: [{ content: Items.get("scrap")!, amount: 24 }],
        size: 2
        // variants = 4;
    }),

    "scrap-wall-huge": new DefaultBlock("scrap-wall-huge", {
        requirements: [{ content: Items.get("scrap")!, amount: 54 }],
        size: 3,
        // variants = 3;
    }),

    "scrap-wall-gigantic": new DefaultBlock("scrap-wall-gigantic", {
        requirements: [{ content: Items.get("scrap")!, amount: 96 }],
        size: 4,
    }),

    "thruster": new DefaultBlock("thruster", {
        requirements: [{ content: Items.get("scrap")!, amount: 96 }],
        size: 4,
    }),

    "beryllium-wall": new DefaultBlock("beryllium-wall", {
        requirements: [{ content: Items.get("beryllium")!, amount: 6 }],
    }),

    "beryllium-wall-large": new DefaultBlock("beryllium-wall-large", {
        requirements: [{ content: Items.get("beryllium")!, amount: 24 }],
        size: 2
    }),

    "tungsten-wall": new DefaultBlock("tungsten-wall", {
        requirements: [{ content: Items.get("tungsten")!, amount: 6 }],
    }),

    "tungsten-wall-large": new DefaultBlock("tungsten-wall-large", {
        requirements: [{ content: Items.get("tungsten")!, amount: 24 }],
        size: 2
    }),

    "blast-door": new DefaultBlock("blast-door", {
        requirements: [{ content: Items.get("tungsten")!, amount: 24 }, { content: Items.get("silicon")!, amount: 24 }],
        size: 2
    }),

    "reinforced-surge-wall": new DefaultBlock("reinforced-surge-wall", {
        requirements: [{ content: Items.get("surge-alloy")!, amount: 6 }, { content: Items.get("tungsten")!, amount: 2 }],
    }),

    "reinforced-surge-wall-large": new DefaultBlock("reinforced-surge-wall-large", {
        requirements: [{ content: Items.get("surge-alloy")!, amount: 24 }, { content: Items.get("tungsten")!, amount: 8 }],
        size: 2
    }),

    "carbide-wall": new DefaultBlock("carbide-wall", {
        requirements: [{ content: Items.get("thorium")!, amount: 6 }, { content: Items.get("carbide")!, amount: 6 }],
    }),

    "carbide-wall-large": new DefaultBlock("carbide-wall-large", {
        requirements: [{ content: Items.get("thorium")!, amount: 24 }, { content: Items.get("carbide")!, amount: 24 }],
        size: 2
    }),

    "shielded-wall": new DefaultBlock("shielded-wall", {
        requirements: [{ content: Items.get("phase-fabric")!, amount: 20 }, { content: Items.get("surge-alloy")!, amount: 12 }, { content: Items.get("beryllium")!, amount: 12 }],
        powerConsumption: 180,
        size: 2
    }),

    "mender": new ConsumerBlock("mender", {
        requirements: [{ content: Items.get("lead")!, amount: 30 }, { content: Items.get("copper")!, amount: 25 }],
        powerConsumption: 18,
        input: [{ content: Items.get("silicon")!, optional: true, amount: 1 / 400 * 60 }],
    }),

    "mend-projector": new ConsumerBlock("mend-projector", {
        requirements: [{ content: Items.get("lead")!, amount: 100 }, { content: Items.get("titanium")!, amount: 25 }, { content: Items.get("silicon")!, amount: 40 }, { content: Items.get("copper")!, amount: 50 }],
        powerConsumption: 90,
        size: 2,
        input: [{ content: Items.get("phase-fabric")!, optional: true, amount: 1 / 400 * 60 }],
    }),

    "overdrive-projector": new ConsumerBlock("overdrive-projector", {
        requirements: [{ content: Items.get("lead")!, amount: 100 }, { content: Items.get("titanium")!, amount: 75 }, { content: Items.get("silicon")!, amount: 75 }, { content: Items.get("plastanium")!, amount: 30 }],
        powerConsumption: 210,
        size: 2,
        input: [{ content: Items.get("phase-fabric")!, optional: true, amount: 1 / 400 * 60 }],
    }),

    "overdrive-dome": new ConsumerBlock("overdrive-dome", {
        requirements: [{ content: Items.get("lead")!, amount: 200 }, { content: Items.get("titanium")!, amount: 130 }, { content: Items.get("silicon")!, amount: 130 }, { content: Items.get("plastanium")!, amount: 80 }, { content: Items.get("surge-alloy")!, amount: 120 }],
        powerConsumption: 450,
        size: 3,
        input: [{ content: Items.get("phase-fabric")!, amount: 1 / 400 * 60 }, { content: Items.get("silicon")!, amount: 1 / 400 * 60 }],
    }),

    "force-projector": new ConsumerBlock("force-projector", {
        requirements: [{ content: Items.get("lead")!, amount: 100 }, { content: Items.get("titanium")!, amount: 75 }, { content: Items.get("silicon")!, amount: 125 }],
        size: 3,
        powerConsumption: 240,
        input: [{ content: Items.get("phase-fabric")!, optional: true, amount: 1 / 350 * 60 }],
    }),

    "shock-mine": new DefaultBlock("shock-mine", {
        requirements: [{ content: Items.get("lead")!, amount: 25 }, { content: Items.get("silicon")!, amount: 12 }],
    }),

    "radar": new DefaultBlock("radar", {
        requirements: [{ content: Items.get("silicon")!, amount: 60 }, { content: Items.get("graphite")!, amount: 50 }, { content: Items.get("beryllium")!, amount: 10 }],
        powerConsumption: 36,
    }),

    "build-tower": new ConsumerBlock("build-tower", {
        requirements: [{ content: Items.get("silicon")!, amount: 150 }, { content: Items.get("oxide")!, amount: 40 }, { content: Items.get("thorium")!, amount: 60 }],
        size: 3,
        powerConsumption: 180,
        input: [{ content: Fluids.get("nitrogen")!, amount: 3 }]
    }),

    "regen-projector": new ConsumerBlock("regen-projector", {
        requirements: [{ content: Items.get("silicon")!, amount: 80 }, { content: Items.get("tungsten")!, amount: 60 }, { content: Items.get("oxide")!, amount: 40 }, { content: Items.get("beryllium")!, amount: 80 }],
        size: 3,
        powerConsumption: 60,
        input: [{ content: Fluids.get("hydrogen")!, amount: 1 }, { content: Items.get("phase-fabric")!, optional: true, amount: 1 / 400 * 60 }],
    }),

    "shockwave-tower": new ConsumerBlock("shockwave-tower", {
        requirements: [{ content: Items.get("surge-alloy")!, amount: 50 }, { content: Items.get("silicon")!, amount: 150 }, { content: Items.get("oxide")!, amount: 30 }, { content: Items.get("tungsten")!, amount: 100 }],
        size: 3,
        input: [{ content: Fluids.get("cyanogen")!, amount: 1.5 }],
        powerConsumption: 100,
    }),
    // #endregion

    // walls erekir
    // defense - erekir
    // #region distribution
    "conveyor": new ConveyorBlock('conveyor', { requirements: [{ content: Items.get("copper")!, amount: 1 }] }),
    "titanium-conveyor": new ConveyorBlock('titanium-conveyor', { requirements: [{ content: Items.get("titanium")!, amount: 1 }, { content: Items.get("copper")!, amount: 1 }, { content: Items.get("lead")!, amount: 1 }] }),
    "plastanium-conveyor": new StackConveyorBlock('plastanium-conveyor', { requirements: [{ content: Items.get("plastanium")!, amount: 1 }, { content: Items.get("silicon")!, amount: 1 }, { content: Items.get("graphite")!, amount: 1 }] }),
    "armored-conveyor": new ArmoredConveyorBlock('armored-conveyor', { requirements: [{ content: Items.get("plastanium")!, amount: 1 }, { content: Items.get("thorium")!, amount: 1 }, { content: Items.get("metaglass")!, amount: 1 }] }),
    "junction": new DefaultBlock('junction', { requirements: [{ content: Items.get("copper")!, amount: 3 }] }),
    "bridge-conveyor": new BridgeBlock('bridge-conveyor', { requirements: [{ content: Items.get("copper")!, amount: 6 }, { content: Items.get("lead")!, amount: 6 }] }),
    "phase-conveyor": new BridgeBlock('phase-conveyor', {
        requirements: [
            { content: Items.get("phase-fabric")!, amount: 5 },
            { content: Items.get("silicon")!, amount: 7 },
            { content: Items.get("lead")!, amount: 10 },
            { content: Items.get("graphite")!, amount: 10 }
        ]
    }),
    "sorter": new SorterLikeBlock('sorter', { requirements: [{ content: Items.get("lead")!, amount: 2 }, { content: Items.get("copper")!, amount: 2 }] }),
    "inverted-sorter": new SorterLikeBlock('inverted-sorter', { requirements: [{ content: Items.get("lead")!, amount: 2 }, { content: Items.get("copper")!, amount: 2 }] }),
    "router": new DefaultBlock('router', { requirements: [{ content: Items.get("copper")!, amount: 3 }] }),
    "distributor": new DefaultBlock('distributor', { requirements: [{ content: Items.get("copper")!, amount: 4 }, { content: Items.get("lead")!, amount: 4 }] }),
    "overflow-gate": new DefaultBlock('overflow-gate', { requirements: [{ content: Items.get("copper")!, amount: 4 }, { content: Items.get("lead")!, amount: 2 }] }),
    "underflow-gate": new DefaultBlock('underflow-gate', { requirements: [{ content: Items.get("copper")!, amount: 4 }, { content: Items.get("lead")!, amount: 2 }] }),
    "unloader": new SorterLikeBlock('unloader', { requirements: [{ content: Items.get("titanium")!, amount: 25 }, { content: Items.get("silicon")!, amount: 30 }] }),
    "mass-driver": new DefaultBlock('mass-driver', {
        requirements: [
            { content: Items.get("titanium")!, amount: 125 },
            { content: Items.get("silicon")!, amount: 75 },
            { content: Items.get("lead")!, amount: 125 },
            { content: Items.get("thorium")!, amount: 50 }
        ]
    }),
    // #endregion
    // #region transport - erekir
    // #endregion
    // liquid
    "conduit": new ConduitBlock('conduit'),
    "pulse-conduit": new ConduitBlock('pulse-conduit'),
    // liquid - reinforced
    // #region power
    "power-node": new PowerNodeBlock("power-node", {
        requirements: [{ content: Items.get("copper")!, amount: 2 }, { content: Items.get("lead")!, amount: 6 }],
    }),

    "power-node-large": new PowerNodeBlock("power-node-large", {
        requirements: [{ content: Items.get("titanium")!, amount: 5 }, { content: Items.get("lead")!, amount: 10 }, { content: Items.get("silicon")!, amount: 3 }],
        size: 2,
    }),

    "surge-tower": new PowerNodeBlock("surge-tower", {
        requirements: [{ content: Items.get("titanium")!, amount: 7 }, { content: Items.get("lead")!, amount: 10 }, { content: Items.get("silicon")!, amount: 15 }, { content: Items.get("surge-alloy")!, amount: 15 }],
        size: 2,
    }),

    "diode": new DiodeBlock("diode", {
        requirements: [{ content: Items.get("silicon")!, amount: 10 }, { content: Items.get("plastanium")!, amount: 5 }, { content: Items.get("metaglass")!, amount: 10 }],
    }),

    "battery": new BatteryBlock("battery", {
        requirements: [{ content: Items.get("copper")!, amount: 5 }, { content: Items.get("lead")!, amount: 20 }],
        powerBuffer: 4000,
    }),

    "battery-large": new BatteryBlock("battery-large", {
        requirements: [{ content: Items.get("titanium")!, amount: 20 }, { content: Items.get("lead")!, amount: 50 }, { content: Items.get("silicon")!, amount: 30 }],
        size: 3,
        powerBuffer: 50000,
    }),

    "combustion-generator": new GeneratorBlock("combustion-generator", {
        requirements: [{ content: Items.get("copper")!, amount: 25 }, { content: Items.get("lead")!, amount: 15 }],
        generates: 120,
        input: [{ content: ItemTags.flammable, optional: true }, { content: ItemTags.explosive, optional: true }],
    }),

    "thermal-generator": new GeneratorBlock("thermal-generator", {
        requirements: [{ content: Items.get("copper")!, amount: 40 }, { content: Items.get("graphite")!, amount: 35 }, { content: Items.get("lead")!, amount: 50 }, { content: Items.get("silicon")!, amount: 35 }, { content: Items.get("metaglass")!, amount: 40 }],
        generates: 108,
        size: 2,
    }),
    "steam-generator": new GeneratorBlock("steam-generator", {
        requirements: [{ content: Items.get("copper")!, amount: 35 }, { content: Items.get("graphite")!, amount: 25 }, { content: Items.get("lead")!, amount: 40 }, { content: Items.get("silicon")!, amount: 30 }],
        generates: 330,
        size: 2,
        input: [
            { content: Fluids.get("water")!, amount: 6 },
            { content: ItemTags.flammable, optional: true, amount: 60/90 },
            { content: ItemTags.explosive, optional: true, amount: 60/90 }
        ],
    }),
    "differential-generator": new GeneratorBlock("differential-generator", {
        requirements: [{ content: Items.get("copper")!, amount: 70 }, { content: Items.get("titanium")!, amount: 50 }, { content: Items.get("lead")!, amount: 100 }, { content: Items.get("silicon")!, amount: 65 }, { content: Items.get("metaglass")!, amount: 50 }],
        generates: 648,
        size: 3,
        input: [
            { content: Fluids.get("cryofluid")!, amount: 6 },
            { content: Items.get("pyratite")!, amount: 60/220},
        ],
    }),

    "rtg-generator": new GeneratorBlock("rtg-generator", {
        requirements: [{ content: Items.get("lead")!, amount: 100 }, { content: Items.get("silicon")!, amount: 75 }, { content: Items.get("phase-fabric")!, amount: 25 }, { content: Items.get("plastanium")!, amount: 75 }, { content: Items.get("thorium")!, amount: 50 }],
        size: 2,
        generates: 270,
        input: [
            { content: Items.get("phase-fabric")!, amount: 1 / 210, optional: true },
            { content: ItemTags.radioactive, optional: true , amount: 1 / 14 }
        ],
    }),

    "solar-panel": new GeneratorBlock("solar-panel", {
        requirements: [{ content: Items.get("lead")!, amount: 10 }, { content: Items.get("silicon")!, amount: 8 }],
        generates: 7.2
    }),

    "solar-panel-large": new GeneratorBlock("solar-panel-large", {
        requirements: [{ content: Items.get("lead")!, amount: 60 }, { content: Items.get("silicon")!, amount: 70 }, { content: Items.get("phase-fabric")!, amount: 15 }],
        size: 3,
        generates: 63.6
    }),

    "thorium-reactor": new GeneratorBlock("thorium-reactor", {
        requirements: [{ content: Items.get("lead")!, amount: 300 }, { content: Items.get("silicon")!, amount: 200 }, { content: Items.get("graphite")!, amount: 150 }, { content: Items.get("thorium")!, amount: 150 }, { content: Items.get("metaglass")!, amount: 50 }],
        size: 3,
        generates: 900,
        input: [
            { content: Items.get("thorium")!, amount: 1 / 60 },
            { content: Fluids.get("cryofluid")!, amount: 2.4 }
        ],
    }),

    "impact-reactor": new GeneratorBlock("impact-reactor", {
        requirements: [{ content: Items.get("lead")!, amount: 500 }, { content: Items.get("silicon")!, amount: 300 }, { content: Items.get("graphite")!, amount: 400 }, { content: Items.get("thorium")!, amount: 100 }, { content: Items.get("surge-alloy")!, amount: 250 }, { content: Items.get("metaglass")!, amount: 250 }],
        size: 4,
        generates: 6360,
        powerConsumption: 1500,
        input: [
            {content: Items.get("blast-compound")!, amount: 60 / 140 },
            {content: Fluids.get("cryofluid")!, amount: 15 }
        ]
    }),
    // #endregion
    // power - erekir
    // production
    "mechanical-drill": new DrillBlock('mechanical-drill', { size: 2 }),
    "pneumatic-drill": new DrillBlock('pneumatic-drill', { size: 2 }),
    "laser-drill": new DrillBlock('laser-drill', { size: 3 }),
    "blast-drill": new DrillBlock('blast-drill', { size: 4 }),
    "water-extractor": new DrillBlock('water-extractor', { size: 2 }),
    "oil-extractor": new DrillBlock('oil-extractor', { size: 3, out: Fluids.get("oil") }),
    // cultivator

    // storage
    // storage - erekir
    // turrets

    "duo": new TurretBlock("duo", { size: 1, parts: { "-barrel-l": {}, "-barrel-r": {} } }),
    "scatter": new TurretBlock("scatter", { size: 2, parts: { "-mid": {} } }),
    "scorch": new TurretBlock("scorch", { size: 1, }),
    "hail": new TurretBlock("hail", { size: 1 }),
    "arc": new TurretBlock("arc", { size: 1 }),
    "wave": new TurretBlock("wave", { size: 2 }),
    "lancer": new TurretBlock("lancer", { size: 2 }),
    "swarmer": new TurretBlock("swarmer", { size: 2 }),
    "salvo": new TurretBlock("salvo", { size: 2, parts: { "-barrel": { moveY: -2.5 }, "-side": { moveX: 0.6, moveRot: -15, mirror: true } } }),
    "fuse": new TurretBlock("fuse", { size: 3 }),
    "ripple": new TurretBlock("ripple", { size: 3 }),
    "cyclone": new TurretBlock("cyclone", { size: 3, parts: { "-barrel-1": {}, "-barrel-2": {}, "-barrel-3": {} } }),
    "foreshadow": new TurretBlock("foreshadow", { size: 4 }),
    "spectre": new TurretBlock("spectre", { size: 4 }),
    "meltdown": new TurretBlock("meltdown", { size: 4 }),
    "segment": new TurretBlock("segment", { size: 2 }),
    "parallax": new TurretBlock("parallax", { size: 2 }),
    "tsunami": new TurretBlock("tsunami", { size: 3 }),
    // turrets - erekir
    // units
    // units - erekir
    // payloads
    // logic
    "logic-display": new DefaultBlock('logic-display'),
    "large-logic-display": new DefaultBlock('large-logic-display'),
    "micro-processor": new ProcessorBlock('micro-processor'),
    "logic-processor": new ProcessorBlock('logic-processor'),
    "hyper-processor": new ProcessorBlock('hyper-processor'),
    // campaign


};

export const vanillaSchematicAddon = new SchematicAddons({
    ImageRequester, BlockMap, Items, Fluids
});