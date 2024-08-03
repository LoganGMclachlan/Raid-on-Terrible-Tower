export default class weapon{

    constructor(title,damage,durability){
        this.title = title
        this.damage = damage
        this.durability = durability
    }

    getDetails(){
        return `${this.title} | deals +${this.damage} damage | will break in ${this.durability} hits`
    }

    attack(){
        // damages weapon if applicable
        if(this.title !== "None"){
            this.durability -= 1
            // notifies player when weapon breaks
            if(this.durability === 0){
                console.log(`Your ${this.title} has broken.`)
                this.title = "None"
                this.damage = 0
            }
        
        }
        
    }
}