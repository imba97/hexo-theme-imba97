import { get, keys, merge, isFunction, upperFirst } from 'lodash'

import path from 'path'
import glob from 'glob'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const OutputKey = Object.freeze({
  /**
   * 页面 layout
   */
  Layout: 'layout',

  /**
   * hexo 打包使用的脚本
   */
  Scripts: 'scripts'
})

// src 打包对应的实际输出文件夹
const outputDir = {
  [OutputKey.Layout]: 'source/js/layout',
  [OutputKey.Scripts]: 'scripts'
}

const configHandler = {
  [OutputKey.Layout]({ name }) {
    return {
      external: ['jquery', 'lodash', 'smooth-scrollbar'],
      output: {
        name,
        format: 'iife',
        globals: {
          jquery: '$',
          lodash: '_'
        }
      }
    }
  },

  [OutputKey.Scripts]() {
    return {
      external: ['lodash', 'fs-extra'],
      output: {
        format: 'cjs'
      }
    }
  }
}

export default keys(outputDir).reduce((configs) => {
  const config = glob.sync(`build/**/*.js`).map((file) => {
    const [, outputKey, ...pathName] = file.split('/')
    const name = pathName.map(upperFirst).join('').replace(/\.js$/, '')

    const outputFile = path.resolve(
      __dirname,
      outputDir[outputKey],
      ...pathName
    )

    // 公共配置
    const commonConfig = {
      input: file,
      output: {
        file: outputFile
      },
      plugins: [resolve(), commonjs()]
    }

    // 获取打包配置处理函数
    const handler = get(configHandler, outputKey)

    // 根据打包代码不同的配置
    const configOfKey = isFunction(handler) ? handler({ name }) : {}

    return merge(commonConfig, configOfKey)
  })

  configs.push(...config)

  return configs
}, [])
