export class Material {
    public id: number;
    public name: string;
    public icon: string;
    public color: string;
    public value: number;

    constructor(id?: number, name?: string, icon?: string, color?: string, value?: number){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.value = value;
    }
}