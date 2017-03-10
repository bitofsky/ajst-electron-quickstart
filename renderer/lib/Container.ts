import { TPL, TPLAppend, close, maximize, minimize, toggleDevtools } from './Lib';
import { Menus, DefaultRoute } from '../Config';


/**
 * Document Body initialize
 */
export const Body = async () => {

    await Promise.all([
        TopNavigation()
    ]);

    await MainContainer(location.hash.replace(/^#/, ''));

};

/**
 * TopNavigation reder
 */
export const TopNavigation = async () => {

    await TPL('TopNavigation', 'TopNavigation/template', Menus);

    // window control button's event
    $('BODY').off('.TopNavigation').on('click.TopNavigation', 'TopNavigation .window-controls A', function ({ target }) {

        const $target = $(this);

        switch (true) {
            case $target.hasClass('close'): return close();
            case $target.hasClass('maximize'): return maximize();
            case $target.hasClass('minimize'): return minimize();
            case $target.hasClass('devtools'): return toggleDevtools();
        }

    });
};

/**
 * MainContainer reder
 */
export const MainContainer = async (containerPath: string): Promise<any> => {

    containerPath = containerPath || DefaultRoute;

    const [sMenu, sSub] = containerPath.split('/');
    const Menu = Menus.find(({ name }) => name === sMenu);

    if (!Menu) return false; // invalid menu

    const Sub = !Menu.children ? null : Menu.children.find(({ name }) => name === sSub);

    await TPL('MainContainer', 'PageHeader/template', { Menu, Sub }); // Page Header loading

    if (Menu.template)
        await TPLAppend('MainContainer', Menu.template, { Menu, Sub }, { importJs: Menu.importJs });
    else if (Sub && Sub.template)
        await TPLAppend('MainContainer', Sub.template, { Menu, Sub }, { importJs: Sub.importJs });

};
