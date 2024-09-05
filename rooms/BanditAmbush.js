import inquirer from "inquirer"
import Enemy from "../models/Enemy.js"
import combat from "../combat.js"
import { getRandom, getRandomWeapon, rollSkillCheck, useItem } from "../utils.js"

async function BanditAmbush(player){
    const bandits = [
        new Enemy("Bandit Leader","3","2"),
        new Enemy("Bandit goon #1","2","1"),
        new Enemy("Bandit goon #2","2","1")
    ]
    console.log("In this darkened room you spot a camp with only a small dying flame to light it.\n" +
                "Past that, barely lit by the flame, there is a door."
    )

    const getDecision = async () => {
        await inquirer.prompt([{
            name: "user_command",
            message: "What do you do?\n",
            type: "list",
            choices: ["Investigate Area",
                "Investigate Door",
                "Check Character","Use Item"]
        }])
        .then(async answer => {
            switch(answer.user_command){
                case "Investigate Area":
                    console.log("Rolling to investigate\n")
                    let result = rollSkillCheck()
                    if(result){
                        console.log("Success\n" + 
                            "You spot 3 bandits lurking in the shadows before they can attack.\n" +
                            "Instead, they offer you a deal.\n"
                        )
                        if(await offerDeal()){
                            // removes random item if deal accepted
                            let itemToRemove = player.items(getRandom(player.items.length)-1)
                            player.items = player.items.filter(item => item !== itemToRemove)
                            console.log(`The bandits take your ${itemToRemove.title} and let you exit unharmed.\n`)
                        }else{
                            console.log("For refusing the deal, the bandits attack.\n")
                            player = await combat(player,bandits,true)
                            await lootBandit()
                            console.log("With the bandits defeated, you can now leave the room.\n")
                        }
                    }else{
                        console.log("Failure\n" +
                            "You fail to notice the 3 bandits hiding in the shadows and are ambushed.\n")
                        player = await combat(player,bandits)
                        await lootBandit()
                        console.log("With the bandits defeated, you can now leave the room.\n")
                    }
                    break
                case "Investigate Door":
                    console.log("You find the door locked and as you turn around 3 bandits attack from the shadows.\n")
                    player = await combat(player,bandits)
                    await lootBandit()
                    console.log("With the bandits defeated, you can now leave the room.\n")
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

    const offerDeal = async () => {
        console.log("The bandits say they will let you pass in exchange for 1 of your items (you dont choose wich one)")
        await inquirer.prompt([{
            name: "deal_decision",
            message: "Do you accept the deal?\n",
            type: "list",
            choices: ["Accept Deal",
                "Reject Deal"]
        }])
        .then(async answer => {
            if(answer.deal_decision === "Accept Deal") return true
            return false
        })
    }

    const lootBandit = async () => {
        console.log("The groups leader had a weapon you can use:\n")
        await player.switchWeapon(getRandomWeapon())
    }
    
    await getDecision()
    return player
}

export default BanditAmbush