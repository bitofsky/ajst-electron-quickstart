import * as path from 'path';
import { exec } from 'child_process';

let isBuildNow: Promise<any> | null;
let project = '.';

const buildTsc = () => isBuildNow = isBuildNow || new Promise((resolve, reject) => {
    const args = ['-p', project].join(' ');

    console.log(`tsc ${args} : ${new Date()}`);

    exec(path.resolve(__dirname, '../node_modules/.bin/tsc') + ' ' + args, (err, o, e) => {
        isBuildNow = null;
        if (err)
            reject(err);
        else
            resolve();
    });

});

export const watch = (callback: () => void) => {

    const watchGlob = require('watch-glob');
    const watchTrigger = async () => {
        await buildTsc();
        callback();
    };

    watchGlob(['tsconfig.json', 'main/**/*.ts', 'renderer/**/!(*.js|*.map)'], { delay: 100 }, watchTrigger, watchTrigger);

};