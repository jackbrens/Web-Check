import fs from "fs-extra"
import { runCommand, textLog } from "../utils/tool.js"
import { getPackageJson, getPath, writeFile } from "../utils/env.js"
import { preCommit } from "../template/husky/pre-commit.js"
import { commitMsg } from "../template/husky/commit-msg.js"
import { commitLintConfig } from "../template/commitLint/commitlint.config.js"
import { lintStagedConfig } from "../template/commitLint/lint-staged.config.js"
import chalk from "chalk"

export const devs = {
  "lint-staged": "^12.4.1",
  "@commitlint/cli": "^17.6.5",
  "@commitlint/config-conventional": "^17.6.5",
  "commitizen": "^4.3.0",
  "cz-git": "^1.6.1",
}

export const lintStaged = {
  "*.{js,jsx,vue,ts,tsx}": [
    "yarn lint",
    "prettier --write",
    "git add"
  ]
}

export const config = {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}


export const huskyInit = async () => {
  runCommand('npm add husky@8.0.1 -D')
  runCommand(`npm set-script "prepare" "husky install"`)
  runCommand(`npm run prepare`)
  writeFile('.husky/pre-commit', preCommit)
  writeFile('.husky/commit-msg', commitMsg)
  runCommand(`npm set-script "lint:lint-staged" "lint-staged"`)
  runCommand(`npm set-script "commit" "npm run git-cz"`)
  
  // 将依赖添加到 package.json 中
  const packJson = await getPackageJson()
  for (const key in devs) {
    packJson.devDependencies[key] = devs[key]
    textLog(`${key}@${devs[key]} √`)
  }

  packJson["lint-staged"] = lintStaged
  packJson["config"] = config

  // 写入配置文件
  fs.writeJsonSync(getPath('package.json'), packJson, { spaces: 2 })
  writeFile('./commitlint.config.js', commitLintConfig)
  writeFile('./lint-staged.config.js', lintStagedConfig)
}