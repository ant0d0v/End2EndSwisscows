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
    let response;
    const responsePromise = this.page.waitForResponse(`${ process.env.API_URL}/music/tracks/my`)
    await this.clickElement(this.favoriteButton(index),
      `favorite button of track with index${index}`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };
  clickAllFavoriteButtonsOfTracksAndGetResponses = async () => {
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
  deleteTrackFromFavorite = async (id, data) => {
    const context = await request.newContext()
    await context.delete(`${ process.env.API_URL}/music/tracks/my/${id}`,{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${data["origins"][0]["localStorage"][0]["value"]}`,
    },
   });

  }

  scrollByVisibleTrackNumber = async (number) => {
    for(let i = 0;i < number ; i++){
    await this.scrollByVisibleElement(this.lastTrack(i), "last track");
    }
  }
  
  //Verify
  expectTracksCount  = async (value) => {
    await this.expectListToHaveCount(this.tracksName, value)
  };
  expectMusicTracksToBeVisible = async () => {
    await this.page.waitForSelector("article.item--audio h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.tracksName)
  };
  expectFirstTrackFavoriteButtonIsActive = async () => {
    await this.expectAttributeClassOfElement(this.favoriteButton(1), /active/)
  };
  expectFirstTrackFavoriteButtonIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.favoriteButton(1), "button favorite")
  };

  expectFirstTrackButtonIsPause = async () => {
    await this.expectAttributeToHaveValue(this.playButton(1),"xlink:href", /pause/)
  };
  expectFirstTrackButtonIsPlay = async () => {
    await this.expectAttributeToHaveValue(this.playButton(1),"xlink:href", /play/)
  };

  expectFirstTrackIsNotPlaying = async () => {
    await this.expectAttributeClassOfElement(this.track(1), "item item--audio active")
  };
  expectFirstTrackIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.track(1), "item item--audio")
  };
  expectFirstTrackIsPlaying = async () => {
    await this.expectAttributeClassOfElement(this.track(1),  /active playing/)
  };
  expectSecondTrackIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.track(2), "item item--audio")
  };
  expectSecondTrackIsPlaying = async () => {
    await this.expectAttributeClassOfElement(this.track(2),  /active playing/)
  };

  expectProgressBarOfFirstTrackToHaveTimeValue = async (value) => {
    await this.expectAttributeToHaveValue(this.valueProgressBar(1), "style", value) 
  };
  expectTracksNameToContainText = async (value) => {
    await this.expectTextsToContainSearchCriteria(this.tracksName, value)
  };

  expectImageToHaveWight = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImages , property, value);
  };
}
