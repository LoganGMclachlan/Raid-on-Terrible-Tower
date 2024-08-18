import Kennels from "./Kennels.js"
import WitchesLair from "./WitchesLair.js"

// list of all rooms (exluding start and boss rooms)
const allRooms = [
    Kennels,
    WitchesLair
]

// function to return list of randomly selected rooms
const randomiseRoomList = ListLength => {
    let rooms = []
    let randomRoom
    while(rooms.length < ListLength){
        randomRoom = Math.floor(Math.random() * allRooms.length)
        rooms.push(allRooms[randomRoom])
        allRooms.splice(randomRoom,1)
    }
    return rooms
}

export default randomiseRoomList