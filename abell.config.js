/** 
 * Don't change any of these values as they have to be this way for action to run
 * 
 * You can add globalMeta variables if you need and even use plugins.
 * Check out https://abelljs.org for Abell's documentation
 * 
 */ 

const fs = require("fs");
const process = require("process");
const isDevEnv = process.env.NODE_ENV === "dev";

// file paths
let userGlobalMetaPath;
let githubDataPath;
let userReadmeURL;
if (isDevEnv) {
  userGlobalMetaPath = './DEV.globalMeta.json';
  githubDataPath = './DEV.githubData.json';
  userReadmeURL = '../DEV.README.md';
} else {
  userGlobalMetaPath = '../globalMeta.json';
  githubDataPath = './githubData.json';
  userReadmeURL = '../../README.md';
}

let githubData = {};
if (fs.existsSync(githubDataPath)) {
  githubData = require(githubDataPath);
}

let userGlobalMeta = {};
if (fs.existsSync(userGlobalMetaPath)) {
  userGlobalMeta = require(userGlobalMetaPath);
}

module.exports = {
  contentPath: "placeholder",
  themePath: "layout",
  outputPath: "../docs",
  globalMeta: {
    // You can add your global variables here

    userReadmeURL,
    github: githubData,
    ...userGlobalMeta
  },
  plugins: ['plugin/fetch-ghdata.js']
};
