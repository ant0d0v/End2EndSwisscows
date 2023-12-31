import base from "./fixtureBase";
import MainPage from "../pages/MainPage";
import EmailPage from "../pages/static-pages/EmailPage";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import HeaderStaticPages from "../components/HeaderStaticPages";
import HamburgerMenu from "../components/HamburgerMenu";
import ImagePage from "../pages/search/ImagePage";
import MusicPage from"../pages/search/MusicPage";
import VideoPage from"../pages/search/VideoPage";
import WebPage from "../pages/search/WebPage";
import FooterFull from"../components/FooterFull";
import StaticSlider from"../components/StaticSlider";
import DefaultSearchPage from "../pages/static-pages/DefaultSearchPage";
import CharityPage from "../pages/static-pages/CharityPage";
import DatacenterPage from "../pages/static-pages/DatacenterPage";
import EducationPage from "../pages/static-pages/EducationPage";
import DonationPage from "../pages/static-pages/DonationPage";
import ContactUsPage from"../pages/static-pages/ContactUsPage";

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