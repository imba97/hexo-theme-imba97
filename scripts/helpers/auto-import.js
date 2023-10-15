'use strict';

var _ = require('lodash');
var path = require('path');
var fsExtra = require('fs-extra');

const tree = [];
// lib 目录
const lib = 'lib';
// 权重，权重越大引入越靠前
const weight = {
    jquery: 10
};
// 支持配置启用的库
const enabledKey = ['fancybox'];
// 启用
const getEnabledLibrary = (key) => !~enabledKey.indexOf(key) ||
    _.get(hexo.theme.config, `functions.${key}`, false);
const topInfo = _.keys(weight).map((name) => ({
    name,
    path: `${lib}/${name}/`
}));
hexo.extend.helper.register('autoImport', function (type) {
    switch (type) {
        case 'js': {
            const js = tree.filter((file) => path.extname(file) === '.js');
            const output = autoImportHandler(js, (file) => `<script src="/${file}"></script>`);
            return output;
        }
        case 'css': {
            const css = tree.filter((file) => path.extname(file) === '.css');
            const output = autoImportHandler(css, (file) => `<link rel="stylesheet" href="/${file}">`);
            return output;
        }
    }
    return '';
});
function autoImportHandler(files, outputHandler) {
    return (_(files)
        .map((file) => file.replace(/^(?:.*)source\\(.*)$/, '$1').replaceAll('\\', '/'))
        // 过滤出启用的
        .filter((file) => {
        const key = _.get(new RegExp(`${lib}/(.*?)/`).exec(file), '1');
        return getEnabledLibrary(key);
    })
        // 根据权重排序
        .orderBy((file) => {
        const info = _.find(topInfo, (info) => !!~file.indexOf(info.path));
        return _.get(weight, `${info?.name}`, 0);
    }, 'desc')
        .map(outputHandler)
        .join('\n'));
}
(function getDirectoryTree(dirPath) {
    const dir = fsExtra.readdirSync(dirPath);
    _.forEach(dir, (name) => {
        const deepPath = path.join(dirPath, name);
        const stat = fsExtra.statSync(deepPath);
        if (stat.isDirectory()) {
            getDirectoryTree(deepPath);
        }
        else {
            tree.push(deepPath);
        }
    });
    return tree;
})(path.resolve(__dirname, `../../source/${lib}`));
