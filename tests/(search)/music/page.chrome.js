import { test, deletionIds, expect } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
import {
  saveStorageState,
  readStorageState,
} from "../../../helpers/authHelper.js";

test.skip("Check 204 No Results Found error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, {
    error: 204,
    name: "music",
  });
});

test("Check request is blocked 450 error music page", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, {
    error: 450,
    name: "music",
  });
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/audio/search", 500);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, {
    error: 500,
    name: "music",
  });
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/audio/search", 429);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, {
    error: 429,
    name: "music",
  });
});

test.fixme("Check design music page", async ({ app },testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseMusicBody("/audio/search/playlists", 'data/mock/music/testDataPlaylist.json');
  await app.route.mockResponseMusicBody("/audio/search/tracks", 'data/mock/music/testDataTrack.json');
  await app.home.header.searchForm.inputSearchCriteria("ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.takeSnapshot(testInfo);
});

test.describe("favorite function", () => {
  test.use({ mode: "default" });
  test("Check add track in the favorite", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(
      faker.music.songName()
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({
        number: 1,
      });
    deletionIds.myTracks.internalUser.push(favoriteID);

    //Assert
    await app.musicPage.track.expectToBeActiveFavoriteButtonAt({ number: 1 });
    await app.musicPage.favoritePlaylist.expectCountToHaveText("1 tracks");
  });

  test("Check delete track from the favorite", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(
      faker.music.songName()
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonAt({ number: 1 });
    await app.musicPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
    await app.musicPage.track.clickFavoriteButtonAt({ number: 1 });

    //Assert
    await app.musicPage.track.expectNotToBeActiveFavoriteButtonAt({
      number: 1,
    });
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
  });

  test("Check add track in the favorite from player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(
      faker.music.songName()
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
    const favoriteID =
      await app.musicPage.player.clickFavoriteButtonAndGetResponse();
    deletionIds.myTracks.internalUser.push(favoriteID);

    //Assert
    await app.musicPage.track.expectToBeActiveFavoriteButtonAt({ number: 1 });
    await app.musicPage.favoritePlaylist.expectCountToHaveText("1 tracks");
  });

  test("Check delete track from the favorite using player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria(
      faker.music.songName()
    );
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonAt({ number: 1 });
    await app.musicPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
    await app.musicPage.player.clickFavoriteButton();

    //Assert
    await app.musicPage.track.expectNotToBeActiveFavoriteButtonAt({
      number: 1,
    });
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
  });
});

test("Check play track on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);

  //Assert
  await app.musicPage.player.expectTimelineToBeGreaterThan(0.5);
  await app.musicPage.track.expectToBePlayingTrackAt({ number: 1 });
});

test("Check pause track on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.track.clickPauseButtonAt({ number: 1 });

  //Assert
  await app.musicPage.track.expectNotToBePlayingTrackAt({ number: 1 });
});

test("Check next button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.clickNextButton();
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);

  //Assert
  await app.musicPage.player.expectTimelineToBeGreaterThan(0.5);
  await app.musicPage.track.expectNotToBeActiveTrackAt({ number: 1 });
  await app.musicPage.track.expectToBePlayingTrackAt({ number: 2 });
});

test("Check previous button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.player.clickNextButton();
  await app.musicPage.player.clickPrevButton();
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);

  //Assert
  await app.musicPage.player.expectTimelineToBeGreaterThan(0.5);
  await app.musicPage.track.expectToBePlayingTrackAt({ number: 1 });
  await app.musicPage.track.expectNotToBeActiveTrackAt({ number: 2 });
});

test("Check set time in track", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.track.clickTimeLineAt({ number: 1 });

  //Assert
  await app.musicPage.track.expectProgressToHave({
    trackNumber: 1,
    value: "50",
  });
  await app.musicPage.player.expectProgressToHaveValue("50");
});

test("Check set time in the player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.player.clickTimeLine();

  //Assert
  await app.musicPage.track.expectProgressToHave({
    trackNumber: 1,
    value: "50",
  });
  await app.musicPage.player.expectProgressToHaveValue("50");
});

