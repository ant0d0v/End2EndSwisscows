import Pagination from "../../components/Pagination.js";
import WebFilters from "../../components/(search)/web/Web.Filters.js";
import WebRelatedSearches from "../../components/(search)/web/Web.RelatedSearches.js";
import AdsProduct from "../../components/(search)/ads/ProductAds.js";
import VideoWidget from "../../components/(search)/video/Video.Widget.js";
import Header from "../../components/(search)/Header.js";
import ImagesWidget from "../../components/(search)/images/Images.Widget.js";
import NewsWidget from "../../components/(search)/news/News.Widget.js";
import AdsText from "../../components/(search)/ads/TextAds.js";
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
