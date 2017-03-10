import { TPL, TPLAppend } from './lib/lib';
import { Menus, DefaultRoute } from './config/menu';

/**
 * Router
 */
export const Router = async (route: string): Promise<any> => {

    route = route || DefaultRoute;

    const [sMenu, sSub] = route.split('/');
    const Menu = Menus.find(({ name }) => name === sMenu);

    if (!Menu) return false; // invalid menu

    const Sub = !Menu.children ? null : Menu.children.find(({ name }) => name === sSub);

    await TPL('MainContainer', 'PageHeader/template', { Menu, Sub }); // Page Header loading

    if (Menu.template)
        await TPLAppend('MainContainer', Menu.template, { Menu, Sub }, { importJs: Menu.importJs });
    else if (Sub && Sub.template)
        await TPLAppend('MainContainer', Sub.template, { Menu, Sub }, { importJs: Sub.importJs });

};
