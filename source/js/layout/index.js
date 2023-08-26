var Index = (function (exports, $, Scrollbar) {
    'use strict';

    $(() => {
        Scrollbar.init(document.querySelector('#container'), {
            damping: 0.2,
            alwaysShowTracks: true
        });
        NProgress.start();
        window.onload = function () {
            NProgress.done();
        };
        Index.generateFancybox();
        $(document).on('pjax:send', function () {
            NProgress.start();
        });
        $(document).on('pjax:complete', function () {
            NProgress.done();
            Index.generateFancybox();
        });
        $.fancybox.defaults.hash = false;
        document.addEventListener('DOMContentLoaded', function () {
            new Pjax({
                elements: 'a[href]:not([href^="#"]):not([href="javascript:void(0)"]):not([pjax-fancybox]):not([notallow="return false;"]):not([notallow="return!1"]):not([target="_blank"]):not([target="view_window"]):not([href$=".xml"])',
                selectors: [
                    'head title',
                    'head meta[name=keywords]',
                    'head meta[name=description]',
                    'script[data-pjax]',
                    '#main'
                ],
                cacheBust: false
            });
        });
    });
    const generateFancybox = () => {
        $('.article-entry').each(function (i) {
            $(this)
                .find('img')
                .each(function () {
                if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a'))
                    return;
                var alt = this.alt;
                if (alt)
                    $(this).after('<span class="caption">' + alt + '</span>');
                $(this).wrap('<a href="' +
                    this.src +
                    '" data-fancybox="gallery" data-caption="' +
                    alt +
                    '"></a>');
            });
            $(this)
                .find('.fancybox')
                .each(function () {
                $(this).attr('rel', 'article' + i);
            });
        });
    };

    exports.generateFancybox = generateFancybox;

    return exports;

})({}, $, Scrollbar);
