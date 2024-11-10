import BaseComponent from "../../base/BaseComponent.js";

export default class Extension extends BaseComponent {
  constructor(page) {
    super(page);
    // Locators
    this.extensionLink = this.page.getByRole("link", {
      name: "Install Swisscows The",
    });
    }
    //
  expectToBeOpenedPageAfterClickInstall = async (expectedUrl) => {
    await this.expectToBeOpenedNewPageAfterClick(this.extensionLink, expectedUrl);
  };
}