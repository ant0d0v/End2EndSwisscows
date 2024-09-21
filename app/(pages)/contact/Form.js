import BaseComponent from "../../../base/BaseComponent.js";
import Translations from "../../../locales/n18next.js";
export default class Form extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    //Locators
    this.root = this.page.locator(".contact-form");
    this.agreement = this.root.locator(".agreement");
    this.sendButton = this.root.locator(".button");
    this.yourNameField = this.page.getByPlaceholder("Your name");
    this.emailField = this.page.getByPlaceholder("Email");
    this.yourMessageField = this.page.getByPlaceholder("Your Message");
    this.privacyLink = this.page.getByRole("link", { name: "privacy policy" });
    this.checkbox = this.page.getByLabel("I agree that my data will be");
  }
  //Actions
  async clickSendButton() {
    await this.clickElement(this.sendButton, `Send button`);
  }
  async clickPrivacyLinkAndNavigateToNewPage() {
    return await this.clickElementAndNavigateToNewPage(
      this.privacyLink,
      `Send button`
    );
  }
  async checkAgreeCheckbox() {
    await this.checkElement(this.agreement, `Agree checkbox`);
  }

  async fillContactForm(
    fields = {
      nameField: string,
      emailField: string,
      messageField: string,
    }
  ) {
    await this.page.waitForLoadState("networkidle");
    await this.input(this.yourNameField, fields.nameField, `Your name field`);
    await this.input(this.emailField, fields.emailField, `Email field`);
    await this.input(
      this.yourMessageField,
      fields.messageField,
      `Message field`
    );
  }
  // Verify

  async expectSendButtonWhenHoveringToHaveColor(color) {
    await this.expectColorLinkWhenHovering(
      this.sendButton,
      "background",
      color
    );
  }
  expectYourNameFieldToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(
      this.yourNameField,
      "validationMessage",
      value
    );
  };
  expectEmailFieldToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(
      this.emailField,
      "validationMessage",
      value
    );
  };

  expectYourMessageFieldToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(
      this.yourMessageField,
      "validationMessage",
      value
    );
  };

  expectAgreeCheckboxToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(
      this.checkbox,
      "validationMessage",
      value
    );
  };

  //Locales
  async expectTranslationsForButton(
    expected = {
      translationKey_1: value,
      locale: value,
    }
  ) {
    const expectedText = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.sendButton, expectedText);
  }

  async expectTranslationsForAgreement(
    expected = {
      translationKey_1: value,
      locale: value,
    }
  ) {
    const expectedText = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.agreement, expectedText);
  }
}
