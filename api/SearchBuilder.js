const { expect, test } = require("@playwright/test");

export class SearchBuilder {
    constructor() {
      this.search = {
        headers: {},
        params: {},
    };
    }
    setHeaders(Nonce, Signature) {
      this.search.headers["X-Request-Nonce"] = Nonce;
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
    setFreshnessParam(freshness){
      this.search.params.freshness = freshness;
      return this;
    }
    setAspectParam(aspect ){
      this.search.params.aspect  = aspect ;
      return this;
    }
    setSizeParam(size ){
      this.search.params.size  = size ;
      return this;
    }
    setColorParam(color){
      this.search.params.color = color ;
      return this;
    }
    setTypeParam(type){
      this.search.params.type = type ;
      return this;
    }
    setContentParam(content){
      this.search.params.content = content ;
      return this;
    }
    setLicenseParam(license){
      this.search.params.license = license ;
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

     // Verify

  async expectResponseToHaveStatusCode(response, code) {
    await test.step(`Expect status code ${code} `, async () => {
      expect(response.status()).toBe(code);
    })
  }
  async expectResponseToBeFalsy(response) {
    await test.step(`Expect status code to be falsy  `, async () => {
      expect(response.ok()).toBeFalsy();
    })
  }
 
}