import axios from "axios";
import { paidMusicFilter, formatMusicItem, paidAlbumFilter, formatAlbumItem } from "../utils/formatter";

/** 获取作者的所有作品 */
export default async function getArtistWorks(artistItem: IArtist.IArtistItem, page: number, type: IArtist.ArtistMediaType) {
    if (type === "music") {
      const res = (
        await axios.get("https://www.ximalaya.com/revision/user/track", {
          params: {
            page,
            pageSize: 30,
            uid: artistItem.id,
          },
        })
      ).data.data;
      return {
        isEnd: res.page * res.pageSize >= res.totalCount,
        data: res.trackList.filter(paidMusicFilter).map((_) => ({
          ...formatMusicItem(_),
          artist: artistItem.name,
        })),
      };
    } else {
      const res = (
        await axios.get("https://www.ximalaya.com/revision/user/pub", {
          params: {
            page,
            pageSize: 30,
            uid: artistItem.id,
          },
        })
      ).data.data;
      return {
        isEnd: res.page * res.pageSize >= res.totalCount,
        data: res.albumList.filter(paidAlbumFilter).map((_) => ({
          ...formatAlbumItem(_),
          artist: artistItem.name,
        })),
      };
    }
  }
  