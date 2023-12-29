import { BasePage } from "../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import { ImageFilters } from "../../components/images/ImageFilters.js";
import { Ads } from "../../components/Ads.js";

export class ImagePage extends BasePage {
  constructor(page) {
    super(page);
    this.imageFilters = new ImageFilters(page);
    this.ads = new Ads(page);
  }
}
