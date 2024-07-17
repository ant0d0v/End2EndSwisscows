import { expect,test} from "@playwright/test";
// Base and utility imports
import PageHolder from "../base/PageHolder.js";
import Api from "../api/api.js";
import Route from "../app/api/route.js";
import ContactRoute from "../app/api/contact/route.js";

// Page imports from home directory
import Home from "./(home)/page.js";

// Page imports from search directory
import ImagePage from "../app/(search)/images/page.js";
import ImageMyPage from "../app/(search)/images/my/page.js";
import MusicPage from "../app/(search)/music/page.js";
import MusicMyPage from "../app/(search)/music/my/page.js";
import MusicPlaylistPage from "../app/(search)/music/playlist/page.js";
import VideoPage from "../app/(search)/video/page.js";
import WebPage from "../app/(search)/web/page.js";
import NewsPage from "../app/(search)/news/page.js";
import ShoppingPage from "../app/(search)/shopping/page.js";

// Page imports from pages directory
import DefaultSearchPage from "../app/(pages)/default-search/page.js";
import CharityPage from "../app/(pages)/social-projects/page.js";
import DatacenterPage from "../app/(pages)/datacenter/page.js";
import MediaEducationPage from "../app/(pages)/media-education/page.js";
import DonationPage from "../app/(pages)/donation/page.js";
import ContactPage from "../app/(pages)/contact/page.js";
import ImprintPage from "../app/(pages)/imprint/page.js";
import AboutPage from "../app/(pages)/about/page.js";

// Page imports from landings directory
import VpnPage from "../app/(landings)/vpn/page.js";
import EmailPage from "../app/(landings)/email/page.js";

// OAuth related page import
import SignInPage from "../app/oauth/page.js";

// Application class that uses all the imports
export default class Application extends PageHolder {
  constructor(page) {
    super(page);
    this.api = new Api(this.page.request);
    this.home = new Home(this.page);
    this.emailPage = new EmailPage(this.page);
    this.vpnPage = new VpnPage(this.page);
    this.aboutPage = new AboutPage(this.page);
    this.imprintPage = new ImprintPage(this.page);
    this.contactPage = new ContactPage(this.page);
    this.donationPage = new DonationPage(this.page);
    this.mediaEducationPage = new MediaEducationPage(this.page);
    this.datacenterPage = new DatacenterPage(this.page);
    this.charityPage = new CharityPage(this.page);
    this.defaultSearchPage = new DefaultSearchPage(this.page);
    this.shoppingPage = new ShoppingPage(this.page);
    this.newsPage = new NewsPage(this.page);
    this.webPage = new WebPage(this.page);
    this.videoPage = new VideoPage(this.page);
    this.musicPlaylistPage = new MusicPlaylistPage(this.page);
    this.musicMyPage = new MusicMyPage(this.page);
    this.musicPage = new MusicPage(this.page);
    this.imagePage = new ImagePage(this.page);
    this.imageMyPage = new ImageMyPage(this.page);
    this.signInPage = new SignInPage(this.page);
    this.route = new Route(this.page);
    this.contactRoute = new ContactRoute(this.page);
  }
  //Actions
  async waitForUrlContains(Url) {
    await test.step(`Wait for url ${Url}`, async () => {
      await this.page.waitForURL(Url);
    });
  }

  //Verify
  async expectNewPageToHaveTitle(context, expectedTitle) {
    await expect(await context.pages()[1]).toHaveTitle(expectedTitle);
  }
  async expectHaveTitle(newPage, title) {
    await test.step('Expect a title "to have" a substring', async () => {
      await expect(newPage).toHaveTitle(title);
    });
  }

  async expectHaveUrl(newPage, url) {
    await test.step('Expect a URL "to have" a string', async () => {
      await expect(newPage).toHaveURL(url);
    });
  }
  async expectNotToHaveUrl(newPage, url) {
    await test.step('Expect a URL "not to have" a string', async () => {
      await expect(newPage).not.toHaveURL(url);
    });
  }
  async expectPageNotToHaveTitle(newPage, title) {
    await test.step('Expect a title "to have" a substring', async () => {
      await expect(newPage).not.toHaveTitle(title);
    });
  }
    
}
