const fs = require('fs'),
  archiver = require('archiver'),
  output = fs.createWriteStream('upload.zip'),
  archive = archiver('zip'),
  FormData = require('form-data'),
  path = require('path'),
  axios = require('axios'),
  httpsProxyAgent = require('https-proxy-agent'),
  express = require("express"),
  app = express()

app.listen(8081);

function zipFile() {
  output.on('close', function () {
    console.log('ZIP ready to send');
    sendFile()
  });
  archive.on('error', function (err) {
    throw err;
  });
  archive.pipe(output);
  archive.directory('dist/', false);
  archive.finalize();
}
zipFile()

function sendFile() {
 let form = new FormData();
  form.append('data', fs.createReadStream(path.join(__dirname, 'upload.zip')))

  var config = {
    method: 'post',
    url: 'https://node-app-api.glitch.me/api/upload',
    httpsAgent: new httpsProxyAgent('http://cseszneki.peter:870717Piller6@fwsg.pillerkft.hu:8080'),
    data: form,
    headers: {
      'content-type': `multipart/form-data; boundary=${form._boundary}`,
     }
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      process.exit()
    })
    .catch(function (error) {
      console.log(error);
      process.exit()
    });
}