/**
 * il nous faut:
 * un xml content à jour avec la langue à traduire
 * un csv avec 1 colonne xpath, 1 colonne texte à traduire (qu'on retrouve dans l'xml) et 1 colonne texte traduit
 * 
 * Fonctionnement:
 * on transforme le csv en json
 * exemple de csv
 * XPATH;ORIGINALTXT;TRANSLATEDTXT
 * "//library/folder[attribute::folder-id=""about-us""]/refinement-definitions/refinement-definition/display-name[attribute::xml:lang=""fr-FR""]";À propos de nous;Acerca de nosotros
 * "//library/folder[attribute::folder-id=""blog""]/display-name[attribute::xml:lang=""fr-FR""]";Blog;Blog
 * "//library/folder[attribute::folder-id=""blog""]/page-attributes/page-title[attribute::xml:lang=""fr-FR""]";Toute l'actualité | BaByliss;Actualidad | BaByliss
 * 
 * on parcour les clé et on créer un obj de ce genre :
 * 
 *  var o = toReplaceObject = {
 *  'xml:lang="fr-FR">Alias Name': 'xml:lang="es-ES">Alias Nombre',
 *  'xml:lang="fr-FR">Pas de zoom produit': 'xml:lang="es-ES">Sin zoom del producto',
 * }
 * 
 * on créer un nouvel xml à partir de l'original en remplacant les valeurs à l'aide l'objet
 * 
 * Merci de bien checker les global.opts ci-dessous avant de lancer le npm run start
 */

/////////////////////////////////
global.opts = {
    csv:{
        filePath: 'csv.csv',
        delimiters: [';'],
        header: {
            key: 'XPATH',
            originalTxt: 'ORIGINALTXT',
            val: 'TRANSLATEDTXT'
        }
    },
    xml:{
        // firstAndSecondLines: '<?xml version="1.0" encoding="UTF-8"?>\n<library xmlns="http://www.demandware.com/xml/impex/library/2006-10-31">',
        fileName: 'xmlToSearchInto.xml',
        resultFilePath: './result.xml'
    },
    before:{
        search: 'xml:lang="fr-FR">',
        replace: 'xml:lang="es-ES">'
    }
}
/////////////////////////////////

const getJsonFromCsv = require('./get-json-from-csv');
const addSearchAndReplace = require('./add-search-and-replace');
const createXml = require('./create-xml');

getJsonFromCsv();
setTimeout(() => {
    let searchReplaceEls = addSearchAndReplace(global.jsonObj);
    createXml(searchReplaceEls);
}, 3000);