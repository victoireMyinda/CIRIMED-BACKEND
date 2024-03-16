const formationService = require("../services/formation");

const create = async (req, res) => {
    try {
        let newformation = await formationService.create(req.body, req.file);
        if (newformation) {
            res.status(201).json(newformation);
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
        const formation = await formationService.getById(id);
        res.status(200).json(formation);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const formations = await formationService.getAll(req.query);
        res.status(200).json(formations);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const formationUpdated = await formationService.update(req.body, id, req.file);
        res.status(200).json(formationUpdated);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await formationService.destroy(id);
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