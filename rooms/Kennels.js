import inquirer from "inquirer"
import { rollSkillCheck } from "../utils.js"

async function kennels(player){
    console.log("The room you enter is home to 3 guard dogs, currently sleeping\n" +
                "in thier kennels. In one of them you spot an item.\n")

    await inquirer.prompt([{
        name: "user_command",
        message: "What do you do?\n",
        type: "list",
        choices: ["Sneak past the dogs (low difficulty)",
            "Attack the dogs (start combat)",
            "Steal the item (medium difficulty)"]
    }])
    .then(async answer => {
        switch(answer.user_command){
            case "Sneak past the dogs (low difficulty)":
                await sneakToExit()
                break
            case "Attack the dogs (start combat)":
                //TODO: start combat
                break
            case "Steal the item (medium difficulty)":
                await stealItem()
                break
        }
    })

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
        //TODO: add combat section
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
        .then(answer => {
            if(answer.user_decision = "Stay"){
                //TODO: Start combat
            }
        })
        return
    }else{
        console.log("Your atttempt to steal the item has failed and you have awoken the dogs.\n" +
                    "They immedietely attack you."
        )
        //TODO: add combat section
        return
    }
}

export default kennels