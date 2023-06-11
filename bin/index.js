#!/usr/bin/env node

import { program } from "commander"
import packJson from "../package.json" assert { type: "json" }
import { initProjectFile } from "../utils/env.js"
import { eslintInit } from "../core/eslintInit.js"
import chalk from "chalk"
import { huskyInit } from "../core/huskyInit.js"

// 首行提醒
program.name(packJson.name).usage('<commend> [options]')

// 版本号
program.version(packJson.version)

program
  .command('init <option>')
  .description('初始化项目的规范构建')
  .action(async (option) => {
   
    // 初始化项目
    await initProjectFile()
    
    // 安装 eslint、preitter 和 editorConfig 并自动生成配置文件
    await eslintInit()

    // 安装 husky、lint-staged、commlint、commitizen 并自动生成配置文件
    await huskyInit()

    // done 结束
    console.log(chalk.green.bold(`
    
    项目配置完成，this project is very niubi ！！！
    请重新安装依赖！npm install or yarn or ...
    感觉很神奇？请前往 https://github.com/jackbrens/Web-Check

    `))
  })

// 放在最后
program.parse(process.argv)
