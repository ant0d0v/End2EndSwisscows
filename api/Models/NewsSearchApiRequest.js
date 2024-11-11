import SearchRequestBase from "./SearchRequestBase.js"
export default class NewsSearchApiRequest extends SearchRequestBase{
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

    setFreshness(freshness){
        this.search.params['freshness'] = freshness;
        return this;
    }
    
    setRegion(region) {
        this.search.params['region'] = region; 
        return this;
    }
    setLanguage(language){
        this.search.params['language'] = language;
        return this;
    }
    setSortOrder(sortOrder){
        this.search.params['sortOrder']  = sortOrder;
        return this;
    }
    setSortBy(sortBy){
        this.search.params['sortBy']  = sortBy;
        return this;
    }  
}