import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
    selector: 'pdf-modal',
    templateUrl: 'pdf-modal.html',
})
export class PdfModal {

    src: string = '';

    constructor(params: NavParams, public viewCtrl: ViewController) {
        this.src = params.get('src');
    }

    close() {
        this.viewCtrl.dismiss();
    }

}