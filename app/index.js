import BasePage  from "../base/BasePage";
import  Home  from "./(home)/page";
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
import SignInPage from "../app/oauth/page";
import Route from "../app/api/route";
export default class Application extends BasePage {
    constructor(page) {
        super(page);
     this.home = new Home(this.page);
     this.emailPage = new EmailPage(this.page);
     this.vpnPage = new VpnPage(this.page);
     this.aboutPage = new AboutPage(this.page);
     this.imprintPage = new ImprintPage(this.page);
     this.contactPage = new ContactPage(this.page);
     this.donationPage = new DonationPage(this.page);
     this.mediaEducationPage = new MediaEducationPage(this.page);
     this.datacenterPage = new DatacenterPage (this.page);
     this.charityPage = new CharityPage(this.page);
     this.defaultSearchPage = new  DefaultSearchPage(this.page);
     this.shoppingPage = new ShoppingPage(this.page);
     this.newsPage = new NewsPage(this.page);
     this.webPage = new WebPage(this.page);
     this.videoPage = new  VideoPage(this.page);
     this.musicPlaylistPage = new  MusicPlaylistPage(this.page);
     this.musicMyPage = new  MusicMyPage(this.page);
     this.musicPage= new  MusicPage(this.page);
     this.imagePage = new  ImagePage(this.page);
     this.signInPage = new  SignInPage(this.page);
     this.route = new  Route(this.page);
    }
    
}
