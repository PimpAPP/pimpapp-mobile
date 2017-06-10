import { ResidueRegister } from './../pages/residue-register/residue-register';
import { LoginProvider } from './../providers/login-provider';
import { LoginPage } from './../pages/login/login';
import { StorageService } from './../pages/storage-service';
import { Feedback } from './../pages/feedback/feedback';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from './../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { LandingPage } from './../pages/landing/landing';
import { CadastroGerador } from './../pages/cadastro-gerador/cadastro-gerador';
import { CadastroCatador } from './../pages/cadastro-catador/cadastro-catador';
import { PerfilGerador } from './../pages/perfil-gerador/perfil-gerador';
import { PerfilCatador } from './../pages/perfil-catador/perfil-catador';
import { TutorialPage } from './../pages/tutorial/tutorial';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild('c') nav: NavController;

  rootPage:any;
  public menu: MenuController;

  constructor(platform: Platform, statusBar: StatusBar, 
    public menuCtrl: MenuController, public storage: Storage,
    public storageService: StorageService, public loginProvider: LoginProvider
  ) {
      platform.ready().then(() => {
        statusBar.styleDefault();
          this.checkLandingFirstTime();
      });
  }

  checkLandingFirstTime(){
      this.storage.ready().then(() => {
          this.storage.get('token').then((val) => {
              if (val)
                this.rootPage = TabsPage;
              else
                this.rootPage = CadastroCatador;
          });
        });
  }

  openPage(page){
    switch (page) {
      case 'feedback':
      this.nav.push(Feedback);
      this.menuCtrl.close();
      break;
      case 'perfil-gerador':
      this.nav.push(PerfilGerador);
      this.menuCtrl.close();
      break;
      case 'perfil-catador':
      this.nav.push(PerfilCatador);
      this.menuCtrl.close();
      break;
      case 'cadastro-catador':
      this.nav.push(CadastroCatador);
      this.menuCtrl.close();
      break;
      case 'cadastro-gerador':
      this.nav.push(CadastroGerador);
      this.menuCtrl.close();
      break;
    }
  }
}
