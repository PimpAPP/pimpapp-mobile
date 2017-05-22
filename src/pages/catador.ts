import { MaterialItem } from './MaterialItem';
import { Material } from './Material';


export class Phone{
    // 1 vivo, 2 tim, 3 claro, 4 oi, 5 nextel, 6 outros
    public number: string;
    public mobileOperator: number = 1;
    public whatsapp: boolean = false;
}

export class Catador{
    public id: number = 0;
    public name: string = '';
    public prefererUseName: boolean = true;
    public email: string = '';
    public password: string = '';
    public lifeHistory: string = '';
    public nickname: string = '';
    public birthDay: Date = new Date();
    public phones: Array<Phone> = new Array<Phone>();
    public referenceAddress: string = '';
    public regionWhereWorks: string = '';
    public kgPerDay: number = 0;
    public daysPerWeek: number = 0;
    public yearsCollecting: number = 0;
    public belongsCooperative: boolean = false;
    public cooperativeName: string = '';
    public materialList: Array<Material> = new Array<Material>();
    public cartHasSecurityKit: boolean = false;
    public cartHasEngine: boolean = false;
    public smartphoneWithInternet: boolean = false;
    public image: string = '';

    valid(){
        return (
            (this.name.length > 0) &&
            (this.email.length > 0) &&
            (this.password.length > 0)
        )
    }

    addMaterialOrRemoveIfAlreadyIncluded(material: Material){
        for(let i=0; i<this.materialList.length; i++){
            if (material.id === this.materialList[i].id){
                this.materialList.splice(i, 1);
                return 0;
            }
        }
        this.materialList.push(material);
    }
}
