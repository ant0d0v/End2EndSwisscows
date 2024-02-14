import BasePage from "../../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import Filters from "./Filters.js";
import RelatedQueries from "./RelatedQueries.js";
import ItemDetails from "./ItemDetails.js";
import Item from "./Item.js";
import ProductAds from "../ads/ProductAds.js";
import Header from "../Header.js";

export default class ImagePage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
    this.relatedQueries = new RelatedQueries(page);
    this.itemDetails = new ItemDetails(page);
    this.item = new Item(page);
    this.productAds = new ProductAds(page);
    this.header  = new Header(page);
  }
}
