<img width="500" height="auto" src="./src/images/logo.png">

<!-- [![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]
[![size][size]][size-url] -->

# taro-to-react-loader

File for converting taro language to real executable loader.

## Getting Started

To begin, you'll need to install `taro-to-react-loader`:

```console
$ npm install taro-to-react-loader --save-dev
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: 'taro-to-react-loader',
            options: {}
          },
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

<!-- ## Options

|             Name              |            Type             |                            Default                            | Description                                                                         |
| :---------------------------: | :-------------------------: | :-----------------------------------------------------------: | :---------------------------------------------------------------------------------- |
|     **[`limit`](#limit)**     | `{Boolean\|Number\|String}` |                            `true`                             | Specifying the maximum size of a file in bytes.                                     | -->
