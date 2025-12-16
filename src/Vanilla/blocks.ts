import { BuildingInfo, DefaultBlock, ExtraBlockOptions, Fluid, Item, Schematic, SchematicAddons } from '../index';
import { Direction, ItemTags } from '../helpers';
import { deflateSync, inflateSync } from 'zlib';
import { CanvasRenderingContext2D, Image } from 'canvas';

export class StorageLikeBlock extends DefaultBlock {
    public static building = class StorageBuilding extends DefaultBlock.building {
        sendsItemsToDir(dir: number): boolean {
            return false;
        }
        receivesItemsFromDir(dir: number): boolean {
            return false;
        }
        sendsFluidsToDir(dir: number): boolean {
            return false;
        }
        receivesFluidsFromDir(dir: number): boolean {
            return false;
        }
        getInputRate(): {content: Item | Fluid, amount: number}[] {
            return [];
        }
        getOutputRate(): {content: Item | Fluid, amount: number}[] {
            return [];
        }
    }
}
export class StackConveyorBlock extends StorageLikeBlock {
    public static building = class StackConveyorBuilding extends StorageLikeBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const imageMiddle = this.requestImage(`@-0`) ?? null;
            const imageStart = this.requestImage(`@-1`) ?? null;
            const imageEnd = this.requestImage(`@-2`) ?? null;
            const imageEdge = this.requestImage(`@-edge`) ?? null;

