import BasePage  from "./BasePage";
const { expect, context, test} = require('@playwright/test');

export default class BaseComponent extends BasePage {
  constructor(page) {
    super(page);
  }
  //Actions
  async swipeLeft(firstElement, lastElement) {
    await test.step(`Swipe left}`, async () => {
      await firstElement.dragTo(lastElement);
    })
    .catch(async (e) => await this.errorHandling(e, this.page));
  }
  //Verify
}
