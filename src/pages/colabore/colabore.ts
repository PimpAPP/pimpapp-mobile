import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
    selector: 'colabore',
    templateUrl: 'colabore.html',
})

export class ColaborePage {

    @ViewChild(Slides) slides: Slides; 
    public step: Number;

    constructor() {
        this.step = 0;
    }

    goToSlide(index) {
        this.slides.slideTo(index, 2);
    }

    slideChanged() {
        this.step = this.slides.getActiveIndex();
    }

}
