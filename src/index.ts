import { Image, createCanvas, ImageData, CanvasRenderingContext2D } from 'canvas';
import { get } from 'http';
import { buffer } from 'stream/consumers';
import { deflateSync, inflateSync } from 'zlib';
import { Direction } from './helpers';

export type BuildingInfo<T extends number = number> = {
    x: number;
    y: number;
    rotation: number;
    configType: T;
    config: Extract<Config, { configType: T }>['config'];
}
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
    config: { type: number; id: number; };
} | {
    configType: 6;
    config: Int16Array;
} | {
    configType: 7;
    config: { x: number; y: number; };
} | {
    configType: 8;
    config: { x: number; y: number; }[];
} | {
    configType: 9;
    config: { ContentType: number; contentId: number; };
} | {
    configType: 10;
    config: boolean;
} | {
    configType: 11;
    config: number;
} | {
    configType: 12;
    config: { x: number; y: number; };
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
    config: { x: number; y: number; }[];
} | {
    configType: 19;
    config: { x: number; y: number; };
} | {
    configType: 20;
    config: number;
} | {
    configType: 21;
    config: Uint32Array;
} | {
    configType: 22;
    config: { data: any; type: number; }[];
} | {
    configType: 23;
    config: number;
};

export interface ExtraBlockOptions {
    size?: number;
    requirements?: { content: Item; amount: number; }[];
    powerConsumption?: number;
}
export class DefaultBlock {
    static autoprefix: string | null = null;
    // set imageData ohno loaded from
    static ohno: Image = new Image();
    static {
        DefaultBlock.ohno.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRoge2X2xJFMAxF1fj/X46HMwapNhHMFmevGU+i9tKbFhGRITEjOsBVKICGAmgogIYCaCiAhgJoYgKl/K4X8Kc98CIogCa9wNS8o1eZ3tF5W+upW2qs5xwZSnWo7y2PRy/u1VmBIu2rtttDSGS9rAC6zov1nCPDXkB38bah3ksiWL3kzHBtEt8dPkD6VeijAnqytsblkzgz7PcBkbUQ9bd5MkPdA0dfObpMRjmRod7IkvHRSZwICqChABoKoKEAGgqgoQAaCqBJLzADxWxWOjdaFWkAAAAASUVORK5CYII=";
    }

    AdditionalImageLayers: ({
        fn: (schematic: Schematic, ctx: CanvasRenderingContext2D, x: number, y: number) => void,
        zIndex: number
    })[] = [];

    requirements: { content: Item; amount: number; }[] = [];
    powerConsumption: number = 0;
    name: string;
    configType: number = 0;
    size: number = 1;

    constructor(name: string, options: ExtraBlockOptions = {}) {
        if (DefaultBlock.autoprefix !== null) name = DefaultBlock.autoprefix + name;
        this.name = name;
        if (options.size !== undefined) this.size = options.size;
        if (options.requirements !== undefined) this.requirements = options.requirements;
        if (options.powerConsumption !== undefined) this.powerConsumption = options.powerConsumption;
    }

