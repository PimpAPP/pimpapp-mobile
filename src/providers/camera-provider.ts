import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Camera} from 'ionic-native';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CameraProvider {

  public base64Image: string;

  constructor() { }

    takePicture(){

      Camera.getPicture({
          destinationType: Camera.DestinationType.DATA_URL,
          targetWidth: 1000,
          targetHeight: 1000
      }).then((imageData) => {
        // imageData is a base64 encoded string
          this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (err) => {
          console.log(err);
      });

    }

}
