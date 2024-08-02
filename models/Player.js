import Weapon from "./Weapon.js"

export default class Player{

    constructor(name,class_){
        this.name = name
        this.class_ = class_
        this.hitPoints = 15
        this.mana = 10
        this.spells = []
        this.items = []
        switch(class_){
            case "fighter":
                this.weapon = new Weapon("Rusty Sword",2,5)
                break
            case "mage":
                this.weapon = new Weapon("None",1,0)
                this.spells.push(new Spell("Firebolt","Deals 3-4 damage to target",2))
                break
            case "thief":
                this.weapon = new Weapon("Rusty Dagger",2,3)
        }
    }

    getStatus(){
        console.log(`Hit Points: ${this.hitPoints} | Mana: ${this.mana}`)
    }

    listItems(){
        console.log(`Your bag contains ${this.items.length} items.`)
        this.items.map(item => console.log(item.getDetails()))
    }

    addItem(itemObj){
        this.items.push(itemObj)
    }

    useItem(itemObj){
        if(itemObj.type !== "consumable"){
            console.log("Select a consumable item to use.")
            return
        }

        switch(itemObj.title){
            case "Apple":
                this.hp += 1
                break
            case "Slice of Pie":
                this.hp += 2
                break
            //TODO: add effects for other items
        }
    }

    checkItem(itemObj){
        return this.items.includes(itemObj)
    }

    listSpells(){
        console.log(`Your know ${this.spells.length} spells`)
        this.spells.map(spell => console.log(spell.getDetails()))
    }

    checkSpell(spellObj){
        return this.spells.includes(spellObj)
    }

    switchWeapon(weaponObj){
        console.log("Current weapon: " + this.weapon.getDetails())
        console.log("New weapon: " + weaponObj.getDetails())

        //TODO: ask user if they want to replace weapon or not
    }
}