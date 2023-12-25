import { BasePage } from "../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import { Filters } from "../../components/Filters.js";
import { Ads } from "../../components/Ads.js";

export class ImagePage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
    this.ads = new Ads(page);
  }
}
