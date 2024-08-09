export default class Spell{

    constructor(title,desc,cost,type="flexable"){
        this.title = title
        this.description = desc
        this.cost = cost
        this.type = type // can be combat, utility, or flexable(both)
    }

    getDetails(){
        return `${this.title} | ${this.description} | Costs ${this.cost} mana`
    }
}