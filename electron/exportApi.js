const { isNullOrUndefined } = require("util");
const fs = require("fs");

const EXPORT_OPTIONS = {
    JSON: "json",
    CSV: "csv"
}

const doExport = (data, dir = "./", type = EXPORT_OPTIONS.JSON) => {
    if (isNullOrUndefined(data)) throw "No data selected to export";
    switch(type) {
        case EXPORT_OPTIONS.JSON:
            fs.writeFileSync(`${dir}export-test.${type}`, JSON.stringify(data));
            break;
        case EXPORT_OPTIONS.CSV:
            throw "Method not implemented";
    }
};

module.exports = { EXPORT_OPTIONS, doExport };