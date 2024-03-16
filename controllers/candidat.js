const candidatService = require("../services/candidats");

const create = async (req, res) => {
    try {
        let newcandidat = await candidatService.create(req.body, req.file);
        if (newcandidat) {
            res.status(201).json(newcandidat);
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
        const candidat = await candidatService.getById(id);
        res.status(200).json(candidat);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const candidats = await candidatService.getAll(req.query);
        res.status(200).json(candidats);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const candidatUpdated = await candidatService.update(req.body, id, req.file);
        res.status(200).json(candidatUpdated);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await candidatService.destroy(id);
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