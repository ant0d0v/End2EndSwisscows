import BasePage from "../../../base/BasePage.js";
import Filters from "./Filters.js";
import RelatedQueries from "./RelatedQueries.js";
import ItemDetails from "./ItemDetails.js";
import Item from "./Item.js";
import AdsProduct from "../ads/ProductAds.js";
import AdsText from "../ads/TextAds.js";
import Header from "../Header.js";
import Error from "../Error.js";

export default class ImagePage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
    this.relatedQueries = new RelatedQueries(page);
    this.itemDetails = new ItemDetails(page);
    this.item = new Item(page);
    this.adsProduct = new AdsProduct(page);
    this.adsText = new AdsText(page);
    this.header  = new Header(page);
    this.error = new Error(page)
    //Locators
    this.favoriteItem = this.page.getByRole('link', { name: 'My images' })

  }
  //Actions
  clickFavoriteItem = async () => {
    await this.clickElement( this.favoriteItem,
      `favorite item`
    );
  };
}
