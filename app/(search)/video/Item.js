import BaseComponent from "../../../base/BaseComponent";
import Player from "./Player";
import ProxyImage from "../../../components/ProxyImage";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.player = new Player(page)
    this.proxyImage = new ProxyImage(page)
    

   //Locators
   this.videoItems = this.page.locator("article.item--video h2")
   this.videoResults = this.page.locator(".video-results")
   this.item = (index) => this.page.locator("article.item--video h2").nth(index)
   this.images = this.page.locator("article.item--video img")
   this.descriptionList = this.page.locator(".item--video .description")
   
  }
  //Actions
  clickVideoNumber = async (index) => {
    await this.clickElement( this.item(index),
      `video item with index${index}`
    );
  };
  scrollByVisibleVideoNumber = async (number) => {
    for(let i = 0;i < number ; i+=2){
    await this.scrollByVisibleElement(this.descriptionList.nth(i), "last track");
    }
  }
  scrollWithMouseWheelToVideoNumber = async (number) => {
    for(let i = 0;i < number ; i+=4){
    await this.page.mouse.wheel(0, 600);  
    await this.scrollByVisibleElement(this.images.nth(i), "last track");
    }
  }
  
  
  //Verify
  expectVideoItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item--video h2:nth-child(-n+10)",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.videoItems)
  };
  expectImageToHaveWight = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.images , property, value);
  };
  expectItemsResponsePublisherToEqual = async (response, expectedPublisher) => {
    const parseResponse = await response.json()
    for(const item of await parseResponse.items){
      expect(item.publisher).toEqual(expectedPublisher)
    }
  };
  expectVideoResultsAreTiles = async () => {
    await this.expectAttributeClassOfElement(this.videoResults, "video-results tiles");
  };
}