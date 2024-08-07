import BaseComponent from "../../../base/BaseComponent.js";
export default class Form extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.sendButton = this.page.getByRole("button", { name: "Send" });
    this.allContent = this.page.locator("main.contact");
    this.checkbox = page.getByLabel("I agree that my data will be");
    this.yourNameField = this.page.getByPlaceholder("Your name");
    this.emailField = this.page.getByPlaceholder("Email");
    this.yourMessageField = this.page.getByPlaceholder("Your Message");
    this.privacyLink = this.page.getByRole("link", { name: "privacy policy" });
    this.agreeCheckbox = this.page.getByLabel("I agree that my data will be");
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
    await this.checkElement(this.checkbox, `Agree checkbox`);
  }
  async inputYouNameField(text) {
    await this.page.waitForLoadState("networkidle");
    await this.input(this.yourNameField, text, `Your name field`);
  }
  async inputEmailField(text) {
    await this.input(this.emailField, text, `Email field`);
  }
  async inputMessageField(text) {
    await this.input(this.yourMessageField, text, `Message field`);
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
    await this.expectElementToHaveJSProperty(this.yourNameField ,"validationMessage", value);
  };
  expectEmailFieldToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(this.emailField,"validationMessage", value);
  };

  expectYourMessageFieldToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(this.yourMessageField,"validationMessage", value);
  };

  expectAgreeCheckboxToHaveProperty = async (value) => {
    await this.expectElementToHaveJSProperty(this.agreeCheckbox,"validationMessage", value);
  };
}
