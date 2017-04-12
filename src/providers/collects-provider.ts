import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CollectsProvider {
  url = 'http://179.188.38.243/api/residues/?format=json';

  constructor(public http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token a9df25172b3a778cb58c87e63f33c69309bf4e20'); 
  }

  getCollectsPositions() {
      let headers = new Headers();

      this.createAuthorizationHeader(headers);

      return this.http.get(this.url, { headers: headers })
        .map(res => res.json());
  }
}
