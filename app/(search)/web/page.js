import Pagination from "../../../components/Pagination.js";
import Filters from "./Filters.js";
import Item from "./Item.js";
import AlternateSearch from "./AlternateSearch.js";
import RelatedSearches from "./RelatedSearches.js";
import AdsProduct from "../ads/ProductAds.js";
import VideoCollection from "./VideoCollection.js";
import Header from "../Header.js";
import ImagesWidget from "../images/Widget.js";
import NewsCollection from "./NewsCollection.js";
import AdsText from "../ads/TextAds.js";
import Preview from "./Preview.js";
import Error from "../Error.js";
import Preloader from "../../../components/Preloader.js";
import BasePage from "../../../base/BasePage.js";
import Footer from "../../../app/(search)/Footer.js";

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
    this.videoCollection = new VideoCollection(page);
    this.imagesWidget = new ImagesWidget(page);
    this.newsCollection = new NewsCollection(page);
    this.header  = new Header(page);
    this.error = new Error(page)
    this.preloader  = new Preloader(page);
    this.footer  = new Footer(page);
    this.preview  = new Preview(page);
    
    //Locators
   this.previewButton = this.page.getByRole('button', { name: 'preview' }).first()
  }
  //Actions
  async openNotFound(path){
    await this.openPage(path)
  }
  clickItemNumber = async (index) => {
    return await this.clickElement(this.item.title(index),
      `${index} web item in search result`
    );
  };

  clickPreviewButton = async () => {
    await this.clickElement(this.previewButton, `preview button`);
  };

  // Verify
  
}
