import chalk from "chalk"
import spawn from "cross-spawn"

export const runCommand = (commandStr) => {
  console.log(chalk.gray.bold(`${commandStr} 执行命令中...`))
  spawn.sync(commandStr)
}

export const textLog  = (str) => {
  console.log(chalk.green.bold(`web-check：${str}`))
}