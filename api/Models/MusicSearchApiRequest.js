import SearchRequestBase from "./SearchRequestBase.js"
export default class MusicSearchApiRequest extends SearchRequestBase{
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
    setRegion(region) {
        this.search.params['region'] = region; 
        return this;
    }
}