            // let image: Image | null = null;
            let flipx = false;
            let imageId = 0;
            // relativos
            // 0 - normal
            // 1 - vem esquerda
            // 2 - vem direita trás
            // 3 - vem esquerda direita e trás
            // 4 - vem esquerda e direita
            const left = this.getBuildingLeft()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.right)
            const right = this.getBuildingRight()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.left)
            const up = this.getBuildingUp()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.down)
            const down = this.getBuildingDown()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.up)

            const stackLeft = this.getBuildingLeft()?.extends(StackConveyorBlock)?.rotation === Direction.right;
            const stackRight = this.getBuildingRight()?.extends(StackConveyorBlock)?.rotation === Direction.left;
            const stackUp = this.getBuildingUp()?.extends(StackConveyorBlock)?.rotation === Direction.down;
            const stackDown = this.getBuildingDown()?.extends(StackConveyorBlock)?.rotation === Direction.up;

            const lookingToStack = !!this.getBuildingAtRotation()?.extends(StackConveyorBlock);

            let bRecieving = 0;
            let sRecieving = 0;
            let flip = false;
            switch (this.rotation) {
                case Direction.right:
                    bRecieving = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0) | (up ? 8 : 0);
                    sRecieving = (stackRight ? 1 : 0) | (stackDown ? 2 : 0) | (stackLeft ? 4 : 0) | (stackUp ? 8 : 0);
                    break;
                case Direction.down:
                    bRecieving = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0) | (right ? 8 : 0);
                    sRecieving = (stackDown ? 1 : 0) | (stackLeft ? 2 : 0) | (stackUp ? 4 : 0) | (stackRight ? 8 : 0);
                    break;
                case Direction.left: // look left
                    bRecieving = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0) | (down ? 8 : 0);
                    sRecieving = (stackLeft ? 1 : 0) | (stackUp ? 2 : 0) | (stackRight ? 4 : 0) | (stackDown ? 8 : 0);
                    break;
                case Direction.up: // look up
                    bRecieving = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0) | (left ? 8 : 0);
                    sRecieving = (stackUp ? 1 : 0) | (stackRight ? 2 : 0) | (stackDown ? 4 : 0) | (stackLeft ? 8 : 0);
                    break;
            }

            let image: Image | undefined;
            let edge = 0b0000;
            if (lookingToStack && (sRecieving === 0)) {
                image = this.requestImage(`@-1`);
                edge = ~(bRecieving | 0b0001);
            } else if (!lookingToStack && (sRecieving === 0b0100)) {
                image = this.requestImage(`@-2`);
                edge = ~0b0100;
            } else {
                image = this.requestImage(`@-0`);
                edge = ~(sRecieving | (lookingToStack ? 0b0001 : 0));
            }
            edge &= 0b1111;
            if (!image || !imageEdge) return ctx.drawImage(DefaultBlock.ohno, offsetX - 8, offsetY - 8);

            offsetX += this.x * 32;
            offsetY += this.y * 32;
            ctx.save();
            ctx.translate(offsetX + 16, offsetY + 16);
            ctx.rotate((this.rotation ?? 0) * (-Math.PI / 2));
            ctx.drawImage(image, -16, -16);
            if (edge & 0b0001) ctx.drawImage(imageEdge, -16, -16);
            ctx.rotate(Math.PI * 0.5);
            if (edge & 0b0010) ctx.drawImage(imageEdge, -16, -16);
            ctx.rotate(Math.PI * 0.5);
            if (edge & 0b0100) ctx.drawImage(imageEdge, -16, -16);
            ctx.rotate(Math.PI * 0.5);
            if (edge & 0b1000) ctx.drawImage(imageEdge, -16, -16);
            ctx.restore();
        }
    }
    // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
}
export class ConveyorBlock extends StorageLikeBlock {
    public static building = class ConveyorBuilding extends StorageLikeBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            // let image: Image | null = null;
            let flipx = false;
            let imageId = 0;
            // relativos
            // 0 - normal
            // 1 - vem esquerda
            // 2 - vem direita trás
            // 3 - vem esquerda direita e trás
            // 4 - vem esquerda e direita
            const left = this.getBuildingLeft()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.right)
            const right = this.getBuildingRight()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.left)
            const up = this.getBuildingUp()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.down)
            const down = this.getBuildingDown()?.extends(StorageLikeBlock)?.sendsItemsToDir(Direction.up)

            let blending = 0;
            let flip = false;
            if (this.rotation === Direction.right) {
                blending = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0);
            } else if (this.rotation === Direction.down) {
                blending = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0);
            } else if (this.rotation === Direction.left) { // look left
                blending = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0);
            } else if (this.rotation === Direction.up) { // look up
                blending = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0);
            }
            flip = (blending === 1) || (blending === 6);
            flipx = (this.rotation === Direction.up) || (this.rotation === Direction.down) ? true : false;
            imageId = [0, 1, 0, 2, 1, 4, 2, 3][blending]

            const image = this.requestImage(`@-${imageId}-0`) ?? null;
            if (!image) return ctx.drawImage(DefaultBlock.ohno, offsetX - 8, offsetY - 8);
            offsetX += this.x * 32;
            offsetY += this.y * 32;
            ctx.save();
            ctx.translate(offsetX + 16, offsetY + 16);
            if (flip) {
                if (flipx) ctx.scale(-1, 1);
                else ctx.scale(1, -1);
            }
            ctx.rotate((this.rotation ?? 0) * (-Math.PI / 2));
            ctx.translate(-(offsetX + 16), -(offsetY + 16));
            ctx.drawImage(image, offsetX, offsetY);
            ctx.restore();
        }
        sendsItemsToDir(dir: number): boolean {
            return this.rotation === dir;
        }
        receivesItemsFromDir(dir: number): boolean {
            return true;
        }
    }
}
export class ArmoredConveyorBlock extends StorageLikeBlock {
    public static building = class ArmoredConveyorBuilding extends StorageLikeBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            // let image: Image | null = null;
            let flipx = false;
            let imageId = 0;
            // relativos
            // 0 - normal
            // 1 - vem esquerda
            // 2 - vem direita trás
            // 3 - vem esquerda direita e trás
            // 4 - vem esquerda e direita
            const left = this.getBuildingLeft()?.extends(ConveyorBlock)?.sendsItemsToDir(Direction.right)
            const right = this.getBuildingRight()?.extends(ConveyorBlock)?.sendsItemsToDir(Direction.left)
            const up = this.getBuildingUp()?.extends(ConveyorBlock)?.sendsItemsToDir(Direction.down)
            const down = this.getBuildingDown()?.extends(ConveyorBlock)?.sendsItemsToDir(Direction.up)

