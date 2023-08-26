import _ from 'lodash'
import path from 'path'
import { readdirSync, statSync } from 'fs-extra'

const tree: string[] = []

hexo.extend.helper.register('autoImport', function (type) {
  switch (type) {
    case 'js':
      // libs 的权重，权重越大引入越靠前
      const weight: Record<string, number> = {
        jquery: 10
      }

      // 支持配置启用的库
      const enabledKey = ['fancybox']

      const topInfo = _.keys(weight).map((name) => ({
        name,
        path: `libs/${name}/`
      }))

      // 启用
      const enabled = _.reduce(
        enabledKey,
        (result, key) =>
          _.assign(result, {
            [key]: _.get(hexo.theme.config, `libs.${key}`, false)
          }),
        {}
      )

      const js = tree.filter((file) => path.extname(file) === '.js')

      const output = _(js)
        .map((file) =>
          file.replace(/^(?:.*)source\\(.*)$/, '$1').replaceAll('\\', '/')
        )
        // 过滤出启用的
        .filter((file) => {
          const key = _.get(/libs\/(.*?)\//.exec(file), '1')
          return !key || !_.has(enabled, key) || enabled[key]
        })
        // 根据权重排序
        .orderBy((file) => {
          const info = _.find(topInfo, (info) => !!~file.indexOf(info.path))
          return _.get(weight, `${info?.name}`, 0)
        }, 'desc')
        // 转 script
        .map((file) => `<script src="/${file}"></script>`)
        .join('\n')

      return output
  }

  return ''
})

// 获取 source/libs 目录树
;(function getDirectoryTree(dirPath: string) {
  const dir = readdirSync(dirPath)

  _.forEach(dir, (name) => {
    const deepPath = path.join(dirPath, name)

    const stat = statSync(deepPath)

    if (stat.isDirectory()) {
      getDirectoryTree(deepPath)
    } else {
      tree.push(deepPath)
    }
  })

  return tree
})(path.resolve(__dirname, '../../source/libs'))