test("Check pause track in player on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.player.clickPauseButton();

  //Assert
  await app.musicPage.track.expectNotToBePlayingTrackAt({ number: 1 });
});

test("Check play track in player on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.player.clickPauseButton();
  await app.musicPage.player.clickPlayButton();

  //Assert
  await app.musicPage.track.expectToBePlayingTrackAt({ number: 1 });
});

test("Check shuffle function in the player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.player.clickShuffleButton();
  await app.musicPage.player.clickNextButton();

  //Assert
  await app.musicPage.track.expectNotToBeActiveTrackAt({ number: 2 });
  await app.musicPage.player.expectShuffleButtonIsActive();
});

test("Check shuffle function in local storage", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPage.player.clickShuffleButton();
  await saveStorageState(app.page);
  const savedLocalStorage = await readStorageState();
  const value = savedLocalStorage["player.shuffle"];

  //Assert
  expect(value).toEqual('true');
});

test("Check infinity scroll to next page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("best");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.scrollByVisibleLastTrack();

  //Assert
  await app.musicPage.track.expectTracksCount(100);
});

test("Check that music results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("billie jean");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.expectTracksNameToContainText("billie jean");
  await app.musicPage.track.expectTracksCount(20);
});

test("Check regional search", async ({ app }) => {
  const query = "billie jean";
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(query);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.header.clickHamburgerMenuButton();
  await app.musicPage.header.hamburgerMenu.selectRegion("Germany");
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.expectTracksNameToContainText(query);
  await app.musicPage.track.expectTracksCount(20);
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/music?query=billie+jean&region=de-DE`
  );
});

test("Check the width and visibility images of playlist", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("billie jean");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.playlist.expectImageToHavePropetry({
    width: 180,
    height: 180,
  });
  await app.musicPage.playlist.expectImagesPlaylistToBeVisible();
  await app.musicPage.playlist.expectPlaylistsCount(20);
});

test("Check the width and visibility images of tracks", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.expectImageToHavePropetry({
    width: 64,
    height: 64,
  });
  await app.musicPage.track.expectTracksCount(20);
  await app.musicPage.track.expectImageTracksToBeVisible();
});

test("Check width and visibility image in player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });

  //Assert
  await app.musicPage.player.expectImageToHavePropetry({
    width: 64,
    height: 64,
  });
  await app.musicPage.player.expectPlayerImageToBeVisible();
});

test("Checking the Next button in the slide", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Skofka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.playlist.clickNextButton();

  //Assert
  await app.musicPage.playlist.expectToHaveAttributeSlideAt({
    number: 1,
    attribute: /slide-prev/,
  });
  await app.musicPage.playlist.expectToHaveAttributeSlideAt({
    number: 2,
    attribute: /slide-active/,
  });
  await app.musicPage.playlist.expectPrevButtonIsEnabled();
});

test("Checking the Prev button in the slide", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Skofka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.playlist.clickNextButton();
  await app.musicPage.playlist.expectPrevButtonIsEnabled();
  await app.musicPage.playlist.clickPrevButton();

  //Assert
  await app.musicPage.playlist.expectToHaveAttributeSlideAt({
    number: 1,
    attribute: /slide-active/,
  });
  await app.musicPage.playlist.expectToHaveAttributeSlideAt({
    number: 2,
    attribute: /slide-next/,
  });
  await app.musicPage.playlist.expectPrevButtonIsDisabled();
});

test("Check design of widget-header component on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("best tracks");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.playlist.takeSnapshot(testInfo);
});

test("Check design of button when track is not playing  on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.takeSnapshot(testInfo, { number: 1 });
});

test("Check design of button when track is playing  on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });

  //Assert
  await app.musicPage.track.takeSnapshot(testInfo, { number: 1 });
});

test("Check design of player component  on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonAt({ number: 1 });

  //Assert
  await app.musicPage.player.takeSnapshot(testInfo);
});
