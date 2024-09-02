import inquirer from "inquirer"
import { addItem } from "../utils.js"

async function Sphinx(player){
    console.log("Blocking the exit of this room is large golder Sphinx.\n" +
        "It explains that passage will only be granted when you solve 3 of its riddles.")

    let wrongGuesses = 0
    const riddles = [
        {
            "riddle":"Riddle 1:\nForward, I am heavy; backward, I am not. What am I?",
            "answer":"ton"
        },
        {
            "riddle":"Riddle 2:\nWhat has hands but cannot clap?",
            "answer":"clock"
        },
        {
            "riddle":"Riddle 3:\nWhat is black when it’s clean and white when it’s dirty?",
            "answer":"chalkboard"
        },
    ]

    const answerRiddles = async (riddleCount=0) => {
        await inquirer.prompt([{
            name: "user_answer",
            message: riddles[riddleCount].riddle + "\n"
        }])
        .then(async answer => {
            if(answer.user_answer === ""){
                console.log("Please enter your answer.\n")
                await answerRiddles(riddleCount)
                return
            }

            if(answer.user_answer.toLowerCase() === riddles[riddleCount].answer){
                console.log("CORRECT! (:\n")
                if(riddleCount === riddles.length-1){
                    console.log("You have solved all the Sphinxs riddles and it lets you pass.\n")
                    if(wrongGuesses === 0){
                        console.log("For answering the riddles with no wrong answers, the Spinx awards you an item.\n")
                        player = addItem(player)
                    }
                }
                else{await answerRiddles(riddleCount++)}
            }
            else{
                console.log("INCORRECT! ):<\N")
                if(wrongGuesses <= 3){wrongGuesses++}
                else{
                    console.log("Too many wrong answers, you take 1 damage.")
                    player.hitPoints--
                }
                console.log("The Sphinx repeats its riddles.\n")
                await answerRiddles(riddleCount)
            }
        })
    }

    const getDecision = async () => {
        await inquirer.prompt([{
            name: "user_command",
            message: "What do you do?\n",
            type: "list",
            choices: ["Answer Riddles",
                "Check Character","Use Item"]
        }])
        .then(async answer => {
            switch(answer.user_command){
                case "Answer Riddles":
                    console.log("Important!!!\n When answering type your response as a single word.\n"+
                        'For example, if your answer was a coin type "coin" and not "a coin".\n' +
                        "Also note that too many incorrect answers will result in damage dealt to you.\n")
                    await answerRiddles()
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

export default Sphinx