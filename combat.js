import inquirer from "inquirer"
import { rollSkillCheck } from "./utils"


async function combat(player,enemies,firstToStrike=false,round=0){
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
            options: targetsOptions
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
            options: actions
        }])
        .then(async answer => {
            switch(answer.user_action){
                case "Attack":
                    let target = await selectEnemy()
                    enemies.map(enemy => {
                        if(enemy.name === target){
                            enemy.hitPoints -= player.weapon.damage
                            player.weapon.attack()// handles durability
                        }
                    })
                    break
                case "Use Item":
                    //TODO: create "selectItem" function
                    if(!itemUsed){
                        console.log("Using your first item usage costs no action, your next one this turn will.")
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
        console.log(`You are now at ${player.hitPoints} hp.\n`)
    }
}

export default combat