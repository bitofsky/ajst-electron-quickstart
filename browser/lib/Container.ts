import { TPL, close, maximize, minimize, toggleDevtools } from './Lib';
import { Router } from './Router';
import { Menus } from '../Config';

export module Container {

    /**
     * Document Body initialize
     */
    export const initBody = async () => {

        await Promise.all([
            TopNavigation()
        ]);

        await Router(location.hash.replace(/^#/, ''));

    };

    /**
     * TopNavigation
     */
    export const TopNavigation = async () => {

        await TPL('TopNavigation', 'TopNavigation/template', Menus);

        // window control button's event
        $('BODY').off('.TopNavigation').on('click.TopNavigation', 'TopNavigation .window-controls A', function({ target }) {

            const $target = $(this);

            switch (true) {
                case $target.hasClass('close'): return close();
                case $target.hasClass('maximize'): return maximize();
                case $target.hasClass('minimize'): return minimize();
                case $target.hasClass('devtools'): return toggleDevtools();
            }

        });
    };

}
