import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
import Form from "./Form.js";
import Translations from "../../../i18n/index.js";

export default class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = "/contact"
    this.header = new Header(page);
    this.form = new Form(page);
    this.translations = Translations;
    //Locators
    this.root = this.page.locator(".contact");
    this.title = this.root.locator("h1");
    this.description = this.root.locator("p");
    this.images = this.root.locator("img:visible");
    this.successMessage = this.page.getByRole("heading", {
      name: "Thank you for contacting us!",
    });
    this.backToSearchButton = this.page.getByRole("link", {
      name: "Back to search",
    });
  }
  //Actions
  async clickBackToSearchButton() {
    await this.clickElement(this.backToSearchButton, `Back to search button`);
  }

  //Assert
  async expectBackToSearchButtonWhenHoveringToHaveColor(color) {
    await this.expectColorLinkWhenHovering(
      this.backToSearchButton,
      "background",
      color
    );
  }

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.images);
  };

  //Locales
  async expectTranslationsForContent(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      locale: value,
    }
  ) {
    const expectedTitle = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedDescription = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.title, expectedTitle);
    await this.expectElementToHaveText(this.description, expectedDescription);
  }
}
