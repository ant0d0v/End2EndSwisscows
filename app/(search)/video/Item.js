import BaseComponent from "../../../base/BaseComponent.js";
import Player from "./Player.js";
import ProxyImage from "../../../components/ProxyImage.js";
import { expect } from "@playwright/test";

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.player = new Player(page)
    this.proxyImage = new ProxyImage(page)
    

  //Locators
  this.root = this.page.locator("article.video-object");
  this.thumbnail = this.root.locator(".thumbnail");
   this.videoItems = this.page.locator("article.video-object");
   this.videoResults = this.page.locator(".video-results")
   this.item = (index) => this.page.locator("article.video-object .title").nth(index)
   this.images = this.page.locator("article.video-object .thumbnail");
   this.descriptionList = this.page.locator("article.video-object .description")
   
  }
  //Actions
  clickVideoNumber = async (index) => {
    await this.clickElement( this.thumbnail.nth(index - 1),
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