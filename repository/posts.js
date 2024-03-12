const db = require("../models");
const { Op } = require('sequelize');

/**
 * 
 * @param {*} data 
 * @returns objet new post
 */
const create = async (data, file) => {
    const { title, desc, userId } = data;

    const response = await db.posts.create({
        title: title,
        desc: desc,
        userId: userId,
        url: file && `api/${file.path}`,
    });

    return response;
}

/**
 * 
 * @param {*} id 
 * @returns post
 */
const findById = async (id) => {
    return await db.posts.findByPk(id, {
        include: [
            {
                model: db.users, as: "user", attributes: ["id", "prenom", "createdAt", "updatedAt", "url", "role",
                    "isActive", "isConnected", "email", "numTel", "bio", "dateNaissance", "sexe"],
            },
        ]
    });
}

const getAll = async () => {
    return await db.posts.findAll({
        include: [
            {
                model: db.users, as: "user", attributes: ["id", "prenom", "createdAt", "updatedAt", "url", "role",
                    "isActive", "isConnected", "email", "numTel", "bio", "dateNaissance", "sexe"],
            },
        ]
    })
}

/**
 * 
 * @returns list posts
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

    const { rows, count } = await db.posts.findAndCountAll({
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

/**
 * 
 * @param {*} data 
 * @param {*} id 
 * @returns id
 */
const update = async (data, id, file) => {
    const { title, desc } = data;
    await db.posts.update({
        title: title,
        desc: desc,
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
    let isTrue = await db.posts.destroy({ where: { id: id } });
    return isTrue
}

module.exports = {
    findById,
    getAll,
    getCountAndAll,
    create,
    update,
    destroy
}