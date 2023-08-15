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
    /** http header */
    headers?: Record<string, string>;
    /** 兜底播放 */
    url?: string;
    /** http UA */
    userAgent?: string;
    /** 音质 */
    quality?: IMusic.IQualityKey;
  }
  interface ISearchResult<T extends IMedia.SupportMediaType> {
    /** 是否到达页尾 */
    isEnd?: boolean;
    /** 搜索结果数据 */
    data: IMedia.SupportMediaItem[T][];
  }

  type ISearchFunc = <T extends IMedia.SupportMediaType>(
    /** 搜索的关键字 */
    query: string,
    /** 页码，从 1 开始 */
    page: number,
    /** 支持的搜索类型 */
    type: T
  ) => Promise<ISearchResult<T>>;

  interface IAlbumInfoResult {
    /** 是否到达页尾 */
    isEnd?: boolean;
    /** albumItem补充字段（比如补充description之类的） */
    albumItem?: Partial<IAlbum.IAlbumItem>;
    musicList?: IMusic.IMusicItem[];
  }

  interface ISheetInfoResult {
    isEnd?: boolean;
    sheetItem?: Partial<IMusic.IMusicSheetItem>;
    musicList?: IMusic.IMusicItem[];
  }

  interface IGetRecommendSheetTagsResult {
    /** 固定的tag */
    pinned?: IMusic.IMusicSheetItem[];
    /** 所有tag */
    data?: IMusic.IMusicSheetGroupItem[];
  }

  type IGetArtistWorksFunc = <T extends IArtist.ArtistMediaType>(
    /** 作者 */
    artistItem: IArtist.IArtistItem,
    /** 页码，从1开始 */
    page: number,
    /** 音乐或专辑 */
    type: T
  ) => Promise<ISearchResult<T>>;

  
  /** 插件的定义 */
  interface IPluginDefine {
    /**
     * 插件名
     *
     * 需要保证尽可能唯一
     */
    platform: string;
    /** @deprecated 匹配的版本号 */
    appVersion?: string;
    /**
     *  插件版本
     *  @example 0.0.0-alpha.0
     */
    version?: string;
    /**
     * 远程更新的url
     *
     * app内点击【更新插件】时，会从此链接获取最新插件
     */
    srcUrl?: string;
    /**
     * 主键
     *
     * 所有用来唯一标识一个媒体的键的集合，会被存储到mediameta中
     * @example ["id"]
     */
    primaryKey?: string[];
    /** @deprecated 默认搜索类型 */
    defaultSearchType?: IMedia.SupportMediaType;
    /**
     * 支持的搜索类型
     *
     * 如果为空表示支持所有搜索类型
     */
    supportedSearchType?: IMedia.SupportMediaType[];
    /** 插件缓存控制 */
    cacheControl?: "cache" | "no-cache" | "no-store";
    /** 部分场景下的提示文本 */
    hints?: Record<"importMusicSheet" | "importMusicItem", string[]>;
    /** 搜索函数 */
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
    /** 根据音乐信息获取歌词 */
    getLyric?: (
      musicItem: IMusic.IMusicItemPartial
    ) => Promise<ILyric.ILyricSource | null>;
    /**
     * 获取专辑信息，里面的歌曲分页
     *
     * page从1开始
     */
    getAlbumInfo?: (
      albumItem: IAlbum.IAlbumItem,
      page: number
    ) => Promise<IAlbumInfoResult | null>;
    /**
     * 获取歌单信息，有分页
     *
     * page从1开始
     */
    getMusicSheetInfo?: (
      sheetItem: IMusic.IMusicSheetItem,
      page: number
    ) => Promise<ISheetInfoResult | null>;
    /** 获取作品，有分页 */
    getArtistWorks?: IGetArtistWorksFunc;
    /** 导入歌单 */
    importMusicSheet?: (urlLike: string) => Promise<IMusic.IMusicItem[] | null>;
    /** 导入单曲 */
    importMusicItem?: (urlLike: string) => Promise<IMusic.IMusicItem | null>;
    /** 获取榜单 */
    getTopLists?: () => Promise<IMusic.IMusicSheetGroupItem[]>;
    /** 获取榜单详情 */
    getTopListDetail?: (
      topListItem: IMusic.IMusicSheetItem
    ) => Promise<ICommon.WithMusicList<IMusic.IMusicSheetItem>>;
    /** 获取热门歌单tag */
    getRecommendSheetTags?: () => Promise<IGetRecommendSheetTagsResult>;
    /** 
     * 歌单列表
     *
     * page从1开始
     */
    getRecommendSheetsByTag?: (
      tag: IMedia.IUnique,
      page?: number
    ) => Promise<ICommon.PaginationResponse<IMusic.IMusicSheetItem>>;
  }
}
