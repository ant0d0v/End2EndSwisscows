import AppPage from "../../base/AppPage.js";
const { expect, context } = require("@playwright/test");
import ImagesFilters from "../../components/images/Images.Filters.js";
import ImagesRelatedQueries from "../../components/images/Images.RelatedQueries.js";
import ImagesView from "../../components/images/Images.View.js";
import ProductAds from "../../components/ads/Ads.Product.js";

export default class ImagePage extends AppPage {
  constructor(page) {
    super(page);
    this.imagesFilters = new ImagesFilters(page);
    this.imagesRelatedQueries = new ImagesRelatedQueries();
    this.imagesView = new ImagesView();
    this.productAds = new ProductAds(page);
  }
}
