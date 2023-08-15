import axios from "axios";
import cheerio from "cheerio";
import cryptojs from "crypto-js";
import dayjs from "dayjs";
import bigInt from "big-integer";
import he from "he";
import qs from "qs";
import { formatMusicItem, paidMusicFilter } from "./utils/formatter";
import search from "./methods/search";
import getArtistWorks from "./methods/getArtistWorks";

/**
 * 你可以直接在此文件中写逻辑，也可以拆到其他文件中导入
 */

/** 获取专辑详情 */
async function getAlbumInfo(albumItem: IAlbum.IAlbumItem, page: number = 1) {
  const res = await axios.get(
    "https://www.ximalaya.com/revision/album/v1/getTracksList",
    {
      params: {
        albumId: albumItem.id,
        pageNum: page,
        pageSize: 50,
      },
    }
  );
  return {
    isEnd: page * 50 >= res.data.data.trackTotalCount,
    albumItem: {
      worksNum: res.data.data.trackTotalCount,
    },
    musicList: res.data.data.tracks.filter(paidMusicFilter).map((_) => {
      const r = formatMusicItem(_);
      r.artwork = albumItem.artwork;
      r.artist = albumItem.artist;
      return r;
    }),
  };
}

/** 获取音乐源 */
async function getMediaSource(
  musicItem: IMusic.IMusicItem,
  quality: IMusic.IQualityKey
) {
  if (quality !== "standard") {
    return;
  }

  const data = await axios.get(
    "https://www.ximalaya.com/revision/play/v1/audio",
    {
      params: {
        id: musicItem.id,
        ptype: 1,
      },
      headers: {
        referer: `https://www.ximalaya.com/sound/${musicItem.id}`,
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
      },
    }
  );
  return {
    url: data.data.data.src,
  };
}

const pluginInstance: IPlugin.IPluginDefine = {
  platform: "XMLY",
  version: "0.0.0",
  supportedSearchType: ["music", "album", "artist"],
  search, // 搜索
  getMediaSource, // 获取音乐源
  getAlbumInfo, // 获取专辑详情
  getArtistWorks // 获取作者信息
};

export default pluginInstance;
