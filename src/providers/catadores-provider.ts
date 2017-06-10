import { TokenUtils } from './tokenUtils';
import { Storage } from '@ionic/storage';
import { Catador } from './../pages/catador';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CatadoresProvider {
    url = 'http://179.188.38.243/api/nearest-catadores/?format=json';
    public tokenUtils: TokenUtils;

    constructor(public http: Http, public storage: Storage) { 
        this.tokenUtils = new TokenUtils(storage);
    }

    getCatadoresPositions() {
        return this.http.get(this.url)
          .map(res => res.json() );
    }

    registerCatador(catador: Catador){
        let url = 'http://179.188.38.243/api/catadores/';
        let headers = new Headers();
        this.tokenUtils.createAuthorizationHeader(headers);
        return this.http.post(url, catador, {
            headers: headers
        }).map(res => res.json());
    }
}
