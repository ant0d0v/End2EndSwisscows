import { test, favoriteTracksIdForDeletion} from "../../../utils/fixtures";
const value = "Skofka";
const testData = JSON.parse(
    JSON.stringify(require("../../../data/error/testData.json"))
  );
test.describe.configure({ mode: "default" });
test("Check No items Found error page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickFavoriteButtonNumberTrack(1)
    
    //Assert
    await app.musicMyPage.expectElementToHaveText(app.musicMyPage.error.contentErrorPage,
      testData.expectedErrorText.noItemsFound)
    await app.musicMyPage.expectElementToBeVisible(app.musicMyPage.error.errorImageNoResult)
  });

  test("Check delete track from favorite using player on my music page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.clickFavoriteButton()
    
    //Assert
    await app.musicMyPage.expectElementToHaveText(app.musicMyPage.error.contentErrorPage,
      testData.expectedErrorText.noItemsFound)
    await app.musicMyPage.expectElementToBeVisible(app.musicMyPage.error.errorImageNoResult)
  });

  test("Check delete track from favorite on my music page ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    await app.musicPage.track.clickFavoriteButtonNumberTrack(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.track.clickFavoriteButtonNumberTrack(1)
    
    //Assert
    await app.musicMyPage.expectElementToHaveText(app.musicMyPage.error.contentErrorPage,
      testData.expectedErrorText.noItemsFound)
    await app.musicMyPage.expectElementToBeVisible(app.musicMyPage.error.errorImageNoResult)
  });


  test("Check play track on music my page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)

    //Assert
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.track.expectAttributeToHaveValue(app.musicMyPage.track.playButton(1),
        "xlink:href", /pause/)
      favoriteTracksIdForDeletion.push(favoriteID);     
  });

  test("Check pause track on my music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.track.clickPauseButtonNumberTrack(1)

    //Assert
    await app.musicMyPage.track.expectAttributeClassOfElement(app.musicMyPage.track.track(1),
      "item item--audio active")
    await app.musicMyPage.track.expectAttributeToHaveValue(app.musicMyPage.track.playButton(1),
        "xlink:href", /play/)
      favoriteTracksIdForDeletion.push(favoriteID);      
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
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.track.clickTimeLineNumberTrack(1)

    //Assert
    await app.musicMyPage.track.expectAttributeToHaveValue(app.musicMyPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await app.musicMyPage.player.expectAttributeToHaveValue(app.musicMyPage.player.progressBar,
      "style", /width: 5/)
      favoriteTracksIdForDeletion.push(favoriteID); 
  });

  test("Check set time in the player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.player.clickTimeLine()

    //Assert
    await app.musicMyPage.track.expectAttributeToHaveValue(app.musicMyPage.track.valueProgressBar(1),
      "style", /width: 5/)
    await app.musicMyPage.player.expectAttributeToHaveValue(app.musicPage.player.progressBar,
      "style", /width: 5/)
      favoriteTracksIdForDeletion.push(favoriteID);   
  });

  test("Check pause track in player on my music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.player.clickPauseButton()

    //Assert
    await app.musicPage.track.expectAttributeClassOfElement(app.musicMyPage.track.track(1),
      "item item--audio active")
    await app.musicPage.track.expectAttributeToHaveValue(app.musicMyPage.track.playButton(1),
      "xlink:href", /play/)
    await app.musicPage.player.expectAttributeToHaveValue(app.musicMyPage.player.playButton,
      "xlink:href", /play/)
      favoriteTracksIdForDeletion.push(favoriteID);    
  });

  test("Check play track in player on my music page", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.track.clickPlayButtonNumberTrack(1)
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.player.clickPauseButton()
    await app.musicMyPage.player.clickPlayButton()

    //Assert
    await app.musicMyPage.track.expectAttributeClassOfElement(app.musicMyPage.track.track(1),
      "item item--audio active playing")
    await app.musicMyPage.track.expectAttributeToHaveValue(app.musicMyPage.track.playButton(1),
        "xlink:href", /pause/)
    await app.musicPage.player.expectAttributeToHaveValue(app.musicMyPage.player.playButton,
        "xlink:href", /pause/)
      favoriteTracksIdForDeletion.push(favoriteID);           
  });

  test("Check regional search", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteID = await app.musicPage.track.clickFavoriteButtonNumberTrackAndGetResponse(1)
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    await app.musicMyPage.header.clickHamburgerMenuButton();
    await app.musicMyPage.header.hamburgerMenu.selectRegion("Germany");
    await app.musicMyPage.track.expectMusicTracksToBeVisible()
    
    //Assert
    await app.musicMyPage.track.expectTracksNameToContainText(value.toLowerCase())
    await app.musicMyPage.track.expectListToHaveCount(app.musicMyPage.track.tracksName, 1)
    await app.musicMyPage.track.expectAreElementsInListDisplayed(app.musicMyPage.track.allPlayButton)
    await app.musicMyPage.expectHaveUrl(app.musicMyPage.page,  
      process.env.BASE_URL + `/en/music/my?query=${value}&region=de-DE`)
      favoriteTracksIdForDeletion.push(favoriteID); 
  });