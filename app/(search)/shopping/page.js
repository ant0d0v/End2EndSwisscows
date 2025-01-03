import Pagination from "../../../components/Pagination.js";
import Filters from "./Filters.js";
import Offer from "./Offer.js";
import Details from "./Details.js";
import Item from "./Item.js";
import Error from "../Error.js";

import BasePage from "../../../base/BasePage.js";
import Header from "../Header.js";
import Skeleton from "./Skeleton.js";

export default class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
    this.offer = new Offer(page);
    this.details = new Details(page);
    this.item = new Item(page);
    this.header = new Header(page);
    this.error = new Error(page);
    this.skeleton = new Skeleton(page);
    //Locators
    this.root = this.page.locator(`.shopping-results`);
    this.images = this.page.locator(`.product img`);
  }
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.images);
  };
}
