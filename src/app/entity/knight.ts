export class Knight {
    name: string;
    attack: number;
    armor: number;
    agility: number;
    endurance: number;

    constructor(name: string, attack: number, armor: number, agility: number, endurance: number) {
        this.name = name;
        this.attack = attack;
        this.armor = armor;
        this.agility = agility;
        this.endurance = endurance;
    }
}