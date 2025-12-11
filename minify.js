const fs = require('fs');
const path = require('path');
const { loadImage, Image, createCanvas } = require('canvas');

const MindustrySpritesPath = path.join(__dirname, 'Mindustry', 'core', 'assets-raw', 'sprites');

/** @type {Promise<{name: string, image: string, width: number, height: number}>[]} */
const images = {};
const promises = [];
const queue = [
    { path: MindustrySpritesPath, name: "" }
]
let did = 0;
console.time('Load images');
while (queue.length > 0) {
    const current = queue.pop();
    const stat = fs.statSync(current.path);
    if (stat.isDirectory()) {
        const entries = fs.readdirSync(current.path);
        for (const entry of entries) {
            queue.push({ path: path.join(current.path, entry), name: entry });
        }
    } else if (stat.isFile() && (current.path.endsWith('.png') || current.path.endsWith('.jpg'))) {
        const promise = new Promise((res)=>loadImage(current.path).then(image => {
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            images[current.name.replace(/\..+?$/g, '')] = canvas.toDataURL();
            res();
        }));
        promises.push(promise);
    }
}
Promise.all(promises).then(() => {
    fs.writeFileSync(path.join(__dirname, 'minified_sprites.json'), JSON.stringify(images));
});