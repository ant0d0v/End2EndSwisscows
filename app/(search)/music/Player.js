import BaseComponent from "../../../base/BaseComponent.js";
import { expect } from "@playwright/test";

export default class MusicPlayer extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".audio-player");
    this.nextButton = this.page.getByRole("button", { name: "Next track" });
    this.playButton = this.page.getByRole("button", { name: "Play/Pause" });
    this.prevButton = page.getByRole("button", { name: "Previous track" });
    this.progress = this.root.locator(".progress");
    this.shuffleButton = this.page.getByRole("button", { name: "Shuffle" });
    this.favoriteButton = this.root.locator(".actions > button").first();
    this.timeLine = this.root.locator(".timeline");
    this.elapsedTime = this.root.locator(".elapsed");
    this.allButtons = this.root.locator(".controls .button");
    this.image = this.root.locator("img");
  }

  //Actions
  async clickNextButton() {
    await this.clickElement(this.nextButton, `next button in the player`);
  }

  async clickPrevButton() {
    await this.clickElement(this.prevButton, `prev button in the player`);
  }

  async clickPlayButton() {
    await this.clickElement(this.playButton, `play button in the player`);
  }
  async clickPauseButton() {
    await this.page.$eval("audio", (e) => e.pause());
  }
  async clickShuffleButton() {
    await this.clickElement(this.shuffleButton, `shuffle button in the player`);
  }
  async clickTimeLine() {
    await this.clickElement(this.timeLine, `time-line in the player`);
  }
  async clickFavoriteButton() {
    await this.clickElement(
      this.favoriteButton,
      `favorite button in the player`
    );
  }
  async clickFavoriteButtonAndGetResponse() {
    let response;
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/music/tracks/my`
    );
    await this.clickElement(
      this.favoriteButton,
      `favorite button n the player`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  }

  //Verify
  async expectElapsedTimeToHaveText(value) {
    await this.expectTextToContain(this.elapsedTime, value);
  }
  async expectTimelineToBeGreaterThan(value) {
    expect(
      await this.page.$eval("audio", (e) => e.currentTime)
    ).toBeGreaterThan(value);
  }
  async expectImageToHaveWight(property, value) {
    await this.expectElementToHaveJSProperty(this.image, property, value);
  }
  async expectProgressToHaveValue(value) {
    await this.expectAttributeToHaveValue(
      this.progress,
      "style",
      new RegExp("width: " + value)
    );
  }

  async expectShuffleButtonIsActive() {
    await this.expectAttributeClassOfElement(this.shuffleButton, /active/);
  }
}
