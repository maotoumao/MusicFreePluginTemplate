/**
 * 预置的类型
 * WARNING: 不要修改此文件的类型定义！！！
 */

declare namespace ICommon {
  type WithMusicList<T> = T & {
    musicList?: IMusic.IMusicItem[];
  };

  type PaginationResponse<T> = {
    isEnd?: boolean;
    data?: T[];
  };
}
declare namespace IMedia {
  export type SupportMediaItem = {
    music: IMusic.IMusicItem;
    album: IAlbum.IAlbumItem;
    artist: IArtist.IArtistItem;
    sheet: IMusic.IMusicSheetItem;
    lyric: ILyric.ILyricItem;
  };

  export type SupportMediaType = keyof SupportMediaItem;

  interface IUnique {
    /** 唯一id */
    id: string | number;
    $?: any;
    [k: string | number | symbol]: any;
  }

  /** 基础媒体类型 */
  interface IMediaBase extends IUnique {
    /** 媒体来源平台，如本地等 */
    platform: string;
    [k: string | number | symbol]: any;
  }
}

declare namespace IMusic {
  type IQualityKey = "low" | "standard" | "high" | "super";

  interface IMusicSource {
    /** 播放的http请求头 */
    headers?: Record<string, string>;
    /** 兜底播放 */
    url?: string;
    /** UA */
    userAgent?: string;
  }

  type IQuality = Record<
    IQualityKey,
    {
      url?: string;
      size?: string | number;
    }
  >;

  /** 歌单集合 */
  export interface IMusicSheetGroupItem {
    title?: string;
    data: Array<IMusicSheetItem>;
  }

  type IMusicItemPartial = Partial<IMusicItem>;
}

declare namespace IArtist {
  type ArtistMediaType = "music" | "album";
}

declare namespace ILyric {
  interface ILyricSource {
    lrc?: string;
    rawLrc?: string;
  }

  interface ILyricItem extends IMusic.IMusicItem {
    /** 没有时间戳的歌词纯文本 */
    rawLrcTxt?: string;
  }
}

declare namespace IMusicSheet {
  interface IMusicSheetItem {
    /** 封面图 */
    coverImg?: string;
    /** 标题 */
    title: string;
    /** 歌单id */
    id: string;
    /** 描述 */
    description: string;
    [k: string]: string | number | undefined;
  }

  interface IMusicTopListGroupItem {
    /** 分组标题 */
    title?: string;
    /** 数据 */
    data: Array<IMusicSheetItem>;
  }
}

declare namespace IPlugin {
  type ICacheControl = "cache" | "no-cache" | "no-store";

  interface IMediaSourceResult {
    headers?: Record<string, string>;
    /** 兜底播放 */
    url?: string;
    /** UA */
    userAgent?: string;
    /** 音质 */
    quality?: IMusic.IQualityKey;
  }
  interface ISearchResult<T extends IMedia.SupportMediaType> {
    isEnd?: boolean;
    data: IMedia.SupportMediaItem[T][];
  }

  type ISearchFunc = <T extends IMedia.SupportMediaType>(
    query: string,
    page: number,
    type: T
  ) => Promise<ISearchResult<T>>;

  interface IAlbumInfoResult {
    isEnd?: boolean;
    albumItem?: IAlbum.IAlbumItem;
    musicList?: IMusic.IMusicItem[];
  }

  interface ISheetInfoResult {
    isEnd?: boolean;
    sheetItem?: IMusic.IMusicSheetItem;
    musicList?: IMusic.IMusicItem[];
  }

  interface IGetRecommendSheetTagsResult {
    // 固定的tag
    pinned?: IMusic.IMusicSheetItem[];
    data?: IMusic.IMusicSheetGroupItem[];
  }

  type IGetArtistWorksFunc = <T extends IArtist.ArtistMediaType>(
    artistItem: IArtist.IArtistItem,
    page: number,
    type: T
  ) => Promise<ISearchResult<T>>;

  interface IPluginDefine {
    /** 插件名 */
    platform: string;
    /** @deprecated 匹配的版本号 */
    appVersion?: string;
    /** 插件版本 */
    version?: string;
    /** 远程更新的url */
    srcUrl?: string;
    /** 主键，会被存储到mediameta中 */
    primaryKey?: string[];
    /** @deprecated 默认搜索类型 */
    defaultSearchType?: IMedia.SupportMediaType;
    /** 有效搜索类型 */
    supportedSearchType?: IMedia.SupportMediaType[];
    /** 插件缓存控制 */
    cacheControl?: "cache" | "no-cache" | "no-store";
    /** 提示文本 */
    hints?: Record<string, string[]>;
    /** 搜索 */
    search?: ISearchFunc;
    /** 获取根据音乐信息获取url */
    getMediaSource?: (
      musicItem: IMusic.IMusicItemPartial,
      quality: IMusic.IQualityKey
    ) => Promise<IMediaSourceResult | null>;
    /** 根据主键去查询歌曲信息 */
    getMusicInfo?: (
      musicBase: IMedia.IMediaBase
    ) => Promise<Partial<IMusic.IMusicItem> | null>;
    /** 获取歌词 */
    getLyric?: (
      musicItem: IMusic.IMusicItemPartial
    ) => Promise<ILyric.ILyricSource | null>;
    /** 获取专辑信息，里面的歌曲分页 */
    getAlbumInfo?: (
      albumItem: IAlbum.IAlbumItem,
      page: number
    ) => Promise<IAlbumInfoResult | null>;
    /** 获取歌单信息，有分页 */
    getMusicSheetInfo?: (
      sheetItem: IMusic.IMusicSheetItem,
      page: number
    ) => Promise<ISheetInfoResult | null>;
    /** 获取作品，有分页 */
    getArtistWorks?: IGetArtistWorksFunc;
    /** 导入歌单 */
    // todo: 数据结构应该是IMusicSheetItem
    importMusicSheet?: (urlLike: string) => Promise<IMusic.IMusicItem[] | null>;
    /** 导入单曲 */
    importMusicItem?: (urlLike: string) => Promise<IMusic.IMusicItem | null>;
    /** 获取榜单 */
    getTopLists?: () => Promise<IMusic.IMusicSheetGroupItem[]>;
    // todo:分页
    /** 获取榜单详情 */
    getTopListDetail?: (
      topListItem: IMusic.IMusicSheetItem
    ) => Promise<ICommon.WithMusicList<IMusic.IMusicSheetItem>>;
    /** 获取热门歌单tag */
    getRecommendSheetTags?: () => Promise<IGetRecommendSheetTagsResult>;
    /** 歌单列表 */
    getRecommendSheetsByTag?: (
      tag: IMedia.IUnique,
      page?: number
    ) => Promise<ICommon.PaginationResponse<IMusic.IMusicSheetItem>>;
  }
}
