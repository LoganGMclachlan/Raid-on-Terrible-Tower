import inquirer from "inquirer"
import { rollSkillCheck, selectSpell, selectUseItem } from "./utils.js"

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

    const playerTurn = async (freeAction=true) => {
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
                            if(round === 0 && player.class_ === "thief") damage+=2
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
                        await playerTurn(freeAction)
                    }
                    player = await selectUseItem(player)
                    if(freeAction){
                        console.log("Using an item uses your free action, you still have your main action to use.\n")
                        await playerTurn(false)}
                    break
                case "Cast Spell":
                    const spell = await selectSpell(player.spells)
                    switch(spell){
                        case "Firebolt":
                            player.mana -= 2
                            const target = await selectEnemy()
                            enemies.map(enemy => {
                                if(enemy.name === target){
                                    // deals 3-4 damage
                                    const damage = 3 + Math.floor(Math.random() * 2)
                                    enemy.hitPoints -= damage
                                    if(enemy.hitPoints <= 0){
                                        enemies.splice(enemy,1)
                                        console.log(`${enemy.name} has been defeated.\n`)
                                    }
                                }
                            })
                            break
                        case "Heal":
                            // heals 3-5hp
                            player.hitPoints += 3 + Math.floor(Math.random() * 3)
                            if(freeAction){
                                console.log("Casting heal uses your free action, you still have your main action to use.\n")
                                await playerTurn(false)}
                            break
                            //TODO: add other spell cases: vampiric touch, magic missile, fireball, conjure weapon
                        case "No spell, return":
                            console.log("No Spell was cast.\n")
                            await playerTurn(itemUsed)
                            break
                    }
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
        if(enemiesDefeated()){
            if(player.class_ === "fighter") player.hitPoints++
            return player
        }
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