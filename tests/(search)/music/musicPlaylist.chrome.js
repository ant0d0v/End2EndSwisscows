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
    await app.musicPlaylistPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPlaylistPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await app.musicPlaylistPage.track.expectFirstTrackIsNotPlaying()
    await app.musicPlaylistPage.track.expectFirstTrackButtonIsPlay()
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
    await app.musicPlaylistPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPlaylistPage.player.clickNextButton()
    
    //Assert
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.track.expectSecondTrackIsPlaying()
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
    await app.musicPlaylistPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPlaylistPage.player.clickNextButton()
    await app.musicPlaylistPage.player.clickPrevButton()

    //Assert
    await app.musicPlaylistPage.player.expectTimeToHaveText("0:04")
    await app.musicPlaylistPage.track.expectFirstTrackIsPlaying()
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
    await app.musicPlaylistPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPlaylistPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await app.musicPlaylistPage.track.expectProgressBarOfFirstTrackToHaveTimeValue(/width: 5/)
    await app.musicPlaylistPage.player.expectProgressBarToHaveTimeValue(/width: 5/)   
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
    await app.musicPlaylistPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPlaylistPage.player.clickShuffleButton()
    await app.musicPlaylistPage.player.clickNextButton()

    //Assert
    await app.musicPlaylistPage.track.expectSecondTrackIsNotActive()
    await app.musicPlaylistPage.player.expectShuffleButtonIsActive()
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
    await app.musicPlaylistPage.track.expectTracksCount(20)
    await app.musicPlaylistPage.track.expectAreElementsInListDisplayed(app.musicPlaylistPage.track.allPlayButtons)
    await app.expectHaveUrl(app.page, expectedUrl);
  });