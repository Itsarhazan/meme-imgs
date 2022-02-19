'use strict'


var gCurrLang = 'en';

const gTrans = {

    itsar: {
        en: `ITSAR`,
        he: 'יצהר'
    },
    gallery: {
        en: `Gallery`,
        he: 'גלריה'
    },
    memes: {
        en: `Memes`,
        he: 'ממים'
    },
    about: {
        en: `About`,
        he: 'אודות'
    },
    search: {
        en: `SEARCH`,
        he: 'חיפוש'
    },
    cat: {
        en: `cat`,
        he: 'חתול'
    },
    funny: {
        en: `funny`,
        he: 'כיף'
    },
    priorities: {
        en: `priorities`,
        he: 'סדר עדיפויות'
    },
    ironic: {
        en: `ironic`,
        he: 'אירוני'
    },
    download: {
        en: `Download`,
        he: 'הורד'
    },
    upload: {
        en: `Upload`,
        he: 'העלה'
    },
    share: {
        en: `Share`,
        he: 'שתף'
    },
    footer: {
        en: `ENJOY :)`,
        he: ' :) תהנה'
    },

}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans.en;

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}