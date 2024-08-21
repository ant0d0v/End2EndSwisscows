import BasePage from "../../../base/BasePage.js";
import FavoritePlaylist from "./FavoritePlaylist.js"
import Player from "./Player.js";
import Playlist from "./Playlist.js";
import Track from "./Track.js";
import Header from "../Header.js";
import Error from "../Error.js";
import Preloader from "../../../components/Preloader.js";
export default class MusicPage extends BasePage {
  constructor(page) {
    super(page);
    this.favoritePlaylist = new FavoritePlaylist(page);
    this.player = new Player(page);
    this.playlist = new Playlist(page);
    this.track = new Track(page);
    this.header  = new Header(page);
    this.error = new Error(page)
    this.preloader = new Preloader(page)

    //Locators 
    this.myFavoritePlaylist = this.page.getByRole('link', { name: /My favorite tracks/ })
    this.playlistNumber = (index) => this.page.locator(`//a[contains(@href, "/en/music/playlist?query=")]`).nth(index - 1)
  }
  //Actions
  async clickFavoritePlaylist(){
    await this.clickElement( this.myFavoritePlaylist,
      `favorite playlist`
    );
  };
  async clickPlaylistAt(playlist = { number: index }) {
    await this.clickElement( this.playlistNumber(playlist.number - 1),
      `playlist ${playlist.number}`
    );
  };
  
}
