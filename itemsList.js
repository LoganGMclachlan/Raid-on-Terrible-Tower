import Item from "./models/Item"

export const conumables = [
    new Item("Apple","Heals 1 hp.","consumable"),
    new Item("Slice of Pie","Heals 2 hp.","consumable"),
    new Item("Elixer of Health","Heals 3 hp","consumable"),
    new Item("Elixar of Mana","Restores 5 mp","consumable"),
    new Item("Elixer of Martial Superiority","Increases base damage by 1","consumable"),
]

export const gear = [
    new Item("Shield","Reduces Incoming damage from enemies by 1.","gear")
]

export const allItems = conumables.concat(gear)