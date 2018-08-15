import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ApiProvider } from '../../providers/api-provider';
import { PdfModal } from '../pdf-modal/pdf-modal';


@Component({
    selector: 'cadastro-catador-web',
    templateUrl: 'cadastro-catador-web.html',
})
export class CadastroCatadorWebPage {

    constructor(private platform: Platform, private file: File, 
            private transfer: FileTransfer, public apiProvider: ApiProvider,
            public modalCtrl: ModalController) {

    }

    openGuiaCadastro() {
        let path = null;
        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }

        const transfer = this.transfer.create();
        let url = this.apiProvider.url + 'api/get_docs/2/';
        transfer.download(url, path + 'guia-cadastro.pdf').then(entry => {
            let url = entry.toURL();
            const modal = this.modalCtrl.create(PdfModal, { src: url });
            modal.present();
        });
    }


}
