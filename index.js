#!usr/bin/env node
import roomList from "./rooms/RoomList.js"

let player = await roomList[0]();
console.log(player.getStatus())