            let blending = 0;
            let flip = false;
            if (this.rotation === Direction.right) {
                blending = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0);
            } else if (this.rotation === Direction.down) {
                blending = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0);
            } else if (this.rotation === Direction.left) { // look left
                blending = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0);
            } else if (this.rotation === Direction.up) { // look up
                blending = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0);
            }
            flip = (blending === 1) || (blending === 6);
            flipx = (this.rotation === Direction.up) || (this.rotation === Direction.down) ? true : false;
            imageId = [0, 1, 0, 2, 1, 4, 2, 3][blending]

            const image = this.requestImage(`@-${imageId}-0`) ?? null;
            if (!image) return ctx.drawImage(DefaultBlock.ohno, offsetX - 8, offsetY - 8);
            offsetX += this.x * 32;
            offsetY += this.y * 32;
            ctx.save();
            ctx.translate(offsetX + 16, offsetY + 16);
            if (flip) {
                if (flipx) ctx.scale(-1, 1);
                else ctx.scale(1, -1);
            }
            ctx.rotate((this.rotation ?? 0) * (-Math.PI / 2));
            ctx.translate(-(offsetX + 16), -(offsetY + 16));
            ctx.drawImage(image, offsetX, offsetY);
            ctx.restore();
        }
        sendsItemsToDir(dir: number): boolean {
            return this.rotation === dir;
        }
        receivesItemsFromDir(dir: number): boolean {
            return true;
        }
    }
}
export class ConduitBlock extends StorageLikeBlock {
    bottomColor = 0x565656;

    public static building = class ConduitBuilding extends StorageLikeBlock.building {
        sendsFluidsToDir(dir: number): boolean {
            return this.rotation === dir;
        }

        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            let flipx = false;
            let imageId = 0;

            const left = this.getBuildingLeft()?.extends(StorageLikeBlock)?.sendsFluidsToDir(Direction.right)
            const right = this.getBuildingRight()?.extends(StorageLikeBlock)?.sendsFluidsToDir(Direction.left)
            const up = this.getBuildingUp()?.extends(StorageLikeBlock)?.sendsFluidsToDir(Direction.down)
            const down = this.getBuildingDown()?.extends(StorageLikeBlock)?.sendsFluidsToDir(Direction.up)

            const blockRight = this.getBuildingRight()?.extends(StorageLikeBlock);


            let blending = 0;
            let flip = false;
            if (this.rotation === Direction.right) {
                blending = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0);
            } else if (this.rotation === Direction.down) {
                blending = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0);
            } else if (this.rotation === Direction.left) { // look left
                blending = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0);
            } else if (this.rotation === Direction.up) { // look up
                blending = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0);
            }
            flip = (blending === 1) || (blending === 6);
            flipx = (this.rotation === Direction.up) || (this.rotation === Direction.down) ? true : false;
            imageId = [0, 1, 0, 2, 1, 4, 2, 3][blending]

            offsetX += this.x * 32;
            offsetY += this.y * 32;
            ctx.save();
            ctx.translate(offsetX + 16, offsetY + 16);
            if (flip) {
                if (flipx) ctx.scale(-1, 1);
                else ctx.scale(1, -1);
            }
            ctx.rotate((this.rotation ?? 0) * (-Math.PI / 2));
            ctx.translate(-(offsetX + 16), -(offsetY + 16));
            // const image = this.requestImage(`@`) ?? DefaultBlock.ohno;
            const imageTop = this.requestImage(`@-top-${imageId}`) ?? null;
            const imageBottom = this.requestImage(`@-bottom-${imageId}`, `conduit-bottom-${imageId}`) ?? null;
            const cap = this.requestImage(`@-cap`) ?? null;
            if (imageBottom) {
                const block = this.block as ConduitBlock;
                ctx.fillStyle = `#${block.bottomColor.toString(16).padStart(6, '0')}`;
                ctx.fillRect(offsetX, offsetY, 32, 32);
                ctx.globalCompositeOperation = 'multiply';
                ctx.drawImage(imageBottom, offsetX, offsetY);
                ctx.globalCompositeOperation = 'source-over';
            }
            if (cap) {
                if (!left && (this.rotation === Direction.right)) ctx.drawImage(cap, offsetX, offsetY);
            }
            if (imageTop) ctx.drawImage(imageTop, offsetX, offsetY);
            // ctx.drawImage(image, offsetX, offsetY);
            ctx.restore();
        }
    }
    // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
}
export class TurretBlock extends StorageLikeBlock {
    parts: Record<string, { moveX?: number, moveY?: number, mirror?: boolean, moveRot?: number }> = {};

