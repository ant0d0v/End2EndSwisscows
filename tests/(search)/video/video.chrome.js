import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check 202 No Results Found error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 202);
});

test("Check request is blocked 450 error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("porno");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 450);
});

test("Check 501 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v2/videos", 500);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 501);
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v2/videos", 429);
  await app.home.header.searchBar.inputSearchCriteria("food");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 429);
});

test("Check that video results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.expectVideoTitleToContain(/iphone/i);
  await app.videoPage.videoObject.expectVideoResultToHaveCount(10);
  await app.videoPage.videoObject.expectVideoImageToBeVisible();
});

test("Check infinity scroll in video results", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.scrollByVisibleLastVideo();

  //Assert
  await app.videoPage.videoObject.expectVideoResultToHaveCount(40);
});

test("Check the width,height and visibility images of items", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.expectImageToHaveProperty({
    width: 284,
    height: 160,
  });
  await app.videoPage.videoObject.expectVideoResultToHaveCount(10);
  await app.videoPage.videoObject.expectVideoImageToBeVisible();
});

test("Check the design play icon of video object", async ({
  app
},testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.takeSnapshotPlayIconAt(testInfo, { number: 1 })
});

test("Check the design error icon of video object", async ({
  app
},testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.takeSnapshotErrorIconAt(testInfo, { number: 1 });
});

test("Check the design view icon of video object", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.takeSnapshotViewsIconAt(testInfo, {
    number: 1,
  });
});

test("Check the info video object { site, description, data, views }", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.expectVideoDescriptionNotToBeEmpty();
  await app.videoPage.videoObject.expectVideoInfoToContain({
    site: /^(DailyMotion|Vimeo|YouTube)$/,
    views: /^\d+(\.\d+)?[MK]?\sviews$/,
    date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
  });
});

test("Check the info video object { site, description, data, views } when opening video in player", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.videoObject.expectVideoDescriptionNotToBeEmpty();
  await app.videoPage.videoObject.expectVideoInfoToContain({
    site: /^(DailyMotion|Vimeo|YouTube)$/,
    views: /^\d+(\.\d+)?[MK]?\sviews$/,
    date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
  });
});

test("Check play video in player", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickOkButton();

  //Assert
  await app.videoPage.player.expectTimeToHaveText(/^0:0[2-4]$/);
});

test("Check open video of vimeo owner", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("R O M A on Vimeo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.expectToBeOpenedPageAfterClick({
    buttonName: "Open Vimeo",
    url: /vimeo.com/,
  });
});

test("Check open video of dailymotion owner", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("dailymotion owner");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.header.clickHamburgerMenuButton();
  await app.videoPage.header.hamburgerMenu.selectRegion("Ukraine");
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.expectToBeOpenedPageAfterClick({
    buttonName: "Open DailyMotion",
    url: /dailymotion.com/,
  });
});

test("Check open video when clicking title of video object", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoTitleAt({ number: 1 });

  //Assert
  await app.expectPageToHaveUrl( app.page, /youtube.com/);
});

test("Check design of video Privacy Warning", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test(`Check design of Video unavailable vimeo owner`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("R O M A on Vimeo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test(`Check design of Video unavailable dailymotion owner`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("dailymotion owner");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.header.clickHamburgerMenuButton();
  await app.videoPage.header.hamburgerMenu.selectRegion("Ukraine");
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test("Check cancel button of Video unavailable warning ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("R O M A on Vimeo");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickCancelButton();

  //Assert
  await app.videoPage.player.expectPlayerToBeHidden();
});
 
test("Check cancel button of Privacy Warning ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickCancelButton();

  //Assert
  await app.videoPage.player.expectPlayerToBeHidden();
  await app.expectPageToHaveUrl(
    app.page,
    `${process.env.BASE_URL}/en/video?query=Skofka`
  );
});

test("Check checkbox `Don't remind me again ` ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("Skofka");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.selectCheckbox();
  await app.videoPage.player.clickOkButton();
  await app.videoPage.reloadPage();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.expectTimeToHaveText(/^0:0[2-4]$/);
});

test("Check video play if don't select checkbox `Don't remind me again ` ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickOkButton();
  await app.videoPage.reloadPage();
  await app.videoPage.videoObject.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test("Check that image of proxy cdn server", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.expectVideoResultToHaveCount(10);
  await app.videoPage.videoObject.expectAllImagesToHaveAttribute(/cdn.swisscows.com/);
});

test("Check regional search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchBar.inputSearchCriteria("iphone");
  await app.home.header.searchBar.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();
  await app.videoPage.header.clickHamburgerMenuButton();
  await app.videoPage.header.hamburgerMenu.selectRegion("Germany");
  await app.videoPage.videoObject.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.videoObject.expectVideoTitleToContain(/iphone/i);
  await app.videoPage.videoObject.expectVideoResultToHaveCount(10);
  await app.videoPage.videoObject.expectVideoImageToBeVisible();
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/video?query=iphone&region=de-DE`
  );
});
