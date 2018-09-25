import { ApiProvider } from '../providers/api-provider';
import { TokenUtils } from './tokenUtils';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { SearchFilter } from '../pages/search-filter';


@Injectable()
export class CooperativesProvider {

    public tokenUtils: TokenUtils;
    private headers = new Headers();
    public url: string; 


    constructor(public http: Http, public apiProvider: ApiProvider) { 
        this.url = this.apiProvider.url + 'api/cooperatives/';
    }
    
    updateHeaders() {
        if (!this.headers.has('Authorization')) {
            this.tokenUtils.createAuthorizationHeader(this.headers);
        }
    }   
    
    // getCooperatives(filter?: SearchFilter) {
    //     if (filter) {
    //         // filter results
    //         return this.search(filter);
    //     } else {
    //         // return all cooperatives
    //         return this.http.get(this.url);
    //     }
    // }

    search(filter: SearchFilter) {
        return this.http.get(this.url + filter.getAsUrlParams())
          .map(res => res.json() );
    }

}