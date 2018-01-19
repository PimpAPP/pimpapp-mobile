import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LangProvider } from './../../providers/lang/lang-provider';
import { Lang } from './../Lang';


@Component({
    selector: 'lang-page',
    templateUrl: 'lang-page.html',
})
export class LangPage {


    constructor(public navCtrl: NavController, 
        private translate: TranslateService,
        private langProvider: LangProvider) {
        
    }

    ngAfterViewInit() {
        
    }

    setLang(lang) {
        this.translate.use(lang);
        var l = new Lang();
        l.value = lang;
        
        this.langProvider.insert(l).then((res) => {
            this.navCtrl.pop();
        });
    }

    

}
