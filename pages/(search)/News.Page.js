import Pagination from "../../components/Pagination.js";
import BasePage from "../../base/BasePage.js";
import Filters from "../../components/(search)/news/Filters.js";
import Item from "../../components/(search)/news/Item.js";
import Header from "../../components/(search)/Header.js";
const { expect, context } = require("@playwright/test");

export default class NewsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page)
    this.item = new Item(page)
    this.header  = new Header(page);
  }
}
