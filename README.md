# express-webpack-starter

[![Build Status](https://travis-ci.org/Cherish-xzw/express-webpack-starter.svg?branch=master)](https://travis-ci.org/Cherish-xzw/express-webpack-starter)

> express-webpack-starter shows how to use webpack in multipage application with express.

**Live Demo** https://cherish-xzw-express-webpack-starter.glitch.me/

## Features

* Hot reload with webpack dev server
* CSS extraction
* Sepreate common chunks and application code
* Long term cache with contenthash in css and js files
* Support .vue files and es2015+ syntax
* Gzip compression when bundles are too big

## Note

The default branch does not set any front-end library , you can choose a library in these branch

* [`jquery`](https://github.com/Cherish-xzw/express-webpack-starter/tree/jquery)
* [`vux`](https://github.com/Cherish-xzw/express-webpack-starter/tree/vux)
* [`elementUI`](https://github.com/Cherish-xzw/express-webpack-starter/tree/element)
* [`antd-mobile`](https://github.com/Cherish-xzw/express-webpack-starter/tree/antd)
* [`antd`](https://github.com/Cherish-xzw/express-webpack-starter/tree/antd)

## Usage

First of all, you should clone this repo

```sh
git clone --depth=1 -b <branch> https://github.com/Cherish-xzw/express-webpack-starter MyAwesomeApp
```

After that, you can run

```sh
$ yarn
$ yarn dev # start server with development mode
$ yarn start # start server with production mode
```

## Lisence

MIT
