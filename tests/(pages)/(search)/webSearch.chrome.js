import { test } from "../../../utils/fixturePages";

test("Check suggest on the music search", async ({
    mainPage,
    webPage,
    musicPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.header.clickHamburgerMenuButton();
    await webPage.header.hamburgerMenu.selectGermanyRegion();
    await webPage.item.expectWebItemsToBeVisible()
    await webPage.header.clickMusicSearchButton()
    await musicPage.track.expectMusicItemsToBeVisible()
    await musicPage.header.searchForm.clickSearchField()
   
    //Assert
    await webPage.expectElementToHaveText("sdf")
  });