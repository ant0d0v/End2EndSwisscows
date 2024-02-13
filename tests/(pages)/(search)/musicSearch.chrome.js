import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");
const testData = JSON.parse(
    JSON.stringify(require("../../../data/error/testData.json"))
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