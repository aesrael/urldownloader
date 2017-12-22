const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const PromiseFtp = require('promise-ftp');
const request = require('request')

const ftpCreds = require('../ftpcreds')

router.get('/', (req, res, next) => res.send('urldownloader post to api/file with a "source and "destination" param'))

router.post('/', (req, res, next) => {
  let {source, destination} = req.body;

  const filename = returnPath(source);
  console.log(source, destination)

  const fileStream = fs.createWriteStream(`uploads/${filename}`);

  //create a file by piping into it data from a file's url
  request
    .get(source)
    .on('error', function (err) {
      console.log(err)
    })
    .pipe(fileStream);

  console.log(fileStream)

  //send to apt destnation to server using ftp
  const ftp = new PromiseFtp();
  ftp
    .connect({host: ftpCreds.host, user: ftpCreds.user, password: ftpCreds.pass})
    .then(function (serverMessage) {
      //return ftp.list('/gidiradio/');   
      return ftp.put(`uploads/${filename}`, `gidiradio/${destination}/${filename}`);
    })
    .then(function () {
      return ftp.end();
    });
})

/*********HELPERS*********/

/**
   *return filename from a url
   * @param {*} url to return path of
   */

const returnPath = (url) => {
  return (url.substring(url.lastIndexOf('/') + 1));
}

module.exports = router;