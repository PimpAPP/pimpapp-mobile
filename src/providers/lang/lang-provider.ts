import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database-provider';
import { Lang } from './../../pages/Lang';

@Injectable()
export class LangProvider {

    constructor(public http: Http, private dbProvider: DatabaseProvider) {
        console.log('Hello LangProvider Provider');
    }

    public insert(lang: Lang) {
        return this.dbProvider.getDB()
            .then((db: SQLiteObject) => {
                let sql = 'INSERT OR REPLACE INTO lang(id, value) VALUES(?, ?)';
                let data = [1, lang.value];

                return db.executeSql(sql, data)
                    .catch((e) => console.error(e));
            })
            .catch((e) => console.error(e));
    }

    public get(id: number) {
        return this.dbProvider.getDB()
            .then((db: SQLiteObject) => {
                let sql = 'select * from lang where id = ?';
                let data = [id];

                return db.executeSql(sql, data)
                    .then((data: any) => {
                        if (data.rows.length > 0) {
                            let item = data.rows.item(0);
                            let lang = new Lang();
                            lang.id = item.id;
                            lang.value = item.value;
                            return lang;
                        }

                        return null;
                    })
                    .catch((e) => console.error(e));
            })
            .catch((e) => console.error(e));
    }


}
