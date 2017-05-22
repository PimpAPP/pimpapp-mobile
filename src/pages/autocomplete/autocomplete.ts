import { Component, AfterViewInit,NgZone} from '@angular/core';
import {  ViewController } from 'ionic-angular';
import { AppStorage } from '../../providers/app-storage';


declare var google:any;

@Component({
  selector: 'autocomplete',
  templateUrl: 'autocomplete.html'
})


export class AutocompletePage implements AfterViewInit{

    address:any;
    lstAdd:any=[];

    constructor(public viewCtrl: ViewController, public appstorage: AppStorage, public zone:NgZone) {
        this.appstorage.getData().then((data)=>{
            if(data.entries!=null){
                this.lstAdd = data.entries;
            }
        });
    }

   closeModal(){
        this.viewCtrl.dismiss(null);
   }

   onCancel($event){
        this.viewCtrl.dismiss(null);
   }

   gotoAddress(data){
        this.viewCtrl.dismiss(data);
   }

   ngAfterViewInit(){
        var options = {
            //componentRestrictions: {country: 'au'}
        };
        let autocomplete = new google.maps.places.Autocomplete( document.getElementById('PickupLocation'),options, {});
        google.maps.event.addListener(autocomplete, 'place_changed', () =>   {
            this.address = autocomplete.getPlace();
            let data = {add:null,lat:null,lng:null};
            data.add = this.address.formatted_address;
            data.lat = this.address.geometry.location.lat();
            data.lng = this.address.geometry.location.lng();
            this.appstorage.saveData(data);
            this.viewCtrl.dismiss(data);
        }); 
    }

}