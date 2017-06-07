import { ApiProvider } from '../providers/api-provider';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CollectsProvider {
  url = this.apiProvider.url + 'api/residues/?format=json';

  constructor(public http: Http, public apiProvider: ApiProvider) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.apiProvider.token); 
  }

  getCollectsPositions() {
      let headers = new Headers();

      this.createAuthorizationHeader(headers);

      return this.http.get(this.url, { headers: headers })
        .map(res => res.json());
  }
}
