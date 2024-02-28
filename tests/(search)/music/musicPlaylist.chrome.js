import { test} from "../../../utils/fixturePages";
const { expect } = require("@playwright/test");
const value = "Skofka";

  test("Check pause track on music page", async ({
    home,
    musicPage,
    musicPlaylistPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria(value);
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.clickPlaylistNumber(1)
    await musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await musicPlaylistPage.track.expectAttributeClassOfElement(musicPlaylistPage.track.track(1),
      "item item--audio active")
    await musicPlaylistPage.track.expectAttributeToHaveValue(musicPlaylistPage.track.playButton(1),
        "xlink:href", /play/)
  });

  test("Check next button of track on the main page", async ({
    home,
    musicPage,
    musicPlaylistPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria(value);
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.clickPlaylistNumber(1)
    await musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.player.clickNextButton()
    
    //Assert
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.track.expectAttributeClassOfElement(musicPlaylistPage.track.track(2), /playing/ )
  });

  test("Check previous button of track on the main page", async ({
    home,
    musicPage,
    musicPlaylistPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria(value);
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.clickPlaylistNumber(1)
    await musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.player.clickNextButton()
    await musicPlaylistPage.player.clickPrevButton()

    //Assert
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.track.expectAttributeClassOfElement(musicPlaylistPage.track.track(1), /playing/)
  });

  test("Check set time in track", async ({
    home,
    musicPage,
    musicPlaylistPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria(value);
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.clickPlaylistNumber(1)
    await musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await musicPlaylistPage.track.expectAttributeToHaveValue(musicPlaylistPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await musicPlaylistPage.player.expectAttributeToHaveValue(musicPlaylistPage.player.progressBar,
      "style", /width: 5/)  
  });


  test("Check shuffle function in the player", async ({
    home,
    musicPage,
    musicPlaylistPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria(value);
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.clickPlaylistNumber(1)
    await musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await musicPlaylistPage.player.clickShuffleButton()
    await musicPlaylistPage.player.clickNextButton()

    //Assert
    await musicPlaylistPage.track.expectAttributeClassOfElement(musicPlaylistPage.track.track(2),
      "item item--audio")
    await musicPlaylistPage.player.expectAttributeClassOfElement(musicPlaylistPage.player.shuffleButton, /active/) 
  });

  test("Check change region", async ({
    home,
    musicPage,
    musicPlaylistPage,
    page
  }) => {
    const expectedUrl= new RegExp(`${process.env.WEB_URL}en/music/playlist\\?query=${value}&id=\\d+&region=de-DE`);
    //Actions
    await home.header.searchForm.inputSearchCriteria(value);
    await home.header.searchForm.clickEnterSearchField();
    await musicPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicTracksToBeVisible()
    await musicPage.clickPlaylistNumber(1)
    await musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await musicPlaylistPage.header.clickHamburgerMenuButton();
    await musicPlaylistPage.header.hamburgerMenu.selectRegion("Germany");
    await musicPlaylistPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await musicPlaylistPage.track.expectListToHaveCount(musicPlaylistPage.track.tracksName, 20)
    await musicPlaylistPage.track.expectAreElementsInListDisplayed(musicPlaylistPage.track.allPlayButton)
    await musicPlaylistPage.expectHaveUrl(page, expectedUrl);
  });