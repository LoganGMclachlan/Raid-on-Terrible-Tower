export default class Spell{

    constructor(title,desc,cost){
        this.title = title
        this.description = desc
        this.cost = cost
    }

    getDetails(){
        return `${this.title} | ${this.description} | Costs ${this.cost} mana`
    }
}