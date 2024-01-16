import  Pagination  from "../../components/Pagination.js";
const { expect, context } = require("@playwright/test");
import ShoppingFilters from "../../components/shopping/Shopping.Filters.js";
import ShoppingOffer from "../../components/shopping/Shopping.Offer.js";
import ShoppingDetails from "../../components/shopping/Shopping.Details.js";
import BasePage from "../../base/BasePage.js";
import Header from "../../components/Header.js";

export default class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.shoppingFilters = new ShoppingFilters(page);
    this.shoppingOffer = new ShoppingOffer(page);
    this.shoppingDetails = new ShoppingDetails(page);
    this.header  = new Header(page);
  }
}
