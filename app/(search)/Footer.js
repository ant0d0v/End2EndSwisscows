import BaseComponent from '../../base/BaseComponent.js'
export default class Footer extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.socialNetworksLinks = (index) =>
      this.page.locator(`.social-networks > a:nth-child(${index})`);
    this.swisscowsAppLinks = (locator) =>
      this.page.getByRole("link", { name: locator });
    this.swisscowsAppImages = this.page.locator(".app .app-link img");
    this.root = this.page.getByRole("contentinfo");
  }
  //Verify
  expectToBeOpenedNewPageAfterClickSocialNetworksLinks = async (
    data = {
      locator: string,
      expected: string,
    }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.socialNetworksLinks(data.locator),
      data.expected
    );
  };

  expectToBeOpenedNewPageAfterClickAppLinks = async (
    data = {
      locator: string,
      expected: string,
    }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.swisscowsAppLinks(data.locator),
      data.expected
    );
  };
  
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.swisscowsAppImages,
      testInfo
    );
  };
}
