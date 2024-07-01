import { test, expect } from "../../utils/fixtures.js";
const testData = JSON.parse(
  JSON.stringify(require("../../data/bots-protection-system/testData.json"))
);
test.describe.configure({ mode: "default" });
test("Brazilian Bots and Error 429 Page /web search @api", async ({ app }) => {
  // Action
  let response;
  for (let i = 1; i < 12; i++) {
    response = await app.api.search.sendGet(
      "/v4/web/search",
      app.api.search.webSearchApiRequest
        .setNonceHeader(testData.WebBrazilianBots.XRequestNonce)
        .setSignatureHeader(testData.WebBrazilianBots.XRequestSignature)
        .setQuery(`"Otras características considerar"`)
        .setOffset(0)
        .setCount(10)
        .setLocale("de-DE")
        .setFreshness("All")
        .setSpellcheck(true)
    );
  }
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Brazilian Bots and Error 429 Page /news search @api", async ({ app }) => {
  // Action
  const response = await app.api.search.sendGet(
    "/news/search",
    app.api.search.newsSearchApiRequest
      .setNonceHeader(testData.NewsBrazilianBots.XRequestNonce)
      .setSignatureHeader(testData.NewsBrazilianBots.XRequestSignature)
      .setQuery(`"Otras características considerar"`)
      .setRegion("de-DE")
      .setLanguage("de")
      .setCount(10)
      .setOffset(0)
      .setFreshness("All")
      .setSortOrder("Desc")
      .setSortBy("Created")
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Brazilian Bots and Error 429 Page /image search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/v4/images/search",
    app.api.search.imagesSearchApiRequest
      .setNonceHeader(testData.ImageBrazilianBots.XRequestNonce)
      .setSignatureHeader(testData.ImageBrazilianBots.XRequestSignature)
      .setQuery(`"Otras características considerar"`)
      .setOffset(0)
      .setCount(50)
      .setLocale("uk-UA")
      .setSpellcheck(true)
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Brazilian Bots and Error 429 Page /video search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/v2/videos/search",
    app.api.search.videoSearchApiRequest
      .setNonceHeader(testData.VideoBrazilianBots.XRequestNonce)
      .setSignatureHeader(testData.VideoBrazilianBots.XRequestSignature)
      .setQuery(`"Otras características considerar"`)
      .setCount(10)
      .setRegion("uk-UA")
      .setFreshness("All")
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Brazilian Bots and Error 429 Page /shopping search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/shopping/search",
    app.api.search.shoppingSearchApiRequest
      .setNonceHeader(testData.ShoppingBrazilianBots.XRequestNonce)
      .setSignatureHeader(testData.ShoppingBrazilianBots.XRequestSignature)
      .setQuery(`"Otras características considerar"`)
      .setOffset(0)
      .setCount(24)
      .setRegion("de-DE")
      .setSort("Popularity")
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Brazilian Bots and Error 429 Page /music search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/audio/search/tracks",
    app.api.search.shoppingSearchApiRequest
      .setNonceHeader(testData.MusicRateLimit.XRequestNonce)
      .setSignatureHeader(testData.MusicRateLimit.XRequestSignature)
      .setQuery(`"Otras características considerar"`)
      .setOffset(0)
      .setCount(20)
      .setRegion("de-DE")
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Check Queries Rate Limit for Regular Bot /video search @api", async ({
  app,
}) => {
  // Action
  let response;
  for (let i = 0; i < 102; i++) {
    response = await app.api.search.sendGet(
      "/v2/videos/search",
      app.api.search.videoSearchApiRequest
        .setNonceHeader(testData.VideoRateLimit.XRequestNonce)
        .setSignatureHeader(testData.VideoRateLimit.XRequestSignature)
        .setQuery("test")
        .setCount(10)
        .setRegion("de-DE")
        .setFreshness("All")
    );
  }
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429)
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429
  });
});

test("Check Queries Rate Limit for Regular Bot /web search @api", async ({
  app,
}) => {
  // Action

  const response = await app.api.search.sendGet(
    "/v4/web/search",
    app.api.search.webSearchApiRequest
      .setNonceHeader(testData.WebRateLimit.XRequestNonce)
      .setSignatureHeader(testData.WebRateLimit.XRequestSignature)
      .setQuery("test")
      .setOffset(0)
      .setCount(10)
      .setLocale("de-DE")
      .setFreshness("All")
      .setSpellcheck(true)
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Check Queries Rate Limit for Regular Bot /image search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/v4/images/search",
    app.api.search.imagesSearchApiRequest
      .setNonceHeader(testData.ImageRateLimit.XRequestNonce)
      .setSignatureHeader(testData.ImageRateLimit.XRequestSignature)
      .setQuery("test")
      .setOffset(0)
      .setCount(50)
      .setLocale("de-DE")
      .setSpellcheck(true)
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429)
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});
test("Check Queries Rate Limit for Regular Bot /shopping search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/shopping/search",
    app.api.search.shoppingSearchApiRequest
      .setNonceHeader(testData.ShoppingRateLimit.XRequestNonce)
      .setSignatureHeader(testData.ShoppingRateLimit.XRequestSignature)
      .setQuery("test")
      .setOffset(0)
      .setCount(24)
      .setRegion("de-DE")
      .setSort("Popularity")
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});

test("Check Queries Rate Limit for Regular Bot /music search @api", async ({
  app,
}) => {
  // Action
  const response = await app.api.search.sendGet(
    "/audio/search/tracks",
    app.api.search.shoppingSearchApiRequest
      .setNonceHeader(testData.MusicRateLimit.XRequestNonce)
      .setSignatureHeader(testData.MusicRateLimit.XRequestSignature)
      .setQuery("test")
      .setOffset(0)
      .setCount(20)
      .setRegion("de-DE")
  );
  // Assert
  await app.api.search.response.expectResponseToHaveStatusCode(response, 429);
  await app.api.search.response.expectBodyToEqual(response, {
    title: "Too Many Requests",
    status: 429,
  });
});
