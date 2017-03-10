/**
 * Config.ts
 */
interface Menu {
    name: string;
    html?: string;
    href?: string;
    right?: boolean;
    children?: Menu[];
    template?: string;
    importJs?: boolean;
    requireJs?: boolean;
    dropdown?: boolean;
    click?: () => Promise<false> | false | void;
    extra?: any;
}

/**
 * window
 */
interface Window {
    Root: string;
    initBody(): void;
}

declare var window: Window;
declare const Root: string;
declare const Package: string;
