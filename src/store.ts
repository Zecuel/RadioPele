import { SongInfo } from "./types/index";
import { getSong } from "./utils/index";
import { SpotifyApi } from "./api/spotify-api";
import { YoutubeDataApi } from "./api/youtube-data-api";

export class Store {
  private _queue: SongInfo<true>[];

  constructor() {
    this._queue = [];
  }

  public async add(
    query: string,
    youtubeDataApi: YoutubeDataApi,
    spotifyApi: SpotifyApi
  ): Promise<SongInfo> {
    let result: SongInfo = {
      success: false,
    };

    try {
      result = await getSong(query, youtubeDataApi, spotifyApi);

      if (result.success) {
        this._queue.push(result);
      }
    } catch (err) {
      (result as SongInfo<false>).reason = (err as Error).message;
      console.error(err);
    } finally {
      return result;
    }
  }

  public async clear() {
    this._queue = [];
  }

  public async shuffle() {
    for (let i = this._queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._queue[i], this._queue[j]] = [this._queue[j], this._queue[i]];
    }
  }

  public async play(): Promise<undefined | SongInfo<true>> {
    let nextSong = this._queue.shift();
    return nextSong;
  }

  public get qLength() {
    return this._queue.length;
  }
}
