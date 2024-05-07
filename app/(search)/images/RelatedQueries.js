import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class RelatedQueries extends BaseComponent {
  constructor(page) {
    super(page);
     //Locators
     this.favoriteItem = this.page.getByRole('link', { name: 'My images' })
  }
  //Actions
  

  //Verify
  expectFavoriteItemToHaveText = async (value) => {
    await this.expectElementToHaveText(this.favoriteItem,value)
  }
  expectFavoriteItemToBeHidden = async () => {
    await this.expectElementToBeHidden(this.favoriteItem)
  }
  expectFavoriteItemToBeVisible = async () => {
    await this.expectElementToBeVisible(this.favoriteItem)
  }

}
