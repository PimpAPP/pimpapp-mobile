import { ApiProvider } from '../providers/api-provider';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class LoginProvider {
  public url = this.apiProvider.url + 'api/api-token-auth/';
  public headers = new Headers();

  constructor(public http: Http, public storage: Storage, 
    public apiProvider: ApiProvider) {
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Token a4f48a5b96e9fe0d0d9b264e3388b536f6ff3b3f');
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
