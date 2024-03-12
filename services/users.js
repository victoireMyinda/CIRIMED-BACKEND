const bcrypt = require('bcrypt');
const usersReppository = require('../repository/users');
const validator = require("../validators/users");
const { generateToken } = require('../utils/util');
const fs = require('fs');

const create = async (user) => {

    validator.validatorUser(user);
    if (user.password.length < 4) {
        throw new Error("Mot de passe trop court, le minimum est de 4 caractères");
    }

    if (user.email) {
        const email = user.email.trim()
        const userExistByEmail = await usersReppository.findByEmail(email);
        if (userExistByEmail)
            throw new Error("L'uilisateur existe déjà avec l'email " + user.email);
    }

    if (user.numTel) {
        const userExistByNumtel = await usersReppository.findByNumTel(user.numTel);
        if (userExistByNumtel)
            throw new Error("Un autre uilisateur existe déjà avec ce numéro de téléphone " + user.numTel);
    }

    const passwordCrypted = await bcrypt.hash(user.password, 10);
    user.password = passwordCrypted;
    user.email = user.email.trim();
    const newuser = await usersReppository.create(user);
    return await newuser;
};

const login = async (data) => {
    const user = data;
    if (!user.val)
        throw new Error("La propriété d'un des identifiants doit être val");
    if (user.val.includes("@")) {
        user.email = data.val;
    } else {
        user.numTel = data.val;
    }
    validator.validatorLogin(user);
    if (!user.email) {
        const userExistByNumtel = await usersReppository.findByNumTel(user.numTel);
        if (!userExistByNumtel)
            throw new Error("L'utilisateur n'existe pas, veuillez vérfier votre numéro de téléphone");
        const isTrue = await bcrypt.compare(user.password, userExistByNumtel.password);
        if (!isTrue)
            throw new Error("Le mot de passe fourni n'est pas correct");
        const token = generateToken(userExistByNumtel.id);
        return token;
    } else {
        const userExist = await usersReppository.findByEmail(user.email);
        if (!userExist)
            throw new Error("L'utilisateur n'existe pas, veuillez vérfier votre adresse email");
        const isTrue = await bcrypt.compare(user.password, userExist.password);
        if (!isTrue)
            throw new Error("Le mot de passe fourni n'est pas correct");
        const token = generateToken(userExist.id);
        return token;
    }
};

const loginWidthGoogle = async (user) => {
    if (user.access_token) {
        const userExist = await usersReppository.findByEmail(user.email);
        if (!userExist) {

            const passwordCrypted = await bcrypt.hash("1234", 10);
            const email = user.email;

            user.password = passwordCrypted;
            user.pseudo = email && email.split('@')[0];
            user.nom = email && email.split('@')[0];
            user.url = user.picture;

            const data = await usersReppository.create(user);
            const token = generateToken(data.id);

            return token;
        } else {
            const token = generateToken(userExist.id);
            await usersReppository.update(user, userExist.id, userExist);
            return token;
        }
    } else {
        throw new Error("Vous n'êtes pas autorisé à vous connecter car votre token soit n'existe pas soit est invalide");
    }
};

const updatePassword = async (data, id) => {
    const userExist = await usersReppository.findById(id);
    if (!userExist)
        throw new Error(`Aucun utilisateur trouvé avec le ID ${id}`);

    const { password } = data;
    if (!password)
        throw new Error("Veuillez renseigner un mot de passe");

    const passwordCrypted = await bcrypt.hash(password, 10);
    const userID = await usersReppository.modiPassword(passwordCrypted, id);
    return await usersReppository.findByIdWithModels(userID);
};

const modifPhoto = async (file, id) => {
    const userExist = await usersReppository.findById(id);
    if (!userExist)
        throw new Error(`Aucun utilisateur trouvé avec le ID ${id}`);

    if (file) {
        const url = userExist.url;
        if (url) {
            const pathFile = url.split('api').join("/");
            const pathFileSplit = pathFile.split('\\').join("/");
            const fileRemoved = pathFileSplit && pathFileSplit.substring(2, pathFileSplit.length);

            fs.unlink(fileRemoved, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Fichier supprimé avec succès');
                }
            });
        }
    }
    const iduser = await usersReppository.modifPhoto(id, file);
    return await usersReppository.findByIdWithModels(iduser);
};


const getById = async (id) => {
    if (!id)
        throw new Error('ID inconnu');
    const user = await usersReppository.findById(id);
    if (!user)
        throw new Error("Aucun user trouvé avec le ID " + id)
    return user;
}

const getAll = async (query) => {
    const results = [];

    const produitsCountAndAll = await usersReppository.getCountAndAll(query);
    const produitsAll = await usersReppository.getAll();

    const { data, totalItems, status, totalPages } = produitsCountAndAll;

    data && data.length > 0 && data.map(produitCount => {
        return produitsAll && produitsAll.length > 0 &&
            produitsAll.map(produit => {
                if (produitCount.id === produit.id) {
                    results.push(produit);
                    return results;
                }
            })
    });

    const response = {
        Status: status,
        totalPages: totalPages,
        totalItems: totalItems,
        produits: results
    }

    return response;
}

const update = async (user, id) => {

    validator.validatorVerifEmail(user.email);

    if (user.email) {
        const userExistByEmail = await usersReppository.findByEmail(user.email);
        if (userExistByEmail)
            throw new Error("L'uilisateur existe déjà avec l'email " + user.email);
    }

    if (user.numTel) {
        const userExistByNumtel = await usersReppository.findByNumTel(user.numTel);
        if (userExistByNumtel)
            throw new Error("Autre uilisateur existe déjà avec ce numéro de téléphone " + user.numTel);
    }

    if (user.email) {
        const userExistById = await usersReppository.findById(id);
        if (!userExistById)
            throw new Error('Aucun utilisateur trouvé avec le ID ' + id);
        if (user.password) {
            const passwordCrypted = await bcrypt.hash(user.password, 10);
            user.password = passwordCrypted;
        }

        const iduser = await usersReppository.update(user, id, userExistById);
        return await usersReppository.findByIdWithModels(iduser);
    } else {
        const userExistById = await usersReppository.findById(id);
        if (!userExistById)
            throw new Error('Aucun utilisateur trouvé avec le ID ' + id);
        else {
            if (user.password) {
                const passwordCrypted = await bcrypt.hash(user.password, 10);
                user.password = passwordCrypted;
            }
            const iduser = await usersReppository.update(user, id, userExistById);
            return await usersReppository.findByIdWithModels(iduser);
        }
    }
}

const destroy = async (id) => {
    const userExistById = await usersReppository.findById(id);
    if (!userExistById)
        throw new Error('Aucun utilisateur trouvé avec le ID ' + id);
    if (userExistById && userExistById.url) {
        const url = userExistById.url;
        const pathFile = url.split('api').join("/");
        const pathFileSplit = pathFile.split('\\').join("/");
        const fileRemoved = pathFileSplit && pathFileSplit.substring(2, pathFileSplit.length);

        fs.unlink(fileRemoved, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Fichier supprimé avec succès');
            }
        });
    }
    await usersReppository.destroy(id);
    return parseInt(id);
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy,
    updatePassword,
    login,
    updatePassword,
    loginWidthGoogle,
    modifPhoto
}
