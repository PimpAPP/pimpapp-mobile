import { Component, ViewChild } from '@angular/core';
import { Slides, ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'intro-slide',
    templateUrl: 'intro-slide.html',
})
export class IntroSlidePage {
    
    @ViewChild(Slides) slides: Slides; 
    public step: Number;

    constructor(public navCtrl: NavController,
            public viewCtrl: ViewController, public storage: Storage) {
        this.step = 0;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}