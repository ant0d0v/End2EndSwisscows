import { test} from "../../../utils/fixtures";
const { expect } = require("@playwright/test");
const value = "Skofka";

  test("Check pause track on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.clickPlaylistNumber(1)
    await app.musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await app.musicPlaylistPage.track.expectAttributeClassOfElement(app.musicPlaylistPage.track.track(1),
      "item item--audio active")
    await app.musicPlaylistPage.track.expectAttributeToHaveValue(app.musicPlaylistPage.track.playButton(1),
        "xlink:href", /play/)
  });

  test("Check next button of track on the main page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.clickPlaylistNumber(1)
    await app.musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.player.clickNextButton()
    
    //Assert
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.track.expectAttributeClassOfElement(app.musicPlaylistPage.track.track(2), /playing/ )
  });

  test("Check previous button of track on the main page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.clickPlaylistNumber(1)
    await app.musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.player.clickNextButton()
    await app.musicPlaylistPage.player.clickPrevButton()

    //Assert
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.track.expectAttributeClassOfElement(app.musicPlaylistPage.track.track(1), /playing/)
  });

  test("Check set time in track", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.clickPlaylistNumber(1)
    await app.musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await app.musicPlaylistPage.track.expectAttributeToHaveValue(app.musicPlaylistPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await app.musicPlaylistPage.player.expectAttributeToHaveValue(app.musicPlaylistPage.player.progressBar,
      "style", /width: 5/)  
  });


  test("Check shuffle function in the player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.clickPlaylistNumber(1)
    await app.musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicPlaylistPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.player.clickShuffleButton()
    await app.musicPlaylistPage.player.clickNextButton()

    //Assert
    await app.musicPlaylistPage.track.expectAttributeClassOfElement(app.musicPlaylistPage.track.track(2),
      "item item--audio")
    await app.musicPlaylistPage.player.expectAttributeClassOfElement(app.musicPlaylistPage.player.shuffleButton, /active/) 
  });

  test("Check change region", async ({
    app
  }) => {
    const expectedUrl= new RegExp(`${process.env.WEB_URL}en/music/playlist\\?query=${value}&id=\\d+&region=de-DE`);
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.clickPlaylistNumber(1)
    await app.musicPlaylistPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicPlaylistPage.header.clickHamburgerMenuButton();
    await app.musicPlaylistPage.header.hamburgerMenu.selectRegion("Germany");
    await app.musicPlaylistPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicPlaylistPage.track.expectListToHaveCount(app.musicPlaylistPage.track.tracksName, 20)
    await app.musicPlaylistPage.track.expectAreElementsInListDisplayed(app.musicPlaylistPage.track.allPlayButton)
    await app.musicPlaylistPage.expectHaveUrl(app.musicPlaylistPage.page, expectedUrl);
  });