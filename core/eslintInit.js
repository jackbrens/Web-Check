/**
 * // 1、列出需要安装的依赖
 * // 2、添加进 package.json 的 dev 依赖中，并且在 script 字段中 添加 "lint" 命令
 * // 3、在项目的根目录创建 .eslintrc.js、.eslintignore、.prettierrc.js、.prettieringore
*/
import { getEnv, writeFile } from '../utils/env.js'
import { eslintrcFun } from '../template/eslint/eslintrc.js'
import { eslintignore } from '../template/eslint/eslintignore.js'
import { prettierrc } from '../template/prettier/prettierrc.js'
import { prettierignore } from '../template/prettier/prettierignore.js'
import { editorconfig } from '../template/editorconfig/editorconfig.js'
import { runCommand, writeInPack } from '../utils/tool.js'

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

export const eslintInit = async () => {
  let devDependencies = baseDevs

  if (getEnv('isVue3') && getEnv('isTypeScript')) {
    devDependencies = {
      ...devDependencies,
      "@typescript-eslint/parser": "^5.9.11",
      "@typescript-eslint/eslint-plugin": "^5.9.11"
    }
  }

  // 写入依赖到 package.json 中
  await writeInPack(devDependencies, 'devDependencies')
  runCommand(`npm set-script "lint" "eslint --fix --ext .js,.vue ."`)

  // 写入文件
  writeFile('./.eslintrc.js', eslintrcFun())
  writeFile('./.eslintignore', eslintignore)
  writeFile('./.prettierrc.js', prettierrc)
  writeFile('./.prettierignore', prettierignore)
  writeFile('./.editorconfig', editorconfig)
}