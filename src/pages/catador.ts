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
    public username: string = '';
    public nickname: string = '';
    public birthDay: Date = new Date();
    public phone: Array<Phone> = new Array<Phone>();
    public referenceAddress: string = '';
    public regionWhereWorks: string = '';
    public kgPerDay: number = 0;
    public daysPerWeek: number = 0;
    public yearsCollecting: number = 0;
    public belongsCooperative: boolean = false;
    public cooperativeName: string = '';
    public materials_collected: Array<Material> = new Array<Material>();
    public cartHasSecurityKit: boolean = false;
    public cartHasEngine: boolean = false;
    public smartphoneWithInternet: boolean = false;
    public image: string = '';
    // Gambiarra - Remover isso quando o problema da API fo resolvido
    public user: string = '1';

    constructor(){
        this.phone[0] = new Phone();
        this.phone[1] = new Phone();
    }

    valid(){
        return (
            (this.name.length > 0) &&
            (this.email.length > 0) &&
            (this.password.length > 0)
        )
    }

    addMaterialOrRemoveIfAlreadyIncluded(material: Material){
        for(let i=0; i<this.materials_collected.length; i++){
            if (material.id === this.materials_collected[i].id){
                this.materials_collected.splice(i, 1);
                return 0;
            }
        }
        this.materials_collected.push(material);
    }
}
