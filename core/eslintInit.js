/**
 * // 1、列出需要安装的依赖
 * // 2、添加进 package.json 的 dev 依赖中，并且在 script 字段中 添加 "lint" 命令
 * // 3、在项目的根目录创建 .eslintrc.js、.eslintignore、.prettierrc.js、.prettieringore
*/
import fs from 'fs-extra'
import { getPackageJson, getPath, writeFile } from '../utils/env.js'
import { eslintrc } from '../template/eslint/eslintrc.js'
import { eslintignore } from '../template/eslint/eslintignore.js'
import { prettierrc } from '../template/prettier/prettierrc.js'
import { prettierignore } from '../template/prettier/prettierignore.js'
import { editorconfig } from '../template/editorconfig/editorconfig.js'
import { textLog } from '../utils/tool.js'

// 需要安装的依赖
const baseDevs = {
  "eslint": "^8.41.0",
  "eslint-config-prettier": "^8.8.0",
	"eslint-plugin-prettier": "^4.2.1",
	"eslint-plugin-vue": "^9.14.1",
  "@babel/eslint-parser": "^7.21.8",
  "prettier": "^2.8.8",
	"prettier-eslint": "^15.0.1",
}

// 需要使用的命令
const customScript = {
  "lint": "eslint --fix --ext .js,.vue ./"
}

export const eslintInit = async () => {
  const packJson = await getPackageJson()
  const devs = { ...packJson.devDependencies }
  const scripts = { ...packJson.scripts }
  for (const key in baseDevs) {
    devs[key] = baseDevs[key]
    textLog(`${key}@${baseDevs[key]} √`)
  }
  packJson.devDependencies = devs

  for (const key in customScript) {
    scripts[key] = customScript[key]
    textLog(`${key}@${customScript[key]} √`)
  }
  packJson.scripts = scripts

  // 最后一个参数 { spaces: 2 } ，保证json文件的格式不变，并且缩进为两个字符
  fs.writeJsonSync(getPath('package.json'), packJson, { spaces: 2 })

  // 写入文件
  writeFile('./.eslintrc.js', eslintrc)
  writeFile('./.eslintignore', eslintignore)
  writeFile('./.prettierrc.js', prettierrc)
  writeFile('./.prettierignore', prettierignore)
  writeFile('./.editorconfig', editorconfig)
}