import { test} from "../../../utils/fixtures";
const testData = JSON.parse(
    JSON.stringify(require("../../../data/error/testData.json"))
  );

test("Check 202 No Results Found error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    
    //Assert
    await app.musicPage.expectElementToHaveText(app.musicPage.error.contentErrorNoResults,
      testData.expectedErrorText.noResultsFound202Error)
    await app.musicPage.expectElementToBeVisible(app.musicPage.error.errorImage)
  });

  test("Check request is blocked 450 error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("porn");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()

    //Assert
    await app.musicPage.expectElementToHaveText(app.musicPage.error.contentErrorNoResults, 
      testData.expectedErrorText.blocked450Error)
    await app.musicPage.expectElementToBeVisible(app.musicPage.error.errorImage)
  });

  test("Check 501 unknown Error Page  ", async ({
    app
  }) => {
    //Actions
    await app.musicPage.error.open500Page("/music")

    //Assert
    await app.musicPage.expectElementToHaveText(app.musicPage.error.contentErrorPage, 
      testData.expectedErrorText.unknown500Error)
    await app.musicPage.expectElementToBeVisible(app.musicPage.error.errorImage)
  });

  test("Check play track on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)

    //Assert
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.track.expectAttributeToHaveValue(app.musicPage.track.playButton(1),
        "xlink:href", /pause/)
  });

  test("Check pause track on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04" || "0:05")
    await app.musicPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.track(1),
      "item item--audio active")
    await app.musicPage.track.expectAttributeToHaveValue(app.musicPage.track.playButton(1),
        "xlink:href", /play/)
  });

  test("Check next button of track on the main page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04" || "0:05")
    await app.musicPage.player.clickNextButton()
    
    //Assert
    await app.musicPage.player.expectTimeToHaveText("0:04" || "0:05")
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.track(2), /playing/ )
  });

  test("Check previous button of track on the main page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickNextButton()
    await app.musicPage.player.clickPrevButton()

    //Assert
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.track(1), /playing/)
  });

  test("Check set time in track", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await app.musicPage.track.expectAttributeToHaveValue(app.musicPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await app.musicPage.player.expectAttributeToHaveValue(app.musicPage.player.progressBar,
      "style", /width: 5/)  
  });

  test("Check set time in the player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickTimeLine()

    //Assert
    await app.musicPage.track.expectAttributeToHaveValue(app.musicPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await app.musicPage.player.expectAttributeToHaveValue(app.musicPage.player.progressBar,
      "style", /width: 5/)
  });

  test("Check pause track in player on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickPauseButton()

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.track(1),
      "item item--audio active")
    await app.musicPage.track.expectAttributeToHaveValue(app.musicPage.track.playButton(1),
      "xlink:href", /play/)
    await app.musicPage.player.expectAttributeToHaveValue(app.musicPage.player.playButton,
      "xlink:href", /play/)    
  });

  test("Check play track in player on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickPauseButton()
    await app.musicPage.player.clickPlayButton()

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.track(1),
      "item item--audio active playing")
    await app.musicPage.track.expectAttributeToHaveValue(app.musicPage.track.playButton(1),
        "xlink:href", /pause/)
    await app.musicPage.player.expectAttributeToHaveValue(app.musicPage.player.playButton,
        "xlink:href", /pause/)      
  });

  test("Check shuffle function in the player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickShuffleButton()
    await app.musicPage.player.clickNextButton()

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.track(2),
      "item item--audio")
    await app.musicPage.player.expectAttributeClassOfElement(app.musicPage.player.shuffleButton, /active/) 
  });
  test.describe('favorite function', () => { test.use({ mode: "default" })
  test("Check add track in the favorite", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.favoriteButton(1),
      /active/)
    await app.musicPage.favoritePlaylist.expectPlaylistToHaveText(/My favorite tracks1/)
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)   
  });

  test("Check delete track from the favorite", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.favoriteButton(1),
      "button favorite")
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden()
  });

  test("Check add track in the favorite from player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickFavoriteButton()

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.favoriteButton(1),/active/)
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.player.favoriteButton, /active/)  
    await app.musicPage.favoritePlaylist.expectPlaylistToHaveText(/My favorite tracks1/)
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)   
  });

  test("Check delete track from the favorite using player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectTimeToHaveText("0:04")
    await app.musicPage.player.clickFavoriteButton()

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.track.favoriteButton(1),
      "button favorite")
    await app.musicPage.track.expectAttributeClassOfElement(app.musicPage.player.favoriteButton, "button favorite")    
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden()
  });
});

  test("Check infinity scroll to next page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.scrollByVisibleTrackNumber(200)
    await app.musicPage.preloader.waitUntilPreloaderToBeHidden()

    //Assert
    await app.musicPage.track.expectListToBeGreaterThanOrEqual(app.musicPage.track.tracksName, 200)
  });

  test("Check that music results equals search criteria", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("billie jean");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicPage.track. expectTextsToContainSearchCriteria(app.musicPage.track.tracksName, "billie jean")
    await app.musicPage.track.expectListToHaveCount(app.musicPage.track.tracksName, 20)
    await app.musicPage.track.expectAreElementsInListDisplayed(app.musicPage.track.allPlayButton)
  });

  test("Check regional search", async ({
    app,
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("billie jean");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.header.clickHamburgerMenuButton();
    await app.musicPage.header.hamburgerMenu.selectRegion("Germany");
    await app.musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicPage.track.expectTextsToContainSearchCriteria(app.musicPage.track.tracksName, "billie jean")
    await app.musicPage.track.expectListToHaveCount(app.musicPage.track.tracksName, 20)
    await app.musicPage.track.expectAreElementsInListDisplayed(app.musicPage.track.allPlayButton)
    await app.musicPage.expectHaveUrl(app.page, process.env.BASE_URL + "/en/music?query=billie+jean&region=de-DE")
  });

  test("Check the width and visibility images of playlist", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("billie jean");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicPage.playlist.expectImageToHaveWight("width", 50)
    await app.musicPage.playlist.expectListToHaveCount(app.musicPage.playlist.allImages, 3)
    await app.musicPage.playlist.expectAreElementsInListDisplayed(app.musicPage.playlist.allImages)
  });

  test("Check the width and visibility images of tracks", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("billie jean");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicPage.track.expectImageToHaveWight("width", 72)
    await app.musicPage.track.expectListToHaveCount(app.musicPage.track.allImages, 20)
    await app.musicPage.track.expectAreElementsInListDisplayed(app.musicPage.track.allImages)
  });
  test("Check width and visibility image in player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("billie jean");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    
    //Assert
    await app.musicPage.player.expectImageToHaveWight("width", 40)
    await app.musicPage.player.expectElementToBeVisible(app.musicPage.player.image)
  });

  test("Check hovering buttons play/next/prev/pause/heart/ in player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("billie jean");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    
    //Assert
    await app.musicPage.player.expectColorsLinksWhenHovering(app.musicPage.player.allButtons, "color", "rgb(223, 93, 93)");
    await app.musicPage.player.expectListToHaveCount(app.musicPage.player.allButtons, 6);
  });
  