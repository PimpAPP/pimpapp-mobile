import { ApiProvider } from './../providers/api-provider';
import { LoginProvider } from './../providers/login-provider';
import { ResiduesProvider } from './../providers/residues-providers';
import { LoginPage } from './../pages/login/login';
import { CadastroCatadorPage5 } from './../pages/cadastro-catador/cadastro-catador-page5/cadastro-catador-page5';
import { StorageService } from './../pages/storage-service';
//import { CallNumber } from '@ionic-native/call-number';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CatadoresProvider } from './../providers/catadores-provider';
import { CollectsProvider } from './../providers/collects-provider';
import { NewResidue } from './../pages/new-residue/new-residue';
import { CollectsOpen } from './../pages/collects-open/catador-collects';
import { NearestCatadores } from './../pages/nearest-catadores/nearest-catadores';
import { Feedback } from './../pages/feedback/feedback';
import { Feedback1 } from './../pages/feedback/feedback-1/feedback-1';
import { Feedback2 } from './../pages/feedback/feedback-2/feedback-2';
import { Feedback3 } from './../pages/feedback/feedback-3/feedback-3';
import { Feedback4 } from './../pages/feedback/feedback-4/feedback-4';
import { MenuPage } from './../pages/menu/menu';
import { TabsPage } from './../pages/tabs/tabs';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { TutorialPage2 } from './../pages/tutorial/page2/page2';
import { TutorialPage3 } from './../pages/tutorial/page3/page3';
import { TutorialPage4 } from './../pages/tutorial/page4/page4';
import { TutorialPage5 } from './../pages/tutorial/page5/page5';
import { CadastroCatadorPage3 } from './../pages/cadastro-catador/cadastro-catador-page3/cadastro-catador-page3';
import { CadastroCatadorPage2 } from './../pages/cadastro-catador/cadastro-catador-page2/cadastro-catador-page2';
import { CadastroCatadorPage4 } from './../pages/cadastro-catador/cadastro-catador-page4/cadastro-catador-page4';
import { CadastroGerador } from './../pages/cadastro-gerador/cadastro-gerador';
import { CadastroCatador } from './../pages/cadastro-catador/cadastro-catador';
import { MenuCatadorRegister } from './../pages/menu-catador-register/menu-catador-register';
import { MenuMaterials } from './../pages/menu-materials/menu-materials';
import { CansPage } from './../pages/menu-materials/cans/cans';
import { MenuSupport } from './../pages/menu-support/menu-support';
import { ResidueRegister } from './../pages/residue-register/residue-register';
import { QuantityPage } from './../pages/residue-register/quantity/quantity';
import { ResumePage } from './../pages/residue-register/resume/resume';
import { ListCatadoresNear } from './../pages/residue-register/list-catadores-near/list-catadores-near';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { LandingPage } from './../pages/landing/landing';
import { PerfilGerador } from './../pages/perfil-gerador/perfil-gerador';
import { PerfilCatador } from './../pages/perfil-catador/perfil-catador';
import { PerfilCooperativa } from './../pages/perfil-cooperativa/perfil-cooperativa';
import { AutocompletePage } from './../pages/autocomplete/autocomplete';

import { ErrorPage } from './../pages/404/ErrorPage';
import { ListaCatadores } from './../pages/ListaCatadores/ListaCatadores';
import { ColetaConfirmada } from './../pages/coletaconfirmada/coletaconfirmada';

import { ColetaAberta2h } from './../pages/coletaaberta2h/coletaaberta2h';
import { ColetaAberta } from './../pages/coletaaberta/coletaaberta';
import { ColetaAbertaRetorno2h } from './../pages/coletaabertaretorno2h/coletaabertaretorno2h';
import { coletaaberta12h } from './../pages/coletaaberta12h/coletaaberta12h';

import { TextMaskModule } from 'angular2-text-mask';

import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';

import { AppStorage } from '../providers/app-storage';

import {searchPage} from './../pages/search/search'

import { UsersAPI } from '../providers/users-api';
// import { CameraProvider } from '../providers/camera-provider';
import { IonicStorageModule } from '@ionic/storage';

import { MaterialSlider } from './../pages/material-slider/material-slider';

import { CatakiPage } from './../pages/cataki/cataki';
import { PimpMyCarrocaPage } from './../pages/pimpmycarroca/pimpmycarroca';
import { ParceirosPage } from './../pages/parceiros/parceiros';
import { PraOndeVamosPage } from './../pages/praondevamos/praondevamos';
import { ColaborePage } from './../pages/colabore/colabore';


import {
 GoogleMaps,
 
} from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewResidue,
    CollectsOpen,
    NearestCatadores,
    Feedback,
    Feedback1,
    Feedback2,
    Feedback3,
    Feedback4,
    TabsPage,
    MenuPage,
    TutorialPage,
    TutorialPage2,
    TutorialPage3,
    TutorialPage4,
    TutorialPage5,
    MenuCatadorRegister,
    MenuMaterials,
    CansPage,
    MenuSupport,
    ResidueRegister,
    QuantityPage,
    ResumePage,
    LandingPage,
    LoginPage,
    CadastroCatador,
    CadastroGerador,
    CadastroCatadorPage2,
    CadastroCatadorPage3,
    CadastroCatadorPage4,
    CadastroCatadorPage5,
    PerfilGerador,
    PerfilCatador,
    PerfilCooperativa,
    ListCatadoresNear,
    AutocompletePage,
    ErrorPage,
    ColetaConfirmada,
    ListaCatadores,
    ColetaAberta2h,
    ColetaAberta,
    ColetaAbertaRetorno2h,
    coletaaberta12h,
    searchPage,
    MaterialSlider,
    CatakiPage,
    PimpMyCarrocaPage,
    ParceirosPage,
    PraOndeVamosPage,
    ColaborePage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, ResidueRegister),
    IonicStorageModule.forRoot(),
    HttpModule,
    IonAlphaScrollModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewResidue,
    CollectsOpen,
    NearestCatadores,
    Feedback,
    Feedback1,
    Feedback2,
    Feedback3,
    Feedback4,
    TabsPage,
    MenuPage,
    TutorialPage,
    TutorialPage2,
    TutorialPage3,
    TutorialPage4,
    TutorialPage5,
    MenuCatadorRegister,
    MenuMaterials,
    CansPage,
    MenuSupport,
    ResidueRegister,
    QuantityPage,
    ResumePage,
    LandingPage,
    LoginPage,
    CadastroCatador,
    CadastroGerador,
    CadastroCatadorPage2,
    CadastroCatadorPage3,
    CadastroCatadorPage4,
    CadastroCatadorPage5,
    PerfilGerador,
    PerfilCatador,
    PerfilCooperativa,
    ListCatadoresNear,
    AutocompletePage,
    ErrorPage,
    ColetaConfirmada,
    ListaCatadores,
    ColetaAberta2h,
    ColetaAberta,
    ColetaAbertaRetorno2h,
    coletaaberta12h,
    searchPage,
    MaterialSlider,
    CatakiPage,
    PimpMyCarrocaPage,
    ParceirosPage,
    PraOndeVamosPage,
    ColaborePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    ApiProvider,
    CatadoresProvider,
    ResiduesProvider,
    StorageService,
    CollectsProvider,
    Camera,
    Toast,
    LoginProvider,
    UsersAPI,
    // CameraProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AppStorage, useClass: AppStorage}
  ]
})
export class AppModule {}