    public createBuilding(...args: ConstructorParameters<typeof DefaultBlock.building> extends [any, ...infer U] ? U : never): InstanceType<typeof this.building> {
        return new this.building(this, ...args)
    }
    public static building = class DefaultBlockBuilding {
        public x: number;
        public y: number;
        public rotation: number;
        public block: DefaultBlock;
        public schematic: Schematic;
        constructor(block: DefaultBlock, schematic: Schematic, { x, y, rotation }: BuildingInfo) {
            this.block = block;
            this.schematic = schematic;
            this.x = x;
            this.y = y;
            this.rotation = rotation;
        }

        getTopLeftPosition(): [x: number, y: number] {
            return [this.x - ((this.block.size-1)>>1), this.y - ((this.block.size)>>1)];
        }
        getBuildingDown(): DefaultBlockBuilding | null {
            const topLeftPos = this.getTopLeftPosition();
            return this.schematic.getBuildingAt(this.x, topLeftPos[1] + this.block.size);
        }
        getBuildingUp(): DefaultBlockBuilding | null {
            const topLeftPos = this.getTopLeftPosition();
            return this.schematic.getBuildingAt(this.x, topLeftPos[1] - 1);
        }
        getBuildingLeft(): DefaultBlockBuilding | null {
            const topLeftPos = this.getTopLeftPosition();
            return this.schematic.getBuildingAt(topLeftPos[0] - 1, this.y);
        }
        getBuildingRight(): DefaultBlockBuilding | null {
            const topLeftPos = this.getTopLeftPosition();
            return this.schematic.getBuildingAt(topLeftPos[0] + this.block.size, this.y);
        }
        getBuildingAtRotation(direction: number = this.rotation): DefaultBlockBuilding | null {
            switch (direction) {
                case Direction.right: return this.getBuildingRight();
                case Direction.down: return this.getBuildingDown();
                case Direction.left: return this.getBuildingLeft();
                case Direction.up: return this.getBuildingUp();
            }
            return null;
        }

        extends<T extends (typeof DefaultBlock)>(block: T): InstanceType<T['building']> | null {
            if (this.block instanceof block) {
                return this as any;
            }
            return null;
        }

        drawImage(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
            let image = this.schematic.addon.requestImage(this.block.name);
            ctx.save();
            if (!image) {
                return ctx.drawImage(DefaultBlock.ohno, offsetX + this.x*32- 8, offsetY + this.y*32 - 8)
            };
            const posTop = this.getTopLeftPosition();
            offsetX += posTop[0] * 32;
            offsetY += posTop[1] * 32;
            ctx.translate(offsetX + 16, offsetY + 16);
            ctx.rotate((this.rotation ?? 0) * (Math.PI / 2));
            ctx.translate(-(offsetX + 16), -(offsetY + 16));
            ctx.drawImage(image, offsetX, offsetY);
            ctx.restore();
        }
        drawOverlay(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void { }

        getConfigBuffer(): [type: number, buffer: Buffer | null] {
            return [0, null];
        }
        requestImage(...names: string[]): Image | undefined {
            for (const name of names) {
                const img = this.schematic.addon.requestImage(name.replace(/@/g, this.block.name));
                if (img) return img;
            }
        }
    };

    public get building(): typeof DefaultBlock['building'] {
        return (this.constructor as typeof DefaultBlock).building;
    }
}
type DefaultBlockBuilding = InstanceType<typeof DefaultBlock.building>;
export class UnknownBlock extends DefaultBlock {
    constructor(name: string, options: ExtraBlockOptions = {}) {
        super(name, options);
    }
    public static building = class unknownBlockBuilding extends DefaultBlock.building {
        configType: number;
        config: any;
        constructor(public block: DefaultBlock, public schematic: Schematic, info: BuildingInfo) {
            super(block, schematic, info);
            this.configType = info.configType;
            this.config = info.config;
        }
        getConfigBuffer(): [type: number, buffer: Buffer | null] {
            return [this.configType, Schematic.WriteObject(this.config, this.configType)];
        }
    }
}
export class Item {
    name: string;
    color: number;
    constructor(name: string, color?: number) {
        this.name = name;
        this.color = color ?? 0;
    }
}
export class Fluid {
    name: string;
    color: number;
    constructor(name: string, color?: number) {
        this.name = name;
        this.color = color ?? 0;
    }
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
export class SchematicAddons {
    addonName: string = "Vanilla";

    ImageRequesters: ((name: string) => (Image | undefined))[] = [];
    ItemColorRequesters: ((name: string) => (number | undefined))[] = [];
    FluidColorRequesters: ((name: string) => (number | undefined))[] = [];
    TeamColorRequesters: ((teamId: number) => (number | undefined))[] = [];
    BlockMap: Record<string, DefaultBlock | undefined> = {};
    Items: Map<string,Item> = new Map();
    Fluids: Map<string,Fluid> = new Map();

