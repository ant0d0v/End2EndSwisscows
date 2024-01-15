import BasePage from "../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import ImagesFilters from "../../components/images/Images.Filters.js";
import ImagesRelatedQueries from "../../components/images/Images.RelatedQueries.js";
import ImagesView from "../../components/images/Images.View.js";
import ProductAds from "../../components/ads/Ads.Product.js";
import Header from "../../components/Header.js";

export default class ImagePage extends BasePage {
  constructor(page) {
    super(page);
    this.imagesFilters = new ImagesFilters(page);
    this.imagesRelatedQueries = new ImagesRelatedQueries(page);
    this.imagesView = new ImagesView(page);
    this.productAds = new ProductAds(page);
    this.header  = new Header(page);
  }
}
