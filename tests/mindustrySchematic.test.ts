import { deflateSync, inflateSync } from "zlib";
import { Schematic } from "./../src/index"

const schemaString = "bXNjaAF4nGNgYmBkZmDJS8xNZWAtSS0uMWTgTkktTi7KLCjJzM9jYGBgy0lMSs0pZmCKjmVk4E7OLyhILdItT8zJAcoxMcAAI4gAAMW1D/k=";
const buffer = Buffer.from(schemaString, "base64");
const deflatedInitial = Buffer.from(buffer.subarray(5));
const inflated = inflateSync(deflatedInitial); 
const deflatedInitialStr= deflatedInitial.toJSON().data.join(",");

describe("Mindustry Schematic class", () => {
    test('Mindustry Schematic Class Testing', () => {
        const mindustrySchematic = new MindustrySchematic();
        expect(mindustrySchematic).toBeInstanceOf(MindustrySchematic);
        expect(MindustrySchematic.version).toBe(1);
        expect(mindustrySchematic.setFrom).toBeInstanceOf(Function);
    });

    test('Mindustry Schematic Using Schematics', () => {
        const mindustrySchematic = new MindustrySchematic();
        const schemaString = "bXNjaAF4nGNgZGBkZmDJS8xNZWAtSS0uMWTgTkktTi7KLCjJzM9jYGBgy0lMSs0pZmCKjmVk4E7OLyhILdItT8zJAcoxMkAAAFWbD/Y=";
        mindustrySchematic.setFrom(schemaString);
        expect(mindustrySchematic.width).toBe(1);
        expect(mindustrySchematic.height).toBe(1);
        expect(mindustrySchematic.tags).toBeDefined();
        expect("name" in mindustrySchematic.tags).toBeTruthy();
        expect("description" in mindustrySchematic.tags).toBeTruthy();
        expect(mindustrySchematic.tags.name).toBe("test1");
        expect(mindustrySchematic.tags.description).toBe("");
        expect(mindustrySchematic.blocks).toBeDefined();
        expect(mindustrySchematic.blocks).toHaveLength(1);
        expect(mindustrySchematic.blocks[0]).toBe("copper-wall");

    });
});

