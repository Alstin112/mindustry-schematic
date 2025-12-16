"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorBlock = exports.DiodeBlock = exports.BatteryBlock = exports.PowerNodeBlock = exports.ProcessorBlock = exports.MultiPressBlock = exports.PulverizerBlock = exports.SeparatorBlock = exports.PhaseWaverBlock = exports.CrafterBlock = exports.ConsumerBlock = exports.DrillBlock = exports.SorterLikeBlock = exports.BridgeBlock = exports.TurretBlock = exports.ConduitBlock = exports.ArmoredConveyorBlock = exports.ConveyorBlock = exports.StackConveyorBlock = exports.StorageLikeBlock = void 0;
const index_1 = require("../index");
const helpers_1 = require("../helpers");
const zlib_1 = require("zlib");
class StorageLikeBlock extends index_1.DefaultBlock {
}
exports.StorageLikeBlock = StorageLikeBlock;
StorageLikeBlock.building = class StorageBuilding extends index_1.DefaultBlock.building {
    sendsItemsToDir(dir) {
        return false;
    }
    receivesItemsFromDir(dir) {
        return false;
    }
    sendsFluidsToDir(dir) {
        return false;
    }
    receivesFluidsFromDir(dir) {
        return false;
    }
    getInputRate() {
        return [];
    }
    getOutputRate() {
        return [];
    }
};
class StackConveyorBlock extends StorageLikeBlock {
}
exports.StackConveyorBlock = StackConveyorBlock;
StackConveyorBlock.building = class StackConveyorBuilding extends StorageLikeBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        const imageMiddle = (_a = this.requestImage(`@-0`)) !== null && _a !== void 0 ? _a : null;
        const imageStart = (_b = this.requestImage(`@-1`)) !== null && _b !== void 0 ? _b : null;
        const imageEnd = (_c = this.requestImage(`@-2`)) !== null && _c !== void 0 ? _c : null;
        const imageEdge = (_d = this.requestImage(`@-edge`)) !== null && _d !== void 0 ? _d : null;
        // let image: Image | null = null;
        let flipx = false;
        let imageId = 0;
        // relativos
        // 0 - normal
        // 1 - vem esquerda
        // 2 - vem direita trás
        // 3 - vem esquerda direita e trás
        // 4 - vem esquerda e direita
        const left = (_f = (_e = this.getBuildingLeft()) === null || _e === void 0 ? void 0 : _e.extends(StorageLikeBlock)) === null || _f === void 0 ? void 0 : _f.sendsItemsToDir(helpers_1.Direction.right);
        const right = (_h = (_g = this.getBuildingRight()) === null || _g === void 0 ? void 0 : _g.extends(StorageLikeBlock)) === null || _h === void 0 ? void 0 : _h.sendsItemsToDir(helpers_1.Direction.left);
        const up = (_k = (_j = this.getBuildingUp()) === null || _j === void 0 ? void 0 : _j.extends(StorageLikeBlock)) === null || _k === void 0 ? void 0 : _k.sendsItemsToDir(helpers_1.Direction.down);
        const down = (_m = (_l = this.getBuildingDown()) === null || _l === void 0 ? void 0 : _l.extends(StorageLikeBlock)) === null || _m === void 0 ? void 0 : _m.sendsItemsToDir(helpers_1.Direction.up);
        const stackLeft = ((_p = (_o = this.getBuildingLeft()) === null || _o === void 0 ? void 0 : _o.extends(StackConveyorBlock)) === null || _p === void 0 ? void 0 : _p.rotation) === helpers_1.Direction.right;
        const stackRight = ((_r = (_q = this.getBuildingRight()) === null || _q === void 0 ? void 0 : _q.extends(StackConveyorBlock)) === null || _r === void 0 ? void 0 : _r.rotation) === helpers_1.Direction.left;
        const stackUp = ((_t = (_s = this.getBuildingUp()) === null || _s === void 0 ? void 0 : _s.extends(StackConveyorBlock)) === null || _t === void 0 ? void 0 : _t.rotation) === helpers_1.Direction.down;
        const stackDown = ((_v = (_u = this.getBuildingDown()) === null || _u === void 0 ? void 0 : _u.extends(StackConveyorBlock)) === null || _v === void 0 ? void 0 : _v.rotation) === helpers_1.Direction.up;
        const lookingToStack = !!((_w = this.getBuildingAtRotation()) === null || _w === void 0 ? void 0 : _w.extends(StackConveyorBlock));
        let bRecieving = 0;
        let sRecieving = 0;
        let flip = false;
        switch (this.rotation) {
            case helpers_1.Direction.right:
                bRecieving = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0) | (up ? 8 : 0);
                sRecieving = (stackRight ? 1 : 0) | (stackDown ? 2 : 0) | (stackLeft ? 4 : 0) | (stackUp ? 8 : 0);
                break;
            case helpers_1.Direction.down:
                bRecieving = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0) | (right ? 8 : 0);
                sRecieving = (stackDown ? 1 : 0) | (stackLeft ? 2 : 0) | (stackUp ? 4 : 0) | (stackRight ? 8 : 0);
                break;
            case helpers_1.Direction.left: // look left
                bRecieving = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0) | (down ? 8 : 0);
                sRecieving = (stackLeft ? 1 : 0) | (stackUp ? 2 : 0) | (stackRight ? 4 : 0) | (stackDown ? 8 : 0);
                break;
            case helpers_1.Direction.up: // look up
                bRecieving = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0) | (left ? 8 : 0);
                sRecieving = (stackUp ? 1 : 0) | (stackRight ? 2 : 0) | (stackDown ? 4 : 0) | (stackLeft ? 8 : 0);
                break;
        }
        let image;
        let edge = 0b0000;
        if (lookingToStack && (sRecieving === 0)) {
            image = this.requestImage(`@-1`);
            edge = ~(bRecieving | 0b0001);
        }
        else if (!lookingToStack && (sRecieving === 0b0100)) {
            image = this.requestImage(`@-2`);
            edge = ~0b0100;
        }
        else {
            image = this.requestImage(`@-0`);
            edge = ~(sRecieving | (lookingToStack ? 0b0001 : 0));
            console.log(sRecieving.toString(2).padStart(4, '0'), lookingToStack);
        }
        edge &= 0b1111;
        if (!image || !imageEdge)
            return ctx.drawImage(index_1.DefaultBlock.ohno, offsetX - 8, offsetY - 8);
        offsetX += this.x * 32;
        offsetY += this.y * 32;
        console.log(edge.toString(2).padStart(4, '0'));
        ctx.save();
        ctx.translate(offsetX + 16, offsetY + 16);
        ctx.rotate(((_x = this.rotation) !== null && _x !== void 0 ? _x : 0) * (-Math.PI / 2));
        ctx.drawImage(image, -16, -16);
        if (edge & 0b0001)
            ctx.drawImage(imageEdge, -16, -16);
        ctx.rotate(Math.PI * 0.5);
        if (edge & 0b0010)
            ctx.drawImage(imageEdge, -16, -16);
        ctx.rotate(Math.PI * 0.5);
        if (edge & 0b0100)
            ctx.drawImage(imageEdge, -16, -16);
        ctx.rotate(Math.PI * 0.5);
        if (edge & 0b1000)
            ctx.drawImage(imageEdge, -16, -16);
        ctx.restore();
    }
};
class ConveyorBlock extends StorageLikeBlock {
}
exports.ConveyorBlock = ConveyorBlock;
ConveyorBlock.building = class ConveyorBuilding extends StorageLikeBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // let image: Image | null = null;
        let flipx = false;
        let imageId = 0;
        // relativos
        // 0 - normal
        // 1 - vem esquerda
        // 2 - vem direita trás
        // 3 - vem esquerda direita e trás
        // 4 - vem esquerda e direita
        const left = (_b = (_a = this.getBuildingLeft()) === null || _a === void 0 ? void 0 : _a.extends(StorageLikeBlock)) === null || _b === void 0 ? void 0 : _b.sendsItemsToDir(helpers_1.Direction.right);
        const right = (_d = (_c = this.getBuildingRight()) === null || _c === void 0 ? void 0 : _c.extends(StorageLikeBlock)) === null || _d === void 0 ? void 0 : _d.sendsItemsToDir(helpers_1.Direction.left);
        const up = (_f = (_e = this.getBuildingUp()) === null || _e === void 0 ? void 0 : _e.extends(StorageLikeBlock)) === null || _f === void 0 ? void 0 : _f.sendsItemsToDir(helpers_1.Direction.down);
        const down = (_h = (_g = this.getBuildingDown()) === null || _g === void 0 ? void 0 : _g.extends(StorageLikeBlock)) === null || _h === void 0 ? void 0 : _h.sendsItemsToDir(helpers_1.Direction.up);
        let blending = 0;
        let flip = false;
        if (this.rotation === helpers_1.Direction.right) {
            blending = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.down) {
            blending = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.left) { // look left
            blending = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.up) { // look up
            blending = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0);
        }
        flip = (blending === 1) || (blending === 6);
        flipx = (this.rotation === helpers_1.Direction.up) || (this.rotation === helpers_1.Direction.down) ? true : false;
        imageId = [0, 1, 0, 2, 1, 4, 2, 3][blending];
        const image = (_j = this.requestImage(`@-${imageId}-0`)) !== null && _j !== void 0 ? _j : null;
        if (!image)
            return ctx.drawImage(index_1.DefaultBlock.ohno, offsetX - 8, offsetY - 8);
        offsetX += this.x * 32;
        offsetY += this.y * 32;
        ctx.save();
        ctx.translate(offsetX + 16, offsetY + 16);
        if (flip) {
            if (flipx)
                ctx.scale(-1, 1);
            else
                ctx.scale(1, -1);
        }
        ctx.rotate(((_k = this.rotation) !== null && _k !== void 0 ? _k : 0) * (-Math.PI / 2));
        ctx.translate(-(offsetX + 16), -(offsetY + 16));
        ctx.drawImage(image, offsetX, offsetY);
        ctx.restore();
    }
};
class ArmoredConveyorBlock extends StorageLikeBlock {
}
exports.ArmoredConveyorBlock = ArmoredConveyorBlock;
ArmoredConveyorBlock.building = class ArmoredConveyorBuilding extends StorageLikeBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // let image: Image | null = null;
        let flipx = false;
        let imageId = 0;
        // relativos
        // 0 - normal
        // 1 - vem esquerda
        // 2 - vem direita trás
        // 3 - vem esquerda direita e trás
        // 4 - vem esquerda e direita
        const left = (_b = (_a = this.getBuildingLeft()) === null || _a === void 0 ? void 0 : _a.extends(ConveyorBlock)) === null || _b === void 0 ? void 0 : _b.sendsItemsToDir(helpers_1.Direction.right);
        const right = (_d = (_c = this.getBuildingRight()) === null || _c === void 0 ? void 0 : _c.extends(ConveyorBlock)) === null || _d === void 0 ? void 0 : _d.sendsItemsToDir(helpers_1.Direction.left);
        const up = (_f = (_e = this.getBuildingUp()) === null || _e === void 0 ? void 0 : _e.extends(ConveyorBlock)) === null || _f === void 0 ? void 0 : _f.sendsItemsToDir(helpers_1.Direction.down);
        const down = (_h = (_g = this.getBuildingDown()) === null || _g === void 0 ? void 0 : _g.extends(ConveyorBlock)) === null || _h === void 0 ? void 0 : _h.sendsItemsToDir(helpers_1.Direction.up);
        let blending = 0;
        let flip = false;
        if (this.rotation === helpers_1.Direction.right) {
            blending = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.down) {
            blending = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.left) { // look left
            blending = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.up) { // look up
            blending = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0);
        }
        flip = (blending === 1) || (blending === 6);
        flipx = (this.rotation === helpers_1.Direction.up) || (this.rotation === helpers_1.Direction.down) ? true : false;
        imageId = [0, 1, 0, 2, 1, 4, 2, 3][blending];
        const image = (_j = this.requestImage(`@-${imageId}-0`)) !== null && _j !== void 0 ? _j : null;
        if (!image)
            return ctx.drawImage(index_1.DefaultBlock.ohno, offsetX - 8, offsetY - 8);
        offsetX += this.x * 32;
        offsetY += this.y * 32;
        ctx.save();
        ctx.translate(offsetX + 16, offsetY + 16);
        if (flip) {
            if (flipx)
                ctx.scale(-1, 1);
            else
                ctx.scale(1, -1);
        }
        ctx.rotate(((_k = this.rotation) !== null && _k !== void 0 ? _k : 0) * (-Math.PI / 2));
        ctx.translate(-(offsetX + 16), -(offsetY + 16));
        ctx.drawImage(image, offsetX, offsetY);
        ctx.restore();
    }
};
class ConduitBlock extends StorageLikeBlock {
    constructor() {
        super(...arguments);
        this.bottomColor = 0x565656;
        // drawImage(schematic: Schematic, tile: Tile, ctx: CanvasRenderingContext2D, offsetX:number, offsetY: number): void {
    }
}
exports.ConduitBlock = ConduitBlock;
ConduitBlock.building = class ConduitBuilding extends StorageLikeBlock.building {
    sendsFluidsToDir(dir) {
        return this.rotation === dir;
    }
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let flipx = false;
        let imageId = 0;
        const left = (_b = (_a = this.getBuildingLeft()) === null || _a === void 0 ? void 0 : _a.extends(StorageLikeBlock)) === null || _b === void 0 ? void 0 : _b.sendsFluidsToDir(helpers_1.Direction.right);
        const right = (_d = (_c = this.getBuildingRight()) === null || _c === void 0 ? void 0 : _c.extends(StorageLikeBlock)) === null || _d === void 0 ? void 0 : _d.sendsFluidsToDir(helpers_1.Direction.left);
        const up = (_f = (_e = this.getBuildingUp()) === null || _e === void 0 ? void 0 : _e.extends(StorageLikeBlock)) === null || _f === void 0 ? void 0 : _f.sendsFluidsToDir(helpers_1.Direction.down);
        const down = (_h = (_g = this.getBuildingDown()) === null || _g === void 0 ? void 0 : _g.extends(StorageLikeBlock)) === null || _h === void 0 ? void 0 : _h.sendsFluidsToDir(helpers_1.Direction.up);
        const blockRight = (_j = this.getBuildingRight()) === null || _j === void 0 ? void 0 : _j.extends(StorageLikeBlock);
        let blending = 0;
        let flip = false;
        if (this.rotation === helpers_1.Direction.right) {
            blending = (down ? 1 : 0) | (left ? 2 : 0) | (up ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.down) {
            blending = (left ? 1 : 0) | (up ? 2 : 0) | (right ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.left) { // look left
            blending = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0);
        }
        else if (this.rotation === helpers_1.Direction.up) { // look up
            blending = (right ? 1 : 0) | (down ? 2 : 0) | (left ? 4 : 0);
        }
        console.log(blending);
        flip = (blending === 1) || (blending === 6);
        flipx = (this.rotation === helpers_1.Direction.up) || (this.rotation === helpers_1.Direction.down) ? true : false;
        imageId = [0, 1, 0, 2, 1, 4, 2, 3][blending];
        offsetX += this.x * 32;
        offsetY += this.y * 32;
        ctx.save();
        ctx.translate(offsetX + 16, offsetY + 16);
        if (flip) {
            if (flipx)
                ctx.scale(-1, 1);
            else
                ctx.scale(1, -1);
        }
        ctx.rotate(((_k = this.rotation) !== null && _k !== void 0 ? _k : 0) * (-Math.PI / 2));
        ctx.translate(-(offsetX + 16), -(offsetY + 16));
        // const image = this.requestImage(`@`) ?? DefaultBlock.ohno;
        const imageTop = (_l = this.requestImage(`@-top-${imageId}`)) !== null && _l !== void 0 ? _l : null;
        const imageBottom = (_m = this.requestImage(`@-bottom-${imageId}`, `conduit-bottom-${imageId}`)) !== null && _m !== void 0 ? _m : null;
        const cap = (_o = this.requestImage(`@-cap`)) !== null && _o !== void 0 ? _o : null;
        if (imageBottom) {
            const block = this.block;
            ctx.fillStyle = `#${block.bottomColor.toString(16).padStart(6, '0')}`;
            ctx.fillRect(offsetX, offsetY, 32, 32);
            ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(imageBottom, offsetX, offsetY);
            ctx.globalCompositeOperation = 'source-over';
        }
        if (cap) {
            if (!left && (this.rotation === helpers_1.Direction.right))
                ctx.drawImage(cap, offsetX, offsetY);
        }
        if (imageTop)
            ctx.drawImage(imageTop, offsetX, offsetY);
        // ctx.drawImage(image, offsetX, offsetY);
        ctx.restore();
    }
};
class TurretBlock extends StorageLikeBlock {
    constructor(name, options) {
        super(name, options);
        this.parts = {};
        if (options.parts) {
            this.parts = options.parts;
        }
    }
}
exports.TurretBlock = TurretBlock;
TurretBlock.building = class TurretBuilding extends StorageLikeBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a;
        const base = (_a = this.requestImage(`@-base`, `block-${this.block.size}`)) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const borderColor = 0x404049;
        const borderWidth = 3;
        const top = this.getTopLeftPosition();
        offsetX += top[0] * 32;
        offsetY += top[1] * 32;
        if (borderWidth <= 0) {
            this.drawTop(ctx, offsetX, offsetY);
            ctx.drawImage(base, offsetX, offsetY);
        }
        else {
            for (let x = -borderWidth; x <= borderWidth; x++) {
                for (let y = -borderWidth; y <= borderWidth; y++) {
                    if (Math.abs(x) !== borderWidth && Math.abs(y) !== borderWidth)
                        continue;
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
    drawTop(ctx, offsetX, offsetY) {
        var _a, _b, _c;
        const image = this.requestImage(`@`);
        const top = this.getTopLeftPosition();
        // offsetX += top[0] * 32;
        // offsetY += top[1] * 32;
        for (const [partName, part] of Object.entries(this.block.parts)) {
            if (part.mirror) {
                const imagePartR = (_a = this.requestImage(`@${partName}-r`)) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
                const imagePartL = (_b = this.requestImage(`@${partName}-l`)) !== null && _b !== void 0 ? _b : index_1.DefaultBlock.ohno;
                ctx.save();
                ctx.translate(offsetX + imagePartR.width / 2, offsetY + imagePartR.height / 2);
                // ctx.translate(part.moveX ?? 0,part.moveY ?? 0);
                // ctx.rotate((part.moveRot ?? 0) * Math.PI / 180);
                ctx.drawImage(imagePartR !== null && imagePartR !== void 0 ? imagePartR : index_1.DefaultBlock.ohno, -(imagePartR.width / 2), -(imagePartR.height / 2));
                ctx.restore();
                ctx.save();
                ctx.translate(offsetX + imagePartR.width / 2, offsetY + imagePartR.height / 2);
                ctx.scale(-1, 1);
                // ctx.translate((part.moveX ?? 0) , (part.moveY ?? 0) );
                // ctx.rotate((part.moveRot ?? 0) * Math.PI / 180);
                ctx.drawImage(imagePartL !== null && imagePartL !== void 0 ? imagePartL : index_1.DefaultBlock.ohno, -(imagePartL.width / 2), -(imagePartL.height / 2));
                ctx.restore();
            }
            else {
                const imagePart = (_c = this.requestImage(`@${partName}`)) !== null && _c !== void 0 ? _c : index_1.DefaultBlock.ohno;
                ctx.save();
                ctx.translate(offsetX + imagePart.width / 2, offsetY + imagePart.height / 2);
                // ctx.translate(part.moveX ?? 0, part.moveY ?? 0);
                // ctx.rotate((part.moveRot ?? 0) * Math.PI / 180);
                ctx.drawImage(imagePart !== null && imagePart !== void 0 ? imagePart : index_1.DefaultBlock.ohno, -(imagePart.width / 2), -(imagePart.height / 2));
                ctx.restore();
            }
        }
        if (image)
            ctx.drawImage(image, offsetX, offsetY);
    }
};
class BridgeBlock extends StorageLikeBlock {
}
exports.BridgeBlock = BridgeBlock;
BridgeBlock.building = class BridgeBuilding extends StorageLikeBlock.building {
    constructor(block, schematic, infoRaw) {
        super(block, schematic, infoRaw);
        const info = infoRaw;
        this.to = info.config;
    }
    sendingTo() {
        const targetBuilding = this.schematic.getBuildingAt(this.x + this.to.x, this.y - this.to.y);
        return targetBuilding instanceof BridgeBlock.building ? targetBuilding !== this ? targetBuilding : null : null;
    }
    drawOverlay(ctx, offsetX, offsetY) {
        var _a, _b;
        const target = this.sendingTo();
        if (!target)
            return;
        if (this.schematic.renderer.bridgeOpacity === 0)
            return;
        ctx.globalAlpha = this.schematic.renderer.bridgeOpacity;
        const imageBridge = (_a = this.requestImage(`@-bridge`)) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const imageArrow = (_b = this.requestImage(`@-arrow`)) !== null && _b !== void 0 ? _b : index_1.DefaultBlock.ohno;
        offsetX += this.x * 32;
        offsetY += this.y * 32;
        ctx.save();
        ctx.translate(offsetX + 16, offsetY + 16);
        if (this.to.x > 0)
            ctx.rotate(0 * Math.PI);
        else if (this.to.y > 0)
            ctx.rotate(1.5 * Math.PI);
        else if (this.to.x < 0)
            ctx.rotate(1 * Math.PI);
        else if (this.to.y < 0)
            ctx.rotate(0.5 * Math.PI);
        ctx.translate(-(offsetX + 16), -(offsetY + 16));
        const length = Math.abs(this.to.x + this.to.y) * 32;
        for (let i = 32; i < length; i += 32) {
            ctx.drawImage(imageBridge, offsetX + i, offsetY);
            ctx.drawImage(imageArrow, offsetX + i, offsetY);
        }
        ctx.restore();
        ctx.globalAlpha = 1;
    }
};
class SorterLikeBlock extends StorageLikeBlock {
}
exports.SorterLikeBlock = SorterLikeBlock;
SorterLikeBlock.building = class SorterBuilding extends StorageLikeBlock.building {
    constructor(block, schematic, info) {
        var _a;
        super(block, schematic, info);
        this.item = null;
        if (index_1.Schematic.BuildingInfoChecker(5, info)) {
            this.item = (_a = schematic.itemById[info.config.id]) !== null && _a !== void 0 ? _a : null;
            if (this.item === undefined)
                this.item = null;
        }
    }
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b;
        const image = (_a = this.requestImage("@")) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        offsetX += this.x * 32;
        offsetY += this.y * 32;
        ctx.save();
        ctx.drawImage(image, offsetX, offsetY);
        if (this.item) {
            ctx.fillStyle = `#${this.item.color.toString(16).padStart(6, '0')}`;
            ctx.fillRect(offsetX + 8, offsetY + 8, 16, 16);
        }
        else {
            const imageTop = (_b = this.requestImage("@-cross", "cross-full")) !== null && _b !== void 0 ? _b : index_1.DefaultBlock.ohno;
            ctx.globalCompositeOperation = 'destination-over';
            ctx.drawImage(imageTop, offsetX, offsetY);
            ctx.globalCompositeOperation = 'source-over';
        }
        ctx.restore();
    }
};
class DrillBlock extends StorageLikeBlock {
    constructor(name, config = {}) {
        super(name, config);
        this.rotationSpeed = 1;
        this.out = null;
        if (config.rotationSpeed !== undefined)
            this.rotationSpeed = config.rotationSpeed;
        if (config.out !== undefined)
            this.out = config.out;
    }
}
exports.DrillBlock = DrillBlock;
DrillBlock.building = class DrillBuilding extends StorageLikeBlock.building {
    constructor() {
        super(...arguments);
        this.miningItem = null;
        this.efficiency = 1;
    }
    sendsFluidsToDir(dir) {
        const block = this.block;
        return block.out ? (block.out instanceof index_1.Fluid) : false;
    }
    sendsItemsToDir(dir) {
        const block = this.block;
        return block.out ? (block.out instanceof index_1.Item) : false;
    }
    drawImage(ctx, offsetX, offsetY) {
        var _a;
        const image = (_a = this.requestImage("@")) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const top = this.requestImage("@-top");
        const rotator = this.requestImage("@-rotator");
        const topPos = this.getTopLeftPosition();
        offsetX += topPos[0] * 32;
        offsetY += topPos[1] * 32;
        ctx.globalCompositeOperation = 'destination-over';
        if (top)
            ctx.drawImage(top, offsetX, offsetY);
        if (rotator) {
            ctx.save();
            ctx.translate(offsetX + 16, offsetY + 16);
            const time = this.schematic.renderer.time;
            const block = this.block;
            ctx.rotate((time * block.rotationSpeed * this.efficiency) % (Math.PI * 2));
            ctx.translate(-(offsetX + 16), -(offsetY + 16));
            ctx.drawImage(rotator, offsetX, offsetY);
            ctx.restore();
        }
        ctx.drawImage(image, offsetX, offsetY);
        ctx.globalCompositeOperation = 'source-over';
    }
};
class ConsumerBlock extends StorageLikeBlock {
    constructor(name, config = {}) {
        super(name, config);
        this.input = [];
        if (config.input !== undefined) {
            for (const i of config.input) {
                if (i.amount === undefined)
                    i.amount = 1;
                if (i.optional === undefined)
                    i.optional = false;
            }
            this.input = config.input;
        }
    }
}
exports.ConsumerBlock = ConsumerBlock;
ConsumerBlock.building = class ConsumerBuilding extends StorageLikeBlock.building {
    receivesFluidsFromDir(dir) {
        return this.block.input.some(i => i.content instanceof index_1.Fluid);
    }
    receivesItemsFromDir(dir) {
        for (const i of this.block.input) {
            if (i.content instanceof index_1.Item)
                return true;
            if (Object.values(helpers_1.ItemTags).includes(i.content))
                return true;
        }
        return false;
    }
    getInputRate() {
        const block = this.block;
        const ContentRate = [];
        for (const i of block.input) {
            if (i.optional)
                continue;
            if (typeof i.content === "symbol")
                continue;
            ContentRate.push({ content: i.content, amount: i.amount });
        }
        return ContentRate;
    }
};
class CrafterBlock extends StorageLikeBlock {
    constructor(name, config) {
        super(name, config);
        this.input = [];
        this.output = [];
        this.craftTime = 60;
        if (config.input !== undefined)
            this.input = config.input;
        if (config.output !== undefined)
            this.output = config.output;
        if (config.craftTime !== undefined)
            this.craftTime = config.craftTime;
    }
}
exports.CrafterBlock = CrafterBlock;
CrafterBlock.building = class CrafterBuilding extends StorageLikeBlock.building {
    sendsItemsToDir(dir) {
        const block = this.block;
        return block.out ? (block.out instanceof index_1.Item) : false;
    }
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b;
        const image = (_a = this.requestImage("@")) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const bottom = (_b = this.requestImage("@-bottom")) !== null && _b !== void 0 ? _b : null;
        const topPos = this.getTopLeftPosition();
        offsetX += topPos[0] * 32;
        offsetY += topPos[1] * 32;
        if (bottom)
            ctx.drawImage(bottom, offsetX, offsetY);
        ctx.drawImage(image, offsetX, offsetY);
    }
};
class PhaseWaverBlock extends CrafterBlock {
    constructor(name, config) {
        super(name, config);
    }
}
exports.PhaseWaverBlock = PhaseWaverBlock;
PhaseWaverBlock.building = class PhaseWaverBuilding extends CrafterBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c;
        const image = (_a = this.requestImage("@")) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const weave = (_b = this.requestImage("@-weave")) !== null && _b !== void 0 ? _b : null;
        const bottom = (_c = this.requestImage("@-bottom")) !== null && _c !== void 0 ? _c : null;
        const topPos = this.getTopLeftPosition();
        offsetX += topPos[0] * 32;
        offsetY += topPos[1] * 32;
        if (bottom)
            ctx.drawImage(bottom, offsetX, offsetY);
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
};
class SeparatorBlock extends StorageLikeBlock {
    constructor(name, config) {
        super(name, config);
    }
}
exports.SeparatorBlock = SeparatorBlock;
SeparatorBlock.building = class SeparatorBuilding extends CrafterBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c;
        const image = (_a = this.requestImage("@")) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const bottom = (_b = this.requestImage("@-bottom")) !== null && _b !== void 0 ? _b : null;
        const weave = (_c = this.requestImage("@-weave")) !== null && _c !== void 0 ? _c : null;
        const topPos = this.getTopLeftPosition();
        offsetX += topPos[0] * 32;
        offsetY += topPos[1] * 32;
        if (bottom)
            ctx.drawImage(bottom, offsetX, offsetY);
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
};
class PulverizerBlock extends CrafterBlock {
    constructor(name, config) {
        super(name, config);
    }
}
exports.PulverizerBlock = PulverizerBlock;
PulverizerBlock.building = class PulverizerBuilding extends CrafterBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c;
        const image = (_a = this.requestImage("@")) !== null && _a !== void 0 ? _a : index_1.DefaultBlock.ohno;
        const rotator = (_b = this.requestImage("@-rotator")) !== null && _b !== void 0 ? _b : null;
        const top = (_c = this.requestImage("@-top")) !== null && _c !== void 0 ? _c : null;
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
        if (top)
            ctx.drawImage(top, offsetX, offsetY);
    }
};
class MultiPressBlock extends CrafterBlock {
    constructor(name, config) {
        super(name, config);
    }
}
exports.MultiPressBlock = MultiPressBlock;
MultiPressBlock.building = class MultiPressBuilding extends CrafterBlock.building {
    drawImage(ctx, offsetX, offsetY) {
        var _a, _b, _c, _d;
        const bottom = (_a = this.requestImage("@-bottom")) !== null && _a !== void 0 ? _a : null;
        const piston0 = this.requestImage("@-piston0");
        const piston1 = this.requestImage("@-piston1");
        const pistonT = this.requestImage("@-piston-t");
        const image = (_b = this.requestImage("@")) !== null && _b !== void 0 ? _b : index_1.DefaultBlock.ohno;
        const liquid = (_c = this.requestImage("@-liquid")) !== null && _c !== void 0 ? _c : null;
        const top = (_d = this.requestImage("@-top")) !== null && _d !== void 0 ? _d : null;
        const topPos = this.getTopLeftPosition();
        offsetX += topPos[0] * 32;
        offsetY += topPos[1] * 32;
        if (bottom)
            ctx.drawImage(bottom, offsetX, offsetY);
        if (piston0 && piston1 && pistonT) {
            ctx.drawImage(piston0, offsetX, offsetY);
            ctx.drawImage(piston1, offsetX, offsetY);
            ctx.drawImage(pistonT, offsetX, offsetY);
        }
        ctx.drawImage(image, offsetX, offsetY);
        // if (liquid) ctx.drawImage(liquid, offsetX, offsetY);
        if (top)
            ctx.drawImage(top, offsetX, offsetY);
    }
};
class ProcessorBlock extends index_1.DefaultBlock {
    constructor(name) {
        super(name);
        this.configType = 14;
    }
}
exports.ProcessorBlock = ProcessorBlock;
ProcessorBlock.building = class ProcessorBuilding extends index_1.DefaultBlock.building {
    constructor(block, schematic, infoRaw) {
        super(block, schematic, infoRaw);
        const info = infoRaw;
        const inflatedBuffer = (0, zlib_1.inflateSync)(info.config);
        const version = inflatedBuffer.readUInt8(0);
        if (version !== 1)
            throw new Error(`Unsupported config version ${version}`);
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
class PowerNodeBlock extends index_1.DefaultBlock {
    constructor() {
        super(...arguments);
        this.distributesPower = true;
    }
}
exports.PowerNodeBlock = PowerNodeBlock;
PowerNodeBlock.building = class PowerNodeBuilding extends index_1.DefaultBlock.building {
    constructor(block, schematic, info) {
        super(block, schematic, info);
        this.connectedBuildings = [];
        if (index_1.Schematic.BuildingInfoChecker(8, info)) {
            for (const coord of info.config) {
                const b = schematic.getBuildingAt(coord.x, coord.y);
                if (b)
                    this.connectedBuildings.push(b);
            }
        }
    }
};
class BatteryBlock extends index_1.DefaultBlock {
    constructor(name, config) {
        super(name, config);
        this.distributesPower = true;
        this.holds = config.powerBuffer;
    }
}
exports.BatteryBlock = BatteryBlock;
BatteryBlock.building = class BatteryBuilding extends index_1.DefaultBlock.building {
};
class DiodeBlock extends index_1.DefaultBlock {
}
exports.DiodeBlock = DiodeBlock;
DiodeBlock.building = class DiodeBuilding extends index_1.DefaultBlock.building {
    sendsPowerToDir(dir) {
        return this.rotation === dir;
    }
};
class GeneratorBlock extends ConsumerBlock {
    constructor(name, config) {
        var _a;
        super(name, config);
        this.distributesPower = true;
        this.generates = (_a = config.generates) !== null && _a !== void 0 ? _a : 0;
    }
}
exports.GeneratorBlock = GeneratorBlock;
