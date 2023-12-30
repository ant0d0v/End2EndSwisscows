import  base from "./fixtureBase";
const { MainPage } = require("../pages/MainPage");
const { EmailPage } = require("../pages/static-pages/EmailPage");
const { Header } = require("../components/Header");
const { Preloader } = require("../components/Preloader");
const { HeaderStaticPages } = require("../components/HeaderStaticPages");
const { ImagePage } = require("../pages/search/ImagePage");
const { MusicPage } = require("../pages/search/MusicPage");
const { VideoPage } = require("../pages/search/VideoPage");
const { WebPage } = require("../pages/search/WebPage");
const { HamburgerMenu } = require("../components/HamburgerMenu");
const { FooterFull } = require("../components/FooterFull");
const { StaticSlider } = require("../components/StaticSlider");
const { DefaultSearchPage } = require("../pages/static-pages/DefaultSearchPage");
const { CharityPage } = require("../pages/static-pages/CharityPage");
const { DatacenterPage } = require("../pages/static-pages/DatacenterPage");
const { EducationPage } = require("../pages/static-pages/EducationPage");
const { DonationPage } = require("../pages/static-pages/DonationPage");
const { ContactUsPage } = require("../pages/static-pages/ContactUsPage");

exports.test = base.test.extend({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  defaultSearchPage: async ({ page }, use) => {
    await use(new DefaultSearchPage(page));
  },
  emailPage: async ({ page }, use) => {
    await use(new EmailPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  headerStaticPages: async ({ page }, use) => {
    await use(new HeaderStaticPages(page));
  },
  imagePage: async ({ page }, use) => {
    await use(new ImagePage(page));
  },
  musicPage: async ({ page }, use) => {
    await use(new MusicPage(page));
  },
  videoPage: async ({ page }, use) => {
    await use(new VideoPage(page));
  },
  webPage: async ({ page }, use) => {
    await use(new WebPage(page));
  },
  hamburgerMenu: async ({ page }, use) => {
    await use(new HamburgerMenu(page));
  },
  footerFull: async ({ page }, use) => {
    await use(new FooterFull(page));
  },
  charityPage: async ({ page, footerFull }, use) => {
    await footerFull.clickCharityProjectLink();
    await use(new CharityPage(page));
  },
  datacenterPage: async ({ page, footerFull }, use) => {
    await footerFull.clickDatacentertLink();
    await use(new DatacenterPage(page));
  },
  educationPage: async ({ page, footerFull }, use) => {
    await footerFull.clickEducationLink();
    await use(new EducationPage(page));
  },
  donationPage: async ({ page, footerFull }, use) => {
    await footerFull.clickDonationLink();
    await use(new DonationPage(page));
  },
  contactUsPage: async ({ page, footerFull }, use) => {
    await footerFull.clickContactUsLink();
    await use(new ContactUsPage(page));
  },
  preloader: async ({ page }, use) => {
    await use(new Preloader(page));
  },
  staticSlider: async ({ page }, use) => {
    await use(new StaticSlider(page));
  },
});

exports.expect = base.expect;
