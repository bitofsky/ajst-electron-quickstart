"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLog = true;
exports.DefaultRoute = 'ClickMenu/EntityList';
const Menus = [
    {
        name: 'ClickMenu',
        dropdown: false,
        href: '#ClickMenu/EntityList',
        children: [
            {
                name: 'EntityList'
            },
            {
                name: 'Labels'
            },
            {
                name: 'Alert',
                href: 'javascript: alert(`ClickMenu/Sub3 Click!`);'
            }
        ]
    },
    {
        name: 'Dropdown',
        dropdown: true,
        dropdownHide: true,
        children: [
            {
                name: 'Tooltips'
            },
            {
                name: 'Dialogs'
            },
            {
                name: 'Twice!',
                extra: {
                    'KNOCK KNOCK': '8A2t_tAjMz8',
                    'TT': 'ePpPVE-GGJw',
                    'CHEER UP': 'c7rCyll5AeY'
                }
            }
        ]
    },
    {
        name: 'ProgrammingLinks',
        dropdown: true,
        children: [
            {
                name: 'NodeJS',
                template: 'MainContainer/ProgrammingLinks/template',
                extra: {
                    url: 'https://nodejs.org'
                }
            },
            {
                name: 'Github',
                template: 'MainContainer/ProgrammingLinks/template',
                extra: {
                    url: 'https://github.com'
                }
            }
        ]
    }
];
exports.Menus = Menus;
/**
 * Menus normalize
 */
Menus.forEach(Parent => {
    Parent.template = Parent.template || `MainContainer/${Parent.name}`;
    Parent.href = Parent.href || `#${Parent.name}`;
    Parent.children && Parent.children.forEach(Child => {
        Child.template = Child.template || `MainContainer/${Parent.name}/${Child.name}`;
        Child.href = Child.href || `#${Parent.name}/${Child.name}`;
    });
});
/**
 * Hash Path로부터 Menu를 반환한다.
 */
exports.getMenuFromPath = (currentPath) => {
    const [parent, child] = currentPath.split('/'); // separater split
    const Parent = Menus.find(({ name }) => name === parent);
    if (!Parent)
        throw new Error('Invalid menu path : ' + currentPath);
    const oChild = !child || !Parent || !Parent.children || !Parent.children.length ? null : Parent.children.find(({ name }) => name === child);
    const Menu = oChild || Parent;
    return { Parent, Menu };
};
//# sourceMappingURL=Config.js.map