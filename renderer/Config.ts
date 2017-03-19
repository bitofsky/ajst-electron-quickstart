
export const isDev = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);
export const debugLog = isDev ? true : false;
export const enableDebugToolButton = true;
export const DefaultRoute = 'ClickMenu/EntityList';
export const Menus: Menu[] = [
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
        ],
    }
];

Menus.forEach((Menu: Menu) => {
    Menu.template = Menu.template || `MainContainer/${Menu.name}`;
    Menu.href = Menu.href || `#${Menu.name}`;
    Menu.children && Menu.children.forEach(Child => {
        Child.template = Child.template || `MainContainer/${Menu.name}/${Child.name}`;
        Child.href = Child.href || `#${Menu.name}/${Child.name}`;
    });
});

/**
 * Hash Path로부터 현재 Menu를 반환한다.
 */
export const getMenuFromPath = (currentPath: string) => {

    const [parent, child] = currentPath.split('/'); // separater split

    const Parent = Menus.find(({ name }) => name === parent);

    if (!Parent) throw new Error('Invalid menu path : ' + currentPath);

    const oChild = !child || !Parent || !Parent.children || !Parent.children.length ? null : Parent.children.find(({ name }) => name === child);
    const Menu = oChild || Parent;

    return { Parent, Menu };
};
