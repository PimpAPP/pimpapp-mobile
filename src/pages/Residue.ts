import { MaterialItem } from './MaterialItem';

export class Residue {
    public materialList: Array<MaterialItem>;
    public image: string;

    constructor(){
        this.materialList = new Array<MaterialItem>();
    }

    findmaterial(materialItem:MaterialItem){
        for(let i=0; i<this.materialList.length; i++){
            if (materialItem.material.id === this.materialList[i].material.id)
                return i;
        }
        return -1;
    }

    addMaterialItem(materialItem, quantity){
        if (this.findmaterial(materialItem) >=0){
            this.materialList[this.findmaterial(
            materialItem)].quantity = quantity;
        } else {
            materialItem.quantity = quantity;
            this.materialList.push(materialItem);
        }
    }

    getAverrageValue(){
        let value = 0;
        for(let i=0; i<this.materialList.length; i++)
            value+= this.materialList[i].material.value * (this.materialList[i].quantity * 2);
        return [value, (value+=value*0.20).toFixed(2)];
    }
}