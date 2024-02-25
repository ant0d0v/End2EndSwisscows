import { test} from "../../../../utils/fixturePages";
const { expect } = require("@playwright/test");
const testData = JSON.parse(
    JSON.stringify(require("../../../../data/error/testData.json"))
  );

test("Check No items Found error page ", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)
    await musicPage.favoritePlaylist.clickPlaylist()
    await musicMyPage.track.clickFavoriteButtonNumberTrack(1)
    
    //Assert
    await musicMyPage.expectElementToHaveText(musicMyPage.error.contentErrorPage,
      testData.expectedErrorText.noItemsFound)
    await musicMyPage.expectElementToBeVisible(musicMyPage.error.errorImageNoResult)
  });

  test("Check delete track from favorite using player on my music page ", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)
    await musicPage.favoritePlaylist.clickPlaylist()
    await musicMyPage.track.expectMusicTracksToBeVisible()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.clickFavoriteButton()
    
    //Assert
    await musicMyPage.expectElementToHaveText(musicMyPage.error.contentErrorPage,
      testData.expectedErrorText.noItemsFound)
    await musicMyPage.expectElementToBeVisible(musicMyPage.error.errorImageNoResult)
  });


  test("Check play track on music my page", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)
    await musicPage.favoritePlaylist.clickPlaylist()
    await musicMyPage.track.expectMusicTracksToBeVisible()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)

    //Assert
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.playButtonInFirstTrack,
        "xlink:href", /pause/)
    await musicMyPage.track.clickFavoriteButtonNumberTrack(1)    
  });

  test("Check pause track on my music page", async ({
    home,
    musicPage, 
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)
    await musicPage.favoritePlaylist.clickPlaylist()
    await musicMyPage.track.expectMusicTracksToBeVisible()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await musicMyPage.track.expectAttributeClassOfElement(musicMyPage.track.firsTrack,
      "item item--audio active")
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.playButtonInFirstTrack,
        "xlink:href", /play/)
    await musicMyPage.track.clickFavoriteButtonNumberTrack(1)    
  });

  test("Check next button of track on the main page", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.clickTimeLineNumberTrack(1)

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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.favoriteButtonInFirsTrack,
      /active/)
    await musicPage.favoritePlaylist.expectElementToHaveText(musicPage.favoritePlaylist.playlist, 
      /My favorite tracks1/)
    await musicPage.track.clickFavoriteButtonNumberTrack(1)   
  });

  test("Check delete track from the favorite", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)
    await musicPage.track.clickPlayButtonNumberTrack(1)
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.track.clickFavoriteButtonNumberTrack(1)

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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickPlayButtonNumberTrack(1)
    await musicPage.player.expectTimeToHaveText("0:04")
    await musicPage.player.clickFavoriteButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicPage.track.favoriteButtonInFirsTrack,/active/)
    await musicPage.track.expectAttributeClassOfElement(musicPage.player.favoriteButton, /active/)  
    await musicPage.favoritePlaylist.expectElementToHaveText(musicPage.favoritePlaylist.playlist, 
      /My favorite tracks1/)
    await musicPage.track.clickFavoriteButtonNumberTrack(1)   
  });

  test("Check delete track from the favorite using player", async ({
    home,
    musicPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.track.clickFavoriteButtonNumberTrack(1)
    await musicPage.track.clickPlayButtonNumberTrack(1)
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
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
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
    await home.header.searchForm.inputSearchCriteria("billie jean");
    await home.header.searchForm.clickEnterSearchField();
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
    await home.header.searchForm.inputSearchCriteria("billie jean");
    await home.header.searchForm.clickEnterSearchField();
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