import dayjs from "dayjs";

/** 将接口返回的音乐格式化为符合MusicFree协议的音乐 */
export function formatMusicItem(_) {
  return {
    id: _.id ?? _.trackId,
    artist: _.nickname,
    title: _.title,
    album: _.albumTitle,
    duration: _.duration,
    artwork: _.coverPath?.startsWith("//")
      ? `https:${_.coverPath}`
      : _.coverPath,
  } as IMusic.IMusicItem;
}

/** 将接口返回的专辑格式化为符合MusicFree协议的专辑 */
export function formatAlbumItem(_) {
  return {
    id: _.albumId ?? _.id,
    artist: _.nickname,
    title: _.title,
    artwork: _.coverPath?.startsWith("//")
      ? `https:${_.coverPath}`
      : _.coverPath,
    description: _.intro ?? _.description,
    date: _.updatedAt ? dayjs(_.updatedAt).format("YYYY-MM-DD") : null,
  } as unknown as IAlbum.IAlbumItem;
}

/** 将接口返回的作者格式化为符合MusicFree协议的作者 */
export function formatArtistItem(_) {
  return {
    name: _.nickname,
    id: _.uid,
    fans: _.followersCount,
    description: _.description,
    avatar: _.logoPic,
    worksNum: _.tracksCount,
  } as IArtist.IArtistItem;
}

/** 过滤收费的专辑 */
export function paidAlbumFilter(raw) {
  return !raw.priceTypes?.length;
}

/** 过滤收费的歌曲 */
export function paidMusicFilter(raw) {
  return raw.tag === 0 || raw.isPaid === false || parseFloat(raw.price) === 0;
}