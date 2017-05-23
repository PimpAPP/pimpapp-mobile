import { Catador } from './../pages/catador';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CatadoresProvider {
    url = 'http://179.188.38.243/api/nearest-catadores/?format=json';

    constructor(public http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token 4d1a0496a4de43e5f798ceed9db4272e1f4b72e6'); 
    }

    getCatadoresPositions() {
        return this.http.get(this.url)
          .map(res => res.json() );
    }

    registerCatador(catador: Catador){
        let url = 'http://179.188.38.243/api/catadores/';
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, catador, {
            headers: headers
        }).map(res => res.json());
    }
}
