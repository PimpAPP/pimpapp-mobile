import { TabsPage } from './../pages/tabs/tabs';
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
    MenuPage
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
    CollectsOpen,
    NearestCatadores,
    Feedback,
    Feedback1,
    Feedback2,
    Feedback3,
    Feedback4,
    TabsPage,
    MenuPage
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
