const { expect, context, test} = require('@playwright/test');

export default class BasePage {
  constructor(page) {
    this.page = page;
    this.h1Text = (page) => page.locator("//h1");
    this.appLinksInFooter = (page) => page.locator('//div[contains(@class, "app") and contains(@class, "mobile")]')
  }
  /**
   * The function "errorHandling" throws an error message with details about the test failure,
   * including the page URL, error type, error message, and stack trace.
   * @param error - The `error` parameter is the error object that was thrown or caught in your code.
   * It contains information about the error, such as its name, message, and stack trace.
   * @param page - The `page` parameter is an object that represents a web page in a browser. It likely
   * has properties and methods related to interacting with the page, such as `url()` which returns the
   * URL of the page.
   */
  async errorHandling(error, page) {
    const exceptionMessage = new Error(`
     *************************************
     \x1b[31m*TEST FAILED*\x1b[0m
     Test execution fails on Page with URL: \x1b[31m${page.url()}\x1b[0m,
     ERROR TYPE: \x1b[31m${error.name}\x1b[0m,
     MESSAGE: \x1b[31m${error.message}\x1b[0m,
     STACK TRACE: \x1b[31m${error.stack}\x1b[0m,
     *************************************`);
    throw exceptionMessage;
  }

  //Actions

  async clickElement(element, nameElement) {
    await test.step(`Click on the ${nameElement}`, async () => {
        await element.click();
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async checkElement(element, nameElement) {
    await test.step(`Check on the ${nameElement}`, async () => {
        await element.check();;
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async clickEnter(element, nameElement) {
    await test.step(`Press enter on the ${nameElement}`, async () => {
        await element.press("Enter");
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async clickAllElementsInList(elements, nameElements) {
    await test.step(`Click on the all ${nameElements}`, async () => {
      const count = await elements.count();
         for (let i = 0; i < count; ++i){
          await elements.nth(i).waitFor()
          await elements.nth(i).click();
        }
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async getTextsOfElements(elements, nameElements) {
    return await test.step(`Get texts the all ${nameElements} `, async () => {
        return await elements.allTextContents();
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async clickElementAndNavigateToNewPage(element, nameElement) {
    return test.step(`Click on the ${nameElement} and navigate to new tab and wait for page to be loaded`,
        async () => {
          const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            element.click(),
          ]);
          await newPage.waitForLoadState("domcontentloaded");
          return newPage;
        }
      )
      .catch(async (e) => await this.errorHandling(e, this.page));
  }

  async scrollByVisibleElement(element, nameElement) {
    await test.step(`Scroll to by visible ${nameElement} on the page`, async () => {
        await element.scrollIntoViewIfNeeded();
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async waitElementToBeVisible(element, nameElement) {
    await test.step(`Wait ${nameElement} to be visible`, async () => {
        await element.waitFor();
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async reloadPage() {
    await test.step("Refresh current page", async () => {
        await this.page.reload("domcontentloaded");
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async input(element, text, nameElement) {
    await test.step(`Input text in to the ${nameElement}`, async () => {
        await element.type(text, { delay: 100 });
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async waitForUrlContains(Url) {
    await test.step(`Wait for url ${Url}`, async () => {
        await this.page.waitForURL(Url);
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }

  async selectOption(element, text) {
    await test.step( "Waits until all specified options are present in the <select> element and selects these options. ",
        async () => {
          await element.selectOption(text);
        }
      )
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async goBack() {
    await test.step("Navigate to the previous page in history.", async () => {
        await this.page.goBack();
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async waitUntilPageIsFullyLoaded() {
    await test.step("Wait for all network requests for images to complete",
        async () => {
          await await this.page.waitForLoadState("networkidle");
        }
      )
      .catch(async (e) => await this.errorHandling(e, this.page));
  }

  // Verify

  async expectHaveTitle(newPage, title) {
    await test.step('Expect a title "to have" a substring', async () => {
      await expect(newPage).toHaveTitle(title);
    });
  }

  async expectHaveUrl(newPage, url) {
    await test.step('Expect a URL "to have" a string', async () => {
      await expect(newPage).toHaveURL(url);
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
  async expectListToHaveCount(elements, number) {
    await test
      .step('Expect the elements in the array to "have" a count', async () => {
        await expect(elements).toHaveCount(number);
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  
  async expectElementToBeEditable(element) {
    await test.step("Expect the element points to an editable element.", async () => {
      const locator = this.page.locator(element);
      await expect(locator).toBeEditable();
    });
  }
  async expectColorsLinksWhenHovering(elements, color, expectedValue) {
    await test.step('Expect the elements in the array to "have" css color with value',
      async () => {
        for (const link of await elements.all()) {
            if (link.isEnabled()) {
              await link.hover();
              await expect(link).toHaveCSS(color, expectedValue);
            }
          }
        }
      ).catch(async (e) => await this.errorHandling(e, this.page));
  }

  async expectColorLinkWhenHovering(element, color, expectedValue) {
    await test.step('Expect the element to "have" css color with value',
      async () => {
        await element.hover();
        await expect(element).toHaveCSS(color, expectedValue);
      }
    ).catch(async (e) => await this.errorHandling(e, this.page));
  }

  async expectAttributeClassAllElements(elements, value) {
    await test.step('Expect the elements in the array to "have" attribute class with value', async () => {
      for (const attribute of await elements.all()) {
        await expect(attribute).toHaveAttribute("class", value);
      }
    });
  }
  async expectAttributeClassOfElement(element, value) {
    await test.step('Expect the element  to "have" attribute class with value ',
        async () => {
          await expect(element).toHaveAttribute("class", value);
        }
      )
      .catch(async (e) => await this.errorHandling(e, this.page));
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
      for (const image of await elements.all()) {
        await expect(image).toBeVisible();
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
  async expectH1Text(newPage, text) {
    await test.step('Expect the page  "to have" h1 text with text', async () => {
      await this.expectElementToHaveText(this.h1Text(newPage), text);
    });
  }
  async expectPageToHaveScreenshot(element,testInfo) {
    await test.step(`Expect screen to be equal to the snapshot of page`, async () => {  
        testInfo.snapshotSuffix = '';
        await this.waitUntilPageIsFullyLoaded();
        await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`,{
          fullPage: true,
          mask: [await element, await this.appLinksInFooter(this.page)],
        });
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
  async expectPageToHaveScreenshotWithoutMask(testInfo) {
    await test.step('Expect screen to be equal to the snapshot of page', async () => {
        testInfo.snapshotSuffix = '';
        await this.waitUntilPageIsFullyLoaded();
        await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`,{
          fullPage: true,
          mask: [
            await this.appLinksInFooter(this.page)
          ],
        });
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
}

