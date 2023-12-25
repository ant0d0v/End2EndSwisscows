const { expect} = require("@playwright/test");

export class BotsProtection {
  constructor(request) {
    this.request = request;
  }

  // Action

  async make100SearchRequestAndGetResponse(Nonce, Signature, Query, endpoint) {
    let response;
    for (let i = 1; i < 110; i++) {
      response = await this.request.get(process.env.API_URL + endpoint, {
        headers: {
          "X-Request-Nonce": Nonce,
          "X-Request-Signature": Signature,
        },
        params: {
          query: Query,
          offset: 0,
          itemsCount: 10,
          region: "uk-UA",
          freshness: "All",
        },
      });
    }
    return response;
  }
  async makeSearchRequestAndGetResponseForImage(
    Nonce,
    Signature,
    Query,
    endpoint
  ) {
    let response;
    response = await this.request.get(process.env.API_URL + endpoint, {
      headers: {
        "X-Request-Nonce": Nonce,
        "X-Request-Signature": Signature,
      },
      params: {
        query: Query,
        offset: 0,
        itemsCount: 50,
        region: "uk-UA",
        freshness: "All",
        aspect: "All",
        size: "All",
        color: "All",
        type: "All",
        content: "All",
        license: "All",
      },
    });
    return response;
  }
  async makeSearchRequestAndGetResponseForVideo(
    Nonce,
    Signature,
    Query,
    endpoint
  ) {
    let response;
    response = await this.request.get(process.env.API_URL + endpoint, {
      headers: {
        "X-Request-Nonce": Nonce,
        "X-Request-Signature": Signature,
      },
      params: {
        query: Query,
        itemsCount: 10,
        region: "uk-UA",
      },
    });
    return response;
  }

  async makeSearchRequestAndGetResponseForShopping(
    Nonce,
    Signature,
    Query,
    endpoint
  ) {
    let response;
    response = await this.request.get(process.env.API_URL + endpoint, {
      headers: {
        "X-Request-Nonce": Nonce,
        "X-Request-Signature": Signature,
      },
      params: {
        query: Query,
        offset: 0,
        itemsCount: 24,
        sort: "Popularity",
        region: "de-DE",
      },
    });
    return response;
  }
  async makeSearchRequestAndGetResponseForMusic(Query, endpoint) {
    let response;
    response = await this.request.get(process.env.API_URL + endpoint, {
      params: {
        query: Query,
        offset: 0,
        itemsCount: 20,
        region: "de-DE",
      },
    });
    return response;
  }

  async make10SearchRequestAndGetResponse(Nonce, Signature, Query, endpoint) {
    let response;
    for (let i = 1; i <= 13; i++) {
      response = await this.request.get(process.env.API_URL + endpoint, {
        headers: {
          "X-Request-Nonce": Nonce,
          "X-Request-Signature": Signature,
        },
        params: {
          query: Query,
          offset: 0,
          itemsCount: 10,
          region: "uk-UA",
          freshness: "All",
        },
      });
    }
    return response;
  }
  // Verify

  async expectResponseToHaveStatusCode(response, code) {
    await expect(response.status()).toBe(code);
  }
  async expectResponseToBeFalsy(response) {
    await expect(response.ok()).toBeFalsy();
  }
}
