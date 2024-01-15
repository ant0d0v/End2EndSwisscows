import Pagination from "../../components/Pagination.js";
import BasePage from "../../base/BasePage.js";
import NewsFilters from "../../components/news/News.Filters.js";
import Header from "../../components/Header.js";
const { expect, context } = require("@playwright/test");

export default class NewsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.newsFilters = new NewsFilters(page)
    this.header  = new Header(page);
  }
}
