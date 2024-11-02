import BaseComponent from "../../../base/BaseComponent.js";
export default class Track extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.root = this.page.locator("article.item.audio-object");
    this.lastTrack = this.page.locator("article.item.audio-object:last-child");
    this.title = this.root.locator(`.title`);
    this.favoriteButtons = this.page.locator('button[name ="like"]');
    this.allFavoriteButtons = this.page.locator(
      'button[name ="like"]:nth-child(-n+20)'
    );
    this.progress = this.root.locator(`.progress`);
    this.timeLine = this.root.locator(`.timeline`);
    this.playButtons = this.page.locator(`button[name ="play"]`);
    this.images = this.root.locator(`img`);
  }
  //Action
  async clickPlayButtonAt(track = { number: index }) {
    await this.clickElement(
      this.playButtons.nth(track.number - 1),
      `play button of track with index${track.number - 1}`
    );
  }

  async clickTimeLineAt(track = { number: index }) {
    await this.clickElement(
      this.timeLine.nth(track.number - 1),
      `Time Line of track with index${track.number - 1}`
    );
  }

  async clickPauseButtonAt(track = { number: index }) {
    await this.clickElement(
      this.playButtons.nth(track.number - 1),
      `pause button of track with index${track.number - 1}`
    );
  }

  async clickFavoriteButtonAt(track = { number: index }) {
    await this.clickElement(
      this.favoriteButtons.nth(track.number - 1),
      `favorite button of track with index${track.number - 1}`
    );
  }

  async clickFavoriteButtonAtAndGetResponse(track = { number: index }) {
    let response;
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/music/tracks/my`
    );
    await this.clickElement(
      this.favoriteButtons.nth(track.number - 1),
      `favorite button of track with index${track.number - 1}`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  }

  async clickAllFavoriteButtonsOfTracksAndGetResponses() {
    let responseIDs = [];
    for (const favoriteButton of await this.allFavoriteButtons.all()) {
      const responsePromise = this.page.waitForResponse(
        `${process.env.API_URL}/music/tracks/my`
      );
      await this.clickElement(favoriteButton, `favorite button of track`);
      const response = await responsePromise;
      const responseBody = await response.json();
      responseIDs.push(responseBody.id);
    }
    return responseIDs;
  }

  async scrollByVisibleLastTrack() {
    await this.scrollByVisibleElement(this.root.last());
  }

  //Verify
  async expectTracksCount(value) {
    await this.expectListToHaveCount(this.title, value);
  }

  async expectMusicTracksToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.title);
  }
  async expectImageTracksToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.images);
  }

  async expectToBeActiveFavoriteButtonAt(track = { number: index }) {
    await this.expectAttributeClassOfElement(
      this.favoriteButtons.nth(track.number - 1),
      /active/
    );
  }

  async expectNotToBeActiveFavoriteButtonAt(track = { number: index }) {
    await this.expectAttributeClassOfElement(
      this.favoriteButtons.nth(track.number - 1),
      "button"
    );
  }

  async expectNotToBePlayingTrackAt(track = { number: index }) {
    await this.expectAttributeClassOfElement(
      this.root.nth(track.number - 1),
      "item audio-object active"
    );
  }

  async expectToBePlayingTrackAt(track = { number: index }) {
    await this.expectAttributeClassOfElement(
      this.root.nth(track.number - 1),
      /active playing/
    );
  }

  async expectNotToBeActiveTrackAt(track = { number: index }) {
    await this.expectAttributeClassOfElement(
      this.root.nth(track.number - 1),
      "item audio-object"
    );
  }

  async expectProgressToHave(
    expected = {
      trackNumber: index,
      value: string,
    }
  ) {
    await this.expectAttributeToHaveValue(
      this.progress.nth(expected.trackNumber - 1),
      "style",
      new RegExp("width: " + expected.value)
    );
  }

  async expectTracksNameToContainText(value) {
    await this.expectTextsToContainSearchCriteria(this.title, value);
  }

  async expectImageToHavePropetry(
    expectedProperty = { width: value, height: value }
  ) {
    await this.expectElementsToHaveJSProperty(
      this.images,
      "width",
      expectedProperty.width
    );
    await this.expectElementsToHaveJSProperty(
      this.images,
      "height",
      expectedProperty.height
    );
  }

  takeSnapshot = async (testInfo, track = { number: value}) => {
    await this.expectPageElementToHaveScreenshot(
      this.playButtons.nth(track.number - 1),
      this.root,
      testInfo
    );
  };
}
