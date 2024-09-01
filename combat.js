import inquirer from "inquirer"
import { rollSkillCheck, selectSpell, selectUseItem } from "./utils.js"
import Weapon from "./models/Weapon.js"
import process from "node:process"

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
        if(player.spells.length > 0) actions.push("Cast Spell")
        if(player.items.length > 0) actions.push("Use Item")

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
                    let combatSpells = player.spells.filter(spell => spell.type !== "utility")
                    let spell = await selectSpell(combatSpells)
                    switch(spell){
                        case "Firebolt":
                            player.mana -= 2
                            let fireboltTarget = await selectEnemy()
                            enemies.map(enemy => {
                                if(enemy.name === fireboltTarget){
                                    // deals 3-4 damage
                                    let damage = 3 + Math.floor(Math.random() * 2)
                                    enemy.hitPoints -= damage
                                    console.log(`${damage} damage dealt to ${enemy.name}.\n`)
                                    if(enemy.hitPoints <= 0){
                                        enemies.splice(enemy,1)
                                        console.log(`${enemy.name} has been defeated.\n`)
                                    }
                                }
                            })
                            break
                        case "Heal":
                            player.mana -= 3
                            // heals 3-5hp
                            const healing = 3 + Math.floor(Math.random() * 3)
                            player.hitPoints += healing
                            console.log(`You heal for ${healing} hit points.\n`)
                            if(freeAction){
                                console.log("Casting heal uses your free action, you still have your main action to use.\n")
                                await playerTurn(false)
                            }
                            break
                        case "Vampiric Touch":
                            player.mana -= 4
                            let vampTouchTarget = await selectEnemy()
                            enemies.map(enemy => {
                                if(enemy.name === vampTouchTarget){
                                    // deals 3-4 damage
                                    const damage = 3 + Math.floor(Math.random() * 2)
                                    enemy.hitPoints -= damage
                                    console.log(`${damage} damage dealt to ${enemy.name}.\n`)
                                    if(enemy.hitPoints <= 0){
                                        enemies.splice(enemy,1)
                                        console.log(`${enemy.name} has been defeated.\n`)
                                    }
                                    player.hitPoints += damage
                                    console.log(`You heal for ${damage} hit points.\n`)
                                }
                            })
                            break
                        case "Magic Missile":
                            player.mana -= 3
                            let missileTarget = await selectEnemy()
                            enemies.map(enemy => {
                                if(enemy.name === missileTarget){
                                    enemy.hitPoints -= 5
                                    console.log(`5 damage dealt to ${enemy.name}.\n`)
                                    player.hitPoints += damage
                                }
                            })
                            break
                        case "Fireball":
                            player.mana -= 4
                            console.log("You deal 3 damage to all enemies")
                            enemies.map(enemy => {
                                enemy.hitPoints -= 3
                                if(enemy.hitPoints <= 0){
                                    enemies.splice(enemy,1)
                                    console.log(`${enemy.name} has been defeated.\n`)
                                }
                            })
                            break
                        case "Conjure Weapon":
                            player.mana -= 3
                            console.log("You summon a magic sword too your hand")
                            await player.switchWeapon(new Weapon("Magic Sword",3,4))
                            console.log(player.weapon.getDetails())
                            if(freeAction){
                                console.log("Casting conjure weapon uses your free action, you still have your main action to use.\n")
                                await playerTurn(false)
                            }
                            break
                        default:
                            console.log("No Spell was cast.\n")
                            await playerTurn(freeAction)
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
        if(player.hitPoints > 0){
            // displays current hp at end of enemy turn
            console.log(`Current HP: ${player.hitPoints}\n`)
        }else{
            console.log("You have died. The evil of terrable tower is free to conqure the world, and its allyour fault.")
            //todo: save player/run details to txt file
            process.exit(0)// stops program upon player death
        }
    }

    if(firstToStrike){
        console.log("Your turn.\n")
        await playerTurn()
        player.getStatus()
        await enemiesTurn()
    }else{
        await enemiesTurn()
        console.log("Your turn.\n")
        await playerTurn()
        player.getStatus()
    }
    
    if(enemiesDefeated()){
        if(player.class_ === "fighter") player.hitPoints++
        return player
    }
    else{await combat(player,enemies,firstToStrike,round++)}
}

export default combat