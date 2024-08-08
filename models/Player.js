import inquirer from "inquirer"
import Weapon from "./Weapon.js"

export default class Player{

    constructor(name,class_){
        this.name = name
        this.class_ = class_
        this.hitPoints = 15
        this.mana = 10
        this.spells = []
        this.items = []
        this.baseDamage = 1
        switch(class_){
            case "fighter":
                this.weapon = new Weapon("Rusty Sword",1,5)
                break
            case "mage":
                this.weapon = new Weapon("None",0,0)
                this.spells.push(new Spell("Firebolt","Deals 3-4 damage to target",2))
                break
            case "thief":
                this.weapon = new Weapon("Rusty Dagger",1,3)
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

    useItem(item){
        switch(item){
            case "Apple":
                this.hitPoints += 1
                break
            case "Slice of Pie":
                this.hitPoints += 2
                break
            case "Elixer of Health":
                this.hitPoints += 3
                break
            case "Elixar of Mana":
                this.mana += 5
                break
            case "Elixer of Martial Superiority":
                this.baseDamage += 1
                break
            default:
                console.log("Item not found")
                return
        }
        // removes item from items list
        this.items.map((i,index) => {if(i.title === item) this.items.splice(index,1)})
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

    async switchWeapon(weaponObj){
        if(this.weapon === "None"){
            this.weapon = weaponObj
            console.log(`Equipped new weapon: ${weaponObj}`)
            return
        }
        console.log("Current weapon: " + this.weapon.getDetails())
        console.log("New weapon: " + weaponObj.getDetails())

        await inquirer.prompt([{
            name: "confirmed",
            message: "Are you sure you want to replace your current weapon?\n",
            type: "confirm",
        }])
        .then(answer => {
            if(answer.confirmed){
                this.weapon = weaponObj
                console.log(`Equipped new weapon: ${weaponObj}`)
            }
            // refunds mana cost of conjure weapon if not equipped
            else if(weaponObj.title === "Magic Sword") this.mana += 3
        })
    }
}