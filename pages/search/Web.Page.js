import Pagination from "../../components/Pagination.js";
import WebFilters from "../../components/web/Web.Filters.js";
import WebRelatedSearches from "../../components/web/Web.RelatedSearches.js";
import AdsProduct from "../../components/ads/Ads.Product.js";
import VideoWidget from "../../components/video/Video.Widget.js";
import ImagesWidget from "../../components/images/Images.Widget.js";
import NewsWidget from "../../components/news/News.Widget.js";
import AdsText from "../../components/ads/Ads.Text.js";
import BasePage from "../../base/BasePage.js";

export default class WebPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.webFilters = new WebFilters(page);
    this.adsProduct = new AdsProduct(page);
    this.adsText = new AdsText(page);
    this.WebRelatedSearches = new WebRelatedSearches(page);
    this.videoWidget = new VideoWidget(page);
    this.imagesWidget = new ImagesWidget(page);
    this.newsWidget = new NewsWidget(page);
  }
  expectWebItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.webItems);
    return this;
  };
}
