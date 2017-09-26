import { Material } from './Material';


export class Phone{
    // 1 vivo, 2 tim, 3 claro, 4 oi, 5 nextel, 6 outros
    public phone: string;
    public mno: string;
    public whatsapp: boolean = false;
}

export class Catador {

    public id: number = 0;
    public name: string = '';
    public prefererUseName: boolean = true;
    public email: string = '';
    public password: string = '';
    public minibio: string = '';
    public nickname: string = '';
    public presentation_phrase: string = '';
    //public birthDay: Date = new Date();
    public phones: Array<Phone> = new Array<Phone>();
    public address_base: string = '';
    public number: string = '';
    public address_region: string = '';
    public region: string = '';
    public city: string = '';
    public state: string = '';
    public country: string = '';
    public kg_day: number;
    public how_many_days_work_week: number;
    public how_many_years_work: number;
    public belongsCooperative: boolean = false;
    public cooperative_name: string = '';
    public iron_work: string = '';
    public materials_collected: Array<Material> = new Array<Material>();
    public safety_kit: boolean = false;
    public has_motor_vehicle: boolean = false;
    public has_smartphone_with_internet: boolean = false;
    public safety_kit_boot: boolean = false;
    public safety_kit_gloves: boolean = false;
    public safety_kit_brakes: boolean = false;
    public safety_kit_reflective_tapes: boolean = false;
    public safety_kit_rearview: boolean = false;
    public carroca_pimpada: boolean = false;
    public registered_by_another_user: boolean = false;
    public another_user_name: string = '';
    public another_user_email: string = '';
    public another_user_whatsapp: string = '';
    public image: string = '';
    public user: string = '';
    public modified_date: any;

    constructor() {
        this.phones[0] = new Phone();
        this.phones[1] = new Phone();
    }

    /**
     * Return true if valid and the field name if invalid
     */
    valid() {
        if (!this.name || this.name.length == 0) {
            return 'name';
        } else if (!this.nickname || this.nickname.length == 0) {
            return 'nickname';
        } else if (!this.presentation_phrase || this.presentation_phrase.length == 0) {
            return 'presentation_phrase';
        } else if (!this.minibio || this.minibio.length == 0) {
            return 'minibio';
        } else if (!this.phones[0].phone || this.phones[0].phone.length == 0) {
            return 'phones0';
        } else if (!this.address_base || this.address_base.length == 0) {
            return 'address_base';
        } else if (!this.number || this.number.length == 0) {
            return 'number';
        } else if (!this.address_region || this.address_region.length == 0) {
            return 'address_region';
        } else if (!this.city || this.city.length == 0) {
            return 'city';
        } else if (!this.state || this.state.length == 0) {
            return 'state';
        } else if (!this.country || this.country.length == 0) {
            return 'country';
        } else if (!this.cooperative_name || this.cooperative_name.length == 0) {
            return 'cooperative_name';    
        } else if (!this.kg_day || this.kg_day == 0) {
            return 'kg_day';  
        } else if (!this.how_many_days_work_week || this.how_many_days_work_week == 0) {
            return 'how_many_days_work_week';    
        } else if (!this.how_many_years_work || this.how_many_years_work == 0) {
            return 'how_many_years_work';
        } else if (!this.region || this.region.length == 0) {
            return 'region';
        } 
        
        return true;
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

    getModifiedDate() {
        if (!this.modified_date) return null;
        var data = new Date(this.modified_date)
        var dia: any = data.getDate();
        if (dia.toString().length == 1)
            dia = "0"+dia;
        var mes: any = data.getMonth()+1;
        if (mes.toString().length == 1)
            mes = "0"+mes;
        var ano = data.getFullYear();  
        return dia+"/"+mes+"/"+ano;
    }
}