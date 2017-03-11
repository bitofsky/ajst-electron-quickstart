import { TPL, close, maximize, minimize, toggleDevtools } from './Lib';
import * as Config from '../Config';
import * as fs from 'fs';
import * as path from 'path';

const { Menus, DefaultRoute, getMenuFromPath, debugLog } = Config;

/**
 * Document Body initialize
 */
export const Body = async () => {

    await Promise.all([
        TopNavigation()
    ]);

    if (location.hash) $(window).trigger('hashchange');
    else location.hash = DefaultRoute;

};

/**
 * TopNavigation reder
 */
export const TopNavigation = async () => {

    await TPL('TopNavigation', 'TopNavigation/template', Config);

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

const PageHeader = (Menu: Menu) => TPL('PageHeader', 'PageHeader/template', Menu); // Page Header loading

/**
 * MainContainer render
 */
const MainContainer = async (Menu: Menu): Promise<any> => {

    const tplPath = path.resolve(Root, Menu.template + '.html');

    if (Menu.template && fs.existsSync(`${Root}/${Menu.template}.html`))
        await TPL('MainContainer', Menu.template, Menu, { importJs: Menu.importJs });
    else if (Menu.template)
        debugLog && console.error(`MainContainer - Menu Template file not found`, tplPath);

    debugLog && console.log('MainContainer', 'tplPath', tplPath, '\nMenu', Menu);

};

/**
 * onHashChange가 발생하면 PageHeader / MainContainer를 다시 랜더링 한다.
 */
export const onHashChange = async () => {

    try {

        const currentPath = location.hash.replace(/^#/, '');
        const { Menu, Parent } = getMenuFromPath(currentPath);

        await Promise.all([
            PageHeader(Parent), // render PageHeader
            MainContainer(Menu) // render MainContainer
        ]);

    } catch (e) { console.error(e); }

};
