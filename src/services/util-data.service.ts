import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class UtilDataService {
    

    constructor(public http: HttpClient) {
        
    }

    getStateAndCityList() {
        return this.http.get('assets/json/estados_cidades.json');
    }

}
