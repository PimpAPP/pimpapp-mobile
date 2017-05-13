import { TutorialPage } from './../pages/tutorial/tutorial';
import { StorageService } from './../pages/storage-service';
import { PerfilGerador } from './../pages/perfil-gerador/perfil-gerador';
import { PerfilCatador } from './../pages/perfil-catador/perfil-catador';
import { Feedback } from './../pages/feedback/feedback';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from './../pages/tabs/tabs';
// import { LandingPage } from './../pages/landing/landing';
import { PerfilCooperativa } from './../pages/perfil-cooperativa/perfil-cooperativa';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild('c') nav: NavController;

  rootPage:any = TabsPage;
  public menu: MenuController;

  constructor(platform: Platform, statusBar: StatusBar, 
    public menuCtrl: MenuController, public storage: Storage,
    public storageService: StorageService
  ) {
      platform.ready().then(() => {
        statusBar.styleDefault();
        this.checkLandingFirstTime();
      });
  }

  checkLandingFirstTime(){
      this.storage.ready().then(() => {
            this.storage.get('firstAccess').then((val) => {
                if (val===0)
                    this.rootPage = TabsPage;
                else{
                    this.storage.set('firstAccess', 0);
                    this.rootPage = TutorialPage;
                }
            })
        });
  }

  openPage(page){
    switch (page) {
      case 'feedback':
      this.nav.push(Feedback);
      this.menuCtrl.close();
      break;
    }
  }
}

