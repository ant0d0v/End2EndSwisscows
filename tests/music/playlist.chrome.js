import { test } from "../../utils/fixtures.js";

test("Check pause track on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("best");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistAt({ number: 1 });
  await app.musicPage.playlist.expectToBeHiddenPlaylistAt({ number: 1 });
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.track.clickPauseButtonAt({ number: 1 });

  //Assert
  await app.musicPlaylistPage.track.expectNotToBePlayingTrackAt({ number: 1 });
});

test("Check next button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("best");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistAt({ number: 1 });
  await app.musicPage.playlist.expectToBeHiddenPlaylistAt({ number: 1 });
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.player.clickNextButton();

  //Assert
  await app.musicPlaylistPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPlaylistPage.track.expectToBePlayingTrackAt({ number: 2 });
});

test("Check previous button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("best");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistAt({ number: 1 });
  await app.musicPage.playlist.expectToBeHiddenPlaylistAt({ number: 1 });
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPlaylistPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPlaylistPage.player.clickNextButton();
  await app.musicPlaylistPage.player.clickPrevButton();

  //Assert
  await app.musicPlaylistPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  await app.musicPlaylistPage.track.expectToBePlayingTrackAt({ number: 1 });
});

test("Check shuffle function in the player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Skofka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistAt({ number: 1 });
  await app.musicPage.playlist.expectToBeHiddenPlaylistAt({ number: 1 });
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonAt({ number: 1 });
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.player.clickShuffleButton();
  await app.musicPlaylistPage.player.clickNextButton();

  //Assert
  await app.musicPlaylistPage.track.expectNotToBeActiveTrackAt({ number: 2 });
  await app.musicPlaylistPage.player.expectShuffleButtonIsActive();
});

test("Check change region", async ({ app }) => {
  const value = "Best";
  const expectedUrl = new RegExp(
    `${process.env.WEB_URL}en/music/playlist\\?query=${value}&id=\\d+&region=de-DE`
  );
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(value);
  await app.home.header.searchForm.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistAt({ number: 1 });
  await app.musicPage.playlist.expectToBeHiddenPlaylistAt({ number: 1 });
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.header.clickHamburgerMenuButton();
  await app.musicPlaylistPage.header.hamburgerMenu.selectRegion("Germany");
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPlaylistPage.track.expectTracksCount(20);
  await app.expectPageToHaveUrl(app.page, expectedUrl);
});
