import { test} from "../../../../utils/fixturePages";
const { expect } = require("@playwright/test");
const testData = JSON.parse(
    JSON.stringify(require("../../../../data/error/testData.json"))
  );

test("Check 202 No Results Found error page ", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    
    //Assert
    await musicPage.expectElementToHaveText(musicPage.error.contentErrorNoResults,
      testData.expectedErrorText.noResultsFound202Error)
    await musicPage.expectElementToBeVisible(musicPage.error.errorImage)
  });

  test("Check request is blocked 450 error page ", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("porn");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()

    //Assert
    await musicPage.expectElementToHaveText(musicPage.error.contentErrorNoResults, 
      testData.expectedErrorText.blocked450Error)
    await musicPage.expectElementToBeVisible(musicPage.error.errorImage)
  });

  test("Check 501 unknown Error Page  ", async ({
    musicPage
  }) => {
    //Actions
    await musicPage.error.open500Page("/music")
    //Assert
    await musicPage.expectElementToHaveText(musicPage.error.contentErrorPage, 
      testData.expectedErrorText.unknown500Error)
    await musicPage.expectElementToBeVisible(musicPage.error.errorImage)
  });

  test("Check play track on music page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()

    //Assert
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.expectAttributeToHaveValue(musicPage.track.playButtonInFirstTrack,
        "xlink:href", /pause/)
  });

  test("Check pause track on music page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.clickPauseButtonInFirstTrack()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.firsTrack,
      "item item--audio active")
    await musicPage.track.expectAttributeToHaveValue(musicPage.track.playButtonInFirstTrack,
        "xlink:href", /play/)
  });

  test("Check next button of track on the main page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickNextButton()
    
    //Assert
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.secondTrack,
        "item item--audio active playing")
  });

  test("Check previous button of track on the main page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickNextButton()
    await musicPage.player.clickPrevButton()

    //Assert
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.firsTrack,
        "item item--audio active playing")
  });

  test("Check set time in track", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.clickTimeLineInFirstTrack()

    //Assert
    await musicPage.track.expectAttributeToHaveValue(musicPage.track.valueOfProgressBarInFirstTrack,
      "style", /width: 5/)
    await musicPage.player.expectAttributeToHaveValue(musicPage.player.progressBar,
      "style", /width: 5/)  
  });

  test("Check set time in the player", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickTimeLine()

    //Assert
    await musicPage.track.expectAttributeToHaveValue(musicPage.track.valueOfProgressBarInFirstTrack,
      "style", /width: 5/)
    await musicPage.player.expectAttributeToHaveValue(musicPage.player.progressBar,
      "style", /width: 5/)
  });

  test("Check pause track in player on music page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickPauseButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.firsTrack,
      "item item--audio active")
    await musicPage.track.expectAttributeToHaveValue(musicPage.track.playButtonInFirstTrack,
      "xlink:href", /play/)
    await musicPage.player.expectAttributeToHaveValue(musicPage.player.playButton,
      "xlink:href", /play/)    
  });

  test("Check play track in player on music page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickPauseButton()
    await musicPage.player.clickPlayButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.firsTrack,
      "item item--audio active playing")
    await musicPage.track.expectAttributeToHaveValue(musicPage.track.playButtonInFirstTrack,
        "xlink:href", /pause/)
    await musicPage.player.expectAttributeToHaveValue(musicPage.player.playButton,
        "xlink:href", /pause/)      
  });

  test("Check shuffle function in the player", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickShuffleButton()
    await musicPage.player.clickNextButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.secondTrack,
      "item item--audio")
    await musicPage.player.expectAttributeClassOfElement(musicPage.player.shuffleButton, /active/) 
  });

  test("Check add track in the favorite", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonInFirstTrack()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.favoriteButtonInFirsTrack,
      /active/)
    await musicPage.favoritePlaylist.expectElementToHaveText(musicPage.favoritePlaylist.playlist, 
      /My favorite tracks1/)
    await musicPage.track.clickFavoriteButtonInFirstTrack()   
  });

  test("Check delete track from the favorite", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonInFirstTrack()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.clickFavoriteButtonInFirstTrack()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.favoriteButtonInFirsTrack,
      "button favorite")
    await musicPage.favoritePlaylist.expectElementToBeHidden(musicPage.favoritePlaylist.playlist)
  });

  test("Check add track in the favorite from player", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickFavoriteButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.favoriteButtonInFirsTrack,/active/)
    await musicPage.track.expectAttributeClassOfElement(musicPage.player.favoriteButton, /active/)  
    await musicPage.favoritePlaylist.expectElementToHaveText(musicPage.favoritePlaylist.playlist, 
      /My favorite tracks1/)
    await musicPage.track.clickFavoriteButtonInFirstTrack()   
  });

  test("Check delete track from the favorite using player", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonInFirstTrack()
    await musicPage.track.clickPlayButtonInFirstTrack()
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickFavoriteButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.favoriteButtonInFirsTrack,
      "button favorite")
    await musicPage.track.expectAttributeClassOfElement(musicPage.player.favoriteButton, "button favorite")    
    await musicPage.favoritePlaylist.expectElementToBeHidden(musicPage.favoritePlaylist.playlist)
  });

  test("Check infinity scroll to next page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("Skofka");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.scrollByVisibleLastTrack()
    await musicPage.preloader.waitUntilPreloaderToBeHidden()

    //Assert
    await musicPage.track.expectListToBeGreaterThanOrEqual(musicPage.track.musicTracks, 200)
  });

  test("Check that music results equals search criteria", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("billie jean");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await musicPage.track. expectTextsToContainSearchCriteria(musicPage.track.musicTracks, "billie jean")
    await musicPage.track.expectListToHaveCount(musicPage.track.musicTracks, 20)
    await musicPage.track.expectAreElementsInListDisplayed(musicPage.track.allPlayButton)
  });

  test("Check regional search", async ({
    home,
    musicPage,
    page
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria("billie jean");
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.header.clickHamburgerMenuButton();
    await musicPage.header.hamburgerMenu.selectRegion("Germany");
    await musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await musicPage.track.expectTextsToContainSearchCriteria(musicPage.track.musicTracks, "billie jean")
    await musicPage.track.expectListToHaveCount(musicPage.track.musicTracks, 20)
    await musicPage.track.expectAreElementsInListDisplayed(musicPage.track.allPlayButton)
    await musicPage.expectHaveUrl(page, "https://dev.swisscows.com/en/music?query=billie+jean&region=de-DE")
  });