import { Storage } from '@ionic/storage';
import { Headers } from '@angular/http';


export class TokenUtils{
    constructor(public storage: Storage){}

    createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        return this.storage.get('token').then(data => {
            headers.append('Authorization', 'Token ' + data); 
            return headers;
        });
    }
}