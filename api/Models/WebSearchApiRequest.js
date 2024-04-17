import SearchRequestBase from "./SearchRequestBase"
export default class WebSearchApiRequest extends SearchRequestBase{
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
    setFreshness(freshness){
        this.search.params['freshness'] = freshness;
        return this;
    }
    setSpellcheck(spellcheck){
        this.search.params['spellcheck']  = spellcheck;
        return this;
    }
}