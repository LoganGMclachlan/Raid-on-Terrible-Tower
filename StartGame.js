import roomList from "./rooms/RoomList.js"

let roomCounter = 0
let gameActive = true 
console.log("Game has Started")
while(gameActive){
    roomList[0]()
    if(roomCounter>1){gameActive=false}
    roomCounter++
}

console.log("Game has ended.")