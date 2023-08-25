'use strict';

var lodash = require('lodash');

if (lodash.get(hexo.theme.config, 'tags.enable', false)) {
    hexo.extend.generator.register('_tags', function (locals) {
        return {
            path: 'tags/index.html',
            data: locals.theme,
            layout: 'tags'
        };
    });
}
