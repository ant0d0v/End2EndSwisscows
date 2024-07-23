import BaseComponent from "../../../base/BaseComponent.js";
export default class Track extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
   this.root = this.page.locator("article.item.audio-object");
   this.tracksName = this.root.locator(`h2`)
   this.track = (index) => this.root.nth(index - 1)
   this.lastTrack = (index) => this.root.nth(index - 1);
   this.favoriteButton = (index) => this.page.locator('button[name ="like"]').nth(index - 1)
   this.allFavoriteButtons = this.page.locator('button[name ="like"]:nth-child(-n+20)')
   this.progress = (index) => this.root.locator(`.progress`).nth(index - 1)
   this.timeLine = (index) => this.root.locator(`div.timeline`).nth(index - 1)
   this.playButton = (index) => this.page.locator(`button[name ="play"]`).nth(index - 1)
   this.allPlayButtons = this.root.locator(`button[name ="play"]`);
   this.allImages = this.root.locator(`img`)
   
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
    await this.scrollByVisibleElement(this.lastTrack(number), "last track");
  }
  
  //Verify
  async expectTracksCount(value){
    await this.expectListToHaveCount(this.tracksName, value)
  };
  async expectMusicTracksToBeVisible(){
    await this.page.waitForSelector("article.item.audio-object h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.tracksName)
  };
  async expectFirstTrackFavoriteButtonIsActive (){
    await this.expectAttributeClassOfElement(this.favoriteButton(1), /active/)
  };
  async expectFirstTrackFavoriteButtonIsNotActive (){
    await this.expectAttributeClassOfElement(this.favoriteButton(1), "button")
  };

  async expectFirstTrackIsNotPlaying (){
    await this.expectAttributeClassOfElement(this.track(1), "item audio-object active")
  };
  async expectFirstTrackIsNotActive (){
    await this.expectAttributeClassOfElement(this.track(1), "item audio-object")
  };
  async expectFirstTrackIsPlaying (){
    await this.expectAttributeClassOfElement(this.track(1),  /active playing/)
  };
  async expectSecondTrackIsNotActive (){
    await this.expectAttributeClassOfElement(this.track(2), "item audio-object")
  };
  async expectSecondTrackIsPlaying (){
    await this.expectAttributeClassOfElement(this.track(2),  /active playing/)
  };

  async expectProgressToHaveValue(index ,value){
    await this.expectAttributeToHaveValue(this.progress(index), "style",  new RegExp("width: " + value)); 
  };
  async expectTracksNameToContainText(value){
    await this.expectTextsToContainSearchCriteria(this.tracksName, value)
  };

  async expectImageToHaveWight (property, value){
    await this.expectElementsToHaveJSProperty(this.allImages , property, value);
  };
}
