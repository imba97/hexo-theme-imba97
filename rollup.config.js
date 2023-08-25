import { upperFirst } from 'lodash'

import path from 'path'
import glob from 'glob'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

// src 打包对应的实际输出文件夹
const outputDir = {
  layout: 'source/js',
  scripts: 'scripts'
}

export default glob.sync('build/**/*.js').map((file) => {
  const [, outputKey, ...pathName] = file.split('/')
  const name = pathName.map(upperFirst).join('').replace(/\.js$/, '')

  return {
    external: ['jquery', 'lodash', 'smooth-scrollbar'],
    input: file,
    output: {
      name,
      file: path.resolve(__dirname, outputDir[outputKey], ...pathName),
      format: 'iife',
      globals: {
        jquery: '$',
        lodash: '_'
      }
    },
    plugins: [resolve(), commonjs()]
  }
})
