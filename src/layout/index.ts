import $ from 'jquery'
import Scrollbar from 'smooth-scrollbar'

$(() => {
  Scrollbar.init(document.querySelector('#container')!, {
    damping: 0.2,
    alwaysShowTracks: true
  })

  NProgress.start()
  window.onload = function () {
    NProgress.done()
  }

  Index.generateFancybox()

  $(document).on('pjax:send', function () {
    NProgress.start()
  })

  $(document).on('pjax:complete', function () {
    NProgress.done()
    Index.generateFancybox()
  })

  // 修复 fancybox 关闭时触发 pjax 的问题
  ;($ as any).fancybox.defaults.hash = false

  let pjax
  document.addEventListener('DOMContentLoaded', function () {
    pjax = new Pjax({
      elements:
        'a[href]:not([href^="#"]):not([href="javascript:void(0)"]):not([pjax-fancybox]):not([notallow="return false;"]):not([notallow="return!1"]):not([target="_blank"]):not([target="view_window"]):not([href$=".xml"])',
      selectors: [
        'head title', // 标题
        'head meta[name=keywords]', // 关键词
        'head meta[name=description]', // 描述
        'script[data-pjax]', // script 标签添加 data-pjax
        '#main'
      ],
      cacheBust: false
    })
  })
})

export const generateFancybox = () => {
  $('.article-entry').each(function (i) {
    $(this)
      .find('img')
      .each(function () {
        if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a'))
          return

        var alt = this.alt

        if (alt) $(this).after('<span class="caption">' + alt + '</span>')

        $(this).wrap(
          '<a href="' +
            this.src +
            '" data-fancybox="gallery" data-caption="' +
            alt +
            '"></a>'
        )
      })

    $(this)
      .find('.fancybox')
      .each(function () {
        $(this).attr('rel', 'article' + i)
      })
  })
}
