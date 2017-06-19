import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiProvider {
    public url:string = 'http://179.188.38.243/';
    //public url:string = 'http://127.0.0.1:8000/';
    public token:string = '';

    constructor(public storage: Storage) { 
        this.storage.get('token').then(data => {
            this.token = data;
        });
    }
}