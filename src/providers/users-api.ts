import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersAPI {
  public url: string = 'http://192.168.0.100:8000/api/users/';

  constructor(public http: Http, public storage: Storage) {}

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

  addAvatar(data, userId) {
      let headers = new Headers();
      let url = this.url + userId + '/photos/';
      this.createAuthorizationHeader(headers);
      return this.http.post(url, data, {
          headers: headers
      })
      //.map(res => res.json());
  }

}
