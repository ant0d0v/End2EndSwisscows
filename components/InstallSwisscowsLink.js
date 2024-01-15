import BaseComponent from "../base/BaseComponent";

export default class InstallSwisscowsLink extends BaseComponent {
  constructor(page) {
    super(page);
    // Locators
    this.popupInstallSwisscowsLink = this.page.getByRole("link", { name: "Stay with us and set",});
    this.closeButtonOfPopupInstallSwisscowsLink = this.page.locator("div").filter({ hasText: "Install Swisscows" }).getByRole("button");
  }
  //Actions

  clickPopupInstallSwisscowsLinkAndNavigateToWebStore = async () => {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.popupInstallSwisscowsLink,
      "popup Install Swisscows link"
    );
    return newPage;
  };

  clickCloseButtonOfPopupInstallSwisscowsLink = async () => {
    await this.clickElement(
      this.closeButtonOfPopupInstallSwisscowsLink,
      `close button of popup install swisscows link`
    );
    return this;
  };

  // Verify
  expectPopupInstallSwisscowsLinkIsDisplayed = async () => {
    await this.expectElementToBeVisible(this.popupInstallSwisscowsLink);
  };
  expectTextOfPopupInstallSwisscowsLink = async (text) => {
    this.expectElementToHaveText(this.popupInstallSwisscowsLink, text);
  };
}
