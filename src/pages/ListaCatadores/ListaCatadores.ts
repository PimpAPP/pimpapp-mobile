import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';

import { UsersAPI } from '../../providers/users-api';

@Component({
  selector: 'page-ListaCatadores',
  templateUrl: 'ListaCatadores.html',
})
export class ListaCatadores {

  usuario: any;

  listCategory: string = "nome";
  isAndroid: boolean = false;

  listCategoryRepeat: any;
  currentPageClass = this;
  alphaScrollItemTemplate: string = `
    <ion-item class="scrollItem" (click)="currentPageClass.onItemClick(item)">
            <ion-avatar item-start col-3>
                <img src="{{item.avatarImage}}" alt="List Image">
            </ion-avatar>
            <div col-9 class="listDetails">
                <h2>{{item.itemName}} <img src="{{item.rightArrow}}" alt="List Arrow" ></h2>
                <div class="clear"></div>                
                <p>{{item.itemDesc}}</p>
                <span>
                    <img src="{{item.metarialIcon1}}" alt="Icones Mmateriais">
                    <img src="{{item.metarialIcon2}}" alt="Icones Materiais">
                    <img src="{{item.metarialIcon3}}" alt="Icones Materiais">
                </span>
            </div>
        </ion-item> 
    `;
    triggerAlphaScrollChange: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: UsersAPI, public loading: LoadingController, 
    public alertCtrl: AlertController, platform: Platform) {

         this.isAndroid = platform.is('android');

         this.assignBreeds();
         
  }

  onItemClick(item) {
      // This is an example of how you could manually trigger ngOnChange 
      // for the component. If you modify "listData" it won't perform 
      // an ngOnChange, you will have to trigger manually to refresh the component. 
      this.triggerAlphaScrollChange++;
      console.log('fgd');
    }
assignBreeds() {
  this.listCategoryRepeat = [
      {
        avatarImage : 'assets/img/listImage.png',
        itemName : 'ADRIANO CRUZ',
        itemDesc : 'Vila Madalena',
        rightArrow : 'assets/img/listArrow.png',
        metarialIcon1 : 'assets/img/Icones_materiais-28.png',
        metarialIcon2 : 'assets/img/Icones_materiais-23.png',
        metarialIcon3 : 'assets/img/Icones_materiais-18.png'
      },
      {
        avatarImage : 'assets/img/listImage.png',
        itemName : 'BRUNA LIMA',
        itemDesc : 'Itaim Bibi',
        rightArrow : 'assets/img/listArrow.png',
        metarialIcon1 : 'assets/img/Icones_materiais-28.png',
        metarialIcon2 : 'assets/img/Icones_materiais-23.png',
        metarialIcon3 : 'assets/img/Icones_materiais-18.png'
      },
      {
        avatarImage : 'assets/img/listImage.png',
        itemName : 'CASSIANO ELIAS',
        itemDesc : 'Centro',
        rightArrow : 'assets/img/listArrow.png',
        metarialIcon1 : 'assets/img/Icones_materiais-28.png',
        metarialIcon2 : 'assets/img/Icones_materiais-23.png',
        metarialIcon3 : 'assets/img/Icones_materiais-18.png'
      },
      {
        avatarImage : 'assets/img/listImage.png',
        itemName : 'DEISI AMARAL',
        itemDesc : 'Vila Madalena',
        rightArrow : 'assets/img/listArrow.png',
        metarialIcon1 : 'assets/img/Icones_materiais-28.png',
        metarialIcon2 : 'assets/img/Icones_materiais-23.png',
        metarialIcon3 : 'assets/img/Icones_materiais-18.png'
      }
    ]
}

}
