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
  clickNextButton = async () => {
    await this.clickElement(this.nextButton,
      `next button in the player`
    );
  };

  clickPrevButton = async () => {
    await this.clickElement(this.prevButton,
      `prev button in the player`
    );
  };

  clickPlayButton = async () => {
    await this.clickElement(this.playButton,
      `play button in the player`
    );
  };
  clickPauseButton = async () => {
    await this.clickElement(this.playButton,
      `pause button in the player`
    );
  };
  clickShuffleButton = async () => {
    await this.clickElement(this.shuffleButton,
      `shuffle button in the player`
    );
  };
  clickTimeLine = async () => {
    await this.clickElement(this.timeLine,
      `time-line in the player`
    );
  };
  clickFavoriteButton = async () => {
    await this.clickElement(this.favoriteButton,
      `favorite button in the player`
    );
  };
  clickFavoriteButtonAndGetResponse = async () => {
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
  expectImageToHaveWight = async (property, value) => {
    await this.expectElementToHaveJSProperty(this.image , property, value);
  };
  expectProgressBarToHaveTimeValue = async (value) => {
    await this.expectAttributeToHaveValue(this.progressBar, "style", value) 
  };
  expectButtonIsPlay = async () => {
    await this.expectAttributeToHaveValue(this.playButton,"xlink:href", /play/)
  };
  expectButtonIsPause = async () => {
    await this.expectAttributeToHaveValue(this.playButton,"xlink:href", /pause/)
  };
  expectShuffleButtonIsActive = async () => {
  await this.expectAttributeClassOfElement(this.shuffleButton, /active/) 
  }
  expectFavoriteButtonIsActive = async () => {
    await this.expectAttributeClassOfElement(this.favoriteButton, /active/) 
  }
  expectFavoriteButtonIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.favoriteButton, "button favorite") 
  }
}
