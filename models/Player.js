import readline from "node:readline"

export default class Player{

    constructor(name,class_){
        this.name = name
        this.class_ = class_
        this.hitPoints = 15
        this.mana = 10
        this.spells = []
        this.items = []
        switch(class_){//TODO: set weapons, spells, and items as object
            case "fighter":
                this.weapon = "rusty sword"
                break
            case "mage":
                this.weapon = "none"
                this.spells.push("firebolt")
                break
            case "thief":
                this.weapon = "rusty dagger"
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

        //TODO: install and import readline
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        let decisionMade = false
        let message = "Are you sure you want to switch to the new weapon? (Y/N)"
        
        while(!decisionMade){
            rl.question(message, input => {
                if(input.toLowerCase() === "y" || input.toLowerCase() === "yes"){
                    this.weapon = weaponObj
                    decisionMade = true
                    console.log("Equipping new weapon.")
                }
                else if(input.toLowerCase() === "n" || input.toLowerCase() === "no"){
                    decisionMade = true
                    console.log("New weapon discarded.")
                }
                else{message = "Response not recognised, please input 'yes' or 'no'"}
            })
        }
        rl.close()
    }
}