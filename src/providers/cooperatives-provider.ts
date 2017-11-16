import { ApiProvider } from '../providers/api-provider';
import { TokenUtils } from './tokenUtils';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class CooperativesProvider {

    public tokenUtils: TokenUtils;
    private headers = new Headers();
    public url: string; 


    constructor(public http: Http, public apiProvider: ApiProvider) { 
        this.url = this.apiProvider.url + 'api/cooperative/';
    }
    
    updateHeaders() {
        if (!this.headers.has('Authorization')) {
            this.tokenUtils.createAuthorizationHeader(this.headers);
        }
    }   
    
    getCooperatives() {
        return this.http.get(this.url);
        // return this.http.get(this.url).map(res => {
        //     console.log(res);
        //     // res.json() 
        // });
    }

}