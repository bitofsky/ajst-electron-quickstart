"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLog = true;
exports.DefaultRoute = 'ClickMenu/EntityList';
exports.Menus = [
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
    }
].map((Menu) => {
    Menu.template = Menu.template || `MainContainer/${Menu.name}`;
    Menu.href = Menu.href || `#${Menu.name}`;
    Menu.children && Menu.children.forEach(Child => {
        Child.template = Child.template || `MainContainer/${Menu.name}/${Child.name}`;
        Child.href = Child.href || `#${Menu.name}/${Child.name}`;
    });
    return Menu;
});
/**
 * Hash Path로부터 현재 Menu를 반환한다.
 */
exports.getMenuFromPath = (currentPath) => {
    const [parent, child] = currentPath.split('/'); // separater split
    const Parent = exports.Menus.find(({ name }) => name === parent);
    if (!Parent)
        throw new Error('Invalid menu path : ' + currentPath);
    const oChild = !child || !Parent || !Parent.children || !Parent.children.length ? null : Parent.children.find(({ name }) => name === child);
    const Menu = oChild || Parent;
    return { Parent, Menu };
};
//# sourceMappingURL=Config.js.map