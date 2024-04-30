import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class MusicPlayer extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.nextButton = this.page.getByRole('button', { name: 'Next track' })
    this.playButton = this.page.locator("button.button[title='Play/Pause'] use")
    this.prevButton = page.getByRole('button', { name: 'Previous track' })
    this.progressBar = this.page.locator('.progress-bar-wrap .progress')
    this.shuffleButton = this.page.getByRole('button', { name: 'Shuffle' })
    this.favoriteButton = this.page.locator(".audio-player button.button.favorite")
    this.timeLine = this.page.locator('.audio-player .timeline')
    this.durationTime = this.page.locator("div.audio-player div.timeline span").nth(0)
    this.allButtons = this.page.locator('.audio-player button')
    this.image = this.page.locator('.audio-player img')
  }
  
  //Actions
  async clickNextButton(){
    await this.clickElement(this.nextButton,
      `next button in the player`
    );
  };

  async clickPrevButton(){
    await this.clickElement(this.prevButton,
      `prev button in the player`
    );
  };

  async clickPlayButton() {
    await this.clickElement(this.playButton,
      `play button in the player`
    );
  };
  async clickPauseButton() {
    await this.page.$eval('audio', e => e.pause());
  };
  async clickShuffleButton (){
    await this.clickElement(this.shuffleButton,
      `shuffle button in the player`
    );
  };
  async clickTimeLine(){
    await this.clickElement(this.timeLine,
      `time-line in the player`
    );
  };
  async clickFavoriteButton() {
    await this.clickElement(this.favoriteButton,
      `favorite button in the player`
    );
  };
  async clickFavoriteButtonAndGetResponse(){
    let response;
    const responsePromise = this.page.waitForResponse(`${ process.env.API_URL}/music/tracks/my`)
    await this.clickElement(this.favoriteButton,
      `favorite button n the player`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };
  
  //Verify 
  async expectTimeToHaveText(value) {
    await this.expectTextToContain(this.durationTime,value);
  }
  async expectTimelineToBeGreaterThan(value) {
    expect(await this.page.$eval('audio', e => e.currentTime)).toBeGreaterThan(value);
  }
  async expectImageToHaveWight (property, value){
    await this.expectElementToHaveJSProperty(this.image , property, value);
  };
  async expectProgressBarToHaveTimeValue(value){
    await this.expectAttributeToHaveValue(this.progressBar, "style", value) 
  };
  async expectButtonIsPlay(){
    await this.expectAttributeToHaveValue(this.playButton,"xlink:href", /play/)
  };
  async expectButtonIsPause () {
    await this.expectAttributeToHaveValue(this.playButton,"xlink:href", /pause/)
  };
  async expectShuffleButtonIsActive (){
  await this.expectAttributeClassOfElement(this.shuffleButton, /active/) 
  }
  async expectFavoriteButtonIsActive () {
    await this.expectAttributeClassOfElement(this.favoriteButton, /active/) 
  }
  async expectFavoriteButtonIsNotActive(){
    await this.expectAttributeClassOfElement(this.favoriteButton, "button favorite") 
  }
}
