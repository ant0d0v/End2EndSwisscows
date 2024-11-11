import { test } from "@playwright/test";
import RequestHolder from "../RequestHolder.js";
import WebSearchApiRequest from "../Models/WebSearchApiRequest.js";
import NewsSearchApiRequest from "../Models/NewsSearchApiRequest.js";
import ImagesSearchApiRequest from "../Models/ImagesSearchApiRequest.js";
import VideoSearchApiRequest from "../Models/VideoSearchApiRequest.js";
import ShoppingSearchApiRequest from "../Models/ShoppingSearchApiRequest.js";
import MusicSearchApiRequest from "../Models/MusicSearchApiRequest.js";
import SearchResponse from "../Models/SearchResponse.js";


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