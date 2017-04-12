import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CatadoresProvider {
  url = 'http://179.188.38.243/api/nearest-catadores/?format=json';

  constructor(public http: Http) { }

  getCatadoresPositions() {
      return this.http.get(this.url)
        .map(res => res.json() );
  }
}
