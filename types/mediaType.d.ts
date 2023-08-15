/** 音乐 */
declare namespace IMusic {
  interface IMusicItem extends IMedia.IMediaBase {
    /** 作者 */
    artist: string;
    /** 歌曲标题 */
    title: string;
    /** 时长(s) */
    duration?: number;
    /** 专辑名 */
    album?: string;
    /** 专辑封面图 */
    artwork?: string;
    /** 默认音源 */
    url?: string;
    /** 歌词URL */
    lrc?: string;
    /** 歌词文本（lrc格式 带时间戳） */
    rawLrc?: string;
    // 其他
    [k: string | number | symbol]: any;
  }

  /** 歌单 */
  interface IMusicSheetItem extends IMedia.IMediaBase {
    /** 封面图 */
    artwork?: string;
    /** 标题 */
    title: string;
    /** 描述 */
    description?: string;
    /** 作品总数 */
    worksNum?: number;
    /** 播放次数 */
    playCount?: number;
    /** 播放列表 */
    musicList?: IMusicItem[];
    /** 歌单创建日期 */
    createAt?: number;
    // 歌单作者
    artist?: string;
    [k: string | number]: any;
  }
}

/** 专辑 */
declare namespace IAlbum {
  interface IAlbumItem extends IMusic.IMusicSheetItem {
    [k: string | number]: any;
  }
}

/** 作者 */
declare namespace IArtist {
  interface IArtistItem {
    /** 插件名 */
    platform?: string;
    /** 唯一id */
    id: string | number;
    /** 姓名 */
    name: string;
    /** 粉丝数 */
    fans?: number;
    /** 简介 */
    description?: string;
    /** 头像 */
    avatar?: string;
    /** 作品数目 */
    worksNum?: number;
    /** 作者的音乐列表 */
    musicList?: IMusic.IMusicItem[];
    /** 作者的专辑列表 */
    albumList?: IAlbum.IAlbumItem[];
    [k: string | number]: any;
  }
}
