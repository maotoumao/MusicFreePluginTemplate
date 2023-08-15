# MusicFree 插件模板

## 前置依赖

需要安装 node 环境。

## 使用方式

### clone 本模板，并安装依赖

```bash
git clone https://github.com/maotoumao/MusicFreePluginTemplate.git
cd MusicFreePluginTemplate
npm install
```

### 开发插件

src/index.ts 中默认导出了插件的实例。你只需要关注如何完善插件的逻辑，也就是把 pluginInstance 中的内容补充完整即可。

#### 类型

类型声明在根目录的 types 文件夹下，已经写了比较完整的类型声明，一般情况下不需要修改；如果你的插件中需要补充字段，请修改 types/mediaType.d.ts 中的类型（**注意：可以新增，但是不要删除**）：

如某个音源的音乐类型都具有一个名为 copyright 的字符串，那么你可以把 types/mediaType.d.ts 中 IMusicItem 的类型修改如下：

```diff
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
    /** 歌词文本 */
    rawLrc?: string;
+   copyright: string;
    // 其他
    [k: string | number | symbol]: any;
  }
```

#### 注意事项
你可以像开发其他前端项目一样去开发插件，最终会用 parcel 打包到一个文件中。但开发仍然有一些注意事项：

1. 不要使用异步箭头函数语法 ```async () => {}``` ，因为安卓端 hermes 引擎不支持这种语法。
2. 理论上，你可以安装第三方库，但需要注意这些库必须是**平台无关的纯 Javascript 库**，否则插件无法加载。

### 构建插件

你可以执行以下指令来生成插件：

```bash
npm run build
```

插件会被打包到根目录下 ```dist/plugin.js``` 文件中，你可以直接在 MusicFree 桌面版或安卓版安装这个 js 文件。如果你想调试某个函数，也可以直接执行 ```npm run dev``` 来直接执行插件。理论上在 node 环境下执行结果和在端内执行结果无差别。

**你可以切到 demo 分支查看示例代码。**