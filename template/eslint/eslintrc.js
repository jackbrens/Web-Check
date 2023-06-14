import { getEnv } from "../../utils/env.js"

const eslintrcForVue2 = `module.exports = {
	root: true,
	env: {
		node: true, // 启动 node 中全局变量
		browser: true, // 启动浏览器中全局变量
	},
	// 继承 eslint 的规则
	extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
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
}`



const eslintrcForVue3 = `module.exports = {
	root: true,
	env: {
		node: true, // 启动 node 中全局变量
		browser: true, // 启动浏览器中全局变量
	},
	// 继承 eslint 的规则
	extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		parser: '@babel/eslint-parser',
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	rules: {
		// prop 默认值
		'vue/require-default-prop': 'off',
		// 强制vue组件内排序
		'vue/order-in-components': 'off',
		// 自闭合的单标签
    'vue/html-self-closing': 'off',
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
}`

const eslintrcForVue3AndTs = `module.exports = {
	root: true,
	env: {
		node: true, // 启动 node 中全局变量
		browser: true, // 启动浏览器中全局变量
	},
	// 继承 eslint 的规则
	extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
      jsx: true,
    },
	},
	rules: {
		'@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
		// 不能有未定义的变量
		'no-undef': 'off',
		// 定义一个变量但未赋值
		'no-unused-vars': 'warn',
		// prop 默认值
		'vue/require-default-prop': 'off',
		// 强制vue组件内排序
		'vue/order-in-components': 'off',
		// 自闭合的单标签
    'vue/html-self-closing': 'off',
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
}`

export const eslintrcFun = () => {
	if (getEnv('isVue3')) {
		// vue3 不是 typescript 的版本
		// .eslintrc.js 中 extends 不一样
		// rules 规则也有不一样的
		if (getEnv('isTypeScript')) {
			return eslintrcForVue3AndTs
		}
		return eslintrcForVue3
	}

	return eslintrcForVue2
}
