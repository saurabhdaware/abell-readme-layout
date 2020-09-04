const https = require('https');
const fs = require('fs');
const path = require('path');

async function fetchGitHubData(repository) {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'api.github.com',
      path: '/repos/' + repository,
      method: 'GET',
      headers: {'user-agent': 'node.js'}
    };
    
    const request = https.request(options, (resp) => {
      let data = '';
    
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(data)
      });
    
    })
    
    request.end();

    request.on("error", (err) => {
      reject(err.message);
    });
  })
}

const ghDataPath = path.join(__dirname, '..', 'layout', 'ghdata.json')
async function beforeBuild(programInfo) {
  const repo = programInfo.abellConfig.globalMeta.github.repository;
  const ghData = await fetchGitHubData(repo);
  if (fs.existsSync(ghDataPath)) {
    fs.unlinkSync(ghDataPath);
  }
  fs.writeFileSync(ghDataPath, ghData)
}


module.exports = { beforeBuild }