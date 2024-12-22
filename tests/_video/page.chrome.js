import { test, expect } from "../../utils/fixtures.js";
import {
  saveStorageState,
  getStorageKey,
} from "../../helpers/authHelper.js";
import { faker } from "@faker-js/faker";
import { randomVideoQuery } from "../../helpers/random.js";

test("Check No Results Found error video page", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, {
    error: 204,
    name: "video",
  });
});

test("Check design request is blocked 450 error video page", async ({
  app,
}, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("porn");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, {
    error: 450,
    name: "video",
  });
});

test("Check 500 unknown Error Page video page", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.requestWithGivenResponseStatusCode("/v2/videos", 500);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, {
    error: 500,
    name: "video",
  });
});

test("Check 429 Too many requests", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.route.requestWithGivenResponseStatusCode("/v2/videos", 429);
  await app.home.header.searchForm.inputSearchCriteria("food");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();

  //Assert
  await app.videoPage.error.takeSnapshot(testInfo, {
    error: 429,
    name: "video",
  });
});

test("Check design video page", async ({ app }, testInfo) => {
  //Actions
  await app.route.requestWithGivenResponse(
    "/v2/videos",
    "data/mock/video/testData.json"
  );
  await app.videoPage.open(`/video?query=Iphone`)
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.takeSnapshot(testInfo);
});

test("Check that video results equals search criteria", async ({ app }) => {
  //Actions
  await app.videoPage.open(`/video?query=Iphone`)
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoTitleToContain(/iphone/i);
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.expectVideoImageToBeVisible();
});

test("Check infinity scroll in video results", async ({ app }) => {
  //Actions
  await app.videoPage.open(`/video?query=nfs`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.scrollByVisibleLastVideo();

  //Assert
  await app.videoPage.item.expectVideoResultToHaveCount(20);
  await app.videoPage.item.scrollByVisibleLastVideo();
  await app.videoPage.item.expectVideoResultToHaveCount(30);
});

test("Check the design error icon of video object", async ({
  app,
}, testInfo) => {
  //Actions
  await app.route.requestWithGivenResponse(
    "/v2/videos",
    "data/mock/video/errorIcon.json"
  );
  await app.videoPage.open(`/video?query=${faker.music.songName()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.waitErrorIconIsLoaded()

  //Assert
  await app.videoPage.item.expectImageToHaveProperty({
    complete: true
  });
  await app.videoPage.item.takeSnapshotErrorIcon(testInfo);
});

test("Check the design when video object is active", async ({
  app,
}, testInfo) => {
  //Actions
  await app.route.requestWithGivenResponse(
    "/v2/videos",
    "data/mock/video/testData.json"
  );
  await app.videoPage.open(`/video?query=${faker.music.songName()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.item.takeSnapshot(testInfo);
});

test("Check the info video object { site, description, data, views }", async ({
  app,
}) => {
  //Actions
  await app.videoPage.open(`/video?query=Arctic+Monkeys+-+Do+I+Wanna+Know%3F+%28Official+Video%29+-+YouTube`)
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoDescriptionNotToBeEmpty();
  await app.videoPage.item.expectVideoInfoToContain({
    site: /^(DailyMotion|Vimeo|YouTube)$/,
    views: /^\d+(\.\d+)?[MKB]?\sviews$/,
    date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
  });
});

test("Check the info video object { site, description, data, views } when opening video in player", async ({
  app,
}) => {
  //Actions
  await app.videoPage.open(`/video?query=${faker.music.songName()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.item.expectVideoDescriptionNotToBeEmpty();
  await app.videoPage.item.expectVideoInfoToContain({
    site: /^(DailyMotion|Vimeo|YouTube)$/,
    views: /^\d+(\.\d+)?[MKB]?\sviews$/,
    date: /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
  });
});

test("Check open video of vimeo owner", async ({ app }) => {
  //Actions
  await app.videoPage.open(`/video?query=site%3Avimeo.com`)
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
  await app.home.header.searchForm.inputSearchCriteria("site:dailymotion.com");
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
  await app.videoPage.open(`/video?query=${faker.music.songName()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoTitleAt({ number: 1 });

  //Assert
  await app.expectPageToHaveUrl(app.page, /youtube.com/);
});

test("Check design of video Privacy Warning", async ({ app }, testInfo) => {
  //Actions
  await app.route.requestWithGivenResponse(
    "/v2/videos",
    "data/mock/video/testData.json"
  );
  await app.videoPage.open(`/video?query=iphone`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test(`Check design of Video unavailable vimeo owner`, async ({
  app,
}, testInfo) => {
  //Actions
  await app.videoPage.open(`/video?query=site%3Avimeo.com`)
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
  await app.home.header.searchForm.inputSearchCriteria("site:dailymotion.com");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });

  //Assert
  await app.videoPage.player.takeSnapshot(testInfo);
});

test("Check cancel button of Video unavailable warning ", async ({ app }) => {
  //Actions
  await app.videoPage.open(`/video?query=site%3Avimeo.com`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickCancelButton();

  //Assert
  await app.videoPage.player.expectPlayerToBeHidden();
});

test("Check cancel button of Privacy Warning ", async ({ app }) => {
  //Actions
  await app.route.requestWithGivenResponse(
    "/v2/videos",
    "data/mock/video/testData.json"
  );
  await app.videoPage.open(`/video?query=${faker.music.songName()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickCancelButton();

  //Assert
  await app.videoPage.player.expectPlayerToBeHidden();
});

test("Check video play if don't select checkbox Don't remind me again", async ({
  app,
}, testInfo) => {
  //Actions
  await app.videoPage.open(`/video?query=${randomVideoQuery()}`)
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
  await app.videoPage.open(`/video?query=${faker.music.songName()}`)
  await app.videoPage.item.expectVideoItemsToBeVisible();

  //Assert
  await app.videoPage.item.expectVideoResultToHaveCount(10);
  await app.videoPage.item.expectAllImagesToHaveAttribute(
    /cdn.dev.swisscows.com/
  );
});

test("Check regional search", async ({ app }) => {
  //Actions
  await app.videoPage.open(`/video?query=iphone`)
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

test.fixme("Check that youtube video is playing", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("linkin park");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickOkButton();

  //Assert
  await app.videoPage.player.expectYouTubeVideoToHaveAttribute({
    attribute: /playing-mode/,
  });
});

test.use({ channel: "chrome" });
test("Check that dailymotion video is playing", async ({ app }) => {
  //Actions
  await app.videoPage.open(`/video?query=site%3Adailymotion.com+public+video`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.clickOkButton();

  //Assert
  await app.videoPage.player.expectDailyMotionVideoToHave({
    text: "Video playing",
  });
});

test("Check checkbox `Don't remind me again`", async ({ app }) => {
  //Actions
  await app.route.requestWithGivenResponse(
    "/v2/videos",
    "data/mock/video/testData.json"
  );
  await app.videoPage.open(`/video?query=trump`)
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.videoPage.player.selectCheckbox();
  await app.videoPage.player.clickOkButton();
  await app.videoPage.reloadPage();
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await saveStorageState(app.page);

  //Assert
  expect(await getStorageKey("video.mode")).toEqual('"embedded"');
});
