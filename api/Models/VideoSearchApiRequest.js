import SearchRequestBase from "./SearchRequestBase"
export default class VideoSearchApiRequest extends SearchRequestBase{
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
    setFreshness(freshness){
        this.search.params['freshness'] = freshness;
        return this;
    }
}