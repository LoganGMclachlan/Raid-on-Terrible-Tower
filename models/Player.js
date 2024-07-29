export default class Player{

    constructor(name,class_){
        this.name = name
        this.class_ = class_
        this.hitPoints = 15
        this.mana = 10
        this.spells = []
        this.items = []
        switch(class_){//TODO: set weapons, spells, and items as object
            case "fighter":
                this.weapon = "rusty sword"
                break
            case "mage":
                this.weapon = "none"
                this.spells.push("firebolt")
                break
            case "thief":
                this.weapon = "rusty dagger"
        }
    }

    getStatus(){
        console.log(`Hit Points: ${this.hitPoints} | Mana: ${this.mana}`)
    }

    listItems(){
        console.log(`Your Items | ${this.items.length} / 3`)
        this.items.map(item => console.log(item))//TODO: call item method to display each
    }

    addItem(itemObj){
        if(this.items.length < 3){
            this.items.push(itemObj)
            return
        }

        let decisionMade = false
        const rl = readline.createInterface({
            //TODO: install and import readline
            input: process.stdin,
            output: process.stdout,
        })
        while(!decisionMade){
            const message = "Your items bag is full. Would you like to " 
                + "leave the item (leave) or use the item (use)?"
            rl.question(message, input => {
                switch(input){
                    case "leave":
                        decisionMade = true
                        break
                    case "use":
                        // useItem(itenObj)
                        decisionMade = true
                        break
                    default:
                        console.log("Command not recognised.")
                        break
                }
                rl.close()
            })
        }
    }

    useItem(itemObj){
        
    }
}