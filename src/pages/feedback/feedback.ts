import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Feedback1 } from './feedback-1/feedback-1';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class Feedback {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  showConfirm(message) {
      let confirm = this.alertCtrl.create({
        title: message,
        buttons: [
          {
            text: 'AINDA NÃO',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'SIM!',
            handler: () => {
              this.navCtrl.push(Feedback1);
            }
          }
        ]
      });
      confirm.present();
  }

}
