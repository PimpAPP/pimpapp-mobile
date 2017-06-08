import { ApiProvider } from '../providers/api-provider';
import { Residue } from './../pages/Residue';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ResiduesProvider {
  public url = this.apiProvider.url + 'api/residues/';
  public headers = new Headers();

  constructor(public http: Http, public apiProvider: ApiProvider) {
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Token ' + this.apiProvider.token);
   }

    registerResidue(residue: Residue){
        return this.http.post(this.url, residue, {
            headers: this.headers
        }).map(res => res.json());
    }

    registerResidueLocation(residueId, location){
        let url = this.apiProvider.url + 'api/residues/' + residueId + '/georef/';
        return this.http.post(url, location, {
            headers: this.headers
        }).map(res => res.json());

    }
}
