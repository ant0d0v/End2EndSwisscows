import { test, expect } from "../../../utils/fixtures.js";
test("Check open web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.expectScreenshotImageAtNumberToBeVisible(1);
});

test("Check close web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.expectScreenshotImageAtNumberToBeVisible(1);
  await app.webPage.preview.clickCloseButton();
  await app.webPage.preview.expectScreenshotImageAtNumberToBeHidden(1);
});

test("Check click open site button in web Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.expectToBeOpenedNewPageAfterClickOpenSiteButton(
    /wikipedia.org/
  );
});

test("Check verified title in Preview ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.takeVerifiedTitleSnapshot(testInfo);
});
test("Check found trakers title in Preview ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("google");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.expectScreenshotImageAtNumberToBeVisible(1);
  await app.webPage.preview.takeFoundTitleSnapshot(testInfo);
});

test("Check navigation in Preview ", async ({ app }, testInfo) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("google");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.expectScreenshotImageAtNumberToBeVisible(1);
  await app.webPage.preview.takeNavigationSnapshot(testInfo);
});

test("Check next button in  Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });
  await app.webPage.preview.clickNextButton();

  //Assert
  await app.webPage.preview.expectAttributeSlideAtNumber({
    slideNumber: 2,
    attribute: /active/,
  });
  await app.webPage.preview.expectAttributeSlideAtNumber({
    slideNumber: 1,
    attribute: /prev/,
  });
});

test("Check prev button in  Preview ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });
  await app.webPage.preview.clickNextButton();

  //Assert
  await app.webPage.preview.expectAttributeSlideAtNumber({
    slideNumber: 2,
    attribute: /active/,
  });
  await app.webPage.preview.clickPrevButton();
  await app.webPage.preview.expectAttributeSlideAtNumber({
    slideNumber: 1,
    attribute: /active/,
  });
  await app.webPage.preview.expectAttributeSlideAtNumber({
    slideNumber: 2,
    attribute: /next/,
  });
});

test("Check prev button to be hidden  when clicking next button ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });
  await app.webPage.preview.clickNextButton();

  //Assert
  await app.webPage.preview.expectPrevButtonToBeVisible();
  await app.webPage.preview.clickPrevButton();
  await app.webPage.preview.expectPrevButtonToBeHidden();
});

test("Check description is full when clicking more ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki iphone");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });
  await app.webPage.preview.clickMore();

  //Assert
  await app.webPage.preview.expectDescriptionIs("description full");
});

test("Check description isn't full when clicking less ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki ronaldo");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });
  await app.webPage.preview.clickMore();

  //Assert
  await app.webPage.preview.expectDescriptionIs("description full");
  await app.webPage.preview.clickLess();
  await app.webPage.preview.expectDescriptionIs("description");
});

test("Check that screenshot to have height = 439 and width = 780 in Preview ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("wiki");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  await app.webPage.webPageItem.clickPreviewButtonAt({ number: 1 });

  //Assert
  await app.webPage.preview.expectScreenshotImageAtNumberToBeVisible(1);
  await app.webPage.preview.expectScreenshotImageToHaveJSProperty({
    height: 439,
    width: 780,
  });
});

test("Check sent Event of WS when clicking preview button", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("google");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  const webSocket =
    await app.webPage.webPageItem.waitWebSocetAfterClickPreviewButtonAt(1);
  const sentPayload = await app.webPage.preview.waitSentEventAndGetPayload(
    webSocket
  );
  await webSocket.waitForEvent("close");

  //Assert
  await app.webPage.preview.expectWebSocketIsClosed(webSocket);
  expect(sentPayload).toMatchObject({
    url: expect.stringMatching(/www.google.com/),
    imageType: "jpeg",
    imageQuality: 90,
    width: 1366,
    height: 768,
    waitForEvent: "networkidle0",
  });
});

test("Check received Event of WS when clicking preview button", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("google");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.webPageItem.expectWebPageItemsToBeVisible();
  const webSocket =
    await app.webPage.webPageItem.waitWebSocetAfterClickPreviewButtonAt(1);
  const receivedPayload =
    await app.webPage.preview.waitReceivedEventAndGetPayload(webSocket);
  await webSocket.waitForEvent("close");

  //Assert
  await app.webPage.preview.expectWebSocketIsClosed(webSocket);
  expect(receivedPayload).toEqual({
    type: "tracker",
    data: {
      name: "Google",
      baseUrl: "http://www.google.com/",
      category: "Content",
    },
  });
});
