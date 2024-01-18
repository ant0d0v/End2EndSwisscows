const { expect, test } = require("@playwright/test");

export default class BotsProtection {
  constructor(request) {
    this.request = request;
  }

  // Action
  async getSearchRequest (endpoint, {headers,params} ){
    return  await test.step(`Send GET request 100 times `, async () => {
      return response = await this.request.get(process.env.API_URL + endpoint, {
        headers,params
      })
    })
  }

  async make100SearchRequestAndGetResponse(Nonce, Signature, Query, endpoint) {
    return  await test.step(`Send GET request 100 times `, async () => {
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
    });
  }
  async makeSearchRequestAndGetResponseForImage(Nonce, Signature, Query, endpoint) {
    return await test.step(`Send GET request for /image endpoint `, async () => {
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
    });
  }
  async makeSearchRequestAndGetResponseForVideo(Nonce, Signature, Query, endpoint) {
    return await test.step(`Send GET request for /video endpoint `, async () => {
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
    });
  }

  async makeSearchRequestAndGetResponseForShopping( Nonce, Signature, Query, endpoint ) {
    return await test.step(`Send GET request for /Shopping endpoint `, async () => {
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
    });
  }
  async makeSearchRequestAndGetResponseForMusic(Query, endpoint) {
    return await test.step(`Send GET request for /music endpoint `, async () => {
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
    });
  }

  async make10SearchRequestAndGetResponse(Nonce, Signature, Query, endpoint) {
    return await test.step(`Send GET request 10 times `, async () => {
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
    });
  }
  // Verify

  async expectResponseToHaveStatusCode(response, code) {
    await test.step(`Expect status code ${code} `, async () => {
      await expect(response.status()).toBe(code);
    })
  }
  async expectResponseToBeFalsy(response) {
    await test.step(`Expect status code to be falsy  `, async () => {
      await expect(response.ok()).toBeFalsy();
    })
  }
}
