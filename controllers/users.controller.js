const usersService = require("../services/users");

const create = async (req, res) => {
    try {
        let newUser = await usersService.create(req.body);
        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(400).send("Erreur d'enregistrement")
        }
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
};

const login = async (req, res) => {
    try {
        let user = await usersService.login(req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).send("Echec d'authentification")
        }
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
};

const loginWidthGoogle = async (req, res) => {
    try {
        let token = await usersService.loginWidthGoogle(req.body);
        if (token) {
            res.status(200).json(token);
        } else {
            res.status(401).send("Echec d'authentification")
        }
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await usersService.getById(id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const users = await usersService.getAll(req.query);
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ messageError: error.message })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userUpdated = await usersService.update(req.body, id);
        res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

const modifPhotoProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const userUpdated = await usersService.modifPhoto(req.file, id);
        res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const userUpdated = await usersService.updatePassword(req.body, id);
        res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json({ messageError: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await usersService.destroy(id);
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
    login,
    loginWidthGoogle,
    updatePassword,
    modifPhotoProfile
}