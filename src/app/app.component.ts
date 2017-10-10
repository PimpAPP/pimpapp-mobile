import { App, Platform, MenuController, NavController, ViewController } from 'ionic-angular';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginProvider } from './../providers/login-provider';
import { StorageService } from './../pages/storage-service';
import { Feedback } from './../pages/feedback/feedback';
import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { CadastroGerador } from './../pages/cadastro-gerador/cadastro-gerador';
import { CadastroCatador } from './../pages/cadastro-catador/cadastro-catador';
import { PerfilGerador } from './../pages/perfil-gerador/perfil-gerador';
import { PerfilCatador } from './../pages/perfil-catador/perfil-catador';



@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild('c') nav: NavController;

    rootPage: any;
    public menu: MenuController;

    constructor(platform: Platform, statusBar: StatusBar,
        public menuCtrl: MenuController, public storage: Storage,
        public storageService: StorageService, public app: App,
        public loginProvider: LoginProvider) {

        platform.ready().then(() => {
            statusBar.styleDefault();
            this.checkLandingFirstTime();
        });

        platform.registerBackButtonAction(() => {
            let nav = app.getActiveNav();
            let activeView: ViewController = nav.getActive();

            // If the function backButtonAction exists in the current page
            // it will be called
            if (activeView != null) {
                if (nav.canGoBack()) {
                    nav.pop();
                } else if (typeof activeView.instance.backButtonAction === 'function')
                    activeView.instance.backButtonAction();
                else nav.parent.select(0); // goes to the first tab
            }
        });
    }

    checkLandingFirstTime() {
        // this.storage.ready().then(() => {
        //     this.storage.get('firstAccess').then((val) => {
        //         if (val==1)
        //           this.rootPage = TabsPage;
        //         else
        //           this.rootPage = TutorialPage;
        //     });
        //   });
        this.rootPage = TabsPage;
    }

    openPage(page) {
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
