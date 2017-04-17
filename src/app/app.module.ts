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
import { CatadorCollects } from './../pages/catador-collects/catador-collects';
import { NewResidue } from './../pages/new-residue/new-residue';

import {
 GoogleMaps,
} from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewResidue,
    CatadorCollects
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewResidue,
    CatadorCollects
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    CatadoresProvider,
    CollectsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
