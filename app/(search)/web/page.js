import Pagination from "../../../components/Pagination.js";
import Filters from "./Filters.js";
import WebPageItem from "./WebPageItem.js";
import AlternateSearch from "./AlternateSearch.js";
import RelatedSearches from "./RelatedSearches.js";
import VideoCollection from "./VideoCollection.js";
import Header from "../Header.js";
import NewsCollection from "./NewsCollection.js";
import Preview from "./Preview.js";
import Error from "../Error.js";
import Preloader from "../../../components/Preloader.js";
import BasePage from "../../../base/BasePage.js";
import Footer from "../../../app/(search)/Footer.js";
import AdvertiserProductCollection from "./AdvertiserProductCollection.js";
import AdvertiserProduct from "./AdvertiserProduct.js";
import Advertiser from "./AdvertiserWebPage.js";
import VideoObject from "./VideoObject.js"
import Article from "./Article.js";
import Product from "./Product.js";
import Skeleton from "./Skeleton.js";
import FAQ from "./FAQPage.js";
import Infobox from "./Infobox.js";


export default class WebPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
    this.webPageItem = new WebPageItem(page);
    this.alternateSearch = new AlternateSearch(page);
    this.advertiserProduct = new AdvertiserProduct(page);
    this.advertiser = new Advertiser(page);
    this.advertiserProductCollection = new AdvertiserProductCollection(page);
    this.relatedSearches = new RelatedSearches(page);
    this.videoCollection = new VideoCollection(page);
    this.newsCollection = new NewsCollection(page);
    this.newsCollection = new NewsCollection(page);
    this.header = new Header(page);
    this.error = new Error(page);
    this.preloader = new Preloader(page);
    this.footer = new Footer(page);
    this.preview = new Preview(page);
    this.videoObject = new VideoObject(page);
    this.article = new Article(page);
    this.product = new Product(page);
    this.skeleton = new Skeleton(page);
    this.faq = new FAQ(page)
    this.infobox = new Infobox(page);

  }
  //Actions
  async openNotFound(path) {
    await this.openPage(path);
  }
}
