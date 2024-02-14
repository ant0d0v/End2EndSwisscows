import Pagination from "../../../components/Pagination.js";
import BasePage from "../../../base/BasePage.js";
import Filters from "./Filters.js";
import Item from "./Item.js";
import Header from "../Header.js";
import Error from "../Error.js";
import ProxyImage from "../../../components/ProxyImage.js"
const { expect, context } = require("@playwright/test");

export default class NewsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page)
    this.item = new Item(page)
    this.error = new Error(page)
    this.proxyImage = new ProxyImage(page)
    this.header  = new Header(page);
  }
}
