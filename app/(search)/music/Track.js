import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");
const filterData = JSON.parse(
  JSON.stringify(require("../../../data/auth/user.json"))
);

export default class Track extends BaseComponent {
  constructor(page) {
    super(page);
  
    const root = "article.item--audio";
   //Locators
   this.tracksName = this.page.locator(`${root} h2`)
   this.track = (index) => this.page.locator(`${root}`).nth(index - 1)
   this.lastTrack = (id) => this.page.locator(`${root}`).nth(`${id}`)
   this.favoriteButton = (index) => this.page.locator("button.button.favorite").nth(index - 1)
   this.valueProgressBar = (index) => this.page.locator(`${root} div.progress-bar div.progress`).nth(index - 1)
   this.timeLine = (index) => this.page.locator(`${root} div.timeline`).nth(index - 1)
   this.playButton = (index) => this.page.locator(`${root} button.play-pause use`).nth(index - 1)
   this.allPlayButton = this.page.locator(`${root} button.play-pause use`)
  }
  //Action
  clickPlayButtonNumberTrack = async (index) => {
    await this.clickElement( this.playButton(index),
      `play button of track with index${index}`
    );
  };
  clickTimeLineNumberTrack = async (index) => {
    await this.clickElement( this.timeLine(index),
      `Time Line of track with index${index}`
    );
  };
  clickPauseButtonNumberTrack = async (index) => {
    await this.clickElement(this.playButton(index),
      `pause button of track with index${index}`
    );
  };
  clickFavoriteButtonNumberTrack = async (index) => {
    await this.clickElement(this.favoriteButton(index),
      `favorite button of track with index${index}`
    );
  };
  clickFavoriteButtonNumberTrackAndGetResponse = async (index) => {
    const responsePromise = this.page.waitForResponse(`${ process.env.API_URL}/music/tracks/my`)
    await this.clickElement(this.favoriteButton(index),
      `favorite button of track with index${index}`
    );
    const response = await responsePromise;
    return response;
  };
  deleteTrackFromFavorite = async (id) => {
    const response = await this.page.request.delete(`${ process.env.API_URL}/music/tracks/my/${id}`,{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${filterData["origins"][0]["localStorage"][0]["value"]}`,
    },
   });
    expect(response.status()).toBe(204);
  }

  scrollByVisibleTrackNumber = async (number) => {
    for(let i = 0;i < number ; i++){
    await this.scrollByVisibleElement(this.lastTrack(i), "last track");
    }
  }
  //Verify
  expectMusicTracksToBeVisible = async () => {
    await this.page.waitForSelector("article.item--audio h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.tracksName)
  };
  
}
