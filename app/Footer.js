import BaseComponent from "../base/BaseComponent.js";
import Translations from "../i18n/index.js";
export default class Footer extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;

    //Locators
    this.root = this.page.locator(".footer-full");
    this.title = this.root.locator(".title");
    this.links = this.root.locator("li a");
    this.menuBottons = this.root.locator(".footer-menu-bottom a");
    this.allInternalLinks = (locator) =>
      this.page.getByRole("link", { name: locator, exact: true });
    this.externalLinks = (locator) =>
      this.page.locator("li").filter({ hasText: locator });
    this.socialNetworksLinks = (index) =>
      this.page.locator(`.social-networks .icon`).nth(index - 1);
    this.swisscowsAppLinks = (locator) =>
      this.page.getByRole("link", { name: locator });
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

  //locales
  async expectTranslationsForTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      locale: value,
    }
  ) {
    const expectedTitle_1 = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedTitle_2 = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    const expectedTitle_3 = this.translations.t(expected.translationKey_3, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.title, [
      expectedTitle_1,
      expectedTitle_2,
      expectedTitle_3,
    ]);
  }
  async expectTranslationsForCompanyLink(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      locale: value,
    }
  ) {
    const expectedLink_1 = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedLink_2 = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    const expectedLink_3 = this.translations.t(expected.translationKey_3, {
      lng: expected.locale,
    });
    const expectedLink_4 = this.translations.t(expected.translationKey_4, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.menuBottons, [
      expectedLink_1,
      expectedLink_2,
      expectedLink_3,
      expectedLink_4,
    ]);
  }
  async expectTranslationsForLink(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      translationKey_6: value,
      translationKey_7: value,
      translationKey_8: value,
      translationKey_9: value,
      translationKey_10: value,
      translationKey_11: value,
      translationKey_12: value,
      translationKey_13: value,
      translationKey_14: value,
      translationKey_15: value,
      locale: value,
    }
  ) {
    const links = [];
    for (let i = 1; i <= 15; i++) {
      const key = `translationKey_${i}`;
      const translation = this.translations.t(expected[key], {
        lng: expected.locale,
      });
      if (translation) {
        links.push(translation);
      }
    }
    await this.expectElementToHaveText(this.links, links);
  }
}
