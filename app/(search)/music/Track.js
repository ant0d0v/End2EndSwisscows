import BaseComponent from "../../../base/BaseComponent";
const { expect, request } = require("@playwright/test");

export default class Track extends BaseComponent {
  constructor(page) {
    super(page);
  
    const root = "article.item--audio";
   //Locators
   this.tracksName = this.page.locator(`${root} h2`)
   this.track = (index) => this.page.locator(`${root}`).nth(index - 1)
   this.lastTrack = (id) => this.page.locator(`${root}`).nth(`${id}`)
   this.favoriteButton = (index) => this.page.locator("article button.favorite").nth(index - 1)
   this.allFavoriteButtons = this.page.locator(".button.favorite:nth-child(-n+20)")
   this.valueProgressBar = (index) => this.page.locator(`${root} div.progress-bar div.progress`).nth(index - 1)
   this.timeLine = (index) => this.page.locator(`${root} div.timeline`).nth(index - 1)
   this.playButton = (index) => this.page.locator(`${root} button.play-pause use`).nth(index - 1)
   this.allPlayButtons = this.page.locator(`${root} button.play-pause use`)
   this.allImages = this.page.locator(`${root} img`)
   
  }
  //Action
  async clickPlayButtonNumberTrack (index){
    await this.clickElement( this.playButton(index),
      `play button of track with index${index}`
    );
  };
  async clickTimeLineNumberTrack(index){
    await this.clickElement( this.timeLine(index),
      `Time Line of track with index${index}`
    );
  };
  async clickPauseButtonNumberTrack(index){
    await this.clickElement(this.playButton(index),
      `pause button of track with index${index}`
    );
  };
  async clickFavoriteButtonNumberTrack (index) {
    await this.clickElement(this.favoriteButton(index),
      `favorite button of track with index${index}`
    );
  };
  async clickFavoriteButtonNumberTrackAndGetResponse(index){
    let response;
    const responsePromise = this.page.waitForResponse(`${ process.env.API_URL}/music/tracks/my`)
    await this.clickElement(this.favoriteButton(index),
      `favorite button of track with index${index}`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };
  async clickAllFavoriteButtonsOfTracksAndGetResponses(){
    let responseIDs = [];
    for (const favoriteButton of await this.allFavoriteButtons.all()) {
      const responsePromise = this.page.waitForResponse(`${process.env.API_URL}/music/tracks/my`);
      await this.clickElement(favoriteButton, `favorite button of track`);
      const response = await responsePromise;
      const responseBody = await response.json();
      responseIDs.push(responseBody.id);
    }
    return responseIDs;
  }
  async scrollByVisibleTrackNumber(number){
    for(let i = 0;i < number ; i++){
    await this.scrollByVisibleElement(this.lastTrack(i), "last track");
    }
  }
  
  //Verify
  async expectTracksCount(value){
    await this.expectListToHaveCount(this.tracksName, value)
  };
  async expectMusicTracksToBeVisible(){
    await this.page.waitForSelector("article.item--audio h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.tracksName)
  };
  async expectFirstTrackFavoriteButtonIsActive (){
    await this.expectAttributeClassOfElement(this.favoriteButton(1), /active/)
  };
  async expectFirstTrackFavoriteButtonIsNotActive (){
    await this.expectAttributeClassOfElement(this.favoriteButton(1), "button favorite")
  };

  async expectFirstTrackButtonIsPause (){
    await this.expectAttributeToHaveValue(this.playButton(1),"xlink:href", /pause/)
  };
  async expectFirstTrackButtonIsPlay(){
    await this.expectAttributeToHaveValue(this.playButton(1),"xlink:href", /play/)
  };

  async expectFirstTrackIsNotPlaying (){
    await this.expectAttributeClassOfElement(this.track(1), "item item--audio active")
  };
  async expectFirstTrackIsNotActive (){
    await this.expectAttributeClassOfElement(this.track(1), "item item--audio")
  };
  async expectFirstTrackIsPlaying (){
    await this.expectAttributeClassOfElement(this.track(1),  /active playing/)
  };
  async expectSecondTrackIsNotActive (){
    await this.expectAttributeClassOfElement(this.track(2), "item item--audio")
  };
  async expectSecondTrackIsPlaying (){
    await this.expectAttributeClassOfElement(this.track(2),  /active playing/)
  };

  async expectProgressBarOfFirstTrackToHaveTimeValue (value){
    await this.expectAttributeToHaveValue(this.valueProgressBar(1), "style", value) 
  };
  async expectTracksNameToContainText(value){
    await this.expectTextsToContainSearchCriteria(this.tracksName, value)
  };

  async expectImageToHaveWight (property, value){
    await this.expectElementsToHaveJSProperty(this.allImages , property, value);
  };
}
