import base from "./fixtureBase";
import Home from "../app/Home.page";
import Preloader from "../components/Preloader";
import Header from "../components/(search)/Header";
import HeaderStaticPages from "../components/HeaderStaticPages";
import FooterFull from "../components/FooterFull";
import imagesGallery from "../components/ImagesGallery";
import ImagePage from "../app/(search)/images/Image.page";
import MusicPage from "../app/(search)/music/Music.page";
import MusicMyPage from "../app/(search)/music/my/Music.page";
import MusicPlaylistPage from "../app/(search)/music/playlist/Music.page";
import VideoPage from "../app/(search)/Video.Page";
import WebPage from "../app/(search)/Web.Page";
import NewsPage from "../app/(search)/News.Page";
import ShoppingPage from "../app/(search)/Shopping.Page";
import DefaultSearchPage from "../app/(pages)/DefaultSearch.Page";
import CharityPage from "../app/(pages)/Charity.Page";
import DatacenterPage from "../app/(pages)/Datacenter.Page";
import EducationPage from "../app/(pages)/Education.Page";
import DonationPage from "../app/(pages)/Donation.Page";
import ContactUsPage from "../app/(pages)/ContactUs.Page";
import ImprintPage from "../app/(pages)/Imprint.Page";
import WhoWeArePage from "../app/(pages)/WhoWeAre.Page";
import VpnPage from "../app/(landings)/Vpn.Page";
import EmailPage from "../app/(landings)/Email.Page";


exports.test = base.test.extend({
  home: async ({ page }, use) => {
    await use(new Home(page));
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
  whoWeArePage: async ({ page, footerFull }, use) => {
    await footerFull.clickWhoWeAreLink();
    await use(new WhoWeArePage(page));
  },
  imprintPage: async ({ page, footerFull }, use) => {
    await footerFull.clickImprintLink();
    await use(new ImprintPage(page));
  },
  emailPage: async ({ footerFull }, use) => {
    const newPage = await footerFull.clickEmailLinkAndNavigateToNewPage();
    await use(new EmailPage(newPage));
  },
  defaultSearchPage: async ({ home }, use) => {
    await home.clickFourQuestion()
    const newPage = await home.clickLinkInTheFourQuestionAndNavigateToDefaultSearchPage();
    await use(new DefaultSearchPage(newPage));
  },

  vpnPage: async ({ footerFull }, use) => {
    const newPage = await footerFull.clickVpnLinkAndNavigateToNewPage();
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
