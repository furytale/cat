export default class MediaWikiService {
    _apiBase = 'https://en.wikipedia.org/w/api.php';
    _apiAction = 'action=query&';
    _apiList = 'list=search&';
    _apiSrsearch = 'srsearch=';
    _apiFormat = '&format=json';
    _apiCorsRequests = '&origin=*';

    getResource  = async (search: string) => {
        const res = await fetch(`${this._apiBase}?${this._apiAction}${this._apiList}${this._apiSrsearch}${search}${this._apiFormat}${this._apiCorsRequests}`);

        if(!res.ok) {
            throw new Error(
                `Could not fetch ${this._apiBase}?${this._apiAction}${this._apiList}${this._apiSrsearch}${search}${this._apiFormat}${this._apiCorsRequests}, received ${res.status}`
            )
        }

        return await res.json();
    };

    getArticles = (search: string, callback: any) => {
        this.getResource(search).then((resArticles) => {
            const articles =  resArticles.query.search.map(this._transformArticles);
            callback(articles);
        });
    };

    _transformArticles = (article: any) => {
        return {
            title: article.title,
            wordcount: article.wordcount,
            timestamp: article.timestamp,
            snippet: article.snippet
        }
    };
};
