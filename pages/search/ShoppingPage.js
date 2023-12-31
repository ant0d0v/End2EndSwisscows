import  Pagination  from "../../components/Pagination.js";
const { expect, context } = require("@playwright/test");
import  ShopFilters  from "../../components/shopping/ShopFilters.js";
import  BasePage from "../../base/BasePage.js";

export default class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.shopFilters = new ShopFilters(page);
  }
}
