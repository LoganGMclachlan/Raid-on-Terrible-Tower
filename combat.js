import inquirer from "inquirer"
import { rollSkillCheck, selectUseItem } from "./utils.js"

async function combat(player,enemies,firstToStrike=false,round=0){
    const enemiesDefeated = () => {
        if(enemies.length === 0){
            console.log("VICTORY! All enemies have been defeated.")
            return true
        }
    }

    const selectEnemy = async () => {
        let targetsOptions = []; enemies.map(enemy => {targetsOptions.push(enemy.name)})
        let choice = enemies[0].name
        await inquirer.prompt([{
            name: "user_target",
            message: "What enemy do you target?\n",
            type: "list",
            choices: targetsOptions
        }])
        .then(async answer => {
            choice = answer.user_target
        })
        return choice
    }

    const playerTurn = async (itemUsed=false) => {
        let actions = ["Attack"]
        player.spells.length > 0 ? actions.push("Cast Spell") :
        player.items.length > 0 ? actions.push("Use Item") :

        await inquirer.prompt([{
            name: "user_action",
            message: "What do you do?\n",
            type: "list",
            choices: actions
        }])
        .then(async answer => {
            switch(answer.user_action){
                case "Attack":
                    let target = await selectEnemy()
                    enemies.map(enemy => {
                        if(enemy.name === target){
                            let damage = player.baseDamage + player.weapon.damage
                            if(round === 0 && player.class === "thief") damage+=2
                            enemy.hitPoints -= damage
                            if(enemy.hitPoints <= 0){
                                enemies.splice(enemy,1)
                                console.log(`${enemy.name} has been defeated.\n`)
                            }
                            player.weapon.attack()// handles durability
                        }
                    })
                    break
                case "Use Item":
                    let consumables = player.items.filter(item => item.type === "consumable")
                    if(consumables.length === 0){
                        console.log("You have no consumable items to use.\n")
                        await playerTurn(itemUsed)
                    }
                    player = await selectUseItem(player)
                    if(!itemUsed){
                        console.log("Using your first item usage costs no action, your next one this turn will.\n")
                        await playerTurn(true)}
                    break
                case "Cast Spell":
                    //TODO: create "selectSpell" function
            }
        })
    }

    const enemiesTurn = async () => {
        console.log("Enemies turn.\n")
        enemies.map(enemy => {
            if(rollSkillCheck(enemy.attack)){
                // notifies player when they take damage
                let damage = enemy.damage - player.checkItem("shield") ? 1 : 0
                console.log(`${enemy.name} hits you for ${damage} damage.\n`)
                player.hitPoints -= damage
            }
        })
        // displays current hp at end of enemy turn
        console.log(`Current HP: ${player.hitPoints}\n`)
    }

    if(firstToStrike){
        console.log("Your turn.\n")
        await playerTurn()
        await enemiesTurn()
        if(enemiesDefeated()){return player}
        else{await combat(player,enemies,firstToStrike,round++)}
    }else{
        await enemiesTurn()
        console.log("Your turn.\n")
        await playerTurn()
        if(enemiesDefeated()){return player}
        else{await combat(player,enemies,firstToStrike,round++)}
    }
}

export default combat