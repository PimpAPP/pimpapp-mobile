import { ApiProvider } from './../providers/api-provider';
import { LoginProvider } from './../providers/login-provider';
import { ResiduesProvider } from './../providers/residues-providers';
import { LoginPage } from './../pages/login/login';
import { CadastroCatadorPage5 } from './../pages/cadastro-catador/cadastro-catador-page5/cadastro-catador-page5';
import { StorageService } from './../pages/storage-service';
import { CallNumber } from '@ionic-native/call-number';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CatadoresProvider } from './../providers/catadores-provider';
import { CooperativesProvider } from './../providers/cooperatives-provider';
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

import { searchPage } from './../pages/search/search'

import { UsersAPI } from '../providers/users-api';
// import { CameraProvider } from '../providers/camera-provider';
import { IonicStorageModule } from '@ionic/storage';

import { MaterialSlider } from './../pages/material-slider/material-slider';

import { CatakiPage } from './../pages/cataki/cataki';
import { PimpMyCarrocaPage } from './../pages/pimpmycarroca/pimpmycarroca';
import { ParceirosPage } from './../pages/parceiros/parceiros';
import { PraOndeVamosPage } from './../pages/praondevamos/praondevamos';
import { ColaborePage } from './../pages/colabore/colabore';
import { CadastroCatadorWebPage } from './../pages/cadastro-catador-web/cadastro-catador-web';
import { MenuCadastroComponent } from '../pages/menu-cadastro/menu-cadastro';

import { GoogleMaps } from '@ionic-native/google-maps';
import { DatabaseProvider } from '../providers/database/database-provider';
import { LangProvider } from '../providers/lang/lang-provider';

import { LangPage } from './../pages/lang-page/lang-page';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
// import { FileOpener } from '@ionic-native/file-opener';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

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
        MenuCadastroComponent,
        TutorialPage,
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
        ColaborePage,
        CadastroCatadorWebPage,
        MenuCadastroComponent,
        LangPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, ResidueRegister),
        IonicStorageModule.forRoot(),
        HttpModule,
        HttpClientModule,
        IonAlphaScrollModule,
        TextMaskModule,
        IonicImageViewerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                //useFactory: HttpLoaderFactory,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
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
        MenuCadastroComponent,
        TutorialPage,
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
        ColaborePage,
        CadastroCatadorWebPage,
        LangPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GoogleMaps,
        ApiProvider,
        CatadoresProvider,
        CooperativesProvider,
        ResiduesProvider,
        StorageService,
        CollectsProvider,
        Camera,
        Toast,
        LoginProvider,
        UsersAPI,
        CallNumber,
        // CameraProvider,
        SQLite,
        DatabaseProvider,
        LangProvider,
        // FileOpener,
        File,
        FileTransfer,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: AppStorage, useClass: AppStorage }
    ]
})
export class AppModule { }
