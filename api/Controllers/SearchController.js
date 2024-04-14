const { expect, test } = require("@playwright/test");
import RequestHolder from "../RequestHolder";
import WebSearchApiRequest from "../Models/WebSearchApiRequest";
import NewsSearchApiRequest from "../Models/NewsSearchApiRequest";
import ImagesSearchApiRequest from "../Models/ImagesSearchApiRequest ";
import VideoSearchApiRequest from "../Models/VideoSearchApiRequest";
import ShoppingSearchApiRequest from "../Models/ShoppingSearchApiRequest";
import MusicSearchApiRequest from "../Models/MusicSearchApiRequest";
import SearchResponse from "../Models/SearchResponse";


export default class SearchController extends RequestHolder {
  constructor(request) {
    super(request)
    this.webSearchApiRequest = new WebSearchApiRequest(request)
    this.newsSearchApiRequest = new NewsSearchApiRequest(request)
    this.imagesSearchApiRequest = new ImagesSearchApiRequest(request)
    this.videoSearchApiRequest = new VideoSearchApiRequest(request)
    this.shoppingSearchApiRequest = new ShoppingSearchApiRequest(request)
    this.musicSearchApiRequest = new MusicSearchApiRequest(request)
    this.response = new SearchResponse(request)
  }
  async sendGet(endpoint, searchBuilder) {
     return await test.step(`Send GET request for ${endpoint} endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + endpoint, searchBuilder.build());
      return response;
    });
  }
}