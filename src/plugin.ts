const axios = require("axios");
const cheerio = require("cheerio");
const cryptojs = require('crypto-js');
const dayjs = require('dayjs');
const bigInt = require('big-integer');
const he = require('he');
const qs = require('qs');


const pluginInstance: IPlugin.IPluginDefine = {
  platform: "插件名称",
  // TODO: 插件基本信息
};

module.exports = pluginInstance;