    constructor(options?: SchematicAddonsConstructor) {
        if (!options) return;
        if (options.ImageRequester) this.ImageRequesters.push(options.ImageRequester);
        if (options.ItemColorRequester) this.ItemColorRequesters.push(options.ItemColorRequester);
        if (options.TeamColorRequester) this.TeamColorRequesters.push(options.TeamColorRequester);
        if (options.FluidColorRequester) this.FluidColorRequesters.push(options.FluidColorRequester);
        if (options.BlockMap) this.BlockMap = options.BlockMap;
        if (options.Items) this.Items = options.Items;
        if (options.Fluids) this.Fluids = options.Fluids;
    }

    add(addons: SchematicAddons): this {
        this.ImageRequesters.push(...addons.ImageRequesters);
        this.ItemColorRequesters.push(...addons.ItemColorRequesters);
        this.TeamColorRequesters.push(...addons.TeamColorRequesters);
        this.FluidColorRequesters.push(...addons.FluidColorRequesters);
        return this;
    }

    public requestImage(name: string): Image | undefined {
        for (let i = this.ImageRequesters.length - 1; i >= 0; i--) {
            const requester = this.ImageRequesters[i](name);
            if (requester) return requester;
        }
        return undefined;
    }
    public requestItemColor(name: string): number | undefined {
        for (let i = this.ItemColorRequesters.length - 1; i >= 0; i--) {
            const requester = this.ItemColorRequesters[i](name);
            if (requester) return requester;
        }
        return undefined;
    }
    public requestTeamColor(teamId: number): number | undefined {
        for (let i = this.TeamColorRequesters.length - 1; i >= 0; i--) {
            const requester = this.TeamColorRequesters[i](teamId);
            if (requester) return requester;
        }
        return undefined;
    }
    public requestFluidColor(name: string): number | undefined {
        for (let i = this.FluidColorRequesters.length - 1; i >= 0; i--) {
            const requester = this.FluidColorRequesters[i](name);
            if (requester) return requester;
        }
        return undefined;
    }
}
export type getBuildingType<T extends DefaultBlock> = InstanceType<T['building']>;
export class Renderer {
    time: number = 0;
    bridgeOpacity: number = 0.7;
}
export class Schematic {
    static readonly version = 1;

    width = 0;
    height = 0;
    tags: Record<string, string> = {};
    blocks: DefaultBlock[] = [];
    buildings: DefaultBlockBuilding[] = [];
    initilialized = false;
    addon: SchematicAddons = new SchematicAddons();
    unknownBlocksNames: string[] = []
    defaultBlock = DefaultBlock;
    renderer: Renderer = new Renderer();
    itemById: Item[] = [];
    fluidById: Fluid[] = [];

    setAddon(addon: SchematicAddons): this {
        this.addon = addon;
        this.itemById = Array.from(addon.Items.values());
        this.fluidById = Array.from(addon.Fluids.values());
        return this;
    }

