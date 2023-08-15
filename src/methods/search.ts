/** 搜索方法 */

import axios from "axios";
import {
  paidMusicFilter,
  formatMusicItem,
  paidAlbumFilter,
  formatAlbumItem,
  formatArtistItem,
} from "../utils/formatter";

async function searchBase(query: string, page: number, core: string) {
  return (
    await axios.get("https://www.ximalaya.com/revision/search/main", {
      params: {
        kw: query,
        page: page,
        spellchecker: true,
        condition: "relation",
        rows: 20,
        device: "iPhone",
        core,
        paidFilter: true,
      },
    })
  ).data;
}

async function searchMusic(query: string, page: number) {
  const res = (await searchBase(query, page, "track")).data.track;
  return {
    isEnd: page >= res.totalPage,
    data: res.docs.filter(paidMusicFilter).map(formatMusicItem),
  };
}

async function searchAlbum(query: string, page: number) {
  const res = (await searchBase(query, page, "album")).data.album;
  return {
    isEnd: page >= res.totalPage,
    data: res.docs.filter(paidAlbumFilter).map(formatAlbumItem),
  };
}

async function searchArtist(query: string, page: number) {
  const res = (await searchBase(query, page, "user")).data.user;
  return {
    isEnd: page >= res.totalPage,
    data: res.docs.map(formatArtistItem),
  };
}

/** 搜索函数 */
export default async function (query: string, page: number, type: IMedia.SupportMediaType) {
  if (type === "music") {
    return searchMusic(query, page);
  } else if (type === "album") {
    return searchAlbum(query, page);
  } else if (type === "artist") {
    return searchArtist(query, page);
  }
}