    constructor(name: string, options: ExtraBlockOptions & { parts?: Record<string, { moveX?: number, moveY?: number, mirror?: boolean, moveRot?: number }> }) {
        super(name, options);
        if (options.parts) {
            this.parts = options.parts;
        }
    }

    public static building = class TurretBuilding extends StorageLikeBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const base = this.requestImage(`@-base`, `block-${this.block.size}`) ?? DefaultBlock.ohno;
            const borderColor = 0x404049;
            const borderWidth = 3;
            const top = this.getTopLeftPosition();


            offsetX += top[0] * 32;
            offsetY += top[1] * 32;
            if (borderWidth <= 0) {
                this.drawTop(ctx, offsetX, offsetY);
                ctx.drawImage(base, offsetX, offsetY);
            } else {
                for (let x = -borderWidth; x <= borderWidth; x++) {
                    for (let y = -borderWidth; y <= borderWidth; y++) {
                        if (Math.abs(x) !== borderWidth && Math.abs(y) !== borderWidth) continue;
                        this.drawTop(ctx, offsetX + x, offsetY + y);
                    }
                }
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = `#${borderColor.toString(16).padStart(6, '0')}`;
                ctx.fillRect(offsetX, offsetY, base.width, base.height);
                ctx.globalCompositeOperation = 'source-over';
                this.drawTop(ctx, offsetX, offsetY);
                ctx.globalCompositeOperation = 'destination-over';
                ctx.drawImage(base, offsetX, offsetY);
                ctx.globalCompositeOperation = 'source-over';
            }

        }
        drawTop(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage(`@`);
            const top = this.getTopLeftPosition();
            // offsetX += top[0] * 32;
            // offsetY += top[1] * 32;
            for (const [partName, part] of Object.entries((this.block as TurretBlock).parts)) {
                if (part.mirror) {
                    const imagePartR = this.requestImage(`@${partName}-r`) ?? DefaultBlock.ohno;
                    const imagePartL = this.requestImage(`@${partName}-l`) ?? DefaultBlock.ohno;
                    ctx.save();
                    ctx.translate(offsetX + imagePartR.width / 2, offsetY + imagePartR.height / 2);
                    // ctx.translate(part.moveX ?? 0,part.moveY ?? 0);
                    // ctx.rotate((part.moveRot ?? 0) * Math.PI / 180);
                    ctx.drawImage(imagePartR ?? DefaultBlock.ohno, -(imagePartR.width / 2), -(imagePartR.height / 2));
                    ctx.restore();
                    ctx.save();
                    ctx.translate(offsetX + imagePartR.width / 2, offsetY + imagePartR.height / 2);
                    ctx.scale(-1, 1);
                    // ctx.translate((part.moveX ?? 0) , (part.moveY ?? 0) );
                    // ctx.rotate((part.moveRot ?? 0) * Math.PI / 180);
                    ctx.drawImage(imagePartL ?? DefaultBlock.ohno, -(imagePartL.width / 2), -(imagePartL.height / 2));
                    ctx.restore();

                } else {
                    const imagePart = this.requestImage(`@${partName}`) ?? DefaultBlock.ohno;
                    ctx.save();
                    ctx.translate(offsetX + imagePart.width / 2, offsetY + imagePart.height / 2);
                    // ctx.translate(part.moveX ?? 0, part.moveY ?? 0);
                    // ctx.rotate((part.moveRot ?? 0) * Math.PI / 180);
                    ctx.drawImage(imagePart ?? DefaultBlock.ohno, -(imagePart.width / 2), -(imagePart.height / 2));
                    ctx.restore();

                }
            }

            if (image) ctx.drawImage(image, offsetX, offsetY);
        }
    }
}

