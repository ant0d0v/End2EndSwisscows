import { expect } from "@playwright/test";
import Header from "./Header.js";
import Footer from "../Footer.js";
import extensionBlock from "./Extension.js";
import FAQ from "../../components/FAQ.js";
import Banner from "./Banner.js";
import BasePage from "../../base/BasePage.js";
import Benefits from "./Benefits.js";
import Translations from "../../i18n/index.js";

export default class Home extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = "/"
    this.translations = Translations;
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.extensionBlock = new extensionBlock(page);
    this.banner = new Banner(page);
    this.benefits = new Benefits(page);
    this.faq = new FAQ(page);

    // Locators
    this.blockQuestionsAndAnswers = this.page.getByText(
      "Questions and AnswersWhat"
    );
    this.images = this.page.locator("main.home img:visible");
    this.links = (name) => this.page.getByRole("link", { name: name });
    this.conteinerTitle = this.page.locator(".title-section");
    //Products-block
    this.products = this.page.locator(".products-blocks");
    this.tag = this.products.locator(".tag");
    this.linkMore = this.products.locator(".link-more");
    this.title = this.products.locator(".title");
    this.descriptions = this.products.locator(".description");
  }

  //Actions
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

  scrollDownToQuestions = async () => {
    await this.scrollByVisibleElement(
      this.faq.fourQuestion,
      `four question in accordion menu`
    );
  };

  // Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(
      testInfo,
      this.images,
      this.banner.widget
    );
  };

  //Locales
  async expectTranslationsForConteinerTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      locale: value,
    }
  ) {
    const expectedTextFAQ_Title = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextProductsServices = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTextTagline_Title = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.conteinerTitle, [
      expectedTextFAQ_Title,
      expectedTextProductsServices,
      expectedTextTagline_Title,
    ]);
  }

  async expectTranslationsForTag(
    expected = {
      translationKey_1: value,
      locale: value,
    }
  ) {
    const expectedText = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.tag, [expectedText, expectedText]);
  }

  async expectTranslationsForLinkMore(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      locale: value,
    }
  ) {
    const expectedTextLinkMore = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextShowMore = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFanShopLink = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlogLink = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.linkMore, [
      expectedTextShowMore,
      expectedTextShowMore,
      expectedTextShowMore,
      expectedTextLinkMore,
      expectedTextLinkMore,
      expectedTextShowMore,
      expectedTextFanShopLink,
      expectedTextShowMore,
      expectedTextBlogLink,
    ]);
  }

  async expectTranslationsForProductsTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      locale: value,
    }
  ) {
    const expectedTextHulbeeTitle = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextTgBusinessTitle = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.title, [
      "Swisscows.Email",
      "Swisscows.VPN",
      "TeleGuard",
      expectedTextHulbeeTitle,
      expectedTextTgBusinessTitle,
      "GetDigest",
      "Swisscows Fan Shop",
      "Swisscows Faraday Bag",
      "Andreas Wiebe Blog",
    ]);
  }

  async expectTranslationsForProductsDescroption(
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
      locale: value,
    }
  ) {
    const expectedTextEmailDescription = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextVPNDescription = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTeleguardDescription = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedTextHulbeeDescription = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    const expectedTextTgBusinessDescription = this.translations.t(
      expected.translationKey_5,
      {
        lng: expected.locale,
      }
    );
    const expectedTextGetDigestDescription = this.translations.t(
      expected.translationKey_6,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFanShopDescription = this.translations.t(
      expected.translationKey_7,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFaradayBagDescription = this.translations.t(
      expected.translationKey_8,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlogDescription = this.translations.t(
      expected.translationKey_9,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.descriptions, [
      expectedTextEmailDescription,
      expectedTextVPNDescription,
      expectedTeleguardDescription,
      expectedTextHulbeeDescription,
      expectedTextTgBusinessDescription,
      expectedTextGetDigestDescription,
      expectedTextFanShopDescription,
      expectedTextFaradayBagDescription,
      expectedTextBlogDescription,
    ]);
  }
}
