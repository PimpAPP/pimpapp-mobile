import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageService{

    constructor(public storage: Storage){}

    returnKey(key){
        this.storage.ready().then(() => {
            this.storage.get(key).then((val) => {
                console.log('retornou: ' + val);
                return val;
            })
        });
    }

    setKey(key, value){
        this.storage.ready().then(() => {
            this.storage.set(key, value);
        })
    }

}