const candidatService = require("../services/candidats");

const create = async (req, res) => {
    try {
        let newcandidat = await candidatService.create(req.body);
        if (newcandidat) {
            res.status(201).json(newcandidat);
        } else {
            res.status(400).send("Erreur d'enregistrement")
        }
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
};

const destroy = async (req, res) => {
    try {
        const isDelete = await candidatService.destroy(req.body);
        res.status(200).json(isDelete);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

module.exports = {
    create,
    destroy,
}