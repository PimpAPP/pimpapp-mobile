import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

declare var require: any;
const localforage: LocalForage = require("localforage");

@Injectable()
export class AppStorage {

    constructor() {
        localforage.config({
            name: 'MyApp'
        });
    }

    saveData(data) {

      localforage.getItem('address', function (err, value) {
            let arr = [];
            if(value){
                let hasEntry = false;
                for (var key in value){
                    if(key == 'entries'){
                      hasEntry = true;
                    }
                }
                
                if(hasEntry){
                    arr = value['entries'];
                    let hasNot = true;
                    arr.forEach(element => {
                        if(element.add == data.add){
                            hasNot = false;
                        }
                    });

                    if(hasNot){
                          arr.push(data);
                          let temp = {};
                          temp['entries'] = arr;  
                          localforage.setItem('address',temp, function (err) {
                              console.log("Entry added",temp);
                          });                           
                    }

                }else{
                      arr.push(data);
                      let temp = {};
                      temp['entries'] = arr;  
                      localforage.setItem('address',temp, function (err) {
                          console.log("Entry added",temp);
                      });                   
                }
            }else{
                arr.push(data);
                let temp = {};
                temp['entries'] = arr;  
                localforage.setItem('address',temp, function (err) {
                    console.log("Entry added",temp);
                });
            }
      });
    }    

    getData():Promise<any> {
        return localforage.getItem('address');
    }

}