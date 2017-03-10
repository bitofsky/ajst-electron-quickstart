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
 * Router
 */
exports.Router = (route) => __awaiter(this, void 0, void 0, function* () {
    route = route || Config_1.DefaultRoute;
    const [sMenu, sSub] = route.split('/');
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
//# sourceMappingURL=Router.js.map