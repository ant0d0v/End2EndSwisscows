import BasePage from "../../../base/BasePage.js";
import videoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";
import Translations from "../../../i18n/index.js";
import { expect, test } from "@playwright/test";

export default class MediaEducationPage extends BasePage {
  constructor(page) {
    super(page);
    this.videoPlayer = new videoPlayer(page);
    this.header = new Header(page);
    this.translations = Translations;
    this.pagePath = "/media-education"

    //Locators
    this.root = this.page.locator(".media-education");
    this.title = this.root.locator("h1");
    this.blockTitle = this.root.locator("h2");
    this.descriptions = this.root.locator("p");
    this.images = this.root.locator("img:visible");
    this.pdfLinks = (id) => this.page.getByRole("link", { name: `${id}` });
    this.links = (id) =>
      this.page.getByRole("link", { name: `${id}`, exact: true });
    this.player = this.page.locator(".player");
    this.flyerButton = this.root.locator(".button");
    this.mediaeduList = this.root.locator(".media-edu-list");
  }

  //Actions
 
  async clickPdfLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.pdfLinks(id),
      `${id}`
    );
    return newPage;
  }

  async expectToBeOpenedNewPageAfterClickLinks(
    data = {
      locator: element,
      expectedLink: string,
    }
  ) {
    await this.expectToBeOpenedNewPageAfterClick(
      this.links(data.locator),
      data.expectedLink
    );
  }

  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(testInfo, this.images, this.player);
  };
  expectColorWhenHoveringOnPdfButton = async (expectedValue) => {
    await this.expectColorLinkWhenHovering(
      this.flyerButton,
      "background",
      expectedValue
    );
  };

  async expectValidatePdfFile(
    data = {
      currentUrl: string,
      pdfUrl: string,
    },
    testInfo
  ) {
    await test.step(`Validate pdf when clicking  media education pdf file`, async () => {
      testInfo.snapshotSuffix = "";
      let iframe = `<iframe src="${data.pdfUrl}#zoom=105%" style="width: 100%;height:100%;border: none;"></iframe>`;
      await data.currentUrl.setContent(iframe);
      await data.currentUrl.waitForTimeout(5000);
      expect(
        await data.currentUrl.locator("iframe").screenshot()
      ).toMatchSnapshot({
        name: `${testInfo.title}.png`,
        maxDiffPixelRatio: 0.5,
      });
    });
  }
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
      translationKey_14: value,
      locale: value,
    }
  ) {
    const list = [];
    for (let i = 1; i <= 14; i++) {
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
      locale: value,
    }
  ) {
    const expectedTitle_1 = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedTitle_2 = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.blockTitle, [
      expectedTitle_1,
      expectedTitle_2,
    ]);
  }
  async expectTranslationsForFlayerButton(
    expected = { translationKey: value, locale: value }
  ) {
    const expectedButtonText = this.translations.t(expected.translationKey, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.flyerButton, expectedButtonText);
  }
  async expectTranslationsForMediaeduList(
    expected = { translationKey: value, locale: value }
  ) {
    const expectedText = this.translations.t(expected.translationKey, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.mediaeduList, expectedText);
  }
}
