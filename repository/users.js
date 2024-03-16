const db = require("../models");

/**
 * 
 * @param {*} email 
 * @returns userFind
 */
const findByEmail = async (email) => {
    let user = await db.users.findOne({ where: { email: email } },
        {
            attributes: ["id", "nom", "createdAt", "updatedAt", "url", "role",
                "isActive", "isConnected", "email", "numTel", "prenom", "bio", "dateNaissance", "sexe", "nom"]
        }
    );
    return user;
}

const findByNumTel = async (numTel) => {
    let user = await db.users.findOne({ where: { numTel: numTel } },
        {
            attributes: ["id", "prenom", "createdAt", "updatedAt", "url", "role", "nom",
                "isActive", "isConnected", "email", "numTel", "bio", "dateNaissance", "sexe"]
        }
    );
    return user;
}

/**
 * 
 * @param {*} id 
 * @returns userFind
 */
const findById = async (id) => {
    return await db.users.findByPk(id, {
        attributes: ["id", "prenom", "createdAt", "updatedAt", "url", "role", "nom",
            "isActive", "isConnected", "email", "numTel", "bio", "dateNaissance", "sexe"],
        include: [
            { model: db.posts, as: "posts" },
        ]
    });
}

const findByIdWithModels = async (id) => {
    return await db.users.findByPk(id, {
        attributes: ["id", "prenom", "createdAt", "updatedAt", "url", "role", "nom",
            "isActive", "isConnected", "email", "numTel", "nom", "bio", "dateNaissance", "sexe"],
    });
}

/**
 * 
 * @param {*} data 
 * @returns newUser
 */
const create = async (data) => {
    return await db.users.create(data);
}

const getAll = async () => {
    return await db.users.findAll({
        include: [
            { model: db.posts, as: "posts" },
        ]
    })
}

/**
 * 
 * @returns list users
 */
const getCountAndAll = async (requetes) => {
    const { page, limit, keyword } = requetes;

    const query = {};

    const size = limit ? parseInt(limit) : 5;

    const queries = {
        offset: page ? (page - 1) * size : 0,
        limit: size,
    };

    if (keyword) {
        query.nom = { [Op.like]: `%${keyword}%` };
    }

    const { rows, count } = await db.users.findAndCountAll({
        attributes: ["id", "prenom", "createdAt", "updatedAt", "url", "role", "nom",
            "isActive", "isConnected", "email", "numTel", "nom", "bio", "dateNaissance", "sexe"],
        where: query,
        ...queries,
    });

    const response = {
        status: "Success",
        totalPages: Math.ceil(count / size),
        totalItems: count,
        data: rows
    }

    return response;
}

const update = async (data, id, userExistById) => {
    await db.users.update({
        prenom: data.prenom,
        email: data.email,
        nom: data.nom,
        role: data.role,
        numTel: data.numTel,
        isConnected: data.isConnected,
        isActive: data.isActive,
        bio: data.bio,
        dateNaissance: data.dateNaissance,
        sexe: data.sexe,
        password: data.password ? data.password : userExistById.password,
        roleUserCrmId: data.roleUserCrmId,
        url: data.picture ? data.picture : userExistById.url
    }, { where: { id: id } });
    return id;
}

const modiPassword = async (password, id) => {
    await db.users.update({
        password: password,
    }, {
        where: { id: id }
    });

    return id;
}

const modifPhoto = async (id, file) => {
    await db.users.update({
        url: file && `api/${file.path}`,
    }, {
        where: { id: id }
    });

    return id;
}

/**
 * 
 * @param {*} id 
 * @returns number 1 if is deleted
 */
const destroy = async (id) => {
    let isTrue = await db.users.destroy({ where: { id: id } });
    return isTrue
}

module.exports = {
    findByEmail,
    findById,
    create,
    getAll,
    getCountAndAll,
    update,
    destroy,
    findByNumTel,
    modifPhoto,
    modiPassword,
    findByIdWithModels
}