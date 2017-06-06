import { TutorialPage } from './../pages/tutorial/tutorial';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class LoginProvider {
  public url = 'http://179.188.38.243/api/api-token-auth/';
  public headers = new Headers();

  constructor(public http: Http, public storage: Storage) {
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Token a9df25172b3a778cb58c87e63f33c69309bf4e20');
   }

    loginAPI(user, password){
      // Method Used to make login at the API
        return this.http.post(this.url, {username: user, password: password},{
            headers: this.headers
        }).map(res => res.json());
    }

    makeLogin(user, password){
        let data: any;
        this.loginAPI(user, password).subscribe(data =>{
            console.log('salvando ...');
            console.log(data.token);
            this.storage.set('token', data.token);
            data = data;
        });        
        return Promise.resolve(data);
    }
}
