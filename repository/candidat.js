const db = require("../models");
const { Op } = require('sequelize');

/**
 * 
 * @param {*} data 
 * @returns objet new candidat
 */
const create = async (data, file) => {
    const { nom, prenom, sexe, numTel, email, formationId } = data;

    const response = await db.candidats.create({
        nom: nom,
        prenom: prenom,
        sexe: sexe,
        numTel: numTel,
        email: email,
        url: file && `api/${file.path}`,
    });

    await db.formation_candidat.create({
        formationId: formationId,
        candidatId: response.id
    });

    return response;
}

/**
 * 
 * @param {*} id 
 * @returns candidat
 */
const findById = async (id) => {
    return await db.candidats.findByPk(id, {
        include: [
            {
                model: db.formations,
            },
        ]
    });
}

const getAll = async () => {
    return await db.candidats.findAll({
        include: [
            {
                model: db.formations,
            },
        ]
    })
}

/**
 * 
 * @returns list candidats
 */
const getCountAndAll = async (requetes) => {

    const page = requetes && requetes.page;
    const limit = requetes && requetes.limit;
    const keyword = requetes && requetes.keyword

    const query = {};

    const size = limit ? parseInt(limit) : 5;

    const queries = {
        offset: page ? (page - 1) * size : 0,
        limit: size,
    };

    if (keyword) {
        query.title = { [Op.like]: `%${keyword}%` };
    }

    const { rows, count } = await db.candidats.findAndCountAll({
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
    const { nom, prenom, sexe, numTel, email, status } = data;
    await db.candidats.update({
        nom: nom,
        prenom: prenom,
        sexe: sexe,
        numTel: numTel,
        email: email,
        url: file && `api/${file.path}`,
        status: status
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
    let isTrue = await db.candidats.destroy({ where: { id: id } });
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