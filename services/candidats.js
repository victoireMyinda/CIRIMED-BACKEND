const candidatRepository = require('../repository/candidat');

const create = async (ids) => {
    console.log('______________________________________________________________________')
    console.log(ids)
    if (!ids && ids.formationId)
        throw new Error("Veuillez fournir le formationId")
    if (!ids && ids.userId)
        throw new Error("Veuillez fournir le candidatId")
    const response = await candidatRepository.create(ids);

    return response;
};

const destroy = async (ids) => {
    if (!ids && ids.formationId)
        throw new Error("Veuillez fournir le formationId")
    if (ids && ids.userId)
        throw new Error("Veuillez fournir le candidatId")
    await candidatRepository.destroy(ids);
    return parseInt(id);
}

module.exports = {
    create,
    destroy,
}