    // #region Loaders
    /**
     * Create a MindustrySchematic from a base64 string
     * @param schematic 
     */
    setFrom(schematic: string): this
    /**
     * Create a MindustrySchematic from a buffer
     * @param schematic 
     */
    setFrom(schematic: Buffer): this
    setFrom(schematic: string | Buffer): this {
        let bSchema: Buffer;
        if (typeof schematic === "string") {
            bSchema = Buffer.from(schematic, "base64");
        } else {
            bSchema = schematic;
        }
        const type = String.fromCharCode(bSchema[0], bSchema[1], bSchema[2], bSchema[3]);
        if (type !== "msch") throw new Error("Invalid input, not a Mindustry Schematic");

        const version = bSchema.readUInt8(4);
        if (version !== 1) throw new Error("Invalid version, expected 1 but got " + version);

        const inflatedBuffer = inflateSync(bSchema.subarray(5));

        let index = 0;
        this.width = inflatedBuffer.readUInt16BE(index);
        index += 2;
        this.height = inflatedBuffer.readUInt16BE(index);
        index += 2;


        const length = inflatedBuffer.readUInt8(index);
        index += 1;

        for (let i = 0; i < length; i++) {
            const [key, newIndex] = Schematic.ReadString(inflatedBuffer, index);
            const [value, newIndex2] = Schematic.ReadString(inflatedBuffer, newIndex);
            index = newIndex2;

            this.tags[key] = value;
        }

        const totalBlocks = inflatedBuffer.readUInt8(index);
        index += 1;

        this.blocks = [];
        for (let i = 0; i < totalBlocks; i++) {
            const [blockName, newIndex] = Schematic.ReadString(inflatedBuffer, index);
            index = newIndex;

            const block = this.addon.BlockMap[blockName];
            if (block) {
                this.blocks.push(block);
            } else {
                const image = this.addon.requestImage(blockName);
                const blockSize = image ? Math.ceil(image.width / 32) : 1;
                this.unknownBlocksNames.push(blockName);
                this.blocks.push(new UnknownBlock(blockName, { size: blockSize }))
            }
        }

        const totalTiles = inflatedBuffer.readUInt32BE(index);
        index += 4;
        for (let i = 0; i < totalTiles; i++) {
            const blockId = inflatedBuffer.readUInt8(index);
            const x = inflatedBuffer.readUInt16BE(index + 1);
            const y = this.height-1-inflatedBuffer.readUInt16BE(index + 3);
            index += 5;
            const [config, newIndex, configType] = Schematic.ReadObject(inflatedBuffer, index);
            index = newIndex;
            const rotation = inflatedBuffer.readUInt8(index);
            index += 1;
            const block = this.blocks[blockId];
            if (config === undefined) {
                throw new Error(`Failed to read config for block '${block.name}' at (${x}, ${y}), configType: ${configType}`);
            }
            this.buildings.push(block.createBuilding(this, { x, y, rotation, configType, config }));
        }

        this.initilialized = true;
        return this;
    }
    static ReadString(buffer: Buffer, index: number): [string, number] {
        const length = buffer.readUInt16BE(index);
        index += 2;
        const value = buffer.toString("utf-8", index, index + length);
        index += length;
        return [value, index];
    }
    static ReadObject(buffer: Buffer, index: number): [Config["config"] | undefined, number, number] {
        const byte = buffer.readUInt8(index);
        switch (byte) {
            case 0: return [null, index + 1, byte];
            case 1: return [buffer.readInt8(index + 1), index + 2, byte];
            case 2: return [buffer.readBigInt64BE(index + 1), index + 9, byte];
            case 3: return [buffer.readFloatBE(index + 1), index + 5, byte];
            case 4: { // string
                const notNull = buffer.readUint8(index + 1);
                if(!notNull) return ["", index + 2, byte];
                const length = buffer.readUInt16BE(index + 2);
                index += 4;
                return [buffer.toString("utf8", index, index + length), index + length, byte];
            }
            case 5: { // content
                const type = buffer.readUInt8(index + 1);
                const id = buffer.readUInt16BE(index + 2);
                return [{ type, id }, index + 4, byte];
            }
            case 6: { // IntSeq
                const length = buffer.readUInt16BE(index + 1);
                const array = new Int16Array(length);
                for (let i = 0; i < length; i++) {
                    array[i] = buffer.readInt16BE(index + 3 + i * 2);
                }
                return [array, index + 3 + length * 2, byte];
            }
            case 7: { // Point2
                const x = buffer.readInt32BE(index + 1);
                const y = buffer.readInt32BE(index + 5);
                return [{ x, y }, index + 9, byte];
            }
            case 8: { // Points2[]
                const length = buffer.readUInt8(index + 1);
                const array: { x: number, y: number }[] = [];
                for (let i = 0; i < length; i++) {
                    const x = buffer.readInt16BE(index + 2 + i * 4);
                    const y = buffer.readInt16BE(index + 4 + i * 4);
                    array.push({ x, y });
                }
                return [array, index + 2 + length * 4, byte];
            }
            case 9: {
                const ContentType = buffer.readUInt8(index + 1);
                const contentId = buffer.readUInt16BE(index + 2);
                return [{ ContentType, contentId }, index + 4, byte];
            }
            case 10: return [!!buffer.readUInt8(index + 1), index + 2, byte];
            case 11: return [buffer.readDoubleBE(index + 1), index + 9, byte];
            case 12: { // building
                const x = buffer.readInt16BE(index + 1);
                const y = buffer.readInt16BE(index + 3);
                return [{ x, y }, index + 5, byte];
            }
            case 13: { // LAccess
                return [buffer.readUInt16BE(index + 1), index + 3, byte];
            }
            case 14: { // byte[]
                const length = buffer.readUInt32BE(index + 1);
                const nbuffer = buffer.subarray(index + 5, index + 5 + length);
                return [nbuffer, index + 5 + length, byte];
            }
            case 16: { // boolean[]
                const byteLength = buffer.readUInt32BE(index + 1);
                const array: boolean[] = [];
                for (let i = 0; i < byteLength; i++) {
                    array.push(!!buffer.readUInt8(index + 5 + i));
                }
                return [array, index + 5 + byteLength, byte];
            }
            case 17: { // Unid/UnitBox
                const id = buffer.readUInt32BE(index + 1);
            }
            case 18: { // Vec2[]
                const length = buffer.readUInt16BE(index + 1);
                const vecs: { x: number, y: number }[] = [];
                for (let i = 0; i < length; i++) {
                    vecs.push({
                        x: buffer.readFloatBE(index + 3 + i * 8),
                        y: buffer.readFloatBE(index + 3 + i * 8 + 4)
                    });
                }
                return [vecs, index + 3 + length * 8, byte];
            }
            case 19: { // Vec2
                const x = buffer.readFloatBE(index + 1);
                const y = buffer.readFloatBE(index + 5);
                return [{ x, y }, index + 9, byte];
            }
            case 20: { // Team
                return [buffer.readUInt8(index + 1), index + 2, byte];
            }
            case 21: { // int[]
                const length = buffer.readUInt16BE(index + 1);
                const array = new Uint32Array(length);
                for (let i = 0; i < length; i++) {
                    array[i] = buffer.readUInt32BE(index + 3 + i * 4);
                }
                return [array, index + 3 + length * 4, byte];
            }
            case 22: { // Object[]
                const ObjsLength = buffer.readUInt32BE(index + 1);
                const array = [];
                index += 5;
                for (let i = 0; i < ObjsLength; i++) {
                    const [value, newIndex, type] = Schematic.ReadObject(buffer, index);
                    index = newIndex;
                    array.push({ data: value, type });
                }
                return [array, index, byte];
            }
            case 23: { // Unit Command
                return [buffer.readUInt16BE(index + 1), index + 2, byte];
            }
            default: {
                return [undefined, index + 1, byte];
            }
        }
    }
    toBuffer(): Buffer {
        const buffers: Buffer[] = []

        const buffer = Buffer.allocUnsafe(5);
        buffer.writeUInt16BE(this.width, 0);
        buffer.writeUInt16BE(this.height, 2);
        const tags = Object.entries(this.tags);
        buffer.writeUInt8(tags.length, 4);

        buffers.push(buffer);

        for (const [key, value] of tags) {
            const newBuffer = Buffer.allocUnsafe(2 + key.length + 2 + value.length);

            newBuffer.writeUInt16BE(key.length, 0);
            newBuffer.write(key, 2, key.length, "utf-8");

            newBuffer.writeUInt16BE(value.length, 2 + key.length);
            newBuffer.write(value, 4 + key.length, value.length, "utf-8");

            buffers.push(newBuffer);
        }

        const blockBuffer = Buffer.allocUnsafe(1 + this.blocks.reduce((acc, block) => acc + block.name.length + 2, 0) + 4);

        blockBuffer.writeUInt8(this.blocks.length, 0);
        let index = 1;
        for (const block of this.blocks) {
            const blockName = block.name;
            blockBuffer.writeUInt16BE(blockName.length, index);
            blockBuffer.write(blockName, index + 2, blockName.length, "utf-8");
            index += blockName.length + 2;
        }

        blockBuffer.writeUInt32BE(this.buildings.length, index);
        buffers.push(blockBuffer);

        for (let i = 0; i < this.buildings.length; i++) {
            const building = this.buildings[i];
            const buffer = Buffer.allocUnsafe(6);
            let block: number = this.blocks.indexOf(building.block);
            if (block === -1) throw new Error(`Block '${building.block}' not found in blocks list`);
            buffer.writeUInt8(block, 0);
            buffer.writeUInt16BE(building.x, 1);
            buffer.writeUInt16BE(building.y, 3);
            const [configType, configBuffer] = building.getConfigBuffer();
            buffer.writeUInt8(configType, 5);
            buffers.push(buffer);
            if (configBuffer) buffers.push(configBuffer);
            const rotationBuffer = Buffer.allocUnsafe(1);
            rotationBuffer.writeUInt8(building.rotation, 0);
            buffers.push(rotationBuffer);
        }

        const finalBuffer = Buffer.concat(buffers);
        const compressed = deflateSync(finalBuffer);

        const final = Buffer.allocUnsafe(5 + compressed.length);
        final.write("msch", 0);
        final.writeUInt8(1, 4);
        compressed.copy(final, 5);
        return final;
    }
    toBase64(): string {
        return this.toBuffer().toString("base64");
    }
    static WriteObject(obj: any, type: number): Buffer | null {
        switch (type) {
            case 0: return null;
            case 1: {
                const b = Buffer.allocUnsafe(1);
                b.writeInt8(obj, 0);
                return b;
            }
            case 2: {
                const b = Buffer.allocUnsafe(8);
                b.writeBigInt64BE(obj, 0);
                return b;
            }
            case 3: {
                const b = Buffer.allocUnsafe(4);
                b.writeFloatBE(obj, 0);
                return b;
            }
            case 4: {
                const b = Buffer.allocUnsafe(2 + obj.length);
                b.writeUInt16BE(obj.length, 0);
                b.write(obj, 2, obj.length, "utf-8");
            }
            case 5: { // content
                const b = Buffer.allocUnsafe(3);
                b.writeUInt8(obj.type, 0);
                b.writeUInt16BE(obj.id, 1);
                return b;
            }
            case 6: {
                const b = Buffer.allocUnsafe(2 + obj.length * 2);
                b.writeUInt16BE(obj.length, 0);
                for (let i = 0; i < obj.length; i++) {
                    b.writeInt16BE(obj[i], 2 + i * 2);
                }
                return b;
            }
            case 7: {
                const b = Buffer.allocUnsafe(8);
                b.writeInt32BE(obj.x, 0);
                b.writeInt32BE(obj.y, 4);
                return b;
            }
            case 8: {
                const b = Buffer.allocUnsafe(1 + obj.length * 4);
                b.writeUInt8(obj.length, 0);
                for (let i = 0; i < obj.length; i++) {
                    b.writeInt16BE(obj[i].x, 1 + i * 4);
                    b.writeInt16BE(obj[i].y, 3 + i * 4);
                }
                return b;
            }
            case 9: {
                const b = Buffer.allocUnsafe(3);
                b.writeUInt8(obj.ContentType, 0);
                b.writeUInt16BE(obj.contentId, 1);
                return b;
            }
            case 10: {
                const b = Buffer.allocUnsafe(1);
                b.writeUInt8(obj ? 1 : 0, 0);
                return b;
            }
            case 11: {
                const b = Buffer.allocUnsafe(8);
                b.writeDoubleBE(obj, 0);
                return b;
            }
            case 12: { // building
                const b = Buffer.allocUnsafe(4);
                b.writeInt16BE(obj.x, 0);
                b.writeInt16BE(obj.y, 2);
                return b;
            }
            case 13: { // LAccess
                const b = Buffer.allocUnsafe(2);
                b.writeUInt16BE(obj, 0);
            }
            case 14: {
                const b = Buffer.allocUnsafe(4 + obj.length);
                b.writeUInt32BE(obj.length, 0);
                obj.copy(b, 4);
                return b;
            }
            case 17: { // Unid/UnitBox
                const b = Buffer.allocUnsafe(4);
                b.writeUInt32BE(obj, 0);
                return b;
            }
            case 18: {
                const b = Buffer.allocUnsafe(2 + obj.length * 8);
                b.writeUInt16BE(obj.length, 0);
                for (let i = 0; i < obj.length; i++) {
                    b.writeFloatBE(obj[i].x, 2 + i * 8);
                    b.writeFloatBE(obj[i].y, 6 + i * 8);
                }
                return b;
            }
            case 19: {
                const b = Buffer.allocUnsafe(8);
                b.writeFloatBE(obj.x, 0);
                b.writeFloatBE(obj.y, 4);
                return b;
            }
            case 20: { // Team
                const b = Buffer.allocUnsafe(1);
                b.writeUInt8(obj, 0);
                return b;
            }
            case 21: {
                const b = Buffer.allocUnsafe(2 + obj.length * 4);
                b.writeUInt16BE(obj.length, 0);
                for (let i = 0; i < obj.length; i++) {
                    b.writeUInt32BE(obj[i], 2 + i * 4);
                }
                return b;
            }
            case 22: {
                const b = Buffer.allocUnsafe(4);
                const buffers: Buffer[] = [];
                b.writeUInt32BE(obj.length, 0);
                for (let i = 0; i < obj.length; i++) {
                    const iBuffer = Buffer.allocUnsafe(1);
                    iBuffer.writeUInt8(obj[i].type, 0);
                    buffers.push(iBuffer);
                    const buffer = Schematic.WriteObject(obj[i].data, obj[i].type);
                    if (buffer) buffers.push(buffer);
                }
                return Buffer.concat([b, ...buffers]);
            }
            case 23: { // Unit Command
                const b = Buffer.allocUnsafe(2);
                b.writeUInt16BE(obj, 0);
                return b;
            }
            default: {
                return null;
            }
        }
    }
    // #endregion
    // #region Utils

