import { Image, CanvasRenderingContext2D } from 'canvas';
export type BuildingInfo<T extends number = number> = {
    x: number;
    y: number;
    rotation: number;
    configType: T;
    config: Extract<Config, {
        configType: T;
    }>['config'];
};
export type Config = {
    configType: 0;
    config: null;
} | {
    configType: 1;
    config: number;
} | {
    configType: 2;
    config: BigInt;
} | {
    configType: 3;
    config: number;
} | {
    configType: 4;
    config: string;
} | {
    configType: 5;
    config: {
        type: number;
        id: number;
    };
} | {
    configType: 6;
    config: Int16Array;
} | {
    configType: 7;
    config: {
        x: number;
        y: number;
    };
} | {
    configType: 8;
    config: {
        x: number;
        y: number;
    }[];
} | {
    configType: 9;
    config: {
        ContentType: number;
        contentId: number;
    };
} | {
    configType: 10;
    config: boolean;
} | {
    configType: 11;
    config: number;
} | {
    configType: 12;
    config: {
        x: number;
        y: number;
    };
} | {
    configType: 13;
    config: number;
} | {
    configType: 14;
    config: Buffer;
} | {
    configType: 16;
    config: boolean[];
} | {
    configType: 17;
    config: number;
} | {
    configType: 18;
    config: {
        x: number;
        y: number;
    }[];
} | {
    configType: 19;
    config: {
        x: number;
        y: number;
    };
} | {
    configType: 20;
    config: number;
} | {
    configType: 21;
    config: Uint32Array;
} | {
    configType: 22;
    config: {
        data: any;
        type: number;
    }[];
} | {
    configType: 23;
    config: number;
};
export interface ExtraBlockOptions {
    size?: number;
    requirements?: {
        content: Item;
        amount: number;
    }[];
    powerConsumption?: number;
    distributesPower?: boolean;
}
export declare class DefaultBlock {
    static autoprefix: string | null;
    static ohno: Image;
    AdditionalImageLayers: ({
        fn: (schematic: Schematic, ctx: CanvasRenderingContext2D, x: number, y: number) => void;
        zIndex: number;
    })[];
    requirements: {
        content: Item;
        amount: number;
    }[];
    powerConsumption: number;
    name: string;
    configType: number;
    size: number;
    distributesPower: boolean;
    constructor(name: string, options?: ExtraBlockOptions);
    createBuilding(...args: ConstructorParameters<typeof DefaultBlock.building> extends [any, ...infer U] ? U : never): InstanceType<typeof this.building>;
    static building: {
        new (block: DefaultBlock, schematic: Schematic, { x, y, rotation }: BuildingInfo): {
            x: number;
            y: number;
            rotation: number;
            block: DefaultBlock;
            schematic: Schematic;
            getTopLeftPosition(): [x: number, y: number];
            getBuildingDown(): /*elided*/ any | null;
            getBuildingUp(): /*elided*/ any | null;
            getBuildingLeft(): /*elided*/ any | null;
            getBuildingRight(): /*elided*/ any | null;
            getBuildingAtRotation(direction?: number): /*elided*/ any | null;
            extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
            drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
            drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
            getConfigBuffer(): [type: number, buffer: Buffer | null];
            requestImage(...names: string[]): Image | undefined;
        };
    };
    get building(): typeof DefaultBlock['building'];
}
type DefaultBlockBuilding = InstanceType<typeof DefaultBlock.building>;
export declare class UnknownBlock extends DefaultBlock {
    constructor(name: string, options?: ExtraBlockOptions);
    static building: {
        new (block: DefaultBlock, schematic: Schematic, info: BuildingInfo): {
            configType: number;
            config: any;
            block: DefaultBlock;
            schematic: Schematic;
            getConfigBuffer(): [type: number, buffer: Buffer | null];
            x: number;
            y: number;
            rotation: number;
            getTopLeftPosition(): [x: number, y: number];
            getBuildingDown(): {
                x: number;
                y: number;
                rotation: number;
                block: DefaultBlock;
                schematic: Schematic;
                getTopLeftPosition(): [x: number, y: number];
                getBuildingDown(): /*elided*/ any | null;
                getBuildingUp(): /*elided*/ any | null;
                getBuildingLeft(): /*elided*/ any | null;
                getBuildingRight(): /*elided*/ any | null;
                getBuildingAtRotation(direction?: number): /*elided*/ any | null;
                extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
                drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                getConfigBuffer(): [type: number, buffer: Buffer | null];
                requestImage(...names: string[]): Image | undefined;
            } | null;
            getBuildingUp(): {
                x: number;
                y: number;
                rotation: number;
                block: DefaultBlock;
                schematic: Schematic;
                getTopLeftPosition(): [x: number, y: number];
                getBuildingDown(): /*elided*/ any | null;
                getBuildingUp(): /*elided*/ any | null;
                getBuildingLeft(): /*elided*/ any | null;
                getBuildingRight(): /*elided*/ any | null;
                getBuildingAtRotation(direction?: number): /*elided*/ any | null;
                extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
                drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                getConfigBuffer(): [type: number, buffer: Buffer | null];
                requestImage(...names: string[]): Image | undefined;
            } | null;
            getBuildingLeft(): {
                x: number;
                y: number;
                rotation: number;
                block: DefaultBlock;
                schematic: Schematic;
                getTopLeftPosition(): [x: number, y: number];
                getBuildingDown(): /*elided*/ any | null;
                getBuildingUp(): /*elided*/ any | null;
                getBuildingLeft(): /*elided*/ any | null;
                getBuildingRight(): /*elided*/ any | null;
                getBuildingAtRotation(direction?: number): /*elided*/ any | null;
                extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
                drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                getConfigBuffer(): [type: number, buffer: Buffer | null];
                requestImage(...names: string[]): Image | undefined;
            } | null;
            getBuildingRight(): {
                x: number;
                y: number;
                rotation: number;
                block: DefaultBlock;
                schematic: Schematic;
                getTopLeftPosition(): [x: number, y: number];
                getBuildingDown(): /*elided*/ any | null;
                getBuildingUp(): /*elided*/ any | null;
                getBuildingLeft(): /*elided*/ any | null;
                getBuildingRight(): /*elided*/ any | null;
                getBuildingAtRotation(direction?: number): /*elided*/ any | null;
                extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
                drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                getConfigBuffer(): [type: number, buffer: Buffer | null];
                requestImage(...names: string[]): Image | undefined;
            } | null;
            getBuildingAtRotation(direction?: number): {
                x: number;
                y: number;
                rotation: number;
                block: DefaultBlock;
                schematic: Schematic;
                getTopLeftPosition(): [x: number, y: number];
                getBuildingDown(): /*elided*/ any | null;
                getBuildingUp(): /*elided*/ any | null;
                getBuildingLeft(): /*elided*/ any | null;
                getBuildingRight(): /*elided*/ any | null;
                getBuildingAtRotation(direction?: number): /*elided*/ any | null;
                extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
                drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
                getConfigBuffer(): [type: number, buffer: Buffer | null];
                requestImage(...names: string[]): Image | undefined;
            } | null;
            extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T["building"]> | null;
            drawImage(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
            drawOverlay(ctx: CanvasRenderingContext2D, offsetX?: number, offsetY?: number): void;
            requestImage(...names: string[]): Image | undefined;
        };
    };
}
export declare class Item {
    name: string;
    color: number;
    explosivenesse: number;
    flammability: number;
    radioactivity: number;
    constructor(name: string, color: number, options?: {
        explosiveness?: number;
        flammability?: number;
        radioactivity?: number;
    });
}
export declare class Fluid {
    name: string;
    color: number;
    constructor(name: string, color?: number);
}
interface SchematicAddonsConstructor {
    ImageRequester?: (name: string) => (Image | undefined);
    ItemColorRequester?: (name: string) => (number | undefined);
    TeamColorRequester?: (teamId: number) => (number | undefined);
    FluidColorRequester?: (name: string) => (number | undefined);
    BlockMap?: Record<string, DefaultBlock | undefined>;
    Items?: Map<string, Item>;
    Fluids?: Map<string, Fluid>;
}
export declare class SchematicAddons {
    addonName: string;
    ImageRequesters: ((name: string) => (Image | undefined))[];
    ItemColorRequesters: ((name: string) => (number | undefined))[];
    FluidColorRequesters: ((name: string) => (number | undefined))[];
    TeamColorRequesters: ((teamId: number) => (number | undefined))[];
    BlockMap: Record<string, DefaultBlock | undefined>;
    Items: Map<string, Item>;
    Fluids: Map<string, Fluid>;
    constructor(options?: SchematicAddonsConstructor);
    add(addons: SchematicAddons): this;
    requestImage(name: string): Image | undefined;
    requestItemColor(name: string): number | undefined;
    requestTeamColor(teamId: number): number | undefined;
    requestFluidColor(name: string): number | undefined;
}
export type getBuildingType<T extends DefaultBlock> = InstanceType<T['building']>;
export declare class Renderer {
    time: number;
    bridgeOpacity: number;
}
export declare class Schematic {
    static readonly version = 1;
    width: number;
    height: number;
    tags: Record<string, string>;
    blocks: DefaultBlock[];
    buildings: DefaultBlockBuilding[];
    initilialized: boolean;
    addon: SchematicAddons;
    unknownBlocksNames: string[];
    defaultBlock: typeof DefaultBlock;
    renderer: Renderer;
    itemById: Item[];
    fluidById: Fluid[];
    setAddon(addon: SchematicAddons): this;
    /**
     * Create a MindustrySchematic from a base64 string
     * @param schematic
     */
    setFrom(schematic: string): this;
    /**
     * Create a MindustrySchematic from a buffer
     * @param schematic
     */
    setFrom(schematic: Buffer): this;
    static ReadString(buffer: Buffer, index: number): [string, number];
    static ReadObject(buffer: Buffer, index: number): [Config["config"] | undefined, number, number];
    toBuffer(): Buffer;
    toBase64(): string;
    static WriteObject(obj: any, type: number): Buffer | null;
    private _tileIdArray;
    get buildingIdArray(): Uint16Array;
    getBuildingAt(x: number, y: number): DefaultBlockBuilding | null;
    toImageBuffer(): Buffer<ArrayBufferLike>;
    getBuildCost(): Map<Item, number>;
    static BuildingInfoChecker<T extends number>(typeNumber: T, info: BuildingInfo<any>): info is BuildingInfo<T>;
}
export {};
//# sourceMappingURL=index.d.ts.map