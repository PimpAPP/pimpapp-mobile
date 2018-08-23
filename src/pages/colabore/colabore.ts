import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';


@Component({
    selector: 'colabore',
    templateUrl: 'colabore.html',
})

export class ColaborePage {

    @ViewChild(Slides) slides: Slides; 
    public step: Number;

    constructor(public callNumber: CallNumber) {
        this.step = 0;
    }

    goToSlide(index) {
        this.slides.slideTo(index, 2);
    }

    slideChanged() {
        this.step = this.slides.getActiveIndex();
    }

    launchPhone(number: string) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

}
