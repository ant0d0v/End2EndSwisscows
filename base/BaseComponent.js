import { expect, test } from "../utils/customMatchers.js";
import PageHolder from "./PageHolder.js";

export default class BaseComponent extends PageHolder {
  constructor(page) {
    super(page);
  }
  //Actions
  async clickElement(element, nameElement) {
    await test.step(`Click on the ${nameElement}`, async () => {
      await element.click();
    });
  }
  async checkElement(element, nameElement) {
    await test.step(`Check on the ${nameElement}`, async () => {
      await element.check();
    });
  }
  async clickEnter(element, nameElement) {
    await test.step(`Press enter on the ${nameElement}`, async () => {
      await element.press("Enter");
    });
  }
  async clickAllElementsInList(elements, nameElements) {
    await test.step(`Click on the all ${nameElements}`, async () => {
      const count = await elements.count();
      for (let i = 0; i < count; ++i) {
        await elements.nth(i).waitFor();
        await elements.nth(i).click();
      }
    });
  }
  async getTextsOfElements(elements, nameElements) {
    return await test.step(`Get texts the all ${nameElements} `, async () => {
      return await elements.allTextContents();
    });
  }
  async clickElementAndNavigateToNewPage(element, nameElement) {
    return test.step(`Click on the ${nameElement} and navigate to new tab and wait for page to be loaded`, async () => {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        element.click(),
      ]);
      await newPage.waitForLoadState("domcontentloaded");
      return newPage;
    });
  }

  async scrollByVisibleElement(element, nameElement) {
    await test.step(`Scroll to by visible ${nameElement} on the page`, async () => {
      await element.scrollIntoViewIfNeeded();
    });
  }
  async waitElementToBeVisible(element, nameElement) {
    await test.step(`Wait ${nameElement} to be visible`, async () => {
      await element.waitFor();
    });
  }
  async input(element, text, nameElement) {
    await test.step(`Input text in to the ${nameElement}`, async () => {
      await element.pressSequentially(text, { delay: 100 });
    });
  }
  async swipeLeft(firstElement, lastElement) {
    await test.step(`Swipe left}`, async () => {
      await firstElement.dragTo(lastElement);
    });
  }

  async waitUntilElementToBeVisible(element) {
    await test.step(`Click on ${element} the until invisible`, async () => {
      let count = 0;
      for (count; count <= 8; count++) {
        if (await element.isVisible()) {
          return true;
        } else {
          await this.page.reload("domcontentloaded");
          await this.page.waitForLoadState("networkidle");
        }
      }
    });
  }

  async clickElementUntilInvisible(element) {
    await test.step(`Click on ${element} the until invisible`, async () => {
      while ((await element.isEnabled()) && (await element.isVisible())) {
        await element.click();
      }
    });
  }

  // Verify
  async expectToBeOpenedNewPageAfterClick(locator, expectedUrl) {
    return test.step(`Click on the ${locator} and navigate to new tab and wait for page to be loaded`, async () => {
      await expect(locator).toBeOpenedNewPage(expectedUrl);
    });
  }
  async expectNewPageNotToHaveUrlAfterClick(locator, expectedUrl) {
    return test.step(`Click on the ${locator} and navigate to new tab and page not to have url `, async () => {
      await expect(locator).newPageNoToHaveURL(expectedUrl);
    });
  }

  async expectElementToHaveText(element, text) {
    await test.step('Expect the Element(s) "to have" a string', async () => {
      await expect(element).toHaveText(text);
    });
  }

  async expectElementToHaveValue(element, value) {
    await test.step('Expect the Element "to have" a value', async () => {
      await expect(element).toHaveValue(value);
    });
  }
  async expectElementToHaveJSProperty(element, property, value) {
    await test.step(`Expect the Element to Have JS ${property} a ${value}`, async () => {
      await expect(element).toHaveJSProperty(property, value);
    });
  }
  async expectElementsToHaveJSProperty(elements, property, value) {
    await test.step(`Expect the Element to Have JS ${property} a ${value} in a array`, async () => {
      for (const element of await elements.all()) {
        await expect(element).toHaveJSProperty(property, value);
      }
    });
  }
  async expectElementsToHaveCSS(elements, property, value) {
    await test.step(`Expect the Elements to Have CSS ${property} a ${value} in a array`, async () => {
      for (const element of await elements.all()) {
        await expect(element).toHaveCSS(property, value);
      }
    });
  }
  async expectElementToHaveCSS(element, property, value) {
    await test.step(`Expect the Element to Have CSS ${property} a ${value} `, async () => {
        await expect(element).toHaveCSS(property, value);
    });
  }
  async expectListToHaveCount(elements, number) {
    await test.step('Expect the elements in the array to "have" a count', async () => {
      await expect(elements).toHaveCount(number);
    });
  }
  async expectListToBeGreaterThanOrEqual(elements, number) {
    await test.step('Expect the elements in the array to be greater Than Or Equal " a value', async () => {
      expect(await elements.count()).toBeGreaterThanOrEqual(number);
    });
  }

  async expectElementToBeEditable(element) {
    await test.step("Expect the element points to an editable element.", async () => {
      const locator = this.page.locator(element);
      await expect(locator).toBeEditable();
    });
  }

  async expectAttributeClassAllElements(elements, value) {
    await test.step('Expect the elements in the array to "have" attribute class with value', async () => {
      for (const attribute of await elements.all()) {
        await expect(attribute).toHaveAttribute("class", value);
      }
    });
  }
  async expectAttributeClassOfElement(element, value) {
    await test.step('Expect the element  to "have" attribute class with value ', async () => {
      await expect(element).toHaveAttribute("class", value);
    });
  }
  async expectAttributeToHaveValue(element, attribute, value) {
    await test.step(`Expect the element  to "have" attribute ${value} with value `, async () => {
      await expect(element).toHaveAttribute(attribute, value);
    });
  }
  async expectElementToBeVisible(element) {
    await test.step('Expect the element  to "be" visible', async () => {
      await expect(element).toBeVisible();
    });
  }
  async expectElementToBeHidden(element) {
    await test.step('Expect the element  to "be" hidden', async () => {
      await expect(element).toBeHidden();
    });
  }

  async expectAreElementsInListDisplayed(elements) {
    await test.step('Expect the element in the array to "be" visible', async () => {
      for (const element of await elements.all()) {
        await expect(element).toBeVisible();
      }
    });
  }
  async expectAreElementsToBeVisible(elements) {
    await test.step('Expect the element in the array to "be" visible', async () => {
      const imageElements = await elements.all();
      for (const image of imageElements) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).not.toHaveJSProperty("naturalWidth", 0);
      }
    });
  }
  async expectTextsToContains(elements, criteria) {
    await test.step('Expect the elements in the array "to contain" a string', async () => {
      for (const element of await elements.all()) {
        await expect(element).toContainText(criteria);
      }
    });
  }
  async expectTextToContain(element, criteria) {
    await test.step('Expect the element in "to contain" a string', async () => {
      await expect(element).toContainText(criteria);
    });
  }
  async expectOldArrayNotToEqualNewArray(oldResult, newResult) {
    await test.step("Expect the elements in the  old array not to equal elements in new array", async () => {
      expect(await oldResult).not.toEqual(
        expect.arrayContaining(await newResult)
      );
    });
  }
  async expectOldArrayToEqualNewArray(oldResult, newResult) {
    await test.step("Expect the elements in the  old array not to equal elements in new array", async () => {
      expect(await oldResult).toEqual(expect.arrayContaining(await newResult));
    });
  }

  async expectTextsToContainSearchCriteria(elements, criteria) {
    await test.step('Expect the elements in the array "to contain" a string', async () => {
      for (const element of await elements.all()) {
        const elementText = await element.textContent();
        expect(await elementText.toLowerCase()).toContain(criteria);
      }
    });
  }
  async expectListElementsNotToBeEmpty(elements) {
    await test.step(`Expect the ${elements} in the array not to be empty`, async () => {
      for (const element of await elements.all()) {
        await expect(element).not.toBeEmpty();
      }
    });
  }
  async expectElementNotToBeEmpty(element) {
    await test.step(`Expect the ${element} to be empty`, async () => {
      await expect(element).not.toBeEmpty();
    });
  }
  async expectElementToBeInViewport(element) {
    await test.step(`Expect the ${element} to be in Viewport`, async () => {
      await expect(element).toBeInViewport();
    });
  }
  async expectPageElementToHaveScreenshot(locator, elements, testInfo) {
    await test.step("Expects screen to be equal to the snapshot element of page", async () => {
      testInfo.snapshotSuffix = "";
      const imageElements = await elements.all();
      for (const image of imageElements) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).not.toHaveJSProperty("naturalWidth", 0);
      }
      await expect(locator).toHaveScreenshot(`${testInfo.title}.png`);
    });
  }
}
