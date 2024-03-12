const jwt = require("jsonwebtoken");

/**
 * Generation token 
 * 
 * @param {*} id userId
 * @return jwt_token
 */

const generateToken = (id) => {
    return jwt.sign({
        id: id
    },
        "12345Cemired",
        { expiresIn: "5h" }
    );
};

module.exports = {
    generateToken,
}