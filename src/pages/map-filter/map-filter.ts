
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
    selector: 'map-filter',
    templateUrl: 'map-filter.html',
})
export class MapFilter {


    constructor(public viewCtrl: ViewController) {

    }

    close() {
        this.viewCtrl.dismiss();
    }
    
}
