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
  async waitElementToBeVisible(element) {
    await test.step(`Click on ${element} the until invisible`, async () => {
      let count = 0
      for(count; count < 10; count++ ){
      if(await element.isVisible()) {
        return true
      }else{
        await this.page.reload("domcontentloaded");
        await this.waitUntilPageIsFullyLoaded()
      }
    }
    })
  }

  async clickElementUntilInvisible(element) {
    await test.step(`Click on ${element} the until invisible`, async () => {
      while(await element.isEnabled() && await element.isVisible()) {
        await element.click();
      }
    })
  }


  //Verify
  async expectOldArrayNotToEqualNewArray(oldResult, newResult) {
    await test.step('Expect the elements in the  old array not to equal elements in new array', async () => {
      expect(await oldResult).not.toEqual(expect.arrayContaining(await newResult))
    });
  }
  async expectOldArrayToEqualNewArray(oldResult, newResult) {
    await test.step('Expect the elements in the  old array not to equal elements in new array', async () => {
      expect(await oldResult).toEqual(expect.arrayContaining(await newResult))
    });
  }

  async expectTextsToContainSearchCriteria(elements, criteria) {
    await test.step('Expect the elements in the array "to contain" a string', async () => {
      for (const element of await elements.all()) {
        const elementText = await element.textContent();
        expect(await elementText.toLowerCase()).toContain(criteria.toLowerCase());
      }
    });
  }
}
