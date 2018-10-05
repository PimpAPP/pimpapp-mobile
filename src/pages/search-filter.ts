import { Material } from "./Material";

export class SearchFilter {
    
    public search: string;
    public name: Boolean;
    public nickname: Boolean;
    public address: Boolean;
    public state: string;
    public city: string;
    public materials = [];

    constructor() {
        this.clean();
    }

    clean() {
        this.search = '';
        this.name = true;
        this.nickname = false;
        this.address = false;
        this.materials = [];
        this.state = '';
        this.city = '';
    }

    getAsUrlParams() {
        var query = '?';

        if (this.search)
            query += 'search=' + this.search + '&';

        if (this.name)
            query += 'name=' + this.name + '&';

        if (this.nickname)
            query += 'nickname=' + this.nickname + '&';

        if (this.address)
            query += 'address=' + this.address + '&';

        if (this.state)
            query += 'state=' + this.state + '&';
        
        if (this.city)
            query += 'city=' + this.city + '&';

        if (this.materials.length) {
            for (var x=0; x<this.materials.length; x++){
                query += 'materials=' + this.materials[x] + '&';
            }
        }

        // if (this.materials.length > 0) {
        //     query += 'cars[]='
        // }

        return query;
    }

    addMaterialOrRemoveIfAlreadyIncluded(material: Material){
        var found = false;

        for(let i=0; i<this.materials.length; i++){
            if (material.id === this.materials[i]){
                this.materials.splice(i, 1);
                found = true;
                return 0;
            }
        }

        if (!found)
            this.materials.push(material.id);
    }
}