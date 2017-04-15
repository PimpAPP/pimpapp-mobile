import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CatadoresProvider {
  url = 'http://179.188.38.243/api/nearest-catadores/?format=json';
  // url = 'http://179.188.38.243/api/catadores/?format=json';

  a = [
    {
        "id": 4,
        "geolocation": [
            {
                "latitude": 53.341636,
                "longitude": -6.275628,
                "reverse_geocoding": ""
            }
        ]
    },
    {
        "id": 5,
        "geolocation": [
            {
                "latitude": 53.341496,
                "longitude": -6.277031,
                "reverse_geocoding": ""
            }
        ]
    },
    {
        "id": 6,
        "geolocation": [
            {
                "latitude": 53.341504,
                "longitude": -6.276749,
                "reverse_geocoding": ""
            }
        ]
    },
    {
        "id": 7,
        "geolocation": [
            {
                "latitude": 53.341528,
                "longitude": -6.276376,
                "reverse_geocoding": ""
            }
        ]
    },
    {
        "id": 8,
        "geolocation": [
            {
                "latitude": 53.341581,
                "longitude": -6.275958,
                "reverse_geocoding": ""
            }
        ]
    }
]

  
  constructor(public http: Http) { }

  getCatadoresPositions() {
      return this.http.get(this.url)
        .map(res => res.json() );
  }
}
