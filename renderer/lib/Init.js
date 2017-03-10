"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lib_1 = require("./Lib");
const Container_1 = require("./Container");
Lib_1.flushCaches(); // ajst re-init cache
// delete browser/** 's require.cache
Object.keys(require.cache).filter(s => s.includes(Root)).forEach(path => {
    delete require.cache[require.resolve(path)];
});
// for Electron main <-> browser executeJavaScript()
window.initBody = () => require('./init'); // require self
const $window = $(window);
const $TopNavigation = $('TopNavigation');
const $MainContainer = $('MainContainer');
$window.off('hashchange').on('hashchange', (event) => {
    const routePath = location.hash.replace(/^#/, '');
    Container_1.MainContainer(routePath); // open Menu/Sub
});
// Bootstrap bug? : position: fixed;로 탑네비를 고정시키면 특정 버튼 클릭시에 --webkit-app-region이 엉뚱한데로 셋팅되는 오류가 있어 MainContainer를 resize하는 방법으로 바꾼다.
let resizeTimeout; // 마지막 리사이즈 시점으로부터 100ms 후 MainContainer.height 변경
$window.off('resize').on('resize', (event) => {
    if (resizeTimeout)
        clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        $MainContainer.height($window.height() - $TopNavigation.height());
        resizeTimeout = undefined;
    }, 100);
});
Container_1.Body(); // App View Start
//# sourceMappingURL=Init.js.map