import BasePage from "../../../base/BasePage.js";
import RelatedQueries from "./RelatedQueries.js";
import Details from "./ImageObjectDetails.js";
import Item from "./ImageObject.js";
import AdvertiserProductCollection from "../web/AdvertiserProductCollection.js";
import Header from "../Header.js";
import Error from "../Error.js";
import AdsFreePopup from "../AdsFreePopup.js"

export default class ImagePage extends BasePage {
  constructor(page) {
    super(page);

    this.relatedQueries = new RelatedQueries(page);
    this.details = new Details(page);
    this.item = new Item(page);
    this.advertiserProductCollection = new AdvertiserProductCollection(page);
    this.header = new Header(page);
    this.error = new Error(page);
    this.adsFreePopup = new AdsFreePopup(page)

    //Locators
    this.root = this.page.locator(`.images-results`);
    this.images = this.page.locator(`.image-object img`);
  }
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.images);
  };
}