export class BridgeBlock extends StorageLikeBlock {

    public static building = class BridgeBuilding extends StorageLikeBlock.building {
        to: { x: number, y: number };
        constructor(block: DefaultBlock, schematic: Schematic, infoRaw: BuildingInfo) {
            super(block, schematic, infoRaw);
            const info = infoRaw as BuildingInfo<12>;
            this.to = info.config;
        }
        sendingTo(): BridgeBuilding | null {
            const targetBuilding = this.schematic.getBuildingAt(this.x + this.to.x, this.y - this.to.y);
            return targetBuilding instanceof BridgeBlock.building ? targetBuilding !== this ? targetBuilding : null : null;
        }
        drawOverlay(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const target = this.sendingTo();
            if (!target) return;
            if (this.schematic.renderer.bridgeOpacity === 0) return;
            ctx.globalAlpha = this.schematic.renderer.bridgeOpacity;
            const imageBridge = this.requestImage(`@-bridge`) ?? DefaultBlock.ohno;
            const imageArrow = this.requestImage(`@-arrow`) ?? DefaultBlock.ohno;
            offsetX += this.x * 32;
            offsetY += this.y * 32;
            ctx.save();
            ctx.translate(offsetX + 16, offsetY + 16);
            if (this.to.x > 0) ctx.rotate(0 * Math.PI);
            else if (this.to.y > 0) ctx.rotate(1.5 * Math.PI);
            else if (this.to.x < 0) ctx.rotate(1 * Math.PI);
            else if (this.to.y < 0) ctx.rotate(0.5 * Math.PI);
            ctx.translate(-(offsetX + 16), -(offsetY + 16));

            const length = Math.abs(this.to.x + this.to.y) * 32;
            for (let i = 32; i < length; i += 32) {
                ctx.drawImage(imageBridge, offsetX + i, offsetY);
                ctx.drawImage(imageArrow, offsetX + i, offsetY);
            }
            ctx.restore();
            ctx.globalAlpha = 1;

        }
    }
    // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
}

export class SorterLikeBlock extends StorageLikeBlock {

    public static building = class SorterBuilding extends StorageLikeBlock.building {
        item: Item | null = null;
        constructor(block: DefaultBlock, schematic: Schematic, info: BuildingInfo) {
            super(block, schematic, info);
            if (Schematic.BuildingInfoChecker(5, info)) {
                this.item = schematic.itemById[info.config.id] ?? null;
                if (this.item === undefined) this.item = null;
            }
        }
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            offsetX += this.x * 32;
            offsetY += this.y * 32;
            ctx.save();
            ctx.drawImage(image, offsetX, offsetY);
            if (this.item) {
                ctx.fillStyle = `#${this.item.color.toString(16).padStart(6, '0')}`;
                ctx.fillRect(offsetX + 8, offsetY + 8, 16, 16);
            } else {
                const imageTop = this.requestImage("@-cross", "cross-full") ?? DefaultBlock.ohno;
                ctx.globalCompositeOperation = 'destination-over';
                ctx.drawImage(imageTop, offsetX, offsetY);
                ctx.globalCompositeOperation = 'source-over';
            }

            ctx.restore();
        }
    }
    // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
}

export class DrillBlock extends StorageLikeBlock {

    rotationSpeed: number = 1;
    out: Item | Fluid | null = null;

    constructor(name: string, config: ExtraBlockOptions & { rotationSpeed?: number, out?: Item | Fluid | null } = {}) {
        super(name, config);
        if (config.rotationSpeed !== undefined) this.rotationSpeed = config.rotationSpeed;
        if (config.out !== undefined) this.out = config.out;
    }

