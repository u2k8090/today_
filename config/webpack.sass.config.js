'use strict';

import path from 'path';
import _ from 'lodash';
import glob from 'glob';
import chalk from 'chalk';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { config } from '../package.json';

let SASSPATH = config.sass;
const { src, dist } = SASSPATH;
const files = glob.sync(`${path.resolve(src)}/**/!(_)*.s[ac]ss`);
const entries = _.fromPairs(
  files.map(filePath => [
    filePath.replace(path.resolve(src), '').replace(/\.s[ac]ss$/, ''),
    filePath,
  ])
);
let wordpress = config.wordpress;

export default {
	// ビルド対象
    entry: entries,
    // 出力設定
    output: {
        path: wordpress.enable ? path.resolve(wordpress.cssDist) : path.resolve(dist),
        filename: '[name].css',
    },
    cache: true,
    module: {
    	rules: [
    		{
    			test: /\.css$/,
    			use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: ['css-loader', 'postcss-loader']
    			})
    		},
    		{
    			test: /\.scss$/,
    			use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader : 'css-loader',
							options: {
								minimize: true,
								sourceMap: true,
                                url: false
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader : 'sass-loader',
							options: {
								sourceMap: true
							}
            }
					]
				})
    		}
    	]
    },
    devtool: 'inline-source-map',
    plugins: [
    	new ExtractTextPlugin('[name].css'),
        new WebpackNotifierPlugin({
            title: "Sass Build",
            alwaysNotify: true
        }),
        new ProgressBarPlugin({
            format: `[${chalk.blue('Sass')}][${chalk.white(':bar')} ]${chalk.green.bold(':percent')} (${chalk.white(':elapsed')}sec)`,
            complete: "■",
            width: 50,
            clear: false
        })
    ]
};
