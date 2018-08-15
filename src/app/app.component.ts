import { IonicApp } from 'ionic-angular';
import { App, Platform, MenuController, NavController, ViewController } from 'ionic-angular';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginProvider } from './../providers/login-provider';
import { Feedback } from './../pages/feedback/feedback';
import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { CadastroGerador } from './../pages/cadastro-gerador/cadastro-gerador';
import { CadastroCatador } from './../pages/cadastro-catador/cadastro-catador';
import { PerfilGerador } from './../pages/perfil-gerador/perfil-gerador';
import { PerfilCatador } from './../pages/perfil-catador/perfil-catador';
import { LangPage } from './../pages/lang-page/lang-page';

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    
    @ViewChild('c') nav: NavController;

    rootPage = TabsPage;
    public menu: MenuController;

    constructor(private platform: Platform, statusBar: StatusBar,
        public menuCtrl: MenuController, public app: App,
        public loginProvider: LoginProvider, private _ionicApp: IonicApp) {

        platform.ready().then(() => {
            statusBar.styleDefault();
        });

        platform.registerBackButtonAction(() => {
            // Close any active modals or overlays
            let activePortal = this._ionicApp._loadingPortal.getActive() ||
                this._ionicApp._modalPortal.getActive() ||
                this._ionicApp._toastPortal.getActive() ||
                this._ionicApp._overlayPortal.getActive();
            if (activePortal) {
                activePortal.dismiss();
                return;
            }

            // If the function backButtonAction exists in the current page
            // it will be called
            let nav = app.getActiveNav();
            let activeView: ViewController = nav.getActive();
            
            if (activeView != null) {
                if (nav.canGoBack()) {
                    nav.pop();
                } else if (typeof activeView.instance.backButtonAction === 'function')
                    activeView.instance.backButtonAction();
                else nav.parent.select(0); // goes to the first tab
            }

        });
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
            case 'lang':
                this.nav.push(LangPage);
                this.menuCtrl.close();
                break;
        }
    }


}
