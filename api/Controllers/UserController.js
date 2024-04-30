const { request } = require("@playwright/test");
import RequestHolder from "../RequestHolder";


export default class UserController extends RequestHolder {
  constructor(request) {
    super(request)
  }
  async sendDeleteImageFromFavorite(id, token){
    const context = await request.newContext()
    await context.delete(`${ process.env.API_URL}/v4/user/images/${id}`,{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${token}`,
    },
   });
  }

  async sendDeleteTrackFromFavorite (id, token){
    const context = await request.newContext()
    await context.delete(`${ process.env.API_URL}/music/tracks/my/${id}`,{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': `Bearer ${token}`,
    },
   });
  }
}