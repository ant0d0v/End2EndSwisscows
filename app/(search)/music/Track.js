import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Track extends BaseComponent {
  constructor(page) {
    super(page);
   //Locators
   this.musicTracks = this.page.locator("article.item--audio h2")
   this.firsTrack = this.page.locator("article.item--audio").nth(0)
   this.lastTrack = (id) => this.page.locator("article.item--audio").nth(`${id}`)
   this.favoriteButtonInFirsTrack = this.page.locator("button.button.favorite").nth(0)
   this.valueOfProgressBarInFirstTrack = this.page.locator("article.item--audio div.progress-bar div.progress").nth(0)
   this.timeLineInFirstTrack = this.page.locator("article.item--audio div.timeline").first()
   this.secondTrack = this.page.locator("article.item--audio").nth(1)
   this.playButtonInFirstTrack = this.page.locator("article.item--audio button.play-pause use").first()
   this.allPlayButton = this.page.locator("article.item--audio button.play-pause use")
  }
  //Action
  clickPlayButtonInFirstTrack = async () => {
    await this.clickElement( this.playButtonInFirstTrack,
      `play button in the first track`
    );
  };
  clickTimeLineInFirstTrack = async () => {
    await this.clickElement( this.timeLineInFirstTrack,
      `play button in the first track`
    );
  };
  clickPauseButtonInFirstTrack = async () => {
    await this.clickElement( this.playButtonInFirstTrack,
      `pause button in the first track`
    );
  };
  clickFavoriteButtonInFirstTrack = async () => {
    await this.clickElement(this.favoriteButtonInFirsTrack,
      `favorite button in the first track`
    );
  };
  scrollByVisibleLastTrack = async () => {
    for(let i = 0;i < 200 ; i++){
    await this.scrollByVisibleElement(this.lastTrack(i), "last track");
    }
  }
  //Verify
  expectMusicTracksToBeVisible = async () => {
    await this.page.waitForSelector("article.item--audio h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.musicTracks)
  };
  
}
