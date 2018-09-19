export class SearchFilter {
    
    public search: string;

    constructor() {

    }

    getAsUrlParams() {
        var query = '?';

        if (this.search)
            query += 'search='+this.search;

        return query;
    }
}