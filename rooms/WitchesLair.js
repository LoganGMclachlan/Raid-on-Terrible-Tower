import inquirer from "inquirer"
import Enemy from "../models/Enemy.js"
import combat from "../combat.js"
import { getRandom } from "../utils.js"

async function Kennels(player){
    const witch = [new Enemy("Witch","4","2")]
    console.log("A old ghastly looking woman stirs her big spoon round a large bubbling cauldron.\n"+
                "She offers you a taste of the suspitous liquid within, theres no telling what itll do.\n"
    )

    const getDecision = async (drinkRejected=false) => {
        await inquirer.prompt([{
            name: "user_command",
            message: "What do you do?\n",
            type: "list",
            choices: ["Have a drink",
                "Refuse the offer",
                "Attack the woman",
                "Check Character"]
        }])
        .then(async answer => {
            switch(answer.user_command){
                case "Have a drink":
                    drinkLiquid()
                    console.log("The woman is pleased with your manners and hands you a key to leave to room.\n")
                    break
                case "Refuse the offer":
                    if(drinkRejected){
                        console.log("Your continued refusal to drink the liquid has angered the woman.\n"+
                            "She charges, big spoon in hand.\n"
                        )
                        await combat(player,witch,false)
                        console.log("Victory! The witch has been slain and can continue your journey.\n")
                    }else{
                        console.log("The woman seems to take offence to your rejection and insists you drink.\n")
                        await getDecision(true)
                    }
                    break
                case "Attack the woman":
                    console.log("In response to your violent intent, the woman readies her big spoon.\n")
                    await combat(player,witch,true)
                    console.log("Victory! The witch has been slain and can continue your journey.\n")
                    break
                case "Check Character":
                    player.getStatus()
                    player.listItems()
                    player.listSpells()
                    await getDecision()
                    break
            }
        })
    }

    const drinkLiquid = () => {
        switch(getRandom(5)){
            case 1:
                console.log("The liquid taste foul but you are otherwise fine.\n")
                break
            case 2:
                console.log("The nasty soup somewho heals you. You regain 2 hp.\n")
                player.hitPoints += 2
                break
            case 3:
                console.log("You feel the sink stew eating at your very soul. You lose 2 hp.\n")
                player.hitPoints -= 2
                break
            case 4:
                console.log("The liquid seems to be infused with magic, boosting your mana by 2.")
                player.mana += 2
                break
            case 5:
                console.log("The soup is sapping you magical essence. You lose 2 mana.")
                player.mana -= 2
                break
        }
    }
    
    await getDecision()
    return player
}

export default Kennels