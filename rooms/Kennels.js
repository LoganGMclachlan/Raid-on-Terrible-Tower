import inquirer from "inquirer"
import { rollSkillCheck } from "../utils.js"

async function kennels(player){
    const kennelEnemies = []
    console.log("The room you enter is home to 3 guard dogs, currently sleeping\n" +
                "in thier kennels. In one of them you spot an item.\n")

    await getDecision()

    const getDecision = async () => {
        await inquirer.prompt([{
            name: "user_command",
            message: "What do you do?\n",
            type: "list",
            choices: ["Sneak past the dogs (low difficulty)",
                "Attack the dogs (start combat)",
                "Steal the item (medium difficulty)",
                "Check Character","Use Item"]
        }])
        .then(async answer => {
            switch(answer.user_command){
                case "Sneak past the dogs (low difficulty)":
                    await sneakToExit()
                    break
                case "Attack the dogs (start combat)":
                    console.log("You attack the dogs and begin combat.\n")
                    await combat(player,kennelEnemies,true)
                    break
                case "Steal the item (medium difficulty)":
                    await stealItem()
                    break
                case "Check Inventory":
                    player.getStatus()
                    player.listItems()
                    player.listSpells()
                    await getDecision()
                    break
                case "Use Item":
                    //TODO: create function to choose item
                    await getDecision()
                    break
            }
        })
    }

    return player
}

const sneakToExit = async () => {
    if(rollSkillCheck(7)){
        console.log("You succesfully sneak past the dogs and reach the exit.")
        return
    }else{
        console.log("Your sneak atttempt has failed and you have awoken the dogs.\n" +
                    "They immedietely attack you."
        )
        await combat(player,kennelEnemies)
        return
    }
}

const stealItem = async () => {
    if(rollSkillCheck(11)){
        console.log("You succesfully steal the item without alerting the dogs.")
        //TODO: add item to player inventory
        await inquirer.prompt([{
            name: "user_decision",
            message: "You can leave the room without being detected, or you can stay and attack the dogs. What do you do?\n",
            type: "list",
            options: ["Leave","Stay"]
        }])
        .then(async answer => {
            if(answer.user_decision = "Stay"){
                await combat(player,kennelEnemies,true)
            }
        })
        return
    }else{
        console.log("Your atttempt to steal the item has failed and you have awoken the dogs.\n" +
                    "They immedietely attack you."
        )
        await combat(player,kennelEnemies)
        return
    }
}

export default kennels