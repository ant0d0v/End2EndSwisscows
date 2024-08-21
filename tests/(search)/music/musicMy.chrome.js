import { test, deletionIds } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test.describe("Internal user", () => {
  test.describe.configure({ mode: "default" });
  test("Check No items Found error page ", async ({ app },testInfo) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonAt({ number: 1 });
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickFavoriteButtonAt({ number: 1 });

    //Assert
    await app.musicMyPage.error.takeSnapshot(testInfo, 204);
  });

  test("Check delete track from favorite using player on my music page ", async ({
    app,
  },testInfo ) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    await app.musicPage.track.clickFavoriteButtonAt({ number: 1 });
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicMyPage.player.clickFavoriteButton();

    //Assert
    await app.musicMyPage.error.takeSnapshot(testInfo, 204);
  });

  test("Check play track on music my page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.internalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 })

    //Assert
    await app.musicMyPage.player.expectElapsedTimeToHaveText(/^0:0[4-9]$/);
  });

  test("Check pause track on my music page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.internalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicMyPage.track.expectToBePlayingTrackAt({ number: 1 });
    await app.musicMyPage.track.clickPauseButtonAt({ number: 1 });

    //Assert
    await app.musicMyPage.track.expectNotToBePlayingTrackAt({ number: 1 });
  });

  test("Check set time in track", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.internalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicMyPage.player.expectProgressToHaveValue("2");
    await app.musicMyPage.track.clickTimeLineAt({ number: 1 });

    //Assert
    await app.musicMyPage.track.expectProgressToHave({ trackNumber: 1, value: "50" });
    await app.musicMyPage.player.expectProgressToHaveValue("50");
  });
});

test.describe("External user", () => {
  test.describe.configure({ mode: "default" });
  test.use({ storageState: "./data/auth/externalUser.json" });
  test("Check set time in the player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.externalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicMyPage.player.expectProgressToHaveValue("2");
    await app.musicMyPage.player.clickTimeLine();

    //Assert
    await app.musicMyPage.track.expectProgressToHave({ trackNumber: 1, value: "50" });
    await app.musicMyPage.player.expectProgressToHaveValue("50");
  });

  test("Check pause track in player on my music page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.externalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicMyPage.track.expectToBePlayingTrackAt({ number: 1 });
    await app.musicMyPage.player.clickPauseButton();

    //Assert
    await app.musicMyPage.track.expectNotToBePlayingTrackAt({ number: 1 });
  });

  test("Check play track in player on my music page", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.externalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.track.clickPlayButtonAt({ number: 1 });
    await app.musicMyPage.player.expectProgressToHaveValue("2");
    await app.musicMyPage.player.clickPauseButton();
    await app.musicMyPage.player.clickPlayButton();

    //Assert
    await app.musicMyPage.track.expectToBePlayingTrackAt({ number: 1 });
  });

  test("Check regional search", async ({ app }) => {
     const searchCriteria = "Skofka";
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(searchCriteria);
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteID =
      await app.musicPage.track.clickFavoriteButtonAtAndGetResponse({ number: 1 });
    deletionIds.myTracks.externalUser.push(favoriteID);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();
    await app.musicMyPage.header.clickHamburgerMenuButton();
    await app.musicMyPage.header.hamburgerMenu.selectRegion("Germany");
    await app.musicMyPage.track.expectMusicTracksToBeVisible();

    //Assert
    await app.musicMyPage.track.expectTracksNameToContainText(
      searchCriteria.toLowerCase()
    );
    await app.musicMyPage.track.expectTracksCount(1);
    await app.musicMyPage.expectPageUrlToHaveParameter(
      `?query=${searchCriteria}&region=de-DE`
    );
  });

  test("Check adding multiple favorites to a my  playlist ", async ({
    app,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
    await app.home.header.searchBar.clickEnterSearchField();
    await app.musicPage.header.navigation.clickMusicTab();
    await app.musicPage.track.expectMusicTracksToBeVisible();
    const favoriteIDs =
      await app.musicPage.track.clickAllFavoriteButtonsOfTracksAndGetResponses();
    deletionIds.myTracks.externalUser.push(...favoriteIDs);
    await app.musicPage.clickFavoritePlaylist();
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden();

    //Assert
    await app.musicMyPage.track.expectTracksCount(22);
  });
});
