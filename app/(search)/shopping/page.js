import  Pagination  from "../../../components/Pagination.js";
const { expect, context } = require("@playwright/test");
import Filters from "../../../components/(search)/shopping/Filters.js";
import Offer from "../../../components/(search)/shopping/Offer.js";
import Details from "../../../components/(search)/shopping/Details.js";
import Item from "../../../components/(search)/shopping/Item.js";
import BasePage from "../../../base/BasePage.js";
import Header from "../../../components/(search)/Header.js";

export default class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagination = new Pagination(page);
    this.filters = new Filters(page);
    this.offer = new Offer(page);
    this.details = new Details(page);
    this.item = new Item(page);
    this.header  = new Header(page);
  }
}
