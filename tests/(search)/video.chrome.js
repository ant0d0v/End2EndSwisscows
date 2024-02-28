import { test} from "../../utils/fixturePages";
const { expect } = require("@playwright/test");

const testData = JSON.parse(
  JSON.stringify(require("../../data/error/testData.json"))
);
test("Check that video results equals search criteria", async ({
    home,
    videoPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    
    //Assert
    await videoPage.item.expectTextsToContainSearchCriteria(videoPage.item.videoItems, "Skofka".toLowerCase())
    await videoPage.item.expectListToHaveCount(videoPage.item.videoItems, 10)
    await videoPage.item.expectAreElementsInListDisplayed(videoPage.item.images)
  });

test("Check infinity scroll to items-pane aside", async ({
    home,
    videoPage,
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("football");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    await videoPage.item.clickVideoNumber(1)
    await videoPage.item.scrollByVisibleVideoNumber(35)

    //Assert
    await videoPage.item.expectListToBeGreaterThanOrEqual(videoPage.item.videoItems, 35)
  });

  test("Check infinity scroll in video results", async ({
    home,
    videoPage,
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("football");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    await videoPage.item.scrollDownUsingWheelMouse()

    //Assert
    await videoPage.item.expectListToBeGreaterThanOrEqual(videoPage.item.images, 80)
  });

  test("Check the width and visibility images of items", async ({
    home,
    videoPage,
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("football");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    
    //Assert
    await videoPage.item.expectImageToHaveWight("width", 210)
    await videoPage.item.expectListToHaveCount(videoPage.item.images, 10)
    await videoPage.item.expectAreElementsInListDisplayed(videoPage.item.images)
  });

  test("Check the width and visibility images of items in items-pane aside", async ({
    home,
    videoPage,
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("football");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    await videoPage.item.clickVideoNumber(1)
    
    //Assert
    await videoPage.item.expectImageToHaveWight("width", 273)
    await videoPage.item.expectListToHaveCount(videoPage.item.images, 10)
    await videoPage.item.expectAreElementsInListDisplayed(videoPage.item.images)
  });

  test("Check play video in player", async ({
    home,
    videoPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    await videoPage.item.clickVideoNumber(1)
    await videoPage.player.clickOkButton()
    
    //Assert
    await videoPage.player.expectTimeToHaveText("0:02")     
  });

  test("Check description and title of video ", async ({
    home,
    videoPage
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    await videoPage.item.clickVideoNumber(1)
    
    //Assert
    await videoPage.player.expectElementToHaveText(videoPage.player.description, 
        "Video provider prevents videos from being watched anonymously. Watching this video can be tracked by the video provider.")
    await videoPage.player.expectElementToHaveText(videoPage.player.title,"Privacy Warning")          
  });

  test("Check cancel button of video ", async ({
    home,
    videoPage,
    page
  }) => {
    //Actions
    await home.header.searchForm.inputSearchCriteria("Skofka");
    await home.header.searchForm.clickEnterSearchField();
    await videoPage.header.clickVideoSearchButton()
    await videoPage.item.expectVideoItemsToBeVisible()
    await videoPage.item.clickVideoNumber(1)
    await videoPage.player.clickCancelButton()
    
    //Assert
    await videoPage.player.expectElementToBeHidden(videoPage.player.videoPlayer)
    await videoPage.expectHaveUrl(page, `${process.env.WEB_URL}en/video?query=Skofka`)       
  });