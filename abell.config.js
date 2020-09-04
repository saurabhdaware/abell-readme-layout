// Don't change any of these values as they have to be this way for action to run

const fs = require("fs");
const path = require("path");
const process = require("process");
const isDevEnv = process.env.NODE_ENV === "dev";
const rootPath = isDevEnv ? "" : "..";

let githubData = {};

if (fs.existsSync("./githubData.json")) {
  githubData = require("./githubData.json");
}

let userGlobalMeta = {};
if (fs.existsSync(path.join(rootPath, "globalMeta.json"))) {
  userGlobalMeta = require(path.join(rootPath, "globalMeta.json"));
}

module.exports = {
  contentPath: "layout",
  themePath: "layout",
  outputPath: "../docs",
  globalMeta: {
    userReadmeURL: isDevEnv ? "DEV_README.md" : "../../README.md",
    github: githubData,
    ...userGlobalMeta
  }
};
