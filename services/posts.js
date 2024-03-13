const postRepository = require('../repository/posts');
const validator = require("../validators/posts");
const fs = require('fs');

const create = async (post, file, query) => {
    validator.validatorPost(post);
    await postRepository.create(post, file);

    const results = [];

    const produitsCountAndAll = await postRepository.getCountAndAll(query);
    const produitsAll = await postRepository.getAll();

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
        data: results
    }

    return response;
};

const getById = async (id) => {
    if (!id)
        throw new Error('ID inconnu');
    const post = await postRepository.findById(id);
    if (!post)
        throw new Error("Aucun post trouvé avec le ID " + id)
    return post;
}

const getAll = async (query) => {

    const results = [];

    const produitsCountAndAll = await postRepository.getCountAndAll(query);
    const produitsAll = await postRepository.getAll();

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
        data: results
    }

    return response;
}

const update = async (data, id, file) => {
    const postExistById = await postRepository.findById(id);
    if (!postExistById)
        throw new Error('Aucun post trouvé avec le ID ' + id);
    else {
        if (file) {
            const url = postExistById.url;
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
        const postID = await postRepository.update(data, id, file);
        return await postRepository.findById(postID);
    }
}


const destroy = async (id) => {
    const postExistById = await postRepository.findById(id);

    if (!postExistById)
        throw new Error('Aucun post trouvé avec le ID ' + id);

    const url = postExistById.url;
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
    await postRepository.destroy(id);
    return parseInt(id);
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy,
}
