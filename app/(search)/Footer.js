import BaseComponent from '../../base/BaseComponent.js'
export default class Footer extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.socialNetworksLinks = (index) =>
      this.page.locator(`.social-networks .icon`).nth(index - 1);
    this.swisscowsAppLinks = (locator) =>
      this.page.getByRole("link", { name: locator });
    this.swisscowsAppImages = this.page.locator(".app .app-link img");
    this.root = this.page.getByRole("contentinfo");
  }
  //Actions
  scrollToFooter = async ()  => {
    await this.scrollByVisibleElement(this.root, "search footer")
  };

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
}
