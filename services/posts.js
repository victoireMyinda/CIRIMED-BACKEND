const postRepository = require('../repository/posts');
const validator = require("../validators/posts");
const fs = require('fs');

const create = async (post, file) => {
    validator.validatorPost(post);
    const response = await postRepository.create(post, file);
    const postById = await postRepository.findById(response.id);
    return postById;
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
    const posts = await postRepository.getAll();
    return posts;
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
