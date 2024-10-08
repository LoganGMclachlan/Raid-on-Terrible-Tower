#!usr/bin/env node
import randomiseRoomList from "./rooms/RoomList.js"
import start from "./rooms/StartRoom.js"
import { addItem } from "./utils.js"

// function to pause game for a duration
const sleep = (ms=1000) => new Promise(resolve => setTimeout(resolve, ms))

// calls start room and gets player info
let player = await start()

console.log("You approach the tower in the dead of night, a flash of lightning\n" +
            "illuminates the foul structure. As you look up you behold a dark cloud\n" +
            "obscuring the peak, your destination. The evil held within the tower\n" +
            "must be destroyed.\n")

switch(player.class_){
    case "fighter":
        console.log("You draw your rusted sword, and enter.\n")
        break
    case "mage":
        console.log("You ready your spells, and enter.\n")
        break
    case "thief":
        console.log("You pull out a rusty dagger, and enter.\n")
        break
}

await sleep(5000)// set to 5000 when not testing

const roomList = randomiseRoomList(3)

// recursive function to run each room in roomList
const runRoom = async (roomCounter=0) => {
    player = await roomList[roomCounter](player)
    player = addItem(player)
    await inquirer.prompt([{message: "Ready to Continue?"}])
    if(player.class_ === "mage") player.mana++
    if(roomCounter < roomList.length-1){
        runRoom(roomCounter++)
    }
    else{
        //todo: run boss encounter
    }
}

runRoom()

console.log("End of game.")