

export default class Enemy{

    constructor(name,hitPoints,damage,attack=11){
        this.name = name
        this.hitPoints = hitPoints
        this.damage = damage
        this.attack = attack// int value between 1 and 20, lower number = higher % to hit
    }
}