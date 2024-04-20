import { test, favoriteTracksIdForDeletionOfInternalUser} from "../../../utils/fixtures";
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
    await app.musicPage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.noResultsFound202Error)
    await app.musicPage.error.expectErrorImageToBeVisible()
    await app.musicPage.error.expectImageToHaveWight(450)
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
    await app.musicPage.error.expectNotResultErrorToHaveText(testData.expectedErrorText.blocked450Error)
    await app.musicPage.error.expectErrorImageToBeVisible()
    await app.musicPage.error.expectImageToHaveWight(450)
  });

  test("Check 500 unknown Error Page  ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/audio/search", 500)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()

    //Assert
    await app.musicPage.error.expectContentToHaveText(testData.expectedErrorText.unknown500Error)
    await app.musicPage.error.expectErrorImageToBeVisible()
    await app.musicPage.error.expectImageToHaveWight(450)
  });

  test("Check 429 Too many requests", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.route.mockResponseStatusCode("/audio/search", 429)
    await app.home.header.searchForm.inputSearchCriteria("food");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    
    //Assert
    await app.musicPage.error.expectContentToHaveText(testData.expectedErrorText.TooManyRequestsError)
    await app.musicPage.error.expectErrorImageToBeVisible()
    await app.musicPage.error.expectImageToHaveWight(450)
  });
  test.describe('favorite function', () => { test.use({ mode: "default" })
  test("Check add track in the favorite", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("ACD");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    
    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsActive()
    await app.musicPage.favoritePlaylist.expectPlaylistToHaveText(/My favorite tracks1/)
    favoriteTracksIdForDeletionOfInternalUser.push(favoriteID);
  });

  test("Check delete track from the favorite", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Bruno");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsNotActive()
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden()
  });

  test("Check add track in the favorite from player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Teri Baaton Mein Aisa Uljha Jiya");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    const favoriteID = await app.musicPage.player.clickFavoriteButtonAndGetResponse()

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsActive()
    await app.musicPage.player.expectFavoriteButtonIsActive()
    await app.musicPage.favoritePlaylist.expectPlaylistToHaveText(/My favorite tracks1/)
    favoriteTracksIdForDeletionOfInternalUser.push(favoriteID);  
      
  });

  test("Check delete track from the favorite using player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("アイドル");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.player.clickFavoriteButton()

    //Assert
    await app.musicPage.track.expectFirstTrackFavoriteButtonIsNotActive()
    await app.musicPage.player.expectFavoriteButtonIsNotActive()    
    await app.musicPage.favoritePlaylist.expectPlaylistToBeHidden()
  });
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
    await app.musicPage.player.expectTimeToHaveText("0:04")

    //Assert
    await app.musicPage.player.expectTimelineToBeGreaterThan(0.5)
    await app.musicPage.track.expectFirstTrackIsPlaying()
    await app.musicPage.track.expectFirstTrackButtonIsPause()
  });

  test("Check pause track on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Best");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await app.musicPage.track.expectFirstTrackIsNotPlaying()
    await app.musicPage.track.expectFirstTrackButtonIsPlay()
  });

  test("Check next button of track on the main page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("hit 2024");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.clickNextButton()
    await app.musicPage.player.expectTimeToHaveText("0:04")
    
    //Assert
    await app.musicPage.player.expectTimelineToBeGreaterThan(0.5)
    await app.musicPage.track.expectFirstTrackIsNotActive()
    await app.musicPage.track.expectSecondTrackIsPlaying()
  });

  test("Check previous button of track on the main page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Eminem");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.player.clickNextButton()
    await app.musicPage.player.clickPrevButton()
    await app.musicPage.player.expectTimeToHaveText("0:04")

    //Assert
    await app.musicPage.player.expectTimelineToBeGreaterThan(0.5)
    await app.musicPage.track.expectFirstTrackIsPlaying()
    await app.musicPage.track.expectSecondTrackIsNotActive()
  });

  test("Check set time in track", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("summer for...");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await app.musicPage.track.expectProgressBarOfFirstTrackToHaveTimeValue(/width: 5/)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/width: 5/)   
  });

  test("Check set time in the player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Moose");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.player.clickTimeLine()

    //Assert
    await app.musicPage.track.expectProgressBarOfFirstTrackToHaveTimeValue(/width: 5/)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/width: 5/)   
  });

  test("Check pause track in player on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("8");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.player.clickPauseButton()

    //Assert
    await app.musicPage.track.expectFirstTrackIsNotPlaying()
    await app.musicPage.track.expectFirstTrackButtonIsPlay()
    await app.musicPage.player.expectButtonIsPlay()
  });

  test("Check play track in player on music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Lady Gaga");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.player.clickPauseButton()
    await app.musicPage.player.clickPlayButton()

    //Assert
    await app.musicPage.track.expectFirstTrackIsPlaying()
    await app.musicPage.track.expectFirstTrackButtonIsPause()
    await app.musicPage.player.expectButtonIsPause()   
  });

  test("Check shuffle function in the player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("HARD KISS");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickPlayButtonNumberTrack(1)
    await app.musicPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicPage.player.clickShuffleButton()
    await app.musicPage.player.clickNextButton()

    //Assert
    await app.musicPage.track.expectSecondTrackIsNotActive()
    await app.musicPage.player.expectShuffleButtonIsActive()
  });
  
  test("Check infinity scroll to next page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Top 2024");
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
    await app.musicPage.track.expectTracksNameToContainText("billie jean")
    await app.musicPage.track.expectTracksCount(20)
    await app.musicPage.track.expectAreElementsInListDisplayed(app.musicPage.track.allPlayButtons)
  });

  test("Check regional search", async ({
    app,
  }) => {
    const query = "billie jean"
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(query);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.header.clickHamburgerMenuButton();
    await app.musicPage.header.hamburgerMenu.selectRegion("Germany");
    await app.musicPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicPage.track.expectTracksNameToContainText(query)
    await app.musicPage.track.expectTracksCount(20)
    await app.musicPage.track.expectAreElementsInListDisplayed(app.musicPage.track.allPlayButtons)
    await app.expectHaveUrl(app.page, process.env.BASE_URL + `/en/music?query=billie+jean&region=de-DE`)
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
    await app.musicPage.track.expectTracksCount(20)
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
    await app.musicPage.expectColorsLinksWhenHovering(app.musicPage.player.allButtons, "color", "rgb(223, 93, 93)");
    await app.musicPage.player.expectListToHaveCount(app.musicPage.player.allButtons, 6);
  });
  