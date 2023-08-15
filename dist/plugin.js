var $8zHUo$axios = require("axios");
var $8zHUo$dayjs = require("dayjs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);


function $722aed1a02463133$export$d7bdacb66077735f(_) {
    return {
        id: _.id ?? _.trackId,
        artist: _.nickname,
        title: _.title,
        album: _.albumTitle,
        duration: _.duration,
        artwork: _.coverPath?.startsWith("//") ? `https:${_.coverPath}` : _.coverPath
    };
}
function $722aed1a02463133$export$ed1fb53032701881(_) {
    return {
        id: _.albumId ?? _.id,
        artist: _.nickname,
        title: _.title,
        artwork: _.coverPath?.startsWith("//") ? `https:${_.coverPath}` : _.coverPath,
        description: _.intro ?? _.description,
        date: _.updatedAt ? (0, ($parcel$interopDefault($8zHUo$dayjs)))(_.updatedAt).format("YYYY-MM-DD") : null
    };
}
function $722aed1a02463133$export$d08aae127141ee12(_) {
    return {
        name: _.nickname,
        id: _.uid,
        fans: _.followersCount,
        description: _.description,
        avatar: _.logoPic,
        worksNum: _.tracksCount
    };
}
function $722aed1a02463133$export$4135fdd7029f141(raw) {
    return !raw.priceTypes?.length;
}
function $722aed1a02463133$export$ed4cedad8375a67(raw) {
    return raw.tag === 0 || raw.isPaid === false || parseFloat(raw.price) === 0;
}


/** 搜索方法 */ 

async function $5e5e58b4a4b22c0e$var$searchBase(query, page, core) {
    return (await (0, ($parcel$interopDefault($8zHUo$axios))).get("https://www.ximalaya.com/revision/search/main", {
        params: {
            kw: query,
            page: page,
            spellchecker: true,
            condition: "relation",
            rows: 20,
            device: "iPhone",
            core: core,
            paidFilter: true
        }
    })).data;
}
async function $5e5e58b4a4b22c0e$var$searchMusic(query, page) {
    const res = (await $5e5e58b4a4b22c0e$var$searchBase(query, page, "track")).data.track;
    return {
        isEnd: page >= res.totalPage,
        data: res.docs.filter((0, $722aed1a02463133$export$ed4cedad8375a67)).map((0, $722aed1a02463133$export$d7bdacb66077735f))
    };
}
async function $5e5e58b4a4b22c0e$var$searchAlbum(query, page) {
    const res = (await $5e5e58b4a4b22c0e$var$searchBase(query, page, "album")).data.album;
    return {
        isEnd: page >= res.totalPage,
        data: res.docs.filter((0, $722aed1a02463133$export$4135fdd7029f141)).map((0, $722aed1a02463133$export$ed1fb53032701881))
    };
}
async function $5e5e58b4a4b22c0e$var$searchArtist(query, page) {
    const res = (await $5e5e58b4a4b22c0e$var$searchBase(query, page, "user")).data.user;
    return {
        isEnd: page >= res.totalPage,
        data: res.docs.map((0, $722aed1a02463133$export$d08aae127141ee12))
    };
}
async function $5e5e58b4a4b22c0e$export$2e2bcd8739ae039(query, page, type) {
    if (type === "music") return $5e5e58b4a4b22c0e$var$searchMusic(query, page);
    else if (type === "album") return $5e5e58b4a4b22c0e$var$searchAlbum(query, page);
    else if (type === "artist") return $5e5e58b4a4b22c0e$var$searchArtist(query, page);
}




async function $5ba9b6e8a66c36b6$export$2e2bcd8739ae039(artistItem, page, type) {
    if (type === "music") {
        const res = (await (0, ($parcel$interopDefault($8zHUo$axios))).get("https://www.ximalaya.com/revision/user/track", {
            params: {
                page: page,
                pageSize: 30,
                uid: artistItem.id
            }
        })).data.data;
        return {
            isEnd: res.page * res.pageSize >= res.totalCount,
            data: res.trackList.filter((0, $722aed1a02463133$export$ed4cedad8375a67)).map((_)=>({
                    ...(0, $722aed1a02463133$export$d7bdacb66077735f)(_),
                    artist: artistItem.name
                }))
        };
    } else {
        const res = (await (0, ($parcel$interopDefault($8zHUo$axios))).get("https://www.ximalaya.com/revision/user/pub", {
            params: {
                page: page,
                pageSize: 30,
                uid: artistItem.id
            }
        })).data.data;
        return {
            isEnd: res.page * res.pageSize >= res.totalCount,
            data: res.albumList.filter((0, $722aed1a02463133$export$4135fdd7029f141)).map((_)=>({
                    ...(0, $722aed1a02463133$export$ed1fb53032701881)(_),
                    artist: artistItem.name
                }))
        };
    }
}


/**
 * 你可以直接在此文件中写逻辑，也可以拆到其他文件中导入
 */ /** 获取专辑详情 */ async function $882b6d93070905b3$var$getAlbumInfo(albumItem, page = 1) {
    const res = await (0, ($parcel$interopDefault($8zHUo$axios))).get("https://www.ximalaya.com/revision/album/v1/getTracksList", {
        params: {
            albumId: albumItem.id,
            pageNum: page,
            pageSize: 50
        }
    });
    return {
        isEnd: page * 50 >= res.data.data.trackTotalCount,
        albumItem: {
            worksNum: res.data.data.trackTotalCount
        },
        musicList: res.data.data.tracks.filter((0, $722aed1a02463133$export$ed4cedad8375a67)).map((_)=>{
            const r = (0, $722aed1a02463133$export$d7bdacb66077735f)(_);
            r.artwork = albumItem.artwork;
            r.artist = albumItem.artist;
            return r;
        })
    };
}
/** 获取音乐源 */ async function $882b6d93070905b3$var$getMediaSource(musicItem, quality) {
    if (quality !== "standard") return;
    const data = await (0, ($parcel$interopDefault($8zHUo$axios))).get("https://www.ximalaya.com/revision/play/v1/audio", {
        params: {
            id: musicItem.id,
            ptype: 1
        },
        headers: {
            referer: `https://www.ximalaya.com/sound/${musicItem.id}`,
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
        }
    });
    return {
        url: data.data.data.src
    };
}
const $882b6d93070905b3$var$pluginInstance = {
    platform: "XMLY",
    version: "0.0.0",
    supportedSearchType: [
        "music",
        "album",
        "artist"
    ],
    search: $5e5e58b4a4b22c0e$export$2e2bcd8739ae039,
    getMediaSource: $882b6d93070905b3$var$getMediaSource,
    getAlbumInfo: $882b6d93070905b3$var$getAlbumInfo,
    getArtistWorks: $5ba9b6e8a66c36b6$export$2e2bcd8739ae039 // 获取作者信息
};
var $882b6d93070905b3$export$2e2bcd8739ae039 = $882b6d93070905b3$var$pluginInstance;


//# sourceMappingURL=plugin.js.map
