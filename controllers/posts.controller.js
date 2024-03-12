const postService = require("../services/posts");

const create = async (req, res) => {
    try {
        let newPost = await postService.create(req.body, req.file);
        if (newPost) {
            res.status(201).json(newPost);
        } else {
            res.status(400).send("Erreur d'enregistrement")
        }
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postService.getById(id);
        res.status(200).json(post);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const posts = await postService.getAll(req.query);
        res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const postUpdated = await postService.update(req.body, id, req.file);
        res.status(200).json(postUpdated);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await postService.destroy(id);
        res.status(200).json(isDelete);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

module.exports = {
    create,
    getById,
    getAll,
    destroy,
    update,
}