import Pagination from "../../components/Pagination.js";
import Filters from "../../components/(search)/web/Filters.js";
import Item from "../../components/(search)/web/Item.js";
import AlternateSearch from "../../components/(search)/web/AlternateSearch.js";
import RelatedSearches from "../../components/(search)/web/RelatedSearches.js";
import AdsProduct from "../../components/(search)/ads/ProductAds.js";
import VideoWidget from "../../components/(search)/video/Widget.js";
import Header from "../../components/(search)/Header.js";
import ImagesWidget from "../../components/(search)/images/Widget.js";
import NewsWidget from "../../components/(search)/news/Widget.js";
import AdsText from "../../components/(search)/ads/TextAds.js";
import Preloader from "../../components/Preloader.js";
import BasePage from "../../base/BasePage.js";

export default class WebPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
    this.item = new Item(page);
    this.alternateSearch = new AlternateSearch(page);
    this.adsProduct = new AdsProduct(page);
    this.adsText = new AdsText(page);
    this.relatedSearches = new RelatedSearches(page);
    this.videoWidget = new VideoWidget(page);
    this.imagesWidget = new ImagesWidget(page);
    this.newsWidget = new NewsWidget(page);
    this.header  = new Header(page);
    this.preloader  = new Preloader(page);
  }
  
}
