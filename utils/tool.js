import chalk from "chalk"
import spawn from "cross-spawn"
import fs from "fs-extra"
import { getPackageJson, getPath } from "./env.js"

export const runCommand = (commandStr) => {
  console.log(chalk.gray.bold(`${commandStr} 执行命令中...`))
  spawn.sync(commandStr)
}

export const textLog  = (str) => {
  console.log(chalk.green.bold(`web-check：${str}`))
}

export const writeInPack = async (devObj = {}, pack = 'devDependencies') => {
  const packJson = await getPackageJson()
  for (const key in devObj) {
    packJson[pack][key] = devObj[key]
    textLog(`${key}@${devObj[key]} √`)
  }

  // 最后一个参数 { spaces: 2 } ，保证json文件的格式不变，并且缩进为两个字符
  fs.writeJsonSync(getPath('package.json'), packJson, { spaces: 2 })
}