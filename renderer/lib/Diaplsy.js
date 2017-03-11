"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lib_1 = require("./Lib");
const Config_1 = require("../Config");
const fs = require("fs");
const path = require("path");
/**
 * Document Body initialize
 */
exports.Body = () => __awaiter(this, void 0, void 0, function* () {
    yield Promise.all([
        exports.TopNavigation()
    ]);
    location.hash = Config_1.DefaultRoute;
});
/**
 * TopNavigation reder
 */
exports.TopNavigation = () => __awaiter(this, void 0, void 0, function* () {
    yield Lib_1.TPL('TopNavigation', 'TopNavigation/template', Config_1.Menus);
    // window control button's event
    $('BODY').off('.TopNavigation').on('click.TopNavigation', 'TopNavigation .window-controls A', function ({ target }) {
        const $target = $(this);
        switch (true) {
            case $target.hasClass('close'): return Lib_1.close();
            case $target.hasClass('maximize'): return Lib_1.maximize();
            case $target.hasClass('minimize'): return Lib_1.minimize();
            case $target.hasClass('devtools'): return Lib_1.toggleDevtools();
        }
    });
});
const PageHeader = (Menu) => Lib_1.TPL('PageHeader', 'PageHeader/template', Menu); // Page Header loading
/**
 * MainContainer render
 */
const MainContainer = (Menu) => __awaiter(this, void 0, void 0, function* () {
    const tplPath = path.resolve(Root, Menu.template + '.html');
    if (Menu.template && fs.existsSync(`${Root}/${Menu.template}.html`))
        yield Lib_1.TPL('MainContainer', Menu.template, Menu, { importJs: Menu.importJs });
    else if (Menu.template)
        Config_1.debugLog && console.error(`MainContainer - Menu Template file not found`, tplPath);
    Config_1.debugLog && console.log('MainContainer', 'tplPath', tplPath, '\nMenu', Menu);
});
/**
 * onHashChange가 발생하면 PageHeader / MainContainer를 다시 랜더링 한다.
 */
exports.onHashChange = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const currentPath = location.hash.replace(/^#/, '');
        const { Menu, Parent } = Config_1.getMenuFromPath(currentPath);
        yield Promise.all([
            PageHeader(Parent),
            MainContainer(Menu) // render MainContainer
        ]);
    }
    catch (e) {
        console.error(e);
    }
});
//# sourceMappingURL=Diaplsy.js.map