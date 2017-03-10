"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib/lib");
exports.default = (data) => {
    lib_1.$('#Twice [data-toggle="tab"]').on('shown.bs.tab', (event) => {
        lib_1.$('#Twice iframe').remove();
        const youtube = lib_1.$(event.target).data('youtube');
        lib_1.$(`#Twice #${youtube}`).append(`<iframe src="https://www.youtube.com/embed/${youtube}?autoplay=1" frameborder="0" allowfullscreen></iframe>`);
    });
    lib_1.$('#Twice [data-toggle="tab"]:first').tab('show');
};
//# sourceMappingURL=template.js.map