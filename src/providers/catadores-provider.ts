import { ApiProvider } from '../providers/api-provider';
import { Catador } from './../pages/catador';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CatadoresProvider {
    url = this.apiProvider.url + 'api/nearest-catadores/?format=json';

    constructor(public http: Http, public apiProvider: ApiProvider) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + this.apiProvider.token); 
    }

    getCatadoresPositions() {
        return this.http.get(this.url)
          .map(res => res.json() );
    }

    registerCatador(catador: Catador){
        let url = this.apiProvider.url + 'api/catadores/';
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, catador, {
            headers: headers
        }).map(res => res.json());
    }
}
