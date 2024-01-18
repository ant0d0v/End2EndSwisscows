const { test, expect } = require("../../utils/fixtureApi");
const testData = JSON.parse(
  JSON.stringify(require("../../data/bots-protection-system/testData.json"))
);
test.describe.configure({ mode: "default" });
test("Brazilian Bots and Error 429 Page /web search @api", async ({
  botsProtection,
}) => {
  const query = `"${testData.WebSearchRequestBrazilianBots.query}"`;
  // Action
  const response = await botsProtection.make10SearchRequestAndGetResponse(
    testData.WebSearchRequestBrazilianBots.XRequestNonce,
    testData.WebSearchRequestBrazilianBots.XRequestSignature,
    query,
    testData.WebSearchRequestBrazilianBots.webEndpoint
  );

  // Assert
  await botsProtection.expectResponseToHaveStatusCode(response, 429);
  await botsProtection.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(
    expect.objectContaining({
      status: 429,
    })
  );
});

test("Brazilian Bots and Error 429 Page /image search @api", async ({
  botsProtection,
}) => {
  const query = `"${testData.ImageSearchRequestBrazilianBots.query}"`;
  // Action
  const response = await botsProtection.makeSearchRequestAndGetResponseForImage(
    testData.ImageSearchRequestBrazilianBots.XRequestNonce,
    testData.ImageSearchRequestBrazilianBots.XRequestSignature,
    query,
    testData.ImageSearchRequestBrazilianBots.imageEndpoint
  );

  // Assert
  await botsProtection.expectResponseToHaveStatusCode(response, 429);
  await botsProtection.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(
    expect.objectContaining({
      status: 429,
    })
  );
});

test("Brazilian Bots and Error 429 Page /video search @api", async ({
  botsProtection,
}) => {
  const query = `"${testData.ImageSearchRequestBrazilianBots.query}"`;
  // Action
  const response = await botsProtection.makeSearchRequestAndGetResponseForVideo(
    testData.VideoSearchRequestBrazilianBots.XRequestNonce,
    testData.VideoSearchRequestBrazilianBots.XRequestSignature,
    query,
    testData.VideoSearchRequestBrazilianBots.videoEndpoint
  );

  // Assert
  await botsProtection.expectResponseToHaveStatusCode(response, 429);
  await botsProtection.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(
    expect.objectContaining({
      status: 429,
    })
  );
});

test("Brazilian Bots and Error 429 Page /shopping search @api", async ({
  botsProtection,
}) => {
  const query = `"${testData.ShoppingSearchRequestBrazilianBots.query}"`;
  // Action
  const response =
    await botsProtection.makeSearchRequestAndGetResponseForShopping(
      testData.ShoppingSearchRequestBrazilianBots.XRequestNonce,
      testData.ShoppingSearchRequestBrazilianBots.XRequestSignature,
      query,
      testData.ShoppingSearchRequestBrazilianBots.shoppingEndpoint
    );

  // Assert
  await botsProtection.expectResponseToHaveStatusCode(response, 429);
  await botsProtection.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(
    expect.objectContaining({
      status: 429,
    })
  );
});

test("Brazilian Bots and Error 429 Page /music search @api", async ({
  botsProtection,
}) => {
  const query = `"${testData.MusicSearchRequestBrazilianBots.query}"`;
  // Action
  const response = await botsProtection.makeSearchRequestAndGetResponseForMusic(
    query,
    testData.MusicSearchRequestBrazilianBots.musicEndpoint
  );

  // Assert
  await botsProtection.expectResponseToHaveStatusCode(response, 429);
  await botsProtection.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(
    expect.objectContaining({
      status: 429,
    })
  );
});
test("Check Queries Rate Limit for Regular Bot /web search @api", async ({
  searchBuilder, 
  request
}) => {
  // Action
  let response;
  for (let i = 1; i < 105; i++) {
  response = await  request.get(process.env.API_URL + "/web/search",
  searchBuilder.setHeaders(
    testData.WebSearchRequestRateLimit.XRequestNonce,
    testData.WebSearchRequestRateLimit.XRequestSignature,
   )
   .setQueryParam("good")
   .setOffsetParam(0)
   .setItemsCountParam(10)
   .setFreshnessParam("All")
   .setRegionParam("uk-UA")
   .build()
  )}
   // Assert
   await searchBuilder.expectResponseToHaveStatusCode(response, 429);
   await searchBuilder.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Check Queries Rate Limit for Regular Bot /image search @api", async ({
  searchBuilder, 
  request
}) => {
  // Action
  const response = await request.get(process.env.API_URL + "/image/search",
  searchBuilder.setHeaders(
    testData.ImageSearchRequestRateLimit.XRequestNonce,
    testData.ImageSearchRequestRateLimit.XRequestSignature,
   )
   .setQueryParam("test")                 
   .setOffsetParam(0)
   .setItemsCountParam(50)
   .setRegionParam("uk-UA")
   .setFreshnessParam("All")
   .setAspectParam("All")
   .setSizeParam("All")
   .setColorParam("All")
   .setTypeParam("All")
   .setContentParam("All")
   .setLicenseParam("All")
   .build() 
  ) 
   // Assert
   await searchBuilder.expectResponseToHaveStatusCode(response, 429);
   await searchBuilder.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Check Queries Rate Limit for Regular Bot /video search @api", async ({
  searchBuilder, 
  request
}) => {

  // Action
  const response = await request.get(process.env.API_URL + "/v2/videos/search",
  searchBuilder.setHeaders(
    testData.VideoSearchRequestRateLimit.XRequestNonce,
    testData.VideoSearchRequestRateLimit.XRequestSignature,
   )
   .setQueryParam("test")
   .setItemsCountParam(10)
   .setRegionParam("uk-UA")
   .build()
   ) 
  // Assert
  await searchBuilder.expectResponseToHaveStatusCode(response, 429);
  await searchBuilder.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({
      status: 429,
    })
  );
});

test("Check Queries Rate Limit for Regular Bot /shopping search @api", async ({
  searchBuilder, 
  request
}) => {
   // Action
  const response = await request.get(process.env.API_URL + "/shopping/search",
  searchBuilder.setHeaders(
    testData.ShoppingSearchRequestRateLimit.XRequestNonce,
    testData.ShoppingSearchRequestRateLimit.XRequestSignature
   )
   .setQueryParam("ivanka")
   .setOffsetParam(0)
   .setItemsCountParam(24)
   .setSortParam("Popularity")
   .setRegionParam("de-DE")
   .build()
  ) 
  // Assert
  await searchBuilder.expectResponseToHaveStatusCode(response, 429);
  await searchBuilder.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({
      status: 429,
    })
  );
});

test("Check Queries Rate Limit for Regular Bot /music search @api", async ({
  searchBuilder, 
  request
}) => {
  // Action
  const response = await request.get(process.env.API_URL + "/audio/search/tracks",
  searchBuilder.setHeaders(
    testData.MusicSearchRequestRateLimit.XRequestNonce,
    testData.MusicSearchRequestRateLimit.XRequestSignature
   )
   .setQueryParam("best")
   .setOffsetParam(0)
   .setItemsCountParam(20)
   .setRegionParam("de-DE")
   .build()
  ) 
  // Assert
  await searchBuilder.expectResponseToHaveStatusCode(response, 429);
  await searchBuilder.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({
      status: 429,
    })
  );
});