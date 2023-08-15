import axios from 'axios';
import cheerio from 'cheerio';
import cryptojs from 'crypto-js';
import dayjs from 'dayjs';
import bigInt from 'big-integer';
import he from 'he';
import qs from 'qs';

// TODO: 你可以在这里写插件的逻辑

// 注意：不要使用async () => {}，hermes不支持异步箭头函数
const search: IPlugin.ISearchFunc = async function (query, page, type) {
  if(type === 'music') {
    return {
      isEnd: true,
      data: []
    }
  };
}


const pluginInstance: IPlugin.IPluginDefine = {
  platform: "插件名",
  version: "0.0.0",
  // TODO: 在这里把插件剩余的功能补充完整
  search
};


export default pluginInstance;