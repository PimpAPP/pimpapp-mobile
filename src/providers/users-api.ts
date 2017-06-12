import { ApiProvider } from './api-provider';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersAPI {

  public url: string;  
  constructor(public http: Http, public storage: Storage, 
  public apiProvider: ApiProvider) {
      this.url = this.apiProvider.url + 'api/users/';
  }

  createAuthorizationHeader(headers: Headers) {
      headers.append('Content-Type', 'application/json');
  }

  get(url) {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      return this.http.get(url, {
        headers: headers
      })
      .map(res => res.json());
  }

  post(data) {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      return this.http.post(this.url, data, {
          headers: headers
      })
      .map(res => res.json());
  }

}
