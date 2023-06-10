export const eslintrc = `
module.exports = {
	root: true,
	env: {
		node: true, // 启动 node 中全局变量
		browser: true, // 启动浏览器中全局变量
	},
	// 继承 eslint 的规则
	extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		parser: '@babel/eslint-parser',
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	rules: {
		// 组件名字必须多个单词
		'vue/multi-word-component-names': 'off',
		// 不允许使用var变量
		'no-var': 'error',
		// 必须使用全等
		eqeqeq: 'error',
		// 禁止出现重复的 case 标签
		'no-duplicate-case': 'warn',
		// 静止出现分号
		semi: ['warn', 'never'],
	},
}
`
