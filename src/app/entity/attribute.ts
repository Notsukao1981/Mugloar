export class Attribute {
    id: string;
    name: string;
    tooltip: string;
    score: number = 0;
    icon: string;

    constructor(id: string, name: string, tooltip: string, score: number, icon: string) {
        this.id = id;
        this.name = name;
        this.tooltip = tooltip;
        this.score = score;
        this.icon = icon;
    }
}