    public static building = class DrillBuilding extends StorageLikeBlock.building {
        miningItem: Item | null = null;
        efficiency: number = 1;

        sendsFluidsToDir(dir: number): boolean {
            const block = this.block as DrillBlock;
            return block.out ? (block.out instanceof Fluid) : false;
        }
        sendsItemsToDir(dir: number): boolean {
            const block = this.block as DrillBlock;
            return block.out ? (block.out instanceof Item) : false;
        }

        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            const top = this.requestImage("@-top");
            const rotator = this.requestImage("@-rotator");
            const topPos = this.getTopLeftPosition();
            offsetX += topPos[0] * 32;
            offsetY += topPos[1] * 32;
            ctx.globalCompositeOperation = 'destination-over';
            if (top) ctx.drawImage(top, offsetX, offsetY);
            if (rotator) {
                ctx.save();
                ctx.translate(offsetX + 16, offsetY + 16);
                const time = this.schematic.renderer.time;
                const block = this.block as DrillBlock;
                ctx.rotate((time * block.rotationSpeed * this.efficiency) % (Math.PI * 2));
                ctx.translate(-(offsetX + 16), -(offsetY + 16));
                ctx.drawImage(rotator, offsetX, offsetY);
                ctx.restore();
            }
            ctx.drawImage(image, offsetX, offsetY);
            ctx.globalCompositeOperation = 'source-over';
        }
    }
    // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
}
export class ConsumerBlock extends StorageLikeBlock {
    input: { content: Item | Fluid | symbol, optional: boolean, amount: number }[] = [];
    constructor(name: string, config: ExtraBlockOptions & { input?: { content: Item | Fluid | symbol, optional?: boolean, amount?: number }[] } = {}) {
        super(name, config);
        if (config.input !== undefined) {
            for (const i of config.input) {
                if (i.amount === undefined) i.amount = 1;
                if (i.optional === undefined) i.optional = false;
            }
            this.input = config.input as { content: Item | Fluid | symbol, optional: boolean, amount: number }[];
        }
    }

    public static building = class ConsumerBuilding extends StorageLikeBlock.building {
        receivesFluidsFromDir(dir: number): boolean {
            return (this.block as ConsumerBlock).input.some(i => i.content instanceof Fluid);
        }
        receivesItemsFromDir(dir: number): boolean {
            for (const i of (this.block as ConsumerBlock).input) {
                if (i.content instanceof Item) return true;
                if (Object.values(ItemTags).includes(i.content as symbol)) return true;
            }
            return false;
        }
        getInputRate(): {content: Item | Fluid, amount: number}[] {
            const block = this.block as ConsumerBlock;
            const ContentRate: {content: Item | Fluid, amount: number}[] = [];
            for (const i of block.input) {
                if (i.optional) continue;
                if (typeof i.content === "symbol") continue;
                ContentRate.push({content: i.content, amount: i.amount}); 
            }
            return ContentRate;
        }
    }
}

interface CrafterBlockConfig extends ExtraBlockOptions {
    input: { item: Item | Fluid, amount: number }[],
    output: { item: Item | Fluid, amount: number }[],
    craftTime?: number
}
export class CrafterBlock extends StorageLikeBlock {
    input: { item: Item | Fluid, amount: number }[] = [];
    output: { item: Item | Fluid, amount: number }[] = [];
    craftTime: number = 60;

    constructor(name: string, config: CrafterBlockConfig) {
        super(name, config);
        if (config.input !== undefined) this.input = config.input;
        if (config.output !== undefined) this.output = config.output;
        if (config.craftTime !== undefined) this.craftTime = config.craftTime;
    }

    public static building = class CrafterBuilding extends StorageLikeBlock.building {

        sendsItemsToDir(dir: number): boolean {
            const block = this.block as DrillBlock;
            return block.out ? (block.out instanceof Item) : false;
        }

        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            const bottom = this.requestImage("@-bottom") ?? null;
            const topPos = this.getTopLeftPosition();
            offsetX += topPos[0] * 32;
            offsetY += topPos[1] * 32;
            if (bottom) ctx.drawImage(bottom, offsetX, offsetY);
            ctx.drawImage(image, offsetX, offsetY);
        }

    }
    // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
}
export class PhaseWaverBlock extends CrafterBlock {

    constructor(name: string, config: CrafterBlockConfig) {
        super(name, config);
    }

