export const Direction = {
    right: 0,
    up: 1,
    left: 2,
    down: 3,
} as const;

export const ItemTags = {
    flammable: Symbol("flammable"),
    explosive: Symbol("explosive"),
    radioactive: Symbol("radioactive"),
} as const;