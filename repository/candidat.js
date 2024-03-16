const db = require("../models");
const { Op } = require('sequelize');

/**
 * 
 * @param {*} data 
 * @returns objet new candidat
 */
const create = async (data) => {
    const { formationId, userId } = data;

    const formationCandidatExist = await db.formation_candidat.findOne({
        where: {
            formationId: formationId,
            userId: userId,
        }
    });

    if (formationCandidatExist)
        throw new Error('Vous êtes déjà inscrit comme candidat dans cette formation');

    await db.formation_candidat.create({
        formationId: formationId,
        userId: userId
    });

    return data;
}


/**
 * 
 * @param {*} id 
 * @returns number 1 if is deleted
 */
const destroy = async (ids) => {
    const { formationId, userId } = ids;
    await db.formation_candidat.destroy({
        where: {
            formationId: formationId,
            userId: userId,
        }
    })

    return id
}

module.exports = {
    create,
    destroy
}