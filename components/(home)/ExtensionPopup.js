import BaseComponent from "../../base/BaseComponent";

export default class ExtensionPopup extends BaseComponent {
  constructor(page) {
    super(page);
    // Locators
    this.extensionPopup = this.page.getByRole("link", { name: "Stay with us and set",});
    this.closeButtonInExtensionPopup = this.page.locator("div").filter({ hasText: "Install Swisscows" }).getByRole("button");
  }
  //Actions

  clickExtensionPopupAndNavigateToWebStore = async () => {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.extensionPopup,
      "popup Install Swisscows link"
    );
    return newPage;
  };

  clickCloseButtonInExtensionPopup = async () => {
    await this.clickElement(
      this.closeButtonInExtensionPopup,
      `close button of popup install swisscows link`
    );
    return this;
  };

  // Verify
  expectExtensionPopupIsDisplayed = async () => {
    await this.expectElementToBeVisible(this.extensionPopup);
  };
  expectTextExtensionPopup = async (text) => {
    this.expectElementToHaveText(this.extensionPopup, text);
  };
}
