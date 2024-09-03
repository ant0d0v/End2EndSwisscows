import BaseComponent from "../base/BaseComponent.js";
export default class Footer extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    
    this.allInternalLinks = (locator) => this.page.getByRole("link", { name: locator, exact: true });
    this.externalLinks = (locator) => this.page.locator("li").filter({ hasText: locator });
    this.socialNetworksLinks = (index) => this.page.locator(`.social-networks > a:nth-child(${index})`);
    this.swisscowsAppLinks = (locator) => this.page.getByRole("link", { name: locator });
  }
  //Actions

  clickAllInternalLink = async (locator) => {
    await this.clickElement(
      this.allInternalLinks(locator),
      `all internal link in the footer full`
    );
  };

  //Verify

  expectToBeOpenedNewPageAfterClickExternalLink = async (
    data = {
      locator: string,
      expected: string,
    }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.externalLinks(data.locator),
      data.expected
    );
  };
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
