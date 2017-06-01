import { MaterialItem } from './MaterialItem';

export class Residue {
    public materials: Array<MaterialItem>;
    public image: string;
    public reverse_geocoding: string;
    public location: Location;
    public description: string = '';
    public quantity: string = "S";

    constructor(){
        this.materials = new Array<MaterialItem>();
        this.description = 'Residue register by app';
    }

    findmaterial(materialItem:MaterialItem){
        for(let i=0; i<this.materials.length; i++){
            if (materialItem.material.id === this.materials[i].material.id)
                return i;
        }
        return -1;
    }

    addMaterialItem(materialItem, quantity){
        if (this.findmaterial(materialItem) >=0){
            this.materials[this.findmaterial(
            materialItem)].quantity = quantity;
        } else {
            materialItem.quantity = quantity;
            this.materials.push(materialItem);
        }
    }

    getAverrageValue(){
        let value = 0;
        for(let i=0; i<this.materials.length; i++)
            value+= this.materials[i].material.value * (this.materials[i].quantity * 2);
        return [value.toFixed(2), (value+=value*0.20).toFixed(2)];
    }
}