#!usr/bin/env node
import randomiseRoomList from "./rooms/RoomList.js"
import Player from "./models/Player.js"

let player = new Player("Test","fighter")

const roomList = randomiseRoomList(2)

// loops through each room, updating player data
roomList.map(room => {
    player = room(player)
    player = addItem(player)
    if(player.class_ === "mage") player.mana++
})