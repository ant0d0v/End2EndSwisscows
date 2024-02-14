import BasePage from "../../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import Filters from "../../../components/(search)/images/Filters.js";
import RelatedQueries from "../../../components/(search)/images/RelatedQueries.js";
import ItemDetails from "../../../components/(search)/images/ItemDetails.js";
import Item from "../../../components/(search)/images/Item.js";
import ProductAds from "../../../components/(search)/ads/ProductAds.js";
import Header from "../../../components/(search)/Header.js";

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
