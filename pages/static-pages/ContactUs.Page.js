import BasePage from "../../base/BasePage";
import HeaderStaticPages from "../../components/HeaderStaticPages";
const { expect, test } = require("@playwright/test");
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/contact-page/testData.json"))
);

export default class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.sendButton = this.page.getByRole("button", { name: "Send" });
    this.allContent = this.page.locator("main.contact");
    this.checkbox = page.getByLabel('I agree that my data will be')
    this.formFields = (id) => this.page.getByPlaceholder(`${id}`);
    this.privacyLink = this.page.getByRole("link", { name: "privacy policy" });
    this.successMessage = this.page.getByRole('heading', { name: 'Thank you for contacting us!' })
    this.agreeCheckbox = this.page.getByLabel("I agree that my data will be");
    this.backToSearchButton = this.page.getByRole('link', { name: 'Back to search' })
  }
  //Actions
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
    await this.input(this.formFields(testData.formFields[0].yourName), text,
      `Your name field`
    );
  }
  async inputEmailField(text) {
    await this.input( this.formFields(testData.formFields[1].email), text,
      `Email field`
    );
  }
  async inputMessageField(text) {
    await this.input(this.formFields(testData.formFields[2].yourMessage),text,
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

  expectScreenContactUsPage = async (testInfo) => {
    await this.expectScreenOfPageWithoutMask(testInfo);
  };
  expectSuccessMessage = async () => {
    await this.expectElementToBeVisible(this.successMessage)
  };
  expectAgreeCheckboxToHaveProperty = async (value) => {
    await this.expectHaveJSProperty(this.agreeCheckbox,'validity.valueMissing', true)
    await this.expectHaveJSProperty(this.agreeCheckbox,'validationMessage', value)
  }
}
