const formationRepository = require('../repository/formation');
const validator = require("../validators/formation");
const fs = require('fs');

const create = async (formation, file) => {
    validator.validatorFormation(formation, file);
    const response = await formationRepository.create(formation, file);

    const newDormation = await formationRepository.findById(response.id);
    return newDormation;
};

const getById = async (id) => {
    if (!id)
        throw new Error('ID inconnu');
    const formation = await formationRepository.findById(id);
    if (!formation)
        throw new Error("Aucun formation trouvé avec le ID " + id)
    return formation;
}

const getAll = async (query) => {
    const formations = await formationRepository.getAll();
    return formations;
}

const update = async (data, id, file) => {
    const formationExistById = await formationRepository.findById(id);
    if (!formationExistById)
        throw new Error('Aucun formation trouvé avec le ID ' + id);
    else {
        if (data.email) {
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(data.email))
                throw new Error('Adresse email non valide');
            else
                if (file) {
                    const url = formationExistById.url;
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

            const formationID = await formationRepository.update(data, id, file);
            return await formationRepository.findById(formationID);

        }
        if (file) {
            const url = formationExistById.url;
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

        const formationID = await formationRepository.update(data, id, file);
        return await formationRepository.findById(formationID);
    }
}


const destroy = async (id) => {
    const formationExistById = await formationRepository.findById(id);

    if (!formationExistById)
        throw new Error('Aucun formation trouvé avec le ID ' + id);

    const url = formationExistById.url;
    if (url) {
        const pathFile = url.split('api').join("/");
        const pathFileSplit = pathFile.split('\\').join("/");
        const file = pathFileSplit && pathFileSplit.substring(2, pathFileSplit.length);

        fs.unlink(file, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Fichier supprimé avec succès');
            }
        });
    }
    await formationRepository.destroy(id);
    return parseInt(id);
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy,
}
