import BaseComponent from "../../../base/BaseComponent.js";

export default class Player extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
    this.okButton = this.page.getByRole("button", { name: "OK" });
    this.ownerButton = (name) => this.page.getByRole("link", { name: name });
    this.checkbox = this.page.getByLabel("Don't remind me again");
    this.description = this.page.getByText("Video provider prevents");
    this.title = this.page.getByRole("heading", { name: "Privacy Warning" });
    this.duration = this.page.frameLocator('iframe').locator(".ytp-time-current")
    this.videoPlayer = this.page
      .frameLocator(`iframe[title*="Skofka" i]`)
      .locator("video");
    this.player = this.page.locator(".video-player");
  }
  //Actions
  clickOkButton = async () => {
    await this.clickElement(this.okButton, `ok button `);
  };
  expectToBeOpenedPageAfterClick = async (
    expected = { buttonName: value, url: value }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.ownerButton(expected.buttonName),
      expected.url
    );
  };
  clickCancelButton = async () => {
    await this.clickElement(this.cancelButton, `cancel button `);
  };
  selectCheckbox = async () => {
    await this.checkElement(this.checkbox, `cancel button `);
  };
  //Verify
  async expectTimeToHaveText(value) {
    await this.expectTextToContain(this.duration, value);
  }
  async expectPlayerToBeHidden() {
    await this.expectElementToBeHidden(this.player);
  }
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.player,
      this.player,
      testInfo
    );
  };
}

