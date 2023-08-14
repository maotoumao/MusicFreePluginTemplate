import axios from 'axios';
import cheerio from 'cheerio';
import cryptojs from 'crypto-js';
import dayjs from 'dayjs';
import bigInt from 'big-integer';
import he from 'he';
import qs from 'qs';


const pluginInstance: IPlugin.IPluginDefine = {
  platform: "插件名称",
  // TODO: 插件基本信息
  version: ""
};


console.log(axios.get);
console.log(cheerio.load);
console.log(cryptojs.MD5("xxx").toString());
console.log(dayjs());
console.log(bigInt['-10'])
console.log(he.encode("xxxx"));
console.log(qs.stringify({}));

export default pluginInstance;