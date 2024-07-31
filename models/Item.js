export default class Item{

    constructor(title,desc,type){
        this.title = title
        this.description = desc
        this.type = type // can be consumable or gear type
    }

    getDetails(){
        return `${this.title} | ${this.description} | ${this.type}`
    }
}