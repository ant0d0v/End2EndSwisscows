import { test } from "../../../utils/fixtures.js";
import { faker } from "@faker-js/faker";

test("Check 202 No Results Found error page ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 202);
});

test("Check design request is blocked 450 error video page", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 450);
});

test("Check 501 unknown Error Page  ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v2/videos", 500);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 501);
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.mockResponseStatusCode("/v2/videos", 429);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, 429);
});

test("Check that video results equals search criteria", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoTitleToContain(/iphone/i);
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.expectVideoImageToBeVisible();
});

test("Check infinity scroll in video results", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.scrollByVisibleLastVideo();

  //Assert
  await app.videoPage.item.expectVideoResultToHaveCount(40);
});

test("Check the width,height and visibility images of items", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectImageToHaveProperty({
    width: 284,
    height: 160,
  });
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.expectVideoImageToBeVisible();
});

test("Check the design play icon of video object", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.takeSnapshotPlayIconAt(testInfo, { number: 1 });
});

test("Check the design error icon of video object", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.takeSnapshotErrorIconAt(testInfo, { number: 1 });
});

test("Check the design view icon of video object", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.takeSnapshotViewsIconAt(testInfo, {
    number: 1,
  });
});

test("Check the info video object { site, description, data, views }", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoDescriptionNotToBeEmpty();
  await app.videoPage.item.expectVideoInfoToContain({
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
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.item.expectVideoDescriptionNotToBeEmpty();
  await app.videoPage.item.expectVideoInfoToContain({
    site: /^(DailyMotion|Vimeo|YouTube)$/,
    views: /^\d+(\.\d+)?[MK]?\sviews$/,
    date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
  });
});
test.describe("headless = false", () => {
  test.describe.configure({ headless: false });
  test("Check play video in player", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.navigation.clickVideoTab();
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.item.clickVideoImageAt({ number: 1 });
    await app.videoPage.player.clickOkButton();

    //Assert
    await app.videoPage.player.expectTimeToHaveText(/^0:0[2-4]$/);
  });

  test("Check checkbox `Don't remind me again`", async ({ app }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("Skofka");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.videoPage.header.navigation.clickVideoTab();
    await app.videoPage.item.expectVideoItemsToBeVisible();
    await app.videoPage.item.clickVideoImageAt({ number: 1 });
    await app.videoPage.player.selectCheckbox();
    await app.videoPage.player.clickOkButton();
    await app.videoPage.reloadPage();
    await app.videoPage.item.clickVideoImageAt({ number: 1 });

    //Assert
    await app.videoPage.player.expectTimeToHaveText(/^0:0[2-4]$/);
  });
});

test("Check open video of vimeo owner", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("R O M A on Vimeo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.expectToBeOpenedPageAfterClick({
    buttonName: "Open Vimeo",
    url: /vimeo.com/,
  });
});

test("Check open video of dailymotion owner", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(
    "https://www.dailymotion.com/video/x7zxchl"
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.expectToBeOpenedPageAfterClick({
    buttonName: "Open DailyMotion",
    url: /dailymotion.com/,
  });
});

test("Check open video when clicking title of video object", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoTitleAt({ number: 1 });

  //Assert
  await app.expectPageToHaveUrl(app.page, /youtube.com/);
});

test("Check design of video Privacy Warning", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test(`Check design of Video unavailable vimeo owner`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("R O M A on Vimeo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test(`Check design of Video unavailable dailymotion owner`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(
    "https://www.dailymotion.com/video/x7zxchl"
  );
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test("Check cancel button of Video unavailable warning ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("R O M A on Vimeo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickCancelButton();

  //Assert
  await app.videoPage.player.expectPlayerToBeHidden();
});

test("Check cancel button of Privacy Warning ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Skofka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickCancelButton();

  //Assert
  await app.videoPage.player.expectPlayerToBeHidden();
  await app.expectPageToHaveUrl(
    app.page,
    `${process.env.BASE_URL}/en/video?query=Skofka`
  );
});


test("Check video play if don't select checkbox `Don't remind me again ` ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickOkButton();
  await app.videoPage.reloadPage();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test("Check that image of proxy cdn server", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria(faker.music.songName());
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.expectAllImagesToHaveAttribute(/cdn.swisscows.com/);
});

test("Check regional search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.header.clickHamburgerMenuButton();
  await app.videoPage.header.hamburgerMenu.selectRegion("Germany");
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoTitleToContain(/iphone/i);
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.expectVideoImageToBeVisible();
  await app.expectPageToHaveUrl(
    app.page,
    process.env.BASE_URL + `/en/video?query=iphone&region=de-DE`
  );
});
