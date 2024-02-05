import BasePage from "../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import ImagesFilters from "../../components/(search)/images/Images.Filters.js";
import ImagesRelatedQueries from "../../components/(search)/images/Images.RelatedQueries.js";
import ImagesView from "../../components/(search)/images/Images.View.js";
import ProductAds from "../../components/(search)/ads/ProductAds.js";
import Header from "../../components/(search)/Header.js";

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
