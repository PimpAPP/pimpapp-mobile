import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { MapaPage } from '../pages/mapa/mapa';
import { CatadoresPage } from '../pages/catadores/catadores';
import { CatadorPage } from '../pages/catador/catador';

import { UsersAPI } from '../providers/users-api';
import { CameraProvider } from '../providers/camera-provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    MapaPage,
    CatadoresPage,
    CatadorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    MapaPage,
    CatadoresPage,
    CatadorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersAPI,
    CameraProvider,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
