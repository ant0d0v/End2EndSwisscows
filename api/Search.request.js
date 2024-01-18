const { expect, test } = require("@playwright/test");
import SearchBuilder from "./Search.Builder"


export default class SearchRequest {
  constructor(request) {
    this.request = request;
    this.searchBuilder = new SearchBuilder()
  }
  // Action
  async sendMusicRequestMethodGet(searchBuilder) {
    return await test.step(`Send GET request for /music endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + "/audio/search/tracks", searchBuilder);
      return response;
    });
  }
  async sendShoppingRequestMethodGet(searchBuilder) {
    return await test.step(`Send GET request for /shopping endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + "/shopping/search", searchBuilder);
      return response;
    });
  }
  async sendVideoRequestMethodGet(searchBuilder) {
    return await test.step(`Send GET request for /video endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + "/v2/videos/search", searchBuilder);
      return response;
    });
  }
  async sendImagesRequestMethodGet(searchBuilder) {
    return await test.step(`Send GET request for /images endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + "/image/search", searchBuilder);
      return response;
    });
  }
  async sendWebRequestMethodGet(searchBuilder) {
    return await test.step(`Send GET request for /web endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + "/web/search", searchBuilder);
      return response;
    });
  }
}
