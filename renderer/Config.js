"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRoute = 'ClickMenu/EntityList';
exports.Menus = [
    {
        name: 'ClickMenu',
        dropdown: false,
        href: '#ClickMenu/EntityList',
        children: [
            {
                name: 'EntityList',
                href: '#ClickMenu/EntityList',
                template: 'ClickMenu/EntityList/template'
            },
            {
                name: 'Labels',
                href: '#ClickMenu/Labels',
                template: 'ClickMenu/Labels/template'
            },
            {
                name: 'Alert',
                href: 'javascript: alert(`ClickMenu/Sub3 Click!`);',
                html: 'Alert!'
            }
        ]
    },
    {
        name: 'Dropdown',
        dropdown: true,
        children: [
            {
                name: 'Tooltips',
                href: '#Dropdown/Tooltips',
                template: 'Dropdown/Tooltips/template'
            },
            {
                name: 'Dialogs',
                href: '#Dropdown/Dialogs',
                template: 'Dropdown/Dialogs/template'
            },
            {
                name: 'Twice!',
                href: '#Dropdown/Twice!',
                template: 'Dropdown/Twice!/template',
                extra: {
                    'KNOCK KNOCK': '8A2t_tAjMz8',
                    'TT': 'ePpPVE-GGJw',
                    'CHEER UP': 'c7rCyll5AeY'
                }
            }
        ]
    }
];
//# sourceMappingURL=Config.js.map