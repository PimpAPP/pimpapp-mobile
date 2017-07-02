import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController } from 'ionic-angular';


@Component({
  selector: 'colabore',
  templateUrl: 'colabore.html',
})
export class ColaborePage {

@ViewChild(Slides) slides: Slides; 

  constructor() {
  }

  goToSlide(index) {
        if(index=="1"){
        this.slides.slideTo(0, 1);
        document.getElementById('no1').style.background="#00b544";//active
        document.getElementById('no2').style.background="#7bd9a2";
    }
    
    if(index=="2"){
        this.slides.slideTo(1, 1);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#00b544";  
    }
  }

}
