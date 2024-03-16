const fs = require('fs');

const validator = (val, pattern, msg, file) => {
    if (!val) {
        const url = file && file.path;
        if (url) {
            fs.unlink(url, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Fichier supprimé avec succès');
                }
            });
        }
        throw new Error(msg);
    }
    if (pattern)
        if (!pattern.test(val)) {
            throw new Error(msg)
        }
}

const validatorFormation = (post, file) => {
    validator(post.title, null, 'Veuillez définir un titre svp!', file);
    validator(post.desc, null, 'Veuillez définir une description svp!', file);
    validator(post.prix, null, 'Veuillez définir un prix svp!', file);
    validator(post.dateDebut, null, "Veuillez définir une date d'ouverture svp!", file);
    validator(post.dateFin, null, 'Veuillez définir une date de fermeture  svp!', file);
};

module.exports = {
    validatorFormation
}