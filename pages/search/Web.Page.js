import Pagination from "../../components/Pagination.js";
import WebFilters from "../../components/web/Web.Filters.js";
import WebRelatedSearches from "../../components/web/Web.RelatedSearches.js";
import AdsProduct from "../../components/ads/Ads.Product.js";
import VideoWidget from "../../components/video/Video.Widget.js";
import Header from "../../components/Header.js";
import ImagesWidget from "../../components/images/Images.Widget.js";
import NewsWidget from "../../components/news/News.Widget.js";
import AdsText from "../../components/ads/Ads.Text.js";
import Preloader from "../../components/Preloader.js";
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
    this.header  = new Header(page);
    this.preloader  = new Preloader(page);


    this.webItems = this.page.locator("article.item-web h2")
  }
  expectWebItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item-web h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.webItems)
  };
}