    private _tileIdArray: Uint16Array = null as any;
    get buildingIdArray(): Uint16Array {
        if (this._tileIdArray) return this._tileIdArray;
        const arr = new Uint16Array(this.width * this.height);
        for (let i = 0; i < this.buildings.length; i++) {
            const building = this.buildings[i];
            const topleft = building.getTopLeftPosition();
            for (let x = 0; x < building.block.size; x++) {
                for (let y = 0; y < building.block.size; y++) {
                    const tileX = topleft[0] + x;
                    const tileY = topleft[1] + y;
                    const index = tileX + tileY * this.width;
                    arr[index] = i + 1;
                }
            }
        }
        this._tileIdArray = arr;
        return arr;
    }
    getBuildingAt(x: number, y: number): DefaultBlockBuilding | null {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null;
        if (this.buildingIdArray) {
            const index = x + y * this.width;
            const tileId = this.buildingIdArray[index];
            if (tileId === 0) return null;
            return this.buildings[tileId - 1] || null;
        }
        return null;
    }
    // #endregion

    toImageBuffer() {
        const canvas = createCanvas((this.width + 2) * 32, (this.height + 2) * 32);
        const ctx = canvas.getContext('2d');

        for (const building of this.buildings) {
            building.drawImage(ctx, 32, 32);
        }

        for (const building of this.buildings) {
            building.drawOverlay(ctx, 32, 32);
        }

        return canvas.toBuffer();
    }

    getBuildCost(): Map<Item, number> {
        const costMap: Map<Item, number> = new Map();
        for (const building of this.buildings) {
            for (const req of building.block.requirements) {
                const current = costMap.get(req.content) ?? 0;
                costMap.set(req.content, current + req.amount);
            }
        }
        return costMap;
    }

    static BuildingInfoChecker<T extends number>(typeNumber: T, info: BuildingInfo<any>): info is BuildingInfo<T> {
        return info.configType === typeNumber;
    }
}