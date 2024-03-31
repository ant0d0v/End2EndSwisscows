import BaseComponent from "../../../base/BaseComponent";
const { expect, request} = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.imageItems = this.page.locator("figure.item--image:nth-child(-n+10)")
    this.item = (index) => this.page.locator("figure.item--image").nth(index - 1)
  }
  //Actions
  expectImageItemsToBeVisible = async () => {
    await this.page.waitForSelector("figure.item--image",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.imageItems)
  };

  deleteImageFromFavorite = async (id, data) => {
    const context = await request.newContext()
    await context.delete(`${ process.env.API_URL}/v4/user/images/${id}`,{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${data["origins"][0]["localStorage"][0]["value"]}`,
    },
   });
  }
  clickItemNumber = async (index) => {
    await this.clickElement(this.item(index),
      `item with index${index}`
    );
  };

}
