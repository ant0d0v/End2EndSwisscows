import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");
let response;
const testData = JSON.parse(
    JSON.stringify(require("../../../data/error/testData.json"))
  );
 test.afterEach(async ({ musicMyPage }) => {
    if (response) {
        // Parse response data
        const responseData = await response.json();
        if (responseData.id !== null) {
            // Delete track from favorite 
            await musicMyPage.track.deleteTrackFromFavorite(responseData.id);
        }
    }
  });

test.describe.configure({ mode: "default" });
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
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
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
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.clickFavoriteButton()
    
    //Assert
    await musicMyPage.expectElementToHaveText(musicMyPage.error.contentErrorPage,
      testData.expectedErrorText.noItemsFound)
    await musicMyPage.expectElementToBeVisible(musicMyPage.error.errorImageNoResult)
  });

  test("Check delete track from favorite on my music page ", async ({
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
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.track.clickFavoriteButtonNumberTrack(1)
    
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
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)

    //Assert
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.playButton(1),
        "xlink:href", /pause/) 
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
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await musicMyPage.track.expectAttributeClassOfElement(musicMyPage.track.track(1),
      "item item--audio active")
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.playButton(1),
        "xlink:href", /play/)   
  });

  test("Check set time in track", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await musicMyPage.player.expectAttributeToHaveValue(musicMyPage.player.progressBar,
      "style", /width: 5/) 
  });

  test("Check set time in the player", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.player.clickTimeLine()

    //Assert
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await musicMyPage.player.expectAttributeToHaveValue(musicPage.player.progressBar,
      "style", /width: 5/)   
  });

  test("Check pause track in player on my music page", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.player.clickPauseButton()

    //Assert
    await musicPage.track.expectAttributeClassOfElement(musicMyPage.track.track(1),
      "item item--audio active")
    await musicPage.track.expectAttributeToHaveValue(musicMyPage.track.playButton(1),
      "xlink:href", /play/)
    await musicPage.player.expectAttributeToHaveValue(musicMyPage.player.playButton,
      "xlink:href", /play/)    
  });

  test("Check play track in player on my music page", async ({
    home,
    musicPage,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.track.clickPlayButtonNumberTrack(1)
    await musicMyPage.player.expectTimeToHaveText("0:04")
    await musicMyPage.player.clickPauseButton()
    await musicMyPage.player.clickPlayButton()

    //Assert
    await musicMyPage.track.expectAttributeClassOfElement(musicMyPage.track.track(1),
      "item item--audio active playing")
    await musicMyPage.track.expectAttributeToHaveValue(musicMyPage.track.playButton(1),
        "xlink:href", /pause/)
    await musicPage.player.expectAttributeToHaveValue(musicMyPage.player.playButton,
        "xlink:href", /pause/)      
  });

  test("Check regional search", async ({
    home,
    musicPage,
    page,
    musicMyPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    response = await musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await musicPage.clickFavoritePlaylist()
    await musicMyPage.expectPageToBeOpen()
    await musicMyPage.header.clickHamburgerMenuButton();
    await musicMyPage.header.hamburgerMenu.selectRegion("Germany");
    await musicMyPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await musicMyPage.track.expectTextsToContainSearchCriteria(musicMyPage.track.tracksName, "skofka")
    await musicMyPage.track.expectListToHaveCount(musicMyPage.track.tracksName, 1)
    await musicMyPage.track.expectAreElementsInListDisplayed(musicMyPage.track.allPlayButton)
    await musicMyPage.expectHaveUrl(page,  process.env.WEB_URL + "en/music/my?query=Skofka&region=de-DE")
    
  });
