import { test } from "../../../utils/fixtures.js";

test("Check play video in player", async ({ app, page }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("Skofka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.videoPage.header.navigation.clickVideoTab();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.page.waitForTimeout(5000)
  await app.videoPage.item.clickVideoImageAt({ number: 1 });
  await app.page.waitForTimeout(5000);
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
