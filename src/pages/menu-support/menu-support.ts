import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ErrorPage } from './../404/ErrorPage';
import { CadastroCatador } from './../cadastro-catador/cadastro-catador';
import { ModalController } from 'ionic-angular';
import { TutorialPage } from '../tutorial/tutorial';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ApiProvider } from '../../providers/api-provider';
import { PdfModal } from '../pdf-modal/pdf-modal';


@Component({
    selector: 'menu-support',
    templateUrl: 'menu-support.html',
})
export class MenuSupport {

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController, private file: File, 
        private transfer: FileTransfer, private platform: Platform,
        public apiProvider: ApiProvider) {

    }

    errorpage() {
        this.navCtrl.push(ErrorPage);
    }

    openCadastroCatador() {
        this.navCtrl.push(CadastroCatador);
    }

    openTutorial() {
        const modal = this.modalCtrl.create(TutorialPage);
        modal.present();
    }

    openCataDuvidas() {
        let path = null;
        let fileName = 'cata-duvidas.pdf';

        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }

        this.file.checkFile(path, fileName).then(
            (files) => {
                const modal = this.modalCtrl.create(PdfModal, { src: path + fileName });
                modal.present();
            }
        ).catch(
            (err) => {
                const transfer = this.transfer.create();
                let url = this.apiProvider.url + 'api/get_docs/1/';
                transfer.download(url, path + fileName).then(entry => {
                    let url = entry.toURL();
                    const modal = this.modalCtrl.create(PdfModal, { src: url });
                    modal.present();
                });
            }
        );
    }

    openGuiaCadastro() {
        let path = null;
        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }

        let fileName = 'guia-cadastro.pdf';
        
        this.file.checkFile(path, fileName).then(
            (files) => {
                const modal = this.modalCtrl.create(PdfModal, { src: path + fileName });
                modal.present();
            }
        ).catch(
            (err) => {
                const transfer = this.transfer.create();
                let url = this.apiProvider.url + 'api/get_docs/2/';
                transfer.download(url, path + fileName).then(entry => {
                    let url = entry.toURL();
                    const modal = this.modalCtrl.create(PdfModal, { src: url });
                    modal.present();
                });
            }
        );
    }

}
