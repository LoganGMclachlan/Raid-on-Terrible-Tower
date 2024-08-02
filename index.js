#!usr/bin/env node
import randomiseRoomList from "./rooms/RoomList.js"
import start from "./rooms/StartRoom.js"

// function to pause game for a duration
const sleep = (ms=1000) => new Promise(resolve => setTimeout(resolve, ms))

// calls start room and gets player info
let player = await start()

console.log("You approach the tower in the dead of night, a flash of lightning\n" +
            "illuminates the foul structure. As you look up you behold a dark cloud\n" +
            "obscuring the peak, your destination. The evil held within the tower\n" +
            "must be destroyed, so you steel yourself, and enter."
)
await sleep(5000)

const roomList = randomiseRoomList(8)

roomList.map(room => room(player))