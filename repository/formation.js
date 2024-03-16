const db = require("../models");
const { Op } = require('sequelize');

/**
 * 
 * @param {*} data 
 * @returns objet new formation
 */
const create = async (data, file) => {
    const { title, desc, prix, dateDebut, dateFin } = data;

    const response = await db.formations.create({
        title: title,
        desc: desc,
        prix: prix,
        dateDebut: dateDebut,
        dateFin: dateFin,
        url: file && `api/${file.path}`,
    });

    return response;
}

/**
 * 
 * @param {*} id 
 * @returns formation
 */
const findById = async (id) => {
    return await db.formations.findByPk(id, {
        include: [
            {
                model: db.candidats,
            },
        ]
    });
}

const getAll = async () => {
    return await db.formations.findAll({
        include: [
            {
                model: db.candidats,
            },
        ]
    })
}

/**
 * 
 * @returns list formations
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

    const { rows, count } = await db.formations.findAndCountAll({
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
    const { title, desc, prix, dateDebut, dateFin, status } = data;
    await db.formations.update({
        title: title,
        desc: desc,
        prix: prix,
        dateDebut: dateDebut,
        dateFin: dateFin,
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
    let isTrue = await db.formations.destroy({ where: { id: id } });
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