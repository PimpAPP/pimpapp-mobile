import { ApiProvider } from '../providers/api-provider';
import { TokenUtils } from './tokenUtils';
import { Storage } from '@ionic/storage';
import { Catador } from './../pages/catador';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CatadoresProvider {
    public tokenUtils: TokenUtils;
    private headers = new Headers();
    public url: string; 

    constructor(public http: Http, public storage: Storage,
        public apiProvider: ApiProvider) { 
        this.url = this.apiProvider.url + 'api/catadores/';
        this.tokenUtils = new TokenUtils(storage);
    }
    
    getCatadoresPositions() {
        return this.http.get(this.url)
          .map(res => res.json() );
    }

    //get data using marker Id
    getAllData(){
        return this.http.get(this.apiProvider.url + 'api/catadores/?format=json')
          .map(res => res.json() );
         
    }

    //get data using marker Id
    getDataUsingID(id){
        return this.http.get(this.url + id + '/?format=json')
        .map(res => res.json() );
         
    }

    registerCatador(catador: Catador){
        let url = this.url;
        this.updateHeaders();
        return this.http.post(url, catador, {
            headers: this.headers
        }).map(res => res.json());
    }

    registerPhones(phones, catadorId) {
        let url = this.url + catadorId + '/phones/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        return this.http.post(url, phones, {
            headers: this.headers
        }).map(res => res.json());
    }

    updateLocation(location, catadorId) {
        let url = this.url + catadorId + '/georef/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        return this.http.post(url, location, {
            headers: this.headers
        });
    }

    updateHeaders() {
        if (!this.headers.has('Authorization')) {
            this.tokenUtils.createAuthorizationHeader(this.headers);
        }
    }

    addCallStatistic(catador, phone) {
        let url = this.apiProvider.url + 'api/add_statistic/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        var data = {
            'catador': catador,
            'phone': phone
        }

        return this.http.post(url, data, {
            headers: this.headers
        });
    }

}
