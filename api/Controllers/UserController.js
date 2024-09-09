import { request , expect } from "@playwright/test";
import RequestHolder from "../RequestHolder.js";


export default class UserController extends RequestHolder {
  constructor(request) {
    super(request)
  }
  async sendDeleteImageFromFavorite(id, token){
    const response = await this.request.delete(`${ process.env.API_URL}/v4/user/images/${id}`,{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${token}`,
    },
    });
    expect(response.ok()).toBeTruthy();
  }

  async sendDeleteTrackFromFavorite (id, token){
    const response = await this.request.delete(
      `${process.env.API_URL}/music/tracks/my/${id}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.ok()).toBeTruthy();
  }
}