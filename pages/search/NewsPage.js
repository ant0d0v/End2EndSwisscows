import Pagination from "../../components/Pagination.js";
import AppPage from "../../base/AppPage.js";
import NewsFilters from "../../components/news/News.Filters.js";
const { expect, context } = require("@playwright/test");

export default class NewsPage extends AppPage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.newsFilters = new NewsFilters(page);
  }
}
