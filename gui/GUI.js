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
const lib_1 = require("./lib/lib");
const Router_1 = require("./Router");
const menu_1 = require("./config/menu");
var GUI;
(function (GUI) {
    /**
     * Document Body initialize
     */
    GUI.initBody = () => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([
            GUI.TopNavigation()
        ]);
        yield Router_1.Router(location.hash.replace(/^#/, ''));
    });
    /**
     * TopNavigation
     */
    GUI.TopNavigation = () => __awaiter(this, void 0, void 0, function* () {
        yield lib_1.TPL('TopNavigation', 'TopNavigation/template', menu_1.Menus);
        // window control button's event
        $('BODY').off('.TopNavigation').on('click.TopNavigation', 'TopNavigation .window-controls A', function ({ target }) {
            const $target = $(this);
            switch (true) {
                case $target.hasClass('close'): return lib_1.close();
                case $target.hasClass('maximize'): return lib_1.maximize();
                case $target.hasClass('minimize'): return lib_1.minimize();
                case $target.hasClass('devtools'): return lib_1.toggleDevtools();
            }
        });
    });
})(GUI = exports.GUI || (exports.GUI = {}));
//# sourceMappingURL=GUI.js.map