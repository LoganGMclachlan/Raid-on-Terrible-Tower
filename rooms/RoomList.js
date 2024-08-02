

// list of all rooms (exluding start and boss rooms)
const allRooms = [
    () => console.log("room 1"),
    () => console.log("room 2"),
    () => console.log("room 3"),
    () => console.log("room 4"),
    () => console.log("room 5"),
    () => console.log("room 6"),
    () => console.log("room 7"),
    () => console.log("room 8"),
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