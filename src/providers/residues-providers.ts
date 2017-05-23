import { Residue } from './../pages/Residue';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ResiduesProvider {
  public url = 'http://179.188.38.243/api/residues/';
  public headers = new Headers();

  constructor(public http: Http) {
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Token a9df25172b3a778cb58c87e63f33c69309bf4e20');
   }

    registerResidue(residue: Residue){
        return this.http.post(this.url, residue, {
            headers: this.headers
        }).map(res => res.json());
    }

    registerResidueLocation(residueId, location){
        let url = 'http://179.188.38.243/api/residues/' + residueId + '/georef/';
        return this.http.post(url, location, {
            headers: this.headers
        }).map(res => res.json());

    }
}
