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
/**
 * Document Body initialize
 */
exports.Body = () => __awaiter(this, void 0, void 0, function* () {
    yield Promise.all([
        exports.TopNavigation()
    ]);
    yield exports.MainContainer(location.hash.replace(/^#/, ''));
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
/**
 * MainContainer reder
 */
exports.MainContainer = (containerPath) => __awaiter(this, void 0, void 0, function* () {
    containerPath = containerPath || Config_1.DefaultRoute;
    const [sMenu, sSub] = containerPath.split('/');
    const Menu = Config_1.Menus.find(({ name }) => name === sMenu);
    if (!Menu)
        return false; // invalid menu
    const Sub = !Menu.children ? null : Menu.children.find(({ name }) => name === sSub);
    yield Lib_1.TPL('MainContainer', 'PageHeader/template', { Menu, Sub }); // Page Header loading
    if (Menu.template)
        yield Lib_1.TPLAppend('MainContainer', Menu.template, { Menu, Sub }, { importJs: Menu.importJs });
    else if (Sub && Sub.template)
        yield Lib_1.TPLAppend('MainContainer', Sub.template, { Menu, Sub }, { importJs: Sub.importJs });
});
//# sourceMappingURL=Container.js.map