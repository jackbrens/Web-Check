/**
 * 判断当前项目的环境
 */

import chalk  from "chalk"
import fs from "fs-extra"
import path from "path"

export const env = {
  isVue2: false,
  isVue3: false,
  isWebpack: true, // 默认是 webpack 环境
}

export const getEnv = (packJson) => {}

export const setEnv = (key, val) => {
  return env[key] = val
}

/**
 * 把文件写入到当前项目中
 * @param {string} paths 需要生成的路径
 * @param {string} templateStr 文件的模板
 * @returns 
 */
export const writeFile = (paths, templateStr) => {
  return fs.outputFileSync(getPath(paths), templateStr)
}

/**
 * 获取文件路径
 * @param {string} paths 
 * @returns 
 */
export const getPath = (paths) => {
  return path.join(process.cwd(), paths)
}

/**
 * // 获取当前项目的 package.json 文件
*/
export const getPackageJson = async () => {
  const json = await fs.readJSON(path.join(process.cwd(), 'package.json'))
  return json
}

export const isVue2 = (version) => {
  return Number(version.substring(0, 1)) === 2
}

export const isVue3 = (version) => {
  return Number(version.substring(0, 1)) === 3
}

export const initProjectFile = async () => {
  const packagejson = await getPackageJson()
  // 获取 packagejson 的依赖项
  const deps = { ...packagejson.devDependencies, ...packagejson.dependencies }
  const vueVersion = deps['vue']

  // 判断 vue 的版本
  if (vueVersion) {
    if (isVue2(vueVersion)) {
      setEnv('isVue2', true)
      return
    }
    if (isVue3(vueVersion)) {
      setEnv('isVue3', true)
      return
    }
  } else {
    console.log('\n')
    console.log(chalk.red.bold(' 请您安装vue或暂不支持除Vue之外的其他版本...'))
    console.log('\n')

    // 如果出错就退出
    process.exit(0)
  }
}
