import  Pagination  from "../../components/Pagination.js";
const { expect, context } = require("@playwright/test");
import ShoppingFilters from "../../components/shopping/Shopping.Filters.js";
import ShoppingOffer from "../../components/shopping/Shopping.Offer.js";
import ShoppingDetails from "../../components/shopping/Shopping.Details.js";
import AppPage from "../../base/AppPage.js";

export default class ShoppingPage extends AppPage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.shoppingFilters = new ShoppingFilters(page);
    this.shoppingOffer = new ShoppingOffer(page);
    this.shoppingDetails = new ShoppingDetails(page);
  }
}
