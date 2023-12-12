import _ from 'lodash'
import $ from 'jquery'

console.log('post 启动')

// 开启 fancybox
if (($ as any).fancybox) {
  ;($('.fancybox') as any).fancybox()
}