    public static building = class PhaseWaverBuilding extends CrafterBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            const weave = this.requestImage("@-weave") ?? null;
            const bottom = this.requestImage("@-bottom") ?? null;
            const topPos = this.getTopLeftPosition();
            offsetX += topPos[0] * 32;
            offsetY += topPos[1] * 32;
            if (bottom) ctx.drawImage(bottom, offsetX, offsetY);
            if (weave) {
                ctx.save();
                ctx.translate(offsetX + 16, offsetY + 16);
                const time = this.schematic.renderer.time;
                ctx.rotate((time * 0.05) % (Math.PI * 2));
                ctx.drawImage(weave, -16, -16);
                ctx.restore();
                ctx.globalAlpha = 1;
            }
            ctx.drawImage(image, offsetX, offsetY);
        }
    }
}

export class SeparatorBlock extends StorageLikeBlock {
    constructor(name: string, config: Omit<CrafterBlockConfig, 'output'> & { output: { item: Item | Fluid, weight: number }[] }) {
        super(name, config);
    }

    public static building = class SeparatorBuilding extends CrafterBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            const bottom = this.requestImage("@-bottom") ?? null;
            const weave = this.requestImage("@-weave") ?? null;
            const topPos = this.getTopLeftPosition();
            offsetX += topPos[0] * 32;
            offsetY += topPos[1] * 32;
            if (bottom) ctx.drawImage(bottom, offsetX, offsetY);
            if (weave) {
                ctx.save();
                ctx.translate(offsetX + 16, offsetY + 16);
                const time = this.schematic.renderer.time;
                ctx.rotate((time * 0.05) % (Math.PI * 2));
                ctx.drawImage(weave, -16, -16);
                ctx.restore();
                ctx.globalAlpha = 1;
            }
            ctx.drawImage(image, offsetX, offsetY);
        }
    }
}

export class PulverizerBlock extends CrafterBlock {
    constructor(name: string, config: CrafterBlockConfig) {
        super(name, config);
    }
    public static building = class PulverizerBuilding extends CrafterBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            const rotator = this.requestImage("@-rotator") ?? null;
            const top = this.requestImage("@-top") ?? null;
            const topPos = this.getTopLeftPosition();
            offsetX += topPos[0] * 32;
            offsetY += topPos[1] * 32;
            ctx.drawImage(image, offsetX, offsetY);
            if (rotator) {
                ctx.save();
                ctx.translate(offsetX + 16, offsetY + 16);
                const time = this.schematic.renderer.time;
                ctx.rotate((time * 0.1) % (Math.PI * 2));
                ctx.translate(-(offsetX + 16), -(offsetY + 16));
                ctx.drawImage(rotator, offsetX, offsetY);
                ctx.restore();
            }
            if (top) ctx.drawImage(top, offsetX, offsetY);
        }
    }
}
export class MultiPressBlock extends CrafterBlock {
    constructor(name: string, config: CrafterBlockConfig) {
        super(name, config);
    }
    public static building = class MultiPressBuilding extends CrafterBlock.building {
        drawImage(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number): void {
            const bottom = this.requestImage("@-bottom") ?? null;
            const piston0 = this.requestImage("@-piston0")
            const piston1 = this.requestImage("@-piston1")
            const pistonT = this.requestImage("@-piston-t")
            const image = this.requestImage("@") ?? DefaultBlock.ohno;
            const liquid = this.requestImage("@-liquid") ?? null;
            const top = this.requestImage("@-top") ?? null;


            const topPos = this.getTopLeftPosition();
            offsetX += topPos[0] * 32;
            offsetY += topPos[1] * 32;
            if (bottom) ctx.drawImage(bottom, offsetX, offsetY);
            if (piston0 && piston1 && pistonT) {
                ctx.drawImage(piston0, offsetX, offsetY);
                ctx.drawImage(piston1, offsetX, offsetY);
                ctx.drawImage(pistonT, offsetX, offsetY);
            }
            ctx.drawImage(image, offsetX, offsetY);
            // if (liquid) ctx.drawImage(liquid, offsetX, offsetY);
            if (top) ctx.drawImage(top, offsetX, offsetY);
        }
    }
}
export interface ProcessorBlockConfig {
    code: string,
    activeLinks: { name: string, x: number, y: number }[]
}

export class ProcessorBlock extends DefaultBlock {

