"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const jQuery = require("jquery");
const lib_1 = require("./lib");
const GUI_1 = require("../GUI");
const Router_1 = require("../Router");
window.$ = window.jQuery = jQuery; // declare jQuery
lib_1.flushCaches(); // ajst re-init cache
require("../../node_modules/bootstrap/dist/js/bootstrap.min.js");
// find GUI root directory
const parentPath = path.resolve(__dirname + '/..');
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
GUI_1.GUI.initBody();
const $window = $(window);
const $TopNavigation = $('TopNavigation');
const $MainContainer = $('MainContainer');
$window.off('hashchange').on('hashchange', (event) => {
    const routePath = location.hash.replace(/^#/, '');
    Router_1.Router(routePath); // open Menu/Sub
});
// Bootstrap bug? : position: fixed;로 탑네비를 고정시키면 특정 버튼 클릭시에 --webkit-app-region이 엉뚱한데로 셋팅되는 오류가 있어 MainContainer를 resize하는 방법으로 바꾼다.
$window.off('resize').on('resize', (event) => {
    $MainContainer.height($window.height() - $TopNavigation.height());
});
//# sourceMappingURL=init.js.map