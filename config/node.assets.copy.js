'use strict';

import cpx from 'cpx';
import moment from 'moment';
import chalk from 'chalk';
import { config } from '../package.json';

let path = config.assets;
let wordpress = config.wordpress;
let temppath = `${path.src}/**/{*.jpg,*.png,*.gif,*.svg,*.css,*.otf,*.eot,*.ttf,*.woff,*.woff2}`;

cpx.watch(
    temppath,
    wordpress.enable ? `${wordpress.dist}/assets` : path.dist,
    { update:true } //options
).on("copy",(e)=>{
    console.log(`[${chalk.blue('Copy')}] ${e.srcPath} ${chalk.gray('-------->')} ${e.dstPath} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
}).on("remove",(e)=>{
    console.log(`[${chalk.blue('Remove')}] ${e.path} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
});

if(wordpress.enable){

  cpx.watch(
      `${path.src}/temp_wp/*.php`,
      wordpress.dist,
      { update:true } //options
  ).on("copy",(e)=>{
      console.log(`[${chalk.blue('Copy')}] ${e.srcPath} ${chalk.gray('-------->')} ${e.dstPath} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  }).on("remove",(e)=>{
      console.log(`[${chalk.blue('Remove')}] ${e.path} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  });

  cpx.watch(
    `${path.src}/temp_wp/screenshot.png`,
    wordpress.dist,
    { update:true } //options
  ).on("copy",(e)=>{
      console.log(`[${chalk.blue('Copy')}] ${e.srcPath} ${chalk.gray('-------->')} ${e.dstPath} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  }).on("remove",(e)=>{
      console.log(`[${chalk.blue('Remove')}] ${e.path} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  });

  cpx.watch(
    `${path.src}/temp_wp/style.css`,
    wordpress.dist,
    { update:true } //options
  ).on("copy",(e)=>{
    console.log(`[${chalk.blue('Copy')}] ${e.srcPath} ${chalk.gray('-------->')} ${e.dstPath} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  }).on("remove",(e)=>{
    console.log(`[${chalk.blue('Remove')}] ${e.path} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  });

} else {
    cpx.watch(
    `${path.src}/temp_st/*.html`,
    path.dist ,
    { update:true } //options
  ).on("copy",(e)=>{
    console.log(`[${chalk.blue('Copy')}] ${e.srcPath} ${chalk.gray('-------->')} ${e.dstPath} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  }).on("remove",(e)=>{
    console.log(`[${chalk.blue('Remove')}] ${e.path} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
  });
}


// fontawesome
cpx.watch(
  `./node_modules/@fortawesome/fontawesome-free/webfonts/*`,
  `${path.src}/webfonts`,
  { update:true } //options
).on("copy",(e)=>{
  console.log(`[${chalk.blue('Copy')}] ${e.srcPath} ${chalk.gray('-------->')} ${e.dstPath} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
}).on("remove",(e)=>{
  console.log(`[${chalk.blue('Remove')}] ${e.path} [${chalk.white.bold(moment().format('HH:mm:ss'))}]`);
});
