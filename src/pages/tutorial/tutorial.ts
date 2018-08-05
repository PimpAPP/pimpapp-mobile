import { Component, ViewChild } from '@angular/core';
import { Slides, ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
})
export class TutorialPage {
    
    @ViewChild(Slides) slides: Slides; 
    public step: Number;

    constructor(public navCtrl: NavController,
            public viewCtrl: ViewController, public storage: Storage) {
        this.step = 0;
    }

    goToSlide(index) {
        this.slides.slideTo(index, 2);
    }

    slideChanged() {
        this.step = this.slides.getActiveIndex();
    }

    close() {
        this.storage.set('firstAccess', 0).then((val) => {
            this.viewCtrl.dismiss();
        });
    }
}