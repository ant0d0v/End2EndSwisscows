import base from "./fixtureBase";
import MainPage from "../pages/Main.Page";
import EmailPage from "../pages/static-pages/Email.Page";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import HeaderStaticPages from "../components/HeaderStaticPages";
import ImagePage from "../pages/search/Image.Page";
import MusicPage from "../pages/search/Music.Page";
import VideoPage from "../pages/search/Video.Page";
import WebPage from "../pages/search/Web.Page";
import NewsPage from "../pages/search/News.Page";
import ShoppingPage from "../pages/search/Shopping.Page";
import FooterFull from "../components/FooterFull";
import StaticSlider from "../components/StaticSlider";
import DefaultSearchPage from "../pages/static-pages/DefaultSearch.Page";
import CharityPage from "../pages/static-pages/Charity.Page";
import DatacenterPage from "../pages/static-pages/Datacenter.Page";
import EducationPage from "../pages/static-pages/Education.Page";
import DonationPage from "../pages/static-pages/Donation.Page";
import ContactUsPage from "../pages/static-pages/ContactUs.Page";
import ImprintPage from "../pages/static-pages/Imprint.Page";

exports.test = base.test.extend({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  defaultSearchPage: async ({ page }, use) => {
    await use(new DefaultSearchPage(page));
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
  newsPage: async ({ page }, use) => {
    await use(new NewsPage(page));
  },
  shoppingPage: async ({ page }, use) => {
    await use(new ShoppingPage(page));
  },
  webPage: async ({ page }, use) => {
    await use(new WebPage(page));
  },
  footerFull: async ({ page }, use) => {
    await use(new FooterFull(page));
  },
  charityPage: async ({ page, footerFull }, use) => {
    await footerFull.clickCharityProjectLink();
    await use(new CharityPage(page));
  },
  datacenterPage: async ({ page, footerFull }, use) => {
    await footerFull.clickDatacenterLink();
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
  imprintPage: async ({ page, footerFull }, use) => {
    await footerFull.clickImprintLink();
    await use(new ImprintPage(page));
  },
  emailPage: async ({ footerFull }, use) => {
    const newPage = await footerFull.clickEmailLinkAndNavigateToNewPage();
    await use(new EmailPage(newPage));
  },
  preloader: async ({ page }, use) => {
    await use(new Preloader(page));
  },
  staticSlider: async ({ page }, use) => {
    await use(new StaticSlider(page));
  },
});

exports.expect = base.expect;
