import SearchRequestBase from "./SearchRequestBase.js"
export default class ImagesSearchApiRequest extends SearchRequestBase{
    constructor(request) {
        super(request);
    }
    setQuery(query) {
         this.search.params['query'] = query;
         return this;
    }
    setOffset(offset) {
        this.search.params['offset']= offset;
        return this;
    }
    setCount(itemsCount) {
        this.search.params['itemsCount'] = itemsCount;
        return this;
    }
    setLocale(locale) {
        this.search.params['locale'] = locale;
        return this;
    }
    setSpellcheck(spellcheck){
        this.search.params['spellcheck']  = spellcheck;
        return this;
    }
    setFreshness(freshness){
        this.search.params['freshness'] = freshness;
        return this;
    }
}