interface Window {
    initBody(): void;
    jQuery(): JQuery;
    $(): JQuery;
}
declare var window: Window;

import * as path from 'path';
import * as jQuery from 'jquery';
import { flushCaches } from './lib';
import { GUI } from '../GUI';
import { Router } from '../Router';

window.$ = window.jQuery = jQuery; // declare jQuery
flushCaches(); // ajst re-init cache

import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

// find GUI root directory
const parentPath: string = path.resolve(__dirname + '/..');

// delete gui/** 's require.cache
Object.keys(require.cache).filter(s => s.includes(parentPath)).forEach(path => {
    delete require.cache[require.resolve(path)];
});

// for Electron main <-> browser executeJavaScript()
window.initBody = () => {
    // require self
    require('./init');
};

// App View Start
GUI.initBody();

const $window = $(window);
const $TopNavigation = $('TopNavigation');
const $MainContainer = $('MainContainer');

$window.off('hashchange').on('hashchange', (event) => {
    const routePath = location.hash.replace(/^#/, '');
    Router(routePath); // open Menu/Sub
});

// Bootstrap bug? : position: fixed;로 탑네비를 고정시키면 특정 버튼 클릭시에 --webkit-app-region이 엉뚱한데로 셋팅되는 오류가 있어 MainContainer를 resize하는 방법으로 바꾼다.
$window.off('resize').on('resize', (event) => {
    $MainContainer.height($window.height() - $TopNavigation.height());
});
