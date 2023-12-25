import { Pagination } from "../../components/Pagination.js";
const { expect, context } = require("@playwright/test");
import { Filters } from "../../components/Filters.js";
import { BasePage } from "../../base/BasePage.js";

export class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
  }
}
