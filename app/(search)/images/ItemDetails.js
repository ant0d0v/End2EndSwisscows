import BaseComponent from "../../../base/BaseComponent";
import Item from "../../(search)/images/Item";
const { expect } = require("@playwright/test");

export default class ItemDetails extends BaseComponent {
  constructor(page) {
    super(page);
    this.item = new Item(page);
    //Locators
    this.bookmarkButton = this.page.locator("figure button.bookmark")

  }
  //Actions
  clickBookmarkButtonAndGetResponse = async () => {
    let response;
    const responsePromise = this.page.waitForResponse(`${ process.env.API_URL}/v4/user/images`)
    await this.clickElement(this.bookmarkButton,
      `bookmark button of image`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };
  //Verify

  expectFirstTrackFavoriteButtonIsActive = async () => {
    await this.expectAttributeClassOfElement(this.favoriteButton, /active/)
  };
}
