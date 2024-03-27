import { 
  test, 
  favoriteTracksIdForDeletionOfInternalUser, 
  favoriteTracksIdForDeletionOfExternalUser
} from "../../../utils/fixtures";

const value = "Skofka";
const testData = JSON.parse(
    JSON.stringify(require("../../../data/error/testData.json"))
  );
test.describe('Internal user', () => {  
  test.describe.configure({ mode: 'default' });
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
    await app.musicMyPage.error.expectContentToHaveText(testData.expectedErrorText.noItemsFound)
    await app.musicPage.error.expectErrorImageToBeVisible()
    await app.musicPage.error.expectImageToHaveWight(450)
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
    await app.musicMyPage.error.expectContentToHaveText(testData.expectedErrorText.noItemsFound)
    await app.musicPage.error.expectErrorImageToBeVisible()
    await app.musicPage.error.expectImageToHaveWight(450)
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
    favoriteTracksIdForDeletionOfInternalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.player.expectTimeToHaveText("0:04")
    await app.musicMyPage.track.expectFirstTrackButtonIsPause()     
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
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicMyPage.track.clickPauseButtonNumberTrack(1)
    favoriteTracksIdForDeletionOfInternalUser.push(favoriteID);  

    //Assert
    await app.musicMyPage.track.expectFirstTrackIsNotPlaying()
    await app.musicMyPage.track.expectFirstTrackButtonIsPlay()   
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
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicMyPage.track.clickTimeLineNumberTrack(1)
    favoriteTracksIdForDeletionOfInternalUser.push(favoriteID);

    //Assert
    await app.musicMyPage.track.expectProgressBarOfFirstTrackToHaveTimeValue(/width: 5/)
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/width: 5/) 
  });
});

test.describe('External user', () => {  
  test.describe.configure({ mode: 'default' });
  test.use({ storageState: './data/auth/externalUser.json' });
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
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicMyPage.player.clickTimeLine()
    favoriteTracksIdForDeletionOfExternalUser.push(favoriteID);  

    //Assert
    await app.musicMyPage.track.expectProgressBarOfFirstTrackToHaveTimeValue(/width: 5/)
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/width: 5/) 
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
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicMyPage.player.clickPauseButton()
    favoriteTracksIdForDeletionOfExternalUser.push(favoriteID);    

    //Assert
    await app.musicMyPage.track.expectFirstTrackIsNotPlaying()
    await app.musicMyPage.track.expectFirstTrackButtonIsPlay() 
    await app.musicMyPage.player.expectButtonIsPlay()
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
    await app.musicMyPage.player.expectProgressBarToHaveTimeValue(/3/)
    await app.musicMyPage.player.clickPauseButton()
    await app.musicMyPage.player.clickPlayButton()
    favoriteTracksIdForDeletionOfExternalUser.push(favoriteID);    

    //Assert
    await app.musicMyPage.track.expectFirstTrackIsPlaying()
    await app.musicMyPage.track.expectFirstTrackButtonIsPause() 
    await app.musicMyPage.player.expectButtonIsPause()
           
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
    favoriteTracksIdForDeletionOfExternalUser.push(favoriteID); 

    //Assert
    await app.musicMyPage.track.expectTracksNameToContainText(value.toLowerCase())
    await app.musicMyPage.track.expectTracksCount(1)
    await app.musicMyPage.track.expectAreElementsInListDisplayed(app.musicMyPage.track.allPlayButtons)
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}&region=de-DE`)
  });

  test("Check adding multiple favorites to a my  playlist ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria(value);
    await app.home.header.searchForm.clickEnterSearchField();
    await app.musicPage.header.clickMusicSearchButton()
    await app.musicPage.track.expectMusicTracksToBeVisible()
    const favoriteIDs = await app.musicPage.track.clickAllFavoriteButtonsOfTracksAndGetResponses();
    await app.musicPage.clickFavoritePlaylist()
    await app.musicMyPage.expectPageUrlToHaveParameter(`?query=${value}`)
    favoriteTracksIdForDeletionOfExternalUser.push(...favoriteIDs); 
  
    //Assert
    await app.musicMyPage.track.expectTracksCount(20)
    await app.musicMyPage.track.expectAreElementsInListDisplayed(app.musicMyPage.track.allPlayButtons)
  })
});