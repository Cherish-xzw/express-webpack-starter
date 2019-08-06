const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const autoprefixer = require("autoprefixer");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const pkg = require('../package.json');

const IS_PROD = process.env.NODE_ENV === 'production';
const ROOT_PATH = path.resolve(__dirname, '..');

function resolve(dir) {
  return path.join(ROOT_PATH, dir);
}

let autoEntriesCount = 0;
let watchAutoEntries = [];
const defaultEntries = ['./main.ts'];

function generateEntries() {
  // generate automatic entry points
  const autoEntries = {};
  const autoEntriesMap = {};
  const pageEntries = glob.sync('pages/**/index.ts', {
    cwd: path.join(ROOT_PATH, 'src/assets/javascripts'),
  });
  watchAutoEntries = [path.join(ROOT_PATH, 'src/assets/javascripts/pages/')];

  function generateAutoEntries(p, prefix = '.') {
    const chunkPath = p.replace(/\/index\.ts$/, '');
    const chunkName = chunkPath.replace(/\//g, '.');
    autoEntriesMap[chunkName] = `${prefix}/${p}`;
  }

  pageEntries.forEach(p => generateAutoEntries(p));

  const autoEntryKeys = Object.keys(autoEntriesMap);
  autoEntriesCount = autoEntryKeys.length;

  // import ancestor entrypoints within their children
  autoEntryKeys.forEach(entry => {
    const entryPaths = [autoEntriesMap[entry]];
    const segments = entry.split('.');
    while (segments.pop()) {
      const ancestor = segments.join('.');
      if (autoEntryKeys.includes(ancestor)) {
        entryPaths.unshift(autoEntriesMap[ancestor]);
      }
    }
    autoEntries[entry] = defaultEntries.concat(entryPaths);
  });

  const manualEntries = {
    main: defaultEntries,
  };

  return Object.assign(manualEntries, autoEntries);
}

const config = {
  mode: IS_PROD ? 'production' : 'development',

  context: resolve('src/assets/javascripts'),

  entry: generateEntries,

  output: {
    path: resolve('public/assets'),
    publicPath: `${pkg.basePath}assets/`,
    filename: IS_PROD ? 'js/[name].[chunkhash].js' : '[name].js',
    chunkFilename: IS_PROD ? 'js/[name].[chunkhash].js' : '[name].chunk.js' // works with lazy loading
  },

  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  },

  module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: pkg.browserslist
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: pkg.browserslist
                })
              ]
            }
          },
          {
            loader: "less-loader"
          },
        ]
      },
      {
        test: /\.js$/,
        include: [
          resolve('src'),
          // webpack-dev-server#1090 for Safari
          resolve('/node_modules/webpack-dev-server/')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: pkg.browserslist
                  }
                }
              ],
              'stage-2',
              'react'
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        include: [
          resolve('src/assets'),
        ],
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'vant',
                  libraryDirectory: 'es',
                  style: true
                })
              ]
            }),
            "compilerOptions": {
              "target": "es5",
              "module": "esnext",
              "strict": true,
              "jsx": "preserve",
              "importHelpers": true,
              "moduleResolution": "node",
              "experimentalDecorators": true,
              "allowSyntheticDefaultImports": true,
              "sourceMap": true,
              "types": [
                "webpack-env"
              ],
              "lib": [
                "esnext",
                "dom",
                "dom.iterable",
                "scripthost"
              ]
            }
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      }
    ]
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: 4,
      cacheGroups: {
        default: false,
        common: () => ({
          priority: 20,
          name: 'main',
          chunks: 'initial',
          minChunks: autoEntriesCount * 0.9,
        }),
        vendors: {
          priority: 10,
          chunks: 'async',
          test: /[\\/](node_modules|vendor[\\/]assets[\\/]javascripts)[\\/]/,
        },
        commons: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
        },
      }
    }
  },

  plugins: [
    new AssetsWebpackPlugin({
      filename: 'manifest.json',
      path: resolve('public/assets'),
      prettyPrint: true
    }),
    // enable vue-loader to use existing loader rules for other module types
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('src/assets/images'),
      to: resolve('public/assets/images')
    }]),
    new MiniCssExtractPlugin({
      filename: IS_PROD ? 'css/[name].[contenthash].css' : '[name].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
};

if (!IS_PROD) {
  config.devtool = 'cheap-module-source-map';
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
  config.devServer = {
    host: '0.0.0.0',
    port: '3808'
  }
}

if (IS_PROD) {
  config.devtool = 'source-map';
  config.plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      generateStatsFile: true,
      openAnalyzer: false,
      reportFilename: resolve("webpack-report/index.html"),
      statsFilename: resolve("webpack-report/stats.json")
    })
  );

  // https://webpack.js.org/configuration/performance
  config.performance = {
    hints: 'warning'
  };
}

module.exports = config;
