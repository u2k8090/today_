'use strict';

import webpack from 'webpack';
import path from 'path';
import _ from 'lodash';
import glob from 'glob';
import chalk from 'chalk';
import WebpackNotifierPlugin from 'webpack-notifier';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import { config } from '../package.json';

let JSPATH = config.js;
const { src, dist } = JSPATH;
const files = glob.sync(`${path.resolve(src)}/**/!(_)*.js`);
const entries = _.fromPairs(
  files.map(filePath => [
    filePath.replace(path.resolve(src), '').replace(/\.js$/, ''),
    filePath,
  ])
);
let wordpress = config.wordpress;

export default {
    mode: 'development',
    // ビルド対象
    entry: entries,
    // 出力設定
    output: {
        path: wordpress.enable ? path.resolve(wordpress.js) : path.resolve(dist),
        filename: '[name].js',
    },
    cache: true,
    // devtool: 'inline-source-map',
    externals: {
        // "jquery": "$"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // loader: 'babel-loader?cacheDirectory=true',
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    // loader: 'vue',
                    loader: 'vue-loader',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            "node_modules"
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin({

        }),
        new WebpackNotifierPlugin({
            title: "JavaScript Build",
            alwaysNotify: true
        }),
        new ProgressBarPlugin({
            format: `[${chalk.blue('Babel')}][${chalk.white(':bar')} ]${chalk.green.bold(':percent')} (${chalk.white(':elapsed')}sec)`,
            complete: "■",
            width: 50,
            clear: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // NODE_ENV: JSON.stringify('production')
                NODE_ENV: '"production"'
            }
        }),
    ]
}
