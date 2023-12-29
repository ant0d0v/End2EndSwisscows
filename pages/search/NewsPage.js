import { Pagination } from "../../components/Pagination.js";
import { BasePage } from "../../base/BasePage.js";
const { expect, context } = require("@playwright/test");

export class NewsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
  }
}
