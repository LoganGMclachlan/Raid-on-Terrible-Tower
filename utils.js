import inquirer from "inquirer"
import { conumables, gear } from "./itemsList.js"
import weapons from "./weaponList.js"

export const rollSkillCheck = (dc=11) => {
    // difficuly class (dc) guide
    // low = 7 (%70 to succeed)
    // medium = 11 (%50 to succeed)
    // high = 15 (%30 to succeed)
    const roll = getRandom(20)
    return roll >= dc
}

export const selectUseItem = async player => {
    // creates list of cunsumable items to show player
    let itemsOptions = []; player.items.map(item => {if(item.type === "consumable") itemsOptions.push(item.title)})
    await inquirer.prompt([{
        name: "user_choice",
        message: "What item do you want to use?\n",
        type: "list",
        choices: itemsOptions
    }])
    .then(answer => {
        // uses item and removes it
        player.useItem(answer.use_choice)
    })
    return player
}

export const selectSpell = async spellList => {
    let spellOptions = []
    let choice = ""
    spellList.map(spell => spellOptions.push(spell.title))
    spellOptions.push("No spell, return")
    await inquirer.prompt([{
        name: "user_choice",
        message: "What spell do you want to cast?\n",
        type: "list",
        choices: spellOptions
    }])
    .then(answer => {
        choice = answer.user_choice
    })
    .catch(err => {
        console.error(err)
    })
    return choice
}

// randomly selects and adds a new item to a players inventory
export const addItem = player => {
    let randomItem
    if(getRandom(10) <= 7){// 70% chance to get consumable
        randomItem = conumables[getRandom(conumables.length)-1]
    }
    else{
        let unaquiredGear = gear.filter(item => !player.items.includes(item))
        // if player has all gear item already, gives them consumable
        if(unaquiredGear.length === 0){randomItem = conumables[getRandom(conumables.length)-1]}
        else{
            randomItem = unaquiredGear[getRandom(unaquiredGear.length)-1]
        }
    }

    player.items.push(randomItem)
    console.log(`Added new item: ${randomItem.getDetails()}`)
    return player
}

export const getRandomWeapon = () => {
    return weapons[getRandom(weapons.length)-1]
}

// returns random number between 1 and max
export const getRandom = max => {return Math.floor(Math.random() * max) + 1}

export const useItem = async player => {
    // checks player has item to use
    let consumables = player.items.filter(item => item.type === "consumable")
    if(consumables.length === 0){
        console.log("You have no consumable items to use.\n")
    }else{
        // prompts player to select item and uses it
        player = await selectUseItem(player)
    }
    return player
}