// core module
const fs = require('fs');
const path = require('path');

// user module
const request = require('request');
const htmlParser = require('htmlparser');

const configFilename = path.join(__dirname, './rss_feeds.txt');

function checkForRssFile() {
  fs.exists(configFilename, (exists) => {
    if (!exists) {
      return next(new Error(`Missing Rss File: ${configFilename}`));
    }

    next(null, configFilename);
  });
}

function readRssFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) {
      return next(err);
    }

    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n');

    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRssFeed(feedUrl) {
  request({uri: feedUrl}, (err, res, body) => {
    if (err) {
      return next(err);
    }

    if (res.statusCode !== 200) {
      return next(new Error('Abnormal response status code'));
    }

    next(null, body);
  });
}

function parseRssFeed(rss) {
  const handler = new htmlParser.RssHandler();
  const parse = new htmlParser.Parser(handler);
  parse.parseComplete(rss);
  if (!handler.dom.items.length) {
    return next(new Error('No Rss item found'));
  }

  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

const tasks = [
  checkForRssFile,
  readRssFile,
  downloadRssFeed,
  parseRssFeed,
];

function next(err, result) {
  if (err) {
    throw err;
  }

  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();
