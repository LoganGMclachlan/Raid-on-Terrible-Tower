import Player from "../models/Player.js"
import inquirer from "inquirer"

let playerName
let playerClass

// main room function
async function StartRoom(){
    // introduces the player to the game
    console.log("Welcome gamer to the Raid on Terrible Tower, a terminal based adventure game where you " +
        "venture into Terrible Tower,\nconquring each floor until you reach the top and defeat its evil master. " +
        "In this game you will be pronted to input\ncommands to take action.\n"
    )
    console.log("If you ever stuck as to what to enter, type 'help' to view all available commands in your current context.\n")

    await selectName()
    await selectClass()
    console.log(`Well met ${playerName} the ${playerClass}.\n`)

    await inquirer.prompt([{message: "You are now ready to enter the tower, press enter to proceed.\n"}])

    return new Player(playerName,playerClass)
}

const selectName = async () => {
    await inquirer.prompt([{
        name: "user_name",
        message: "To begin, what is your name?\n"
    }])
    .then(async answer => {
        if(answer.user_name.trim() === ""){await selectName()}
        else{
            playerName = answer.user_name.trim()
            console.log("")
        }
    })
}

const selectClass = async () => {
    console.log("Great! Next youll need to select a class from the list below.\n")
    console.log("Class   | Perk                                    | Starting Gear")
    console.log("------------------------------------------------------------------")
    console.log("Fighter | Heal after battles                      | Rusty Sword")
    console.log("Mage    | Recover mana every room                 | Firebolt Spell")
    console.log("Thief   | Bonus damage during 1st round of combat | Rusty Dagger\n")

    await inquirer.prompt([{
        name: "user_class",
        message: "Select your Class:\n",
        type: "list",
        choices: ["Fighter","Mage","Thief"]
    }])
    .then(answer => {
        playerClass = answer.user_class.toLowerCase()
        console.log("")
    })
}

export default StartRoom