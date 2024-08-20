import { test, deletionIds } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";
const firstTrack = 1;
const firstPlaylist = 1;
const secondPlaylist = 2;

test("Check 204 No Results Found error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, 204);
});

test("Check request is blocked 450 error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("porno");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, 450);
});

test("Check 500 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/audio/search", 500);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, 500);
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/audio/search", 429);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();

  //Assert
  await app.musicPage.error.takeSnapshot(testInfo, 429);
});
test.describe("favorite function", () => {
  test.use({ mode: "default" });
  test("Check add track in the favorite", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(
        firstTrack
      );

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsActive();
    await app.musicPage.favoritePlaylist.expectCountToHaveText("1 tracks");
    deletionIds.myTracks.internalUser.push(favoriteID);
  });

  test("Check delete track from the favorite", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonNumberTrack(firstTrack);
    await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicPage.player.expectProgressToHaveValue("2");
    await app.musicPage.track.clickFavoriteButtonNumberTrack(firstTrack);

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsNotActive();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
  });

  test("Check add track in the favorite from player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicPage.player.expectProgressToHaveValue("2");
    const favoriteID =
      await app.musicPage.player.clickFavoriteButtonAndGetResponse();

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsActive();
    await app.musicPage.favoritePlaylist.expectCountToHaveText("1 tracks");
    deletionIds.myTracks.internalUser.push(favoriteID);
  });

  test("Check delete track from the favorite using player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonNumberTrack(firstTrack);
    await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicPage.player.expectProgressToHaveValue("2");
    await app.musicPage.player.clickFavoriteButton();

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsNotActive();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
  });
});

test("Check play track on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);

  //Assert
  await app.musicPage.player.expectTimelineToBeGreaterThan(0.5);
  await app.musicPage.track.expectFirstTrackIsPlaying();
});

test("Check pause track on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.track.clickPauseButtonNumberTrack(1);

  //Assert
  await app.musicPage.track.expectFirstTrackIsNotPlaying();
});

test("Check next button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.clickNextButton();
  await app.musicPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);

  //Assert
  await app.musicPage.player.expectTimelineToBeGreaterThan(0.5);
  await app.musicPage.track.expectFirstTrackIsNotActive();
  await app.musicPage.track.expectSecondTrackIsPlaying();
});

test("Check previous button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.player.clickNextButton();
  await app.musicPage.player.clickPrevButton();
  await app.musicPage.player.expectProgressToHaveValue("2");

  //Assert
  await app.musicPage.player.expectTimelineToBeGreaterThan(0.5);
  await app.musicPage.track.expectFirstTrackIsPlaying();
  await app.musicPage.track.expectSecondTrackIsNotActive();
});

test("Check set time in track", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.track.clickTimeLineNumberTrack(firstTrack);

  //Assert
  await app.musicPage.track.expectProgressToHaveValue(firstTrack, "50");
  await app.musicPage.player.expectProgressToHaveValue("50");
});

test("Check set time in the player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.player.clickTimeLine();

  //Assert
  await app.musicPage.track.expectProgressToHaveValue(firstTrack, "50");
  await app.musicPage.player.expectProgressToHaveValue("50");
});

test("Check pause track in player on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.player.clickPauseButton();

  //Assert
  await app.musicPage.track.expectFirstTrackIsNotPlaying();
});

test("Check play track in player on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.player.clickPauseButton();
  await app.musicPage.player.clickPlayButton();

  //Assert
  await app.musicPage.track.expectFirstTrackIsPlaying();
});

test("Check shuffle function in the player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPage.player.expectProgressToHaveValue("2");
  await app.musicPage.player.clickShuffleButton();
  await app.musicPage.player.clickNextButton();

  //Assert
  await app.musicPage.track.expectSecondTrackIsNotActive();
  await app.musicPage.player.expectShuffleButtonIsActive();
});

test("Check infinity scroll to next page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.genre());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.scrollByVisibleTrackNumber(20);
  await app.musicPage.preloader.expectPreloaderToBeHidden();
  await app.musicPage.track.scrollByVisibleTrackNumber(40);
  await app.musicPage.preloader.expectPreloaderToBeVisible();
  await app.musicPage.preloader.expectPreloaderToBeHidden();

  //Assert
  await app.musicPage.track.expectListToBeGreaterThanOrEqual(
    app.musicPage.track.tracksName,
    60
  );
});

test("Check that music results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("billie jean");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.expectTracksNameToContainText("billie jean");
  await app.musicPage.track.expectTracksCount(20);
  await app.musicPage.track.expectAreElementsInListDisplayed(
    app.musicPage.track.allPlayButtons
  );
});

test("Check regional search", async ({ app }) => {
  const query = "billie jean";
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(query);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.header.clickHamburgerMenuButton();
  await app.musicPage.header.hamburgerMenu.selectRegion("Germany");
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.expectTracksNameToContainText(query);
  await app.musicPage.track.expectTracksCount(20);
  await app.musicPage.track.expectAreElementsInListDisplayed(
    app.musicPage.track.allPlayButtons
  );
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/music?query=billie+jean&region=de-DE`
  );
});

test("Check the width and visibility images of playlist", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("billie jean");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.playlist.expectImageToHaveWight("width", 180);
  await app.musicPage.playlist.expectAreElementsInListDisplayed(
    app.musicPage.playlist.allImages
  );
  await app.musicPage.playlist.expectListToHaveCount(
    app.musicPage.playlist.allImages,
    20
  );
});

test("Check the width and visibility images of tracks", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.expectImageToHaveWight("width", 64);
  await app.musicPage.track.expectTracksCount(20);
  await app.musicPage.track.expectAreElementsInListDisplayed(
    app.musicPage.track.allImages
  );
});

test("Check width and visibility image in player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);

  //Assert
  await app.musicPage.player.expectImageToHaveWight("width", 64);
  await app.musicPage.player.expectElementToBeVisible(
    app.musicPage.player.image
  );
});

test("Checking the Next button in the slide", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.genre());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.playlist.clickNextButton();

  //Assert
  await app.musicPage.playlist.expectSwiperSlideIs(firstPlaylist, /slide-prev/);
  await app.musicPage.playlist.expectSwiperSlideIs(
    secondPlaylist,
    /slide-active/
  );
  await app.musicPage.playlist.expectPrevButtonIsEnabled();
});

test("Checking the Prev button in the slide", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.genre());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.playlist.clickNextButton();
  await app.musicPage.playlist.expectPrevButtonIsEnabled();
  await app.musicPage.playlist.clickPrevButton();

  //Assert
  await app.musicPage.playlist.expectSwiperSlideIs(
    firstPlaylist,
    /slide-active/
  );
  await app.musicPage.playlist.expectSwiperSlideIs(
    secondPlaylist,
    /slide-next/
  );
  await app.musicPage.playlist.expectPrevButtonIsDisabled();
});

test("Check design of widget-header component on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("best tracks");
  await app.home.header.searchBar.clickEnterSearchField();
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
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPage.track.takeSnapshot(testInfo);
});

test("Check design of button when track is playing  on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);

  //Assert
  await app.musicPage.track.takeSnapshot(testInfo);
});

test("Check design of player component  on music page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.track.clickPlayButtonNumberTrack(firstTrack);

  //Assert
  await app.musicPage.player.takeSnapshot(testInfo);
});
