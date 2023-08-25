import { get } from 'lodash'

if (get(hexo.theme.config, 'tags.enable', false)) {
  hexo.extend.generator.register('_tags', function (this: any, locals: any) {
    return {
      path: 'tags/index.html',
      data: locals.theme,
      layout: 'tags'
    }
  })
}
