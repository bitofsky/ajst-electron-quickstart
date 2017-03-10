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
const Router_1 = require("./Router");
const Config_1 = require("../Config");
var Container;
(function (Container) {
    /**
     * Document Body initialize
     */
    Container.initBody = () => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([
            Container.TopNavigation()
        ]);
        yield Router_1.Router(location.hash.replace(/^#/, ''));
    });
    /**
     * TopNavigation
     */
    Container.TopNavigation = () => __awaiter(this, void 0, void 0, function* () {
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
})(Container = exports.Container || (exports.Container = {}));
//# sourceMappingURL=Container.js.map