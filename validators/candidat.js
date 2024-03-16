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

const validatorCandidat = (candidat, file) => {
    validator(candidat.nom, null, 'Veuillez définir un nom svp!', file);
    validator(candidat.prenom, null, 'Veuillez définir un prénom svp!', file);
    validator(candidat.numTel, null, 'Veuillez définir un numéro de téléphone svp!', file);
    validator(candidat.sexe, null, "Veuillez définir un sexe svp!", file);
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (candidat.email) {
        validator(user.email, emailPattern, 'Adresse email invalide', file);
    }
};

module.exports = {
    validatorCandidat
}