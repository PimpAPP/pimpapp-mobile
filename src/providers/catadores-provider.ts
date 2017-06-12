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

    constructor(public http: Http, public storage: Storage,
        public apiProvider: ApiProvider) { 
        this.tokenUtils = new TokenUtils(storage);
    }
    url = this.apiProvider.url + 'api/nearest-catadores/?format=json';

    getCatadoresPositions() {
        return this.http.get(this.url)
          .map(res => res.json() );
    }

    registerCatador(catador: Catador){
        let url = this.apiProvider.url + 'api/catadores/';
        let headers = new Headers();
        this.tokenUtils.createAuthorizationHeader(headers);
        return this.http.post(url, catador, {
            headers: headers
        }).map(res => res.json());
    }
}
