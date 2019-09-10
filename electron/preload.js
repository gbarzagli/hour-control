const { doExport, EXPORT_OPTIONS } = require("./exportApi");

window.export = doExport;
window["EXPORT_OPTIONS"] = EXPORT_OPTIONS;