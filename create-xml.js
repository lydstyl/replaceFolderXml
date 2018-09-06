module.exports = function createXml(searchReplaceEls) {
    const fs = require('fs')
    let stillToReplace = [];
    fs.readFile(global.opts.xml.fileName, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let replacedNb = 0;
        let percent = 0;
        searchReplaceEls.forEach(el => {
            let tmpData = data;
            data = data.replace(el.search, el.replace);
            if (tmpData == data) {
                stillToReplace.push({search:el.search,replace:el.replace});
                console.log(`It seems \n${el.search}\nhas not been found and replaced :-(\n`);
            }else{
                replacedNb += 1;
                percent = replacedNb * 100 / searchReplaceEls.length;
                console.log(`${el.search}\nis replaced with \n${el.replace}\n :-) total replaced : ${percent} %\n`);
            }
        });
        fs.writeFile(global.opts.xml.resultFilePath, data, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
    setTimeout(() => {
        console.log('\n\nThe elements bellow were not replaced:\n'.toUpperCase());
        console.log(stillToReplace);
    }, 3000);
}