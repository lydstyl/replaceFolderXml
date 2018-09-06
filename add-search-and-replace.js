module.exports = function addSearchAndReplace(jsonFromCsv) {
    let searchReplaceEls = [];
    jsonFromCsv.forEach(csvLine => {
        if (csvLine[global.opts.csv.header.key].includes('//library/folder')) {
            searchReplaceEls.push(
                {
                    search: global.opts.before.search + csvLine[global.opts.csv.header.originalTxt],
                    replace: global.opts.before.replace + csvLine[global.opts.csv.header.val]
                }
            );
        }
    });
    return searchReplaceEls;
}