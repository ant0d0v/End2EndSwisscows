import BaseComponent from "../../base/BaseComponent.js";

export default class ExtensionPopup extends BaseComponent {
  constructor(page) {
    super(page);
    // Locators
    this.root = this.page.locator(".home-link-instruction.popup");
    this.images = this.root.locator("img");
    this.popup = this.page.getByRole("link", {
      name: "Stay with us and set",
    });
    this.closeButtonInExtensionPopup = this.page
      .locator("div")
      .filter({ hasText: "Install Swisscows" })
      .getByRole("button");
  }
  //Actions
  clickCloseButtonInExtensionPopup = async () => {
    await this.clickElement(
      this.closeButtonInExtensionPopup,
      `close button of popup install swisscows link`
    );
    return this;
  };

  // Verify
  expectToBeOpenedPageAfterClickPopup = async (expectedUrl) => {
    await this.expectToBeOpenedNewPageAfterClick(this.popup, expectedUrl);
  };

  expectPopupToBeVisible = async () => {
    await this.expectElementToBeVisible(this.popup);
  };
  expectPopupToHaveText = async (text) => {
    this.expectElementToHaveText(this.popup, text);
  };

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.images,
      testInfo
    );
  };
}
