import inquirer from "inquirer"
import { rollSkillCheck, getRandomWeapon, useItem } from "../utils.js"
import Enemy from "../models/Enemy.js"
import combat from "../combat.js"

async function RedKnight(player){
    const redKnight = [new Enemy("The Red Knight","6","3")]

    console.log("In this room stands a tall figure in red plate armour.\n" +
        '"Halt!" it commands, "What right do you have to be in this tower?"\n'
    )

    const getDecision = async () => {
        await inquirer.prompt([{
            name: "user_command",
            message: "What do you do?\n",
            type: "list",
            choices: ['Answer "I am the lords servant & I request safe passage." (medium)',
                'Answer "I am your superior, now hand me your weapon and let me pass." (difficult)',
                "Attack the Knight",
                "Check Character","Use Item"]
        }])
        .then(async answer => {
            switch(answer.user_command){
                case 'Answer "I am the lords servant & I request safe passage." (medium)':
                    if(rollSkillCheck(11)){
                        console.log('"Understood." it responds, and moves aside letting you procede.\n')
                    }
                    else{
                        console.log('"You Lie!" it declares, and moves to attack.\n')
                        player = await combat(player,redKnight)
                    }
                    break
                case 'Answer "I am your superior, now hand me your weapon and let me pass." (difficult)':
                    if(rollSkillCheck(15)){
                        console.log('"Understood." it responds, and moves aside letting you procede.\n')
                    }
                    else{
                        console.log('"You Lie!" it declares, and moves to attack.\n')
                        player = await combat(player,redKnight)
                    }
                    break
                case "Attack the Knight":
                    console.log("You attack the Knight and begin combat.\n")
                    player = await combat(player,redKnight,true)
                    console.log("After defeating the knight, you may take his weapon.\n")
                    player.switchWeapon(getRandomWeapon())
                    break
                case "Check Character":
                    player.displayPlayer()
                    await getDecision()
                    break
                case "Use Item":
                    player = await useItem(player)
                    await getDecision()
                    break
            }
        })
    }
    
    await getDecision()
    return player
}

export default RedKnight