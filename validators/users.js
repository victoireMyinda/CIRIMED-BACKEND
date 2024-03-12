const validator = (val, pattern, msg) => {
    if (!val)
        throw new Error(msg);
    if (pattern)
        if (!pattern.test(val && val.trim())) {
            throw new Error(msg)
        }
}

const validatorUser = (user) => {

    validator(user.prenom, null, 'Prénom non défini');
    validator(user.nom, null, 'Nom non défini');

    if (!user.email) {
        validator(user.email, null, "Adresse email non valide")
    }
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    validator(user.email, emailPattern, 'Adresse email invalide');

    validator(user.password, null, 'Mot de passe non défini');
};

const validatorLogin = (user) => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (user.email) {
        validator(user.email, emailPattern, 'Adresse email invalide');
    }
    validator(user.password, null, 'Mot de passe non défini');
};

const validatorVerifEmail = (email) => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    validator(email, emailPattern, 'Adresse email invalide');
};

module.exports = {
    validatorUser,
    validatorVerifEmail,
    validatorLogin
}