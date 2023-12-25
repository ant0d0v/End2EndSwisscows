import { Pagination } from "../../components/Pagination.js";
import { Filters } from "../../components/Filters.js";
import { Ads } from "../../components/Ads.js";
import { BasePage } from "../../base/BasePage.js";

export class WebPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
    this.ads = new Ads(page);
  }
  expectWebItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.webItems);
    return this;
  };
}
