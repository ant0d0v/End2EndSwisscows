import BasePage from "../../../base/BasePage.js";
import RelatedQueries from "./RelatedQueries.js";
import Details from "./ImageObjectDetails.js";
import Item from "./ImageObject.js";
import AdvertiserProductCollection from "../web/AdvertiserProductCollection.js";
import Header from "../Header.js";
import Error from "../Error.js";

export default class ImagePage extends BasePage {
  constructor(page) {
    super(page);
  
    this.relatedQueries = new RelatedQueries(page);
    this.details = new Details(page);
    this.item = new Item(page);
    this.advertiserProductCollection = new AdvertiserProductCollection(page);
    this.header = new Header(page);
    this.error = new Error(page);

    //Locators

  }
  //Actions
}
