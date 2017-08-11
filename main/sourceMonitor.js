"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
let isBuildNow;
let project = '.';
const buildTsc = () => isBuildNow = isBuildNow || new Promise((resolve, reject) => {
    const args = ['-p', project].join(' ');
    console.log(`tsc ${args} : ${new Date()}`);
    child_process_1.exec(path.resolve(__dirname, '../node_modules/.bin/tsc') + ' ' + args, (err, o, e) => {
        isBuildNow = null;
        if (err)
            reject(err);
        else
            resolve();
    });
});
exports.watch = (callback) => {
    const watchGlob = require('watch-glob');
    const watchTrigger = () => __awaiter(this, void 0, void 0, function* () {
        yield buildTsc();
        callback();
    });
    watchGlob(['tsconfig.json', 'main/**/*.ts', 'renderer/**/!(*.js|*.map)'], { delay: 100 }, watchTrigger, watchTrigger);
};
//# sourceMappingURL=sourceMonitor.js.map