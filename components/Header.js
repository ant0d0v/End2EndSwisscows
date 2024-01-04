
import  HeaderStaticPages  from './HeaderStaticPages';
import  MainPage  from '../pages/MainPage';
import { WebPage } from "../pages/search/WebPage";
import  ImagePage  from "../pages/search/ImagePage";
import  MusicPage  from "../pages/search/MusicPage";
import  NewsPage  from "../pages/search/NewsPage";
import  VideoPage  from "../pages/search/VideoPage";
import  ShoppingPage  from "../pages/search/ShoppingPage";
import  BasePage  from '../base/BasePage';

export default class Header extends BasePage {
    constructor(page) {
        super(page);
        this.headerStaticPages = new HeaderStaticPages(page);
        //Locators
        this.logoSwisscows = this.page.locator('#header').getByRole('link', { name: 'Swisscows', exact: true })
        this.imageSearchButton = this.page.getByRole('link', { name: 'Images', exact: true })
        this.videoSearchButton = this.page.getByRole('link', { name: 'Video' , exact: true })
        this.musicSearchButton = this.page.getByRole('link', { name: 'Music', exact: true })
        this.newsSearchButton = this.page.getByRole('link', { name: 'News', exact: true })
        this.shoppingSearchButton = this.page.getByRole('link', { name: 'Shopping', exact: true })
        this.hamburgerMenu = this.page.locator('#header').getByRole('button').nth(2)        
    }

    //Actions
    
    clickHamburgerMenuButton = async () => {
        await this.clickElement(this.hamburgerMenu, `hamburger menu in the header`);
    }

    clickSwisscowsLogo = async () => {
        await this.clickElement(this.logoSwisscows, `Swisscows Logo in the header`);
        return new MainPage(this.page);
    }
    clickImageSearchButton = async () => {
        await this.clickElement(this.imageSearchButton,`image button in the header`);
        return new ImagePage(this.page);
    }
    clickVideoSearchButton = async () => {
        await this.clickElement(this.videoSearchButton, `video button in the header`);
        return new VideoPage(this.page);
    }
    clickMusicSearchButton = async () => {
        await this.clickElement(this.musicSearchButton, `music button in the header`);
        return new MusicPage(this.page);
    }
    clickNewsSearchButton = async () => {
        await this.clickElement(this.newsSearchButton, `search button in the header`);
        return new NewsPage(this.page);
    }
    clickShoppingSearchButton = async () => {
        await this.clickElement(this.shoppingSearchButton, `shopping button in the header`);
        return new ShoppingPage(this.page);
    }
   
    // Verify
    
    
}
