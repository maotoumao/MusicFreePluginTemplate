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