import BasePage from "../../../base/BasePage.js";
import ImagesGallery from "../../../components/ImagesGallery.js";
import VideoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";
import Translations from "../../../i18n/index.js";
export default class CharityPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.imagesGallery = new ImagesGallery(page);
    this.videoPlayer = new VideoPlayer(page);
    this.translations = Translations;

    //Locators
    this.root = this.page.locator(".social-project");
    this.descriptions = this.root.locator("p");
    this.title = this.root.locator("h1");
    this.blockTitle = this.root.locator("h2");
    this.mapsImage = this.root.locator(".map img:visible");
    this.keyshiftLink = this.page.getByRole("link", {
      name: "https://keyshift.com/en/",
    });
  }
  //Actions
  async open() {
    await this.openPage("/social-projects");
  }

  async expectToBeOpenedPageAfterClickKeyshiftLink(expectedLink) {
    await this.expectToBeOpenedNewPageAfterClick(
      this.keyshiftLink,
      expectedLink
    );
  }
  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(
      testInfo,
      this.mapsImage
    );
  };
  expectMapsToBeVisible = async () => {
    await this.expectAreElementsToBeVisible(this.mapsImage);
  };
  //Locales
  async expectTranslationsForDescriptions(
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
      locale: value,
    }
  ) {
    const list = [];
    for (let i = 1; i <= 13; i++) {
      const key = `translationKey_${i}`;
      const translation = this.translations.t(expected[key], {
        lng: expected.locale,
      });
      if (translation) {
        list.push(translation);
      }
    }
    await this.expectElementToHaveText(this.descriptions, list);
  }

  async expectTranslationsForBlockTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
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
    const expectedTitle_4 = this.translations.t(expected.translationKey_4, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.title, expectedTitle_1);
    await this.expectElementToHaveText(this.blockTitle, [
      expectedTitle_2,
      expectedTitle_3,
      expectedTitle_4,
    ]);
  }
}
