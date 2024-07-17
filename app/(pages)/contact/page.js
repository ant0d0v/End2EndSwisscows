import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
import { expect, test } from "@playwright/test";
const testData = JSON.parse(
  JSON.stringify(require("../../../data/pages/contact/testData.json"))
);

export default class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);

    //Locators
    this.allImages = this.page.locator("main.contact img:visible");
    this.sendButton = this.page.getByRole("button", { name: "Send" });
    this.allContent = this.page.locator("main.contact");
    this.checkbox = page.getByLabel("I agree that my data will be");
    this.formFields = (id) => this.page.getByPlaceholder(`${id}`);
    this.privacyLink = this.page.getByRole("link", { name: "privacy policy" });
    this.successMessage = this.page.getByRole("heading", {
      name: "Thank you for contacting us!",
    });
    this.agreeCheckbox = this.page.getByLabel("I agree that my data will be");
    this.backToSearchButton = this.page.getByRole("link", {
      name: "Back to search",
    });
  }
  //Actions
  async open() {
    await this.openPage("/contact");
  }
  async clickSendButton() {
    await this.clickElement(this.sendButton, `Send button`);
  }
  async clickBackToSearchButton() {
    await this.clickElement(this.backToSearchButton, `Back to search button`);
  }
  async checkAgreeCheckbox() {
    await this.checkElement(this.checkbox, `Agree checkbox`);
  }

  async inputYouNameField(text) {
    await this.waitUntilPageIsFullyLoaded();
    await this.input(
      this.formFields(testData.formFields[0].yourName),
      text,
      `Your name field`
    );
  }
  async inputEmailField(text) {
    await this.input(
      this.formFields(testData.formFields[1].email),
      text,
      `Email field`
    );
  }
  async inputMessageField(text) {
    await this.input(
      this.formFields(testData.formFields[2].yourMessage),
      text,
      `Message field`
    );
  }

  //Assert

  async expectBorderColorFormField(id, expectedValue) {
    await test
      .step('Expect the element to "have" css color with value', async () => {
        await expect(this.formFields(id)).toHaveCSS("border", expectedValue);
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
  expectSuccessMessage = async () => {
    await this.expectElementToBeVisible(this.successMessage);
  };
  expectAgreeCheckboxToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(
      this.agreeCheckbox,
      "validity.valueMissing",
      true
    );
    await this.expectElementToHaveJSProperty(
      this.agreeCheckbox,
      "validationMessage",
      value
    );
  };
}
