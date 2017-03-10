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
const menu_1 = require("./config/menu");
/**
 * Router
 */
exports.Router = (route) => __awaiter(this, void 0, void 0, function* () {
    route = route || menu_1.DefaultRoute;
    const [sMenu, sSub] = route.split('/');
    const Menu = menu_1.Menus.find(({ name }) => name === sMenu);
    if (!Menu)
        return false; // invalid menu
    const Sub = !Menu.children ? null : Menu.children.find(({ name }) => name === sSub);
    yield lib_1.TPL('MainContainer', 'PageHeader/template', { Menu, Sub }); // Page Header loading
    if (Menu.template)
        yield lib_1.TPLAppend('MainContainer', Menu.template, { Menu, Sub }, { importJs: Menu.importJs });
    else if (Sub && Sub.template)
        yield lib_1.TPLAppend('MainContainer', Sub.template, { Menu, Sub }, { importJs: Sub.importJs });
});
//# sourceMappingURL=Router.js.map