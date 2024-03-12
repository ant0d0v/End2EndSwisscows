import { test} from "../../utils/fixtures";
const { expect } = require("@playwright/test");

test("Check that video results equals search criteria", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    
    //Assert
    await app.videoPage.item.expectTextsToContainSearchCriteria(app.videoPage.item.videoItems, "Skofka".toLowerCase())
    await app.videoPage.item.expectListToHaveCount(app.videoPage.item.videoItems, 10)
    await app.videoPage.item.expectAreElementsInListDisplayed(app.videoPage.item.images)
  });

test("Check infinity scroll to items-pane aside", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("football");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    await app.videoPage.item.scrollByVisibleVideoNumber(35)

    //Assert
    await app.videoPage.item.expectListToBeGreaterThanOrEqual(app.videoPage.item.videoItems, 35)
  });

  test("Check infinity scroll in video results", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("video");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.scrollWithMouseWheelToVideoNumber(90)

    //Assert
    await app.videoPage.item.expectListToBeGreaterThanOrEqual(app.videoPage.item.images, 90)
  });

  test("Check the width and visibility images of items", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("football");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    
    //Assert
    await app.videoPage.item.expectImageToHaveWight("width", 210)
    await app.videoPage.item.expectListToHaveCount(app.videoPage.item.images, 10)
    await app.videoPage.item.expectAreElementsInListDisplayed(app.videoPage.item.images)
  });

  test("Check the width and visibility images of items in items-pane aside", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("football");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    
    //Assert
    await app.videoPage.item.expectImageToHaveWight("width", 273)
    await app.videoPage.item.expectListToHaveCount(app.videoPage.item.images, 10)
    await app.videoPage.item.expectAreElementsInListDisplayed(app.videoPage.item.images)
  });

  test("Check play video in player", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    await app.videoPage.itemDetails.player.clickOkButton()
    
    //Assert
    await app.videoPage.itemDetails.player.expectTimeToHaveText("0:02")     
  });

  test("Check description and title of video ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    
    //Assert
    await app.videoPage.itemDetails.player.expectElementToHaveText(
      app.videoPage.itemDetails.player.description, 
        "Video provider prevents videos from being watched anonymously. Watching this video can be tracked by the video provider.")
    await app.videoPage.itemDetails.player.expectElementToHaveText(app.videoPage.itemDetails.player.title,"Privacy Warning")          
  });

  test("Check cancel button of video ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    await app.videoPage.itemDetails.player.clickCancelButton()
    
    //Assert
    await app.videoPage.itemDetails.player.expectElementToBeHidden(app.videoPage.itemDetails.player.videoPlayer)
    await app.videoPage.expectHaveUrl(app.page, `${process.env.BASE_URL}/en/video?query=Skofka`)       
  });

  test("Check checkbox `Don't remind me again ` ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    await app.videoPage.itemDetails.player.selectCheckbox()
    await app.videoPage.itemDetails.player.clickOkButton()
    await app.videoPage.reloadPage()
    await app.videoPage.item.clickVideoNumber(1)

    //Assert 
    await app.videoPage.itemDetails.player.expectTimeToHaveText("0:02") 
    await app.videoPage.itemDetails.player.expectElementToBeHidden(app.videoPage.itemDetails.player.checkbox)        
  });

  test("Check video play if don't select checkbox `Don't remind me again ` ", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.item.clickVideoNumber(1)
    await app.videoPage.itemDetails.player.clickOkButton()
    await app.videoPage.reloadPage()
    await app.videoPage.item.clickVideoNumber(1)

    //Assert
    await app.videoPage.player.expectElementToBeVisible(app.videoPage.itemDetails.player.okButton)        
  });

  test("Check that image of proxy cdn server", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("football");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    
    //Assert
    await app.videoPage.item.expectListToHaveCount(app.videoPage.item.images, 10)
    await app.videoPage.item.proxyImage.expectAttributeSrcAllImagesToHave(app.videoPage.item.images, 
      /cdn.swisscows.com/)
  });

  test("Check regional search", async ({
    app
  }) => {
    //Actions
    await app.home.open()
    await app.home.header.searchForm.inputSearchCriteria("Miley Cyrus");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.clickVideoSearchButton()
    await app.videoPage.item.expectVideoItemsToBeVisible()
    await app.videoPage.header.clickHamburgerMenuButton();
    await app.videoPage.header.hamburgerMenu.selectRegion("Germany");
    await app.videoPage.item.expectVideoItemsToBeVisible()
    
    //Assert
    await app.videoPage.item.expectTextsToContainSearchCriteria(app.videoPage.item.videoItems, "Miley Cyrus".toLowerCase())
    await app.videoPage.item.expectListToHaveCount(app.videoPage.item.videoItems, 10)
    await app.videoPage.item.expectAreElementsInListDisplayed(app.videoPage.item.images)
    await app.videoPage.expectHaveUrl(app.videoPage.page,  process.env.BASE_URL + `/en/video?query=Miley+Cyrus&region=de-DE`)
    
  });