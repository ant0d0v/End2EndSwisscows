import { test, deletionIds } from "../../../utils/fixtures.js";
const value = "Skofka";
const firstTrack = 1;
import testData from "../../../data/error/testData.json";

test.describe("Internal user", () => {
  test.describe.configure({ mode: "default" });
  test("Check No items Found error page ", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonNumberTrack(firstTrack);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickFavoriteButtonNumberTrack(1);

    //Assert
    await app.musicMyPage.error.expectContentToHaveText(
      testData.expectedErrorText.noItemsFound
    );
    await app.musicPage.error.expectErrorImageToBeVisible();
    await app.musicPage.error.expectImageToHaveWight(450);
  });

  test("Check delete track from favorite using player on my music page ", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonNumberTrack(firstTrack);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicMyPage.player.clickFavoriteButton();

    //Assert
    await app.musicMyPage.error.expectContentToHaveText(
      testData.expectedErrorText.noItemsFound
    );
    await app.musicPage.error.expectErrorImageToBeVisible();
    await app.musicPage.error.expectImageToHaveWight(450);
  });

  test("Check play track on music my page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    deletionIds.myTracks.internalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.player.expectElapsedTimeToHaveText(/0:04/);
  });

  test("Check pause track on my music page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicMyPage.track.expectFirstTrackIsPlaying();
    await app.musicMyPage.track.clickPauseButtonNumberTrack(firstTrack);
    deletionIds.myTracks.internalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectFirstTrackIsNotPlaying();
  });

  test("Check set time in track", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicMyPage.player.expectProgressToHaveValue("2");
    await app.musicMyPage.track.clickTimeLineNumberTrack(firstTrack);
    deletionIds.myTracks.internalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectProgressToHaveValue(firstTrack, "50");
    await app.musicMyPage.player.expectProgressToHaveValue("50");
  });
});

test.describe("External user", () => {
  test.describe.configure({ mode: "default" });
  test.use({ storageState: "./data/auth/externalUser.json" });
  test("Check set time in the player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicMyPage.player.expectProgressToHaveValue("2");
    await app.musicMyPage.player.clickTimeLine();
    deletionIds.myTracks.externalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectProgressToHaveValue(firstTrack, "50");
    await app.musicMyPage.player.expectProgressToHaveValue("50");
  });

  test("Check pause track in player on my music page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicMyPage.track.expectFirstTrackIsPlaying();
    await app.musicMyPage.player.clickPauseButton();
    deletionIds.myTracks.externalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectFirstTrackIsNotPlaying();
  });

  test("Check play track in player on my music page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.track.clickPlayButtonNumberTrack(firstTrack);
    await app.musicMyPage.player.expectProgressToHaveValue("2");
    await app.musicMyPage.player.clickPauseButton();
    await app.musicMyPage.player.clickPlayButton();
    deletionIds.myTracks.externalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectFirstTrackIsPlaying();
  });

  test("Check regional search", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    await app.musicMyPage.header.clickHamburgerMenuButton();
    await app.musicMyPage.header.hamburgerMenu.selectRegion("Germany");
    await app.musicMyPage.track.expectMusicTracksToBeVisible();
    deletionIds.myTracks.externalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectTracksNameToContainText(
      value.toLowerCase()
    );
    await app.musicMyPage.track.expectTracksCount(1);
    await app.musicMyPage.track.expectAreElementsInListDisplayed(
      app.musicMyPage.track.allPlayButtons
    );
    await app.musicMyPage.expectPageUrlToHaveParameter(
      `?query=${value}&region=de-DE`
    );
  });

  test("Check adding multiple favorites to a my  playlist ", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(value);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteIDs =
      await app.musicPage.track.clickAllFavoriteButtonsOfTracksAndGetResponses();
    await app.musicPage.clickFavoritePlaylist();
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`);
    deletionIds.myTracks.externalUser.push(...favoriteIDs);

    //Assert
    await app.musicMyPage.track.expectTracksCount(22);
    await app.musicMyPage.track.expectAreElementsInListDisplayed(
      app.musicMyPage.track.allPlayButtons
    );
  });
});
