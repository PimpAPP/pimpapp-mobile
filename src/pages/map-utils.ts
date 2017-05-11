import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';
// import { LatLng, Geocoder, GeocoderResult } from '@ionic-native/google-maps';


export class MapUtils{
    private geolocation: Geolocation;
    public location: any;

    constructor (){
        this.geolocation = new Geolocation();
    }

    getCurrentLocation(){
        return Observable.create(observable =>{
            let options = {timeout: 1000, enableHightAccuracy: true};

            this.geolocation.getCurrentPosition(options)
                .then(
                    resp => {
                        let lat = resp.coords.latitude;
                        let lng = resp.coords.longitude;
                        let location: LatLng = new LatLng(lat, lng);
                        console.log(location);
                        observable.next(location);
                    },
                    (error) => {
                        console.log('Error on getting current location: ' + error);
                    });
        });
    }
}