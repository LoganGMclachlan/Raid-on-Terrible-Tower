import inquirer from "inquirer"
import Enemy from "../models/Enemy.js"
import combat from "../combat.js"

async function BanditAmbush(player){
    const bandits = [
        new Enemy("Bandit Leader","3","2"),
        new Enemy("Bandit goon #1","2","1"),
        new Enemy("Bandit goon #2","2","1")
    ]
    console.log("")

    const getDecision = async () => {
        await inquirer.prompt([{
            name: "user_command",
            message: "What do you do?\n",
            type: "list",
            choices: ["Investigate Area",
                "Continue to Exit",
                "Check Character","Use Item"]
        }])
        .then(async answer => {
            switch(answer.user_command){
                case "Investigate Area":
                    //todo: roll skill check to spot hiding bandits
                    // if spotted, offer deal to avoid combat
                    break
                case "Continue to Exit":
                    console.log("As you turn away from the site, 3 bandits attack from the shadows.\n")
                    await combat(player,bandits)
                    console.log("The bandit leader had a weapon you can use:\n")
                    await player.switchWeapon(new Weapon("placeholder",2,4))//todo: radomly select weapon
                    break
                case "Check Character":
                    player.getStatus()
                    player.listItems()
                    player.listSpells()
                    await getDecision()
                    break
                case "Use Item":
                    let consumables = player.items.filter(item => item.type === "consumable")
                    if(consumables.length === 0){
                        console.log("You have no consumable items to use.\n")
                    }else{
                        player = await selectUseItem(player)
                    }
                    await getDecision()
                    break
            }
        })
    }
    
    await getDecision()
    return player
}

export default BanditAmbush