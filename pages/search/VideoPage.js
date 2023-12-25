import { BasePage } from "../../base/BasePage.js";
import { Filters } from "../../components/Filters.js";
const { expect, context } = require("@playwright/test");

export class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
  }
}
