const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

let bundler = new Bundler('src/index.html');
let app = express();

app.use(
  '/api',
  proxy({
    target: 'http://159.65.206.67'
  }),
);

app.use(
  '/media',
  proxy({
    target: 'http://159.65.206.67'
  }),
);

app.use(bundler.middleware());

app.listen(8002);