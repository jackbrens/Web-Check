/**
 * 判断当前项目的环境
 */

import chalk  from "chalk"
import fs from "fs-extra"
import path from "path"

export const env = {
  isVue2: false,
  isVue3: false,
  isTypeScript: false,
  isWebpack: true, // 默认是 webpack 环境
}

export const getEnv = (key) => {
  return env[key]
}

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
  return version.substring(0, 2).includes('2')
}

export const isVue3 = (version) => {
  return version.substring(0, 2).includes('3')
}

export const initProjectFile = async () => {

  // 检查是否有 .git 目录
  if (!fs.pathExistsSync('.git')) {
    console.log(chalk.red.bold(`
      请先初始化git！！！
    `))
    process.exit(0)
  }
  const packagejson = await getPackageJson()
  // 获取 packagejson 的依赖项
  const deps = { ...packagejson.devDependencies, ...packagejson.dependencies }
  const vueVersion = deps['vue']
  const tsVersion = deps['typescript']

  // 判断 vue 的版本
  if (vueVersion) {
    if (isVue2(vueVersion)) {
      setEnv('isVue2', true)
      return
    }
    if (isVue3(vueVersion)) {
      setEnv('isVue3', true)
      if (tsVersion) {
        setEnv('isTypeScript', true)
      }
      return
    }
  } else {
    console.log(chalk.red.bold(`
    请您安装vue或暂不支持除Vue 2/3之外的其他版本...
    `))

    // 如果出错就退出
    process.exit(0)
  }
}
