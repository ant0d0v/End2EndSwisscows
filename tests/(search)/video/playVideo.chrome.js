import { test } from "../../../utils/fixtures.js";

test.use({ headless: false });
test("Check play video in player", async ({ app, page }) => {
  await app.page.setExtraHTTPHeaders({
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "upgrade-insecure-requests": "1",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,en;q=0.8",
  });
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
  await app.home.header.searchForm.inputSearchCriteria("football");
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