    constructor(name: string) {
        super(name);
        this.configType = 14;
    }

    public static building = class ProcessorBuilding extends DefaultBlock.building {
        public code: string;
        public activeLinks: { name: string, x: number, y: number }[];
        constructor(block: DefaultBlock, schematic: Schematic, infoRaw: BuildingInfo) {
            super(block, schematic, infoRaw);
            const info = infoRaw as BuildingInfo<14>;
            const inflatedBuffer = inflateSync(info.config);
            const version = inflatedBuffer.readUInt8(0);
            if (version !== 1) throw new Error(`Unsupported config version ${version}`);
            const codeSize = inflatedBuffer.readUInt32BE(1);
            this.code = inflatedBuffer.toString('utf8', 5, 5 + codeSize);
            let index = 5 + codeSize;
            this.activeLinks = [];
            const linkCount = inflatedBuffer.readUInt32BE(index);
            index += 4;
            for (let i = 0; i < linkCount; i++) {
                const nameSize = inflatedBuffer.readUInt16BE(index);
                index += 2;
                const name = inflatedBuffer.toString('utf8', index, index + nameSize);
                index += nameSize;
                const x = inflatedBuffer.readInt16BE(index);
                index += 2;
                const y = inflatedBuffer.readInt16BE(index);
                index += 2;
                this.activeLinks.push({ name, x, y });
            }
        }
    };
}


export class PowerNodeBlock extends DefaultBlock {
    distributesPower: boolean = true;
    hasPowerGrid: boolean = true;
    public static building = class PowerNodeBuilding extends DefaultBlock.building {
        connectedCoords: { x: number, y: number }[] = [];
        _connectedBuildings!: InstanceType<DefaultBlock["building"]>[];

        constructor(block: DefaultBlock, schematic: Schematic, info: BuildingInfo) {
            super(block, schematic, info);
            if (Schematic.BuildingInfoChecker(8, info)) this.connectedCoords = info.config;
        }

        get connectedBuildings() {
            if(this._connectedBuildings) return this._connectedBuildings;
            this._connectedBuildings = [];
            for (const coord of this.connectedCoords) {
                const b = this.schematic.getBuildingAt(this.x+coord.x, this.y-coord.y);
                if (b) this._connectedBuildings.push(b);
            }
            return this._connectedBuildings;
        }

        getConnectedPowerBuildings(): InstanceType<typeof DefaultBlock.building>[] {
            const buildings = super.getConnectedPowerBuildings();
            return buildings.concat(this.connectedBuildings);
        }
    }
}
export class BatteryBlock extends DefaultBlock {
    hasPowerGrid: boolean = true;
    holds: number;
    distributesPower: boolean = true;
    constructor(name: string, config: ExtraBlockOptions & { powerBuffer: number }) {
        super(name, config);
        this.holds = config.powerBuffer;
    }
    public static building = class BatteryBuilding extends DefaultBlock.building {}
}
export class DiodeBlock extends DefaultBlock {
    hasPowerGrid: boolean = true;
    public static building = class DiodeBuilding extends DefaultBlock.building {
        getConnectedPowerBuildings(): InstanceType<typeof DefaultBlock.building>[] {
            const buildings = [];
            const buildingfront = this.getBuildingAtRotation(this.rotation);
            if (buildingfront && buildingfront.block.hasPowerGrid) buildings.push(buildingfront);
            const buildingback = this.getBuildingAtRotation((this.rotation + 2) & 0b11);
            if (buildingback && buildingback.block.hasPowerGrid) buildings.push(buildingback);
            return buildings;
        }
    }
}

// Get the parameters of the constructor
type ExtraOptions<T extends typeof DefaultBlock> = T extends { new(name: string, config: infer U): any } ? U extends undefined ? never : U : never;

type a = ExtraOptions<typeof DefaultBlock>;
export class GeneratorBlock extends ConsumerBlock {
    distributesPower: boolean = true;
    generates: number;
    constructor(name: string, config: ExtraOptions<typeof ConsumerBlock> & { generates: number }) {
        super(name, config);
        this.generates = (config as any).generates ?? 0;
    }
}