module.exports = (sequelize, DataTypes) => {
    const Candidat = sequelize.define("candidat", {
        nom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        numTel: {
            type: DataTypes.DOUBLE,
        },
        email: {
            type: DataTypes.STRING,
        },
        sexe: {
            type: DataTypes.STRING,
        },
    });

    return Candidat;
}