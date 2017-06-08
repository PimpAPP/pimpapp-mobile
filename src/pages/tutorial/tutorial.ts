import { Component , ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TutorialPage2 } from './page2/page2';

import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;  

  constructor(public navCtrl: NavController) {
      
  }

  openPage2(){
    this.navCtrl.push(TutorialPage2);
  }


    goToSlide(index) {
        if(index=="1"){
        this.slides.slideTo(0, 5);
        document.getElementById('no1').style.background="#00b544";//active
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";     
    }
    
    if(index=="2"){
        this.slides.slideTo(1, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#00b544";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
    }

    if(index=="3"){
        this.slides.slideTo(2, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#00b544";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
    }
    if(index=="4"){
        this.slides.slideTo(3, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#00b544";
        document.getElementById('no5').style.background="#7bd9a2";
    }
    if(index=="5"){
        this.slides.slideTo(4, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#00b544";
    }

}

slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    //alert("Current index is"+currentIndex);
     if(currentIndex == 0){
          document.getElementById('no1').style.background="#00b544";//active
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }
    if(currentIndex == 1){
        document.getElementById('no2').style.background="#00b544";//active
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }
    
    if(currentIndex == 2){
     document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#00b544";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }

    if(currentIndex == 3){
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#00b544";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
        
    }
    if(currentIndex == 4){
        
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#7bd9a2";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#00b544";
        document.getElementById('no4').style.background="#7bd9a2";
        
    }
   
}
}








