import BasePage from "../../../base/BasePage.js";
import imagesGallery from "../../../components/ImagesGallery.js";
import videoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";
import Translations from "../../../i18n/index.js";

export default class DatacenterPage extends BasePage {
  constructor(page) {
    super(page);
    this.translations = Translations;
    this.imagesGallery = new imagesGallery(page);
    this.videoPlayer = new videoPlayer(page);
    this.header = new Header(page);

    //Locators
    this.root = this.page.locator(".datacenter");
    this.images = this.root.locator("img:visible");
    this.descriptions = this.root.locator("p");
    this.title = this.root.locator("h1");
    this.blockTitle = this.root.locator("h2");
    this.links = (id) =>
      this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }
  //Actions
  async open() {
    await this.openPage("/data-safe-search-engine");
  }

  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.links(id),
      `${id}`
    );
    return newPage;
  }
  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(
      testInfo,
      this.images,
      this.videoPlayer.videoPlayer
    );
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
      locale: value,
    }
  ) {
    const list = [];
    for (let i = 1; i <= 7; i++) {
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
  async expectTranslationsForTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      locale: value,
    }
  ) {
    const expectedTitle = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedBlockTitle = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.title, expectedTitle);
    await this.expectElementToHaveText(this.blockTitle, expectedBlockTitle);
  }
  async expectTranslationsForTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      locale: value,
    }
  ) {
    const expectedTitle = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedBlockTitle = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.title, expectedTitle);
    await this.expectElementToHaveText(this.blockTitle, expectedBlockTitle);
  }
}
