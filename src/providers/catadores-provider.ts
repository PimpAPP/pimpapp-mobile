import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CatadoresProvider {
  url = 'http://127.0.0.1:8000/api/nearest-catadores/?format=json';

  constructor(public http: Http) { }

  getCatadoresPositions() {
      return this.http.get(this.url)
        .map(res => res.json());
  }
}
