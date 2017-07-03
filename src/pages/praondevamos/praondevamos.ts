import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'praondevamos',
  templateUrl: 'praondevamos.html',
})
export class PraOndeVamosPage {

@ViewChild(Slides) slides: Slides; 

  constructor() {
  }

  goToSlide(index) {
        if(index=="1"){
        this.slides.slideTo(0, 2);
        document.getElementById('no1').style.background="#00b544";//active
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";  
    }
    
    if(index=="2"){
        this.slides.slideTo(1, 2);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#00b544";
        document.getElementById('no3').style.background="#7bd9a2";    
    }

    if(index=="3"){
        this.slides.slideTo(2, 2);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#00b544";
    }
  }

}
