import { upperFirst } from 'lodash'

import glob from 'glob'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const outputDir = 'build'

export default glob.sync(`${outputDir}/**/*.js`).map((file) => {
  const [, ...pathName] = file.split('/')
  const name = pathName.map(upperFirst).join('').replace(/\.js$/, '')

  return {
    external: ['jquery', 'lodash'],
    input: file,
    output: {
      name,
      file: file.replace(new RegExp(`^${outputDir}`), 'source/js'),
      format: 'iife',
      globals: {
        jquery: '$',
        lodash: '_'
      }
    },
    plugins: [resolve(), commonjs()]
  }
})
