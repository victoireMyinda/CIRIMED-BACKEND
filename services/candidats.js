const candidatRepository = require('../repository/candidat');
const validator = require("../validators/candidat");
const fs = require('fs');

const create = async (candidat, file) => {
    validator.validatorCandidat(candidat, file);
    const response = await candidatRepository.create(candidat, file);

    const newDormation = await candidatRepository.findById(response.id);
    return newDormation;
};

const getById = async (id) => {
    if (!id)
        throw new Error('ID inconnu');
    const candidat = await candidatRepository.findById(id);
    if (!candidat)
        throw new Error("Aucun candidat trouvé avec le ID " + id)
    return candidat;
}

const getAll = async () => {
    const candidats = await candidatRepository.getAll();
    return candidats;
}

const update = async (data, id, file) => {
    const candidatExistById = await candidatRepository.findById(id);
    if (!candidatExistById)
        throw new Error('Aucun candidat trouvé avec le ID ' + id);
    else {
        if (data.email) {
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(data.email))
                throw new Error('Adresse email non valide');
            else
                if (file) {
                    const url = candidatExistById.url;
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

            const candidatID = await candidatRepository.update(data, id, file);
            return await candidatRepository.findById(candidatID);

        }
        if (file) {
            const url = candidatExistById.url;
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

        const candidatID = await candidatRepository.update(data, id, file);
        return await candidatRepository.findById(candidatID);
    }
}


const destroy = async (id) => {
    const candidatExistById = await candidatRepository.findById(id);

    if (!candidatExistById)
        throw new Error('Aucun candidat trouvé avec le ID ' + id);

    const url = candidatExistById.url;
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
    await candidatRepository.destroy(id);
    return parseInt(id);
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy,
}
