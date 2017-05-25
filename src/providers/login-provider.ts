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
        this.loginAPI(user, password).subscribe(data =>{
            this.storage.set('token', data.token);
        });        
    }

    isLogedIn(){
        this.storage.get('token').then((val) => {
            console.log(val);
            return val;
        })
    }
}
