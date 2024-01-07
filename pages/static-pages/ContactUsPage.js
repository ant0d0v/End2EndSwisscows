import AppPage from "../../base/AppPage";
import HeaderStaticPages from "../../components/HeaderStaticPages";
const { expect, test } = require("@playwright/test");
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/contact-page/testData.json"))
);

export default class ContactUsPage extends AppPage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.sendButton = this.page.getByRole("button", { name: "Send" });
    this.formFields = (id) => this.page.getByPlaceholder(`${id}`);
    this.privacyLink = this.page.getByRole("link", { name: "privacy policy" });
    this.agreeCheckbox = this.page.getByLabel("I agree that my data will be");
  }
  //Actions
  async clickSendButton() {
    await this.clickElement(this.sendButton, `Send button`);
  }
  async checkAgreeCheckbox() {
    await this.checkElement(this.sendButton, `Agree checkbox`);
  }
  async inputYouNameField(text) {
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

  expectScreenContactUsPage = async () => {
    await this.expectScreenOfPageWithoutMask();
  };
}
