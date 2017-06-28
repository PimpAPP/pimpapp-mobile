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
    //url = this.apiProvider.url + 'api/nearest-catadores/?format=json';

  //  url = this.apiProvider.url + 'api/catadores/?format=json';      //new added by me

    getCatadoresPositions() {
        return this.http.get(this.url)
          .map(res => res.json() );
    }

    //get data using marker Id
    getAllData(){
        return this.http.get(this.apiProvider.url + '/api/catadores/?format=json')
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
        this.updateHeaders();
        return this.http.post(url, phones, {
            headers: this.headers
        }).map(res => res.json());
    }

    updateHeaders() {
        if (!this.headers.has('Authorization')) {
            this.tokenUtils.createAuthorizationHeader(this.headers);
        }
    }
}
