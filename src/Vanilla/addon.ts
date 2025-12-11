import { Image } from "canvas";
import { BridgeBlock, ConduitBlock, StackConveyorBlock, DrillBlock, ProcessorBlock, SorterLikeBlock, ArmoredConveyorBlock, TurretBlock, CrafterBlock, SeparatorBlock, PhaseWaverBlock, PulverizerBlock, MultiPressBlock } from "./blocks";
import { DefaultBlock, Fluid, Item, SchematicAddons } from "../index";
import obj from "./minified_sprites.json"

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
    ["copper", new Item("copper", 0xd99d73),],
    ["lead", new Item("lead", 0x8c7fa9),],
    ["metaglass", new Item("metaglass", 0xebeef5),],
    ["graphite", new Item("graphite", 0xb2c6d2),],
    ["sand", new Item("sand", 0xf7cba4),],
    ["coal", new Item("coal", 0x272727),],
    ["titanium", new Item("titanium", 0x8da1e3),],
    ["thorium", new Item("thorium", 0xf9a3c7),],
    ["scrap", new Item("scrap", 0x777777),],
    ["silicon", new Item("silicon", 0x53565c),],
    ["plastanium", new Item("plastanium", 0xcbd97f),],
    ["phase-fabric", new Item("phase-fabric", 0xf4ba6e),],
    ["surge-alloy", new Item("surge-alloy", 0xf3e979),],
    ["spore-pod", new Item("spore-pod", 0x7457ce),],
    ["blast-compound", new Item("blast-compound", 0xff795e),],
    ["pyratite", new Item("pyratite", 0xffaa5f),],
    ["beryllium", new Item("beryllium", 0x3a8f64),],
    ["tungsten", new Item("tungsten", 0x768a9a),],
    ["oxide", new Item("oxide", 0xe4ffd6),],
    ["carbide", new Item("carbide", 0x89769a),],
    ["fissile-matter", new Item("fissile-matter", 0x5e988d),],
    ["dormant-cyst", new Item("dormant-cyst", 0xdf824d)],
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
export const BlockMap = {
    // Environment
    // Boulders
    // old metal floors
    // new metal floors
    // new metal walls
    // ores
    // wall ores
    // crafting


    "graphite-press": new CrafterBlock("graphite-press", {
        size: 2,
        craftTime: 90,
        requirements: [{ item: Items.get("lead")!, amount: 75 }, { item: Items.get("metaglass")!, amount: 30 }],
        input: [{ item: Items.get("coal")!, amount: 3 }],
        output: [{ item: Items.get("graphite")!, amount: 1 }],
    }),

    "multi-press": new CrafterBlock("multi-press", {
        requirements: [{ item: Items.get("titanium")!, amount: 100 }, { item: Items.get("silicon")!, amount: 25 }, { item: Items.get("lead")!, amount: 100 }, { item: Items.get("graphite")!, amount: 50 }],
        output: [{ item: Items.get("graphite")!, amount: 2 }],
        craftTime: 30,
        size: 3,
        powerConsumption: 1.8,
        input: [{ item: Items.get("coal")!, amount: 3 }, { item: Fluids.get("water")!, amount: 0.1 }],
    }),

    "silicon-smelter": new CrafterBlock("silicon-smelter", {
        requirements: [{ item: Items.get("copper")!, amount: 30 }, { item: Items.get("lead")!, amount: 25 }],
        size: 2,
        craftTime: 40,
        input: [{ item: Items.get("coal")!, amount: 1 }, { item: Items.get("sand")!, amount: 2 }],
        output: [{ item: Items.get("silicon")!, amount: 1 }],
        powerConsumption: 0.50
    }),
    "silicon-crucible": new CrafterBlock("silicon-crucible", {
        requirements: [{ item: Items.get("titanium")!, amount: 120 }, { item: Items.get("metaglass")!, amount: 80 }, { item: Items.get("plastanium")!, amount: 35 }, { item: Items.get("silicon")!, amount: 60 }],
        output: [{ item: Items.get("silicon")!, amount: 8 }],
        craftTime: 90,
        size: 3,
        // 		boostScale = 0.15f;,
        input: [{ item: Items.get("coal")!, amount: 4 }, { item: Items.get("sand")!, amount: 6 }, { item: Items.get("pyratite")!, amount: 1 }],
        powerConsumption: 4
    }),

    "kiln": new CrafterBlock("kiln", {
        requirements: [{ item: Items.get("copper")!, amount: 60 }, { item: Items.get("graphite")!, amount: 30 }, { item: Items.get("lead")!, amount: 30 }],
        // 		craftEffect = Fx.smeltsmoke;,
        output: [{ item: Items.get("metaglass")!, amount: 1 }],
        craftTime: 30,
        size: 2,
        // 		hasPower = hasItems = true;,
        // 		drawer = new DrawMulti(new DrawDefault(), new DrawFlame(Color.valueOf("ffc099")));,
        // 		ambientSound = Sounds.loopSmelter;,
        // 		ambientSoundVolume = 0.07f;,
        // 		,
        input: [{ item: Items.get("lead")!, amount: 1 }, { item: Items.get("sand")!, amount: 1 }],
        powerConsumption: 0.60
    }),

    "plastanium-compressor": new CrafterBlock("plastanium-compressor", {
        requirements: [{ item: Items.get("silicon")!, amount: 80 }, { item: Items.get("lead")!, amount: 115 }, { item: Items.get("graphite")!, amount: 60 }, { item: Items.get("titanium")!, amount: 80 }],
        craftTime: 60,
        output: [{ item: Items.get("plastanium")!, amount: 1 }],
        size: 2,
        // 		liquidCapacity = 60f;,
        // 		health = 320;,
        powerConsumption: 3,
        input: [{ item: Fluids.get("oil")!, amount: 0.25 }, { item: Items.get("titanium")!, amount: 2 }]
    }),

    "phase-weaver": new PhaseWaverBlock("phase-weaver", {
        requirements: [{ item: Items.get("silicon")!, amount: 130 }, { item: Items.get("lead")!, amount: 120 }, { item: Items.get("thorium")!, amount: 75 }],
        output: [{ item: Items.get("phase-fabric")!, amount: 1 }],
        craftTime: 120,
        size: 2,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawWeave(), new DrawDefault());,
        input: [{ item: Items.get("thorium")!, amount: 4 }, { item: Items.get("sand")!, amount: 10 }],
        powerConsumption: 5,
        // 		itemCapacity = 30;
    }),
    "surge-smelter": new CrafterBlock("surge-smelter", {
        requirements: [{ item: Items.get("silicon")!, amount: 80 }, { item: Items.get("lead")!, amount: 80 }, { item: Items.get("thorium")!, amount: 70 }],
        output: [{ item: Items.get("surge-alloy")!, amount: 1 }],
        craftTime: 75,
        size: 3,
        // 		itemCapacity = 20;,
        // 		drawer = new DrawMulti(new DrawDefault(), new DrawFlame());,
        powerConsumption: 4,
        input: [{ item: Items.get("copper")!, amount: 3 }, { item: Items.get("lead")!, amount: 4 }, { item: Items.get("titanium")!, amount: 2 }, { item: Items.get("silicon")!, amount: 3 }]
    }),
    "cryofluid-mixer": new CrafterBlock("cryofluid-mixer", {
        requirements: [{ item: Items.get("lead")!, amount: 65 }, { item: Items.get("silicon")!, amount: 40 }, { item: Items.get("titanium")!, amount: 60 }],
        output: [{ item: Fluids.get("cryofluid")!, amount: 12 }],
        size: 2,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawLiquidTile(Liquids.water), new DrawLiquidTile(Liquids.cryofluid){{drawLiquidLight = true;}}, new DrawDefault());,
        // 		liquidCapacity = 36f;,
        craftTime: 120,
        // 		lightLiquid = Liquids.cryofluid;,
        powerConsumption: 1,
        input: [{ item: Fluids.get("water")!, amount: 12 }, { item: Items.get("titanium")!, amount: 1 }]
    }),
    "pyratite-mixer": new CrafterBlock("pyratite-mixer", {
        requirements: [{ item: Items.get("copper")!, amount: 50 }, { item: Items.get("lead")!, amount: 25 }],
        output: [{ item: Items.get("pyratite")!, amount: 1 }],
        size: 2,
        powerConsumption: 0.20,
        input: [{ item: Items.get("coal")!, amount: 1 }, { item: Items.get("lead")!, amount: 2 }, { item: Items.get("sand")!, amount: 2 }]
    }),
    "blast-mixer": new CrafterBlock("blast-mixer", {
        requirements: [{ item: Items.get("lead")!, amount: 30 }, { item: Items.get("titanium")!, amount: 20 }],
        output: [{ item: Items.get("blast-compound")!, amount: 1 }],
        size: 2,
        input: [{ item: Items.get("pyratite")!, amount: 1 }, { item: Items.get("spore-pod")!, amount: 1 }],
        powerConsumption: 0.40
    }),
    "melter": new CrafterBlock("melter", {
        requirements: [{ item: Items.get("copper")!, amount: 30 }, { item: Items.get("lead")!, amount: 35 }, { item: Items.get("graphite")!, amount: 45 }],
        output: [{ item: Fluids.get("slag")!, amount: 12 / 60 }],
        craftTime: 10,
        // 		drawer = new DrawMulti(new DrawRegion("-bottom"), new DrawLiquidTile(), new DrawDefault());,
        powerConsumption: 1,
        input: [{ item: Items.get("scrap")!, amount: 1 }]
    }),
    "separator": new SeparatorBlock("separator", {
        requirements: [{ item: Items.get("copper")!, amount: 30 }, { item: Items.get("titanium")!, amount: 25 }],
        output: [
            { item: Items.get("copper")!, weight: 5 },
            { item: Items.get("lead")!, weight: 3 },
            { item: Items.get("graphite")!, weight: 2 },
            { item: Items.get("titanium")!, weight: 2 }
        ],
        craftTime: 35,
        size: 2,
        powerConsumption: 1.1,
        input: [{ item: Fluids.get("slag")!, amount: 4 / 60 }],
    }),
    "disassembler": new SeparatorBlock("disassembler", {
        requirements: [{ item: Items.get("plastanium")!, amount: 40 }, { item: Items.get("titanium")!, amount: 100 }, { item: Items.get("silicon")!, amount: 150 }, { item: Items.get("thorium")!, amount: 80 }],
        output: [
            { item: Items.get("sand")!, weight: 2 },
            { item: Items.get("graphite")!, weight: 1 },
            { item: Items.get("titanium")!, weight: 1 },
            { item: Items.get("thorium")!, weight: 1 }
        ],
        craftTime: 15,
        size: 3,
        powerConsumption: 4,
        input: [{ item: Fluids.get("slag")!, amount: 0.12 }, { item: Items.get("scrap")!, amount: 1 }],
        // 		itemCapacity = 20;,
    }),
    "spore-press": new MultiPressBlock("spore-press", {
        requirements: [{ item: Items.get("lead")!, amount: 35 }, { item: Items.get("silicon")!, amount: 30 }],
        // 		liquidCapacity = 60f;,
        craftTime: 20,
        output: [{ item: Fluids.get("oil")!, amount: 18 / 60 }],
        size: 2,
        input: [{ item: Items.get("spore-pod")!, amount: 1 }],
        powerConsumption: 0.7
    }),
    "pulverizer": new PulverizerBlock("pulverizer", {
        requirements: [{ item: Items.get("copper")!, amount: 30 }, { item: Items.get("lead")!, amount: 25 }],
        output: [{ item: Items.get("sand")!, amount: 1 }],
        craftTime: 40,
        input: [{ item: Items.get("scrap")!, amount: 1 }],
        powerConsumption: 0.50,
    }),
    "coal-centrifuge": new CrafterBlock("coal-centrifuge", {
        requirements: [{ item: Items.get("titanium")!, amount: 20 }, { item: Items.get("graphite")!, amount: 40 }, { item: Items.get("lead")!, amount: 30 }],
        output: [{ item: Items.get("coal")!, amount: 1 }],
        craftTime: 30,
        size: 2,
        input: [{ item: Fluids.get("oil")!, amount: 0.1 }],
        powerConsumption: 0.7
    }),
    "incinerator": new DefaultBlock("incinerator", {
        requirements: [{ item: Items.get("graphite")!, amount: 5 }, { item: Items.get("lead")!, amount: 15 }],
        powerConsumption: 0.50
    }),


    // crafting - erekir
    // sandbox
    "item-source": new SorterLikeBlock('item-source'),
    // defense
    // walls erekir
    // defense - erekir
    // transport
    "conveyor": new ArmoredConveyorBlock('conveyor', { requirements: [{ item: Items.get("copper")!, amount: 1 }] }),
    "titanium-conveyor": new ArmoredConveyorBlock('titanium-conveyor', { requirements: [{ item: Items.get("titanium")!, amount: 1 }, { item: Items.get("copper")!, amount: 1 }, { item: Items.get("lead")!, amount: 1 }] }),
    "plastanium-conveyor": new StackConveyorBlock('plastanium-conveyor', { requirements: [{ item: Items.get("plastanium")!, amount: 1 }, { item: Items.get("silicon")!, amount: 1 }, { item: Items.get("graphite")!, amount: 1 }] }),
    "armored-conveyor": new ArmoredConveyorBlock('armored-conveyor', { requirements: [{ item: Items.get("plastanium")!, amount: 1 }, { item: Items.get("thorium")!, amount: 1 }, { item: Items.get("metaglass")!, amount: 1 }] }),
    "junction": new DefaultBlock('junction', {requirements: [{ item: Items.get("copper")!, amount: 3 }]}),
    "bridge-conveyor": new BridgeBlock('bridge-conveyor', {requirements: [{ item: Items.get("copper")!, amount: 6 }, { item: Items.get("lead")!, amount: 6 }]}),
    "phase-conveyor": new BridgeBlock('phase-conveyor', {requirements: [
        { item: Items.get("phase-fabric")!, amount: 5 },
        { item: Items.get("silicon")!, amount: 7 },
        { item: Items.get("lead")!, amount: 10 },
        { item: Items.get("graphite")!, amount: 10 }
    ]}), 
    "sorter": new SorterLikeBlock('sorter', {requirements: [{ item: Items.get("lead")!, amount: 2 }, { item: Items.get("copper")!, amount: 2 }]}),
    "inverted-sorter": new SorterLikeBlock('inverted-sorter', {requirements: [{ item: Items.get("lead")!, amount: 2 }, { item: Items.get("copper")!, amount: 2 }]}),
    "router": new DefaultBlock('router', {requirements: [{ item: Items.get("copper")!, amount: 3 }]}),
    "distributor": new DefaultBlock('distributor', {requirements: [{ item: Items.get("copper")!, amount: 4 }, { item: Items.get("lead")!, amount: 4 }]}),
    "overflow-gate": new DefaultBlock('overflow-gate', {requirements: [{ item: Items.get("copper")!, amount: 4 }, { item: Items.get("lead")!, amount: 2 }]}),
    "underflow-gate": new DefaultBlock('underflow-gate', {requirements: [{ item: Items.get("copper")!, amount: 4 }, { item: Items.get("lead")!, amount: 2 }]}),
    "unloader": new SorterLikeBlock('unloader', {requirements: [{ item: Items.get("titanium")!, amount: 25 }, { item: Items.get("silicon")!, amount: 30 }]}),
    "mass-driver": new DefaultBlock('mass-driver', {requirements: [
        { item: Items.get("titanium")!, amount: 125 },
        { item: Items.get("silicon")!, amount: 75 },
        { item: Items.get("lead")!, amount: 125 },
        { item: Items.get("thorium")!, amount: 50 }
    ]}),
    // transport - alternate
    // liquid
    "conduit": new ConduitBlock('conduit'),
    "pulse-conduit": new ConduitBlock('pulse-conduit'),
    // liquid - reinforced
    // power
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