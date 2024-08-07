import { test } from "../../../utils/fixtures.js";
const value = "Skofka";
const firstTrack = 1;
const firstPlaylist = 1;
test("Check pause track on music page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(value);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistNumber(firstPlaylist);
  await app.musicPlaylistPage.expectPageUrlToHaveParameter(
    `?query=${value}&id=\\d`
  );
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.track.clickPauseButtonNumberTrack(firstTrack);

  //Assert
  await app.musicPlaylistPage.track.expectFirstTrackIsNotPlaying();
});

test("Check next button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(value);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistNumber(firstPlaylist);
  await app.musicPlaylistPage.expectPageUrlToHaveParameter(
    `?query=${value}&id=\\d`
  );
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.player.clickNextButton();

  //Assert
  await app.musicPlaylistPage.player.expectElapsedTimeToHaveText(/0:04/);
  await app.musicPlaylistPage.track.expectSecondTrackIsPlaying();
});

test("Check previous button of track on the main page", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(value);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistNumber(firstPlaylist);
  await app.musicPlaylistPage.expectPageUrlToHaveParameter(
    `?query=${value}&id=\\d`
  );
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.player.clickNextButton();
  await app.musicPlaylistPage.player.clickPrevButton();

  //Assert
  await app.musicPlaylistPage.player.expectElapsedTimeToHaveText(/0:04/);
  await app.musicPlaylistPage.track.expectFirstTrackIsPlaying();
});

test("Check set time in track", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(value);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistNumber(firstPlaylist);
  await app.musicPlaylistPage.expectPageUrlToHaveParameter(
    `?query=${value}&id=\\d`
  );
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.track.clickTimeLineNumberTrack(firstTrack);

  //Assert
  await app.musicPlaylistPage.track.expectProgressToHaveValue(firstTrack, "50");
  await app.musicPlaylistPage.player.expectProgressToHaveValue("50");
});

test("Check shuffle function in the player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(value);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistNumber(firstPlaylist);
  await app.musicPlaylistPage.expectPageUrlToHaveParameter(
    `?query=${value}&id=\\d`
  );
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(firstTrack);
  await app.musicPlaylistPage.player.expectProgressToHaveValue("2");
  await app.musicPlaylistPage.player.clickShuffleButton();
  await app.musicPlaylistPage.player.clickNextButton();

  //Assert
  await app.musicPlaylistPage.track.expectSecondTrackIsNotActive();
  await app.musicPlaylistPage.player.expectShuffleButtonIsActive();
});

test("Check change region", async ({ app }) => {
  const expectedUrl = new RegExp(
    `${process.env.WEB_URL}en/music/playlist\\?query=${value}&id=\\d+&region=de-DE`
  );
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(value);
  await app.home.header.searchBar.clickEnterSearchField();
  await app.musicPage.header.navigation.clickMusicTab();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.clickPlaylistNumber(firstPlaylist);
  await app.musicPlaylistPage.expectPageUrlToHaveParameter(
    `?query=${value}&id=\\d`
  );
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();
  await app.musicPlaylistPage.header.clickHamburgerMenuButton();
  await app.musicPlaylistPage.header.hamburgerMenu.selectRegion("Germany");
  await app.musicPlaylistPage.track.expectMusicTracksToBeVisible();

  //Assert
  await app.musicPlaylistPage.track.expectTracksCount(20);
  await app.musicPlaylistPage.track.expectAreElementsInListDisplayed(
    app.musicPlaylistPage.track.allPlayButtons
  );
  await app.expectPageToHaveUrl(app.page, expectedUrl);
});
