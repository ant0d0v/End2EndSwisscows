import  Pagination  from "../../../components/Pagination.js";
const { expect, context } = require("@playwright/test");
import Filters from "./Filters.js";
import Offer from "./Offer.js";
import Details from "./Details.js";
import Item from "./Item.js";
import Error from "../Error.js";

import BasePage from "../../../base/BasePage.js";
import Header from "../Header.js";

export default class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
    this.offer = new Offer(page);
    this.details = new Details(page);
    this.item = new Item(page);
    this.header  = new Header(page);
    this.error  = new Error(page);
  }
  //Actions
  
}
