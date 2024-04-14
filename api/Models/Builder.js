export default class Builder {
    constructor() {
      this.search = {
        headers: {},
        params: {},
    };
    }
    setNonceHeader(Nonce) {
      this.search.headers["X-Request-Nonce"] = Nonce;
        return this;
    }
    setSignatureHeader(Signature) {
      this.search.headers["X-Request-Signature"] = Signature;
        return this;
    }
    setQueryParam(query) {
      this.search.params.query = query;
      return this;
    }
    setOffsetParam(offset) {
      this.search.params.offset = offset;
      return this;
    }
    setItemsCountParam(count) {
      this.search.params.itemsCount = count;
      return this;
    }
    setSortParam(sort) {
      this.search.params.sort = sort;
      return this;
    }
    setRegionParam(region) {
      this.search.params.region = region; 
      return this;
    }
    setLocaleParam(locale) {
      this.search.params.locale = locale; 
      return this;
    }
    setFreshnessParam(freshness){
      this.search.params.freshness = freshness;
      return this;
    }
    setSpellcheckParam(spellcheck ){
      this.search.params.spellcheck  = spellcheck;
      return this;
    }
    setSortOrderParam(sortOrder){
      this.search.params.sortOrder  = sortOrder;
      return this;
    }
    setSortByParam(sortBy){
      this.search.params.sortBy  = sortBy;
      return this;
    }
    setLanguageParam(language){
      this.search.params.language = language;
      return this;
    }
    
    
    doCheck(){
      return (
        this.search.headers["X-Request-Nonce"] != undefined &&
        this.search.headers["X-Request-Signature"]!= undefined
      )
    }

    build() {
      const isOk = this.doCheck()
      if(isOk) {
        return this.search;
      } else {
        throw new Error("Error message: Some required headers are missing.")
      }
    }
}