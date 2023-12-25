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
test("Check Queries Rate Limit for Regular Bot /web search @apis", async ({
  botsProtection,
}) => {
  // Action
  const response = await botsProtection.make100SearchRequestAndGetResponse(
    testData.WebSearchRequestRateLimit.XRequestNonce,
    testData.WebSearchRequestRateLimit.XRequestSignature,
    testData.WebSearchRequestBrazilianBots.query,
    testData.WebSearchRequestRateLimit.webEndpoint
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
test("Check Queries Rate Limit for Regular Bot /image search @api", async ({
  botsProtection,
}) => {
  // Action
  const response = await botsProtection.makeSearchRequestAndGetResponseForImage(
    testData.ImageSearchRequestRateLimit.XRequestNonce,
    testData.ImageSearchRequestRateLimit.XRequestSignature,
    testData.ImageSearchRequestRateLimit.query,
    testData.ImageSearchRequestRateLimit.imageEndpoint
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

test("Check Queries Rate Limit for Regular Bot /video search @api", async ({
  botsProtection,
}) => {
  // Action
  const response = await botsProtection.makeSearchRequestAndGetResponseForVideo(
    testData.VideoSearchRequestRateLimit.XRequestNonce,
    testData.VideoSearchRequestRateLimit.XRequestSignature,
    testData.VideoSearchRequestRateLimit.query,
    testData.VideoSearchRequestRateLimit.videoEndpoint
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

test("Check Queries Rate Limit for Regular Bot /shopping search @api", async ({
  botsProtection,
}) => {
  // Action
  const response =
    await botsProtection.makeSearchRequestAndGetResponseForShopping(
      testData.ShoppingSearchRequestRateLimit.XRequestNonce,
      testData.ShoppingSearchRequestRateLimit.XRequestSignature,
      testData.ShoppingSearchRequestRateLimit.query,
      testData.ShoppingSearchRequestRateLimit.shoppingEndpoint
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

test("Check Queries Rate Limit for Regular Bot /music search @api", async ({
  botsProtection,
}) => {
  // Action
  const response = await botsProtection.makeSearchRequestAndGetResponseForMusic(
    testData.MusicSearchRequestRateLimit.query,
    testData.MusicSearchRequestRateLimit.musicEndpoint
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