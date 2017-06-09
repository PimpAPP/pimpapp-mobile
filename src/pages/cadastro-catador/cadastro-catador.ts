import { Catador } from './../catador';
import { CadastroCatadorPage2 } from './cadastro-catador-page2/cadastro-catador-page2';
import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

@Component({
  selector: 'page-cadastro-catador',
  templateUrl: 'cadastro-catador.html',
})
export class CadastroCatador {
 @ViewChild(Slides) slides: Slides; 
  public catador: Catador = new Catador();
  public passwordConfirm: string = '';
  public formValid: boolean = true;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  openPage2(){
      if (this.validForm())
        this.navCtrl.push(CadastroCatadorPage2, { catador: this.catador });
  }

  validForm(){
      this.formValid = (
          (this.catador.name.length > 0) &&
          (this.catador.email.length > 0) &&
          (this.catador.password.length > 0)
      )
      this.formValid = true;
      return this.formValid;
  }

  printItem(){
      console.log(this.catador);
  }

  validPassword(){
      return ((this.catador.password === this.passwordConfirm) && 
              (this.catador.password.length > 7));
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
        if(this.validForm()){
        this.slides.slideTo(1, 5);
        document.getElementById('no1').style.background="#7bd9a2";
        document.getElementById('no2').style.background="#00b544";
        document.getElementById('no3').style.background="#7bd9a2";
        document.getElementById('no4').style.background="#7bd9a2";
        document.getElementById('no5').style.background="#7bd9a2";
    }
    else{
        this.slides.slideTo(0, 5);
    }
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
