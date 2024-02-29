import base from "./fixtureBase";
// const base = require('@playwright/test');
import Home from "../app/(home)/page";
import Preloader from "../components/Preloader";
import imagesGallery from "../components/ImagesGallery";
import ImagePage from "../app/(search)/images/page";
import MusicPage from "../app/(search)/music/page";
import MusicMyPage from "../app/(search)/music/my/page";
import MusicPlaylistPage from "../app/(search)/music/playlist/page";
import VideoPage from "../app/(search)/video/page";
import WebPage from "../app/(search)/web/page";
import NewsPage from "../app/(search)/news/page";
import ShoppingPage from "../app/(search)/shopping/page";
import DefaultSearchPage from "../app/(pages)/default-search/page";
import CharityPage from "../app/(pages)/social-projects/page";
import DatacenterPage from "../app/(pages)/datacenter/page";
import MediaEducationPage from "../app/(pages)/media-education/page";
import DonationPage from "../app/(pages)/donation/page";
import ContactPage from "../app/(pages)/contact/page";
import ImprintPage from "../app/(pages)/imprint/page";
import AboutPage from "../app/(pages)/about/page";
import VpnPage from "../app/(landings)/vpn/page";
import EmailPage from "../app/(landings)/email/page";
import Application from "../app/index.js";


exports.test = base.test.extend({
  app: async ({page}, use) => {
    await use(new Application(page));
  },
  home: async ({ page }, use) => {
    await use(new Home(page));
  },
  defaultSearchPage: async ({ page }, use) => {
    await use(new DefaultSearchPage(page));
  },
  imagePage: async ({ page }, use) => {
    await use(new ImagePage(page));
  },
  musicPage: async ({ page }, use) => {
    await use(new MusicPage(page));
  },
  musicMyPage: async ({ page }, use) => {
    await use(new MusicMyPage(page));
  },
  musicPlaylistPage: async ({ page }, use) => {
    await use(new MusicPlaylistPage(page));
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
  charityPage: async ({ page, home }, use) => {
    await home.footer.clickCharityProjectLink();
    await use(new CharityPage(page));
  },
  datacenterPage: async ({ page, home }, use) => {
    await home.footer.clickDatacenterLink();
    await use(new DatacenterPage(page));
  },
  mediaEducationPage: async ({ page, home }, use) => {
    await home.footer.clickEducationLink();
    await use(new MediaEducationPage(page));
  },
  donationPage: async ({ page, home }, use) => {
    await home.footer.clickDonationLink();
    await use(new DonationPage(page));
  },
  contactPage: async ({ page, home }, use) => {
    await home.footer.clickContactUsLink();
    await use(new ContactPage(page));
  },
  aboutPage: async ({ page, home }, use) => {
    await home.footer.clickWhoWeAreLink();
    await use(new AboutPage(page));
  },
  imprintPage: async ({ page, home }, use) => {
    await home.footer.clickImprintLink();
    await use(new ImprintPage(page));
  },
  emailPage: async ({ home }, use) => {
    const newPage = await home.footer.clickEmailLinkAndNavigateToNewPage();
    await use(new EmailPage(newPage));
  },
  defaultSearchPage: async ({ home }, use) => {
    await home.clickFourQuestion()
    const newPage = await home.clickLinkInTheFourQuestionAndNavigateToDefaultSearchPage();
    await use(new DefaultSearchPage(newPage));
  },

  vpnPage: async ({ home }, use) => {
    const newPage = await home.footer.clickVpnLinkAndNavigateToNewPage();
    await use(new VpnPage(newPage));
  },
  preloader: async ({ page }, use) => {
    await use(new Preloader(page));
  },
  imagesGallery: async ({ page }, use) => {
    await use(new imagesGallery(page));
  },
});

exports.expect = base.expect;
