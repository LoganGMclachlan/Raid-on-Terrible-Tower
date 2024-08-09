#!usr/bin/env node
import randomiseRoomList from "./rooms/RoomList.js"
import Player from "./models/Player.js"


let player = new Player("Test","fighter")

const roomList = randomiseRoomList(1)

// loops through each room, updating player data
roomList.map(room => {
    player = room(player)
    //TODO: give player a random item
    if(player.class_ === "mage") player.mana++
})