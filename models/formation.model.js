module.exports = (sequelize, DataTypes) => {
    const Formation = sequelize.define("formation", {
        title: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        prix: {
            type: DataTypes.DOUBLE,
        },
        dateDebut: {
            type: DataTypes.STRING,
        },
        dateFin: {
            type: DataTypes.STRING,
        },
    });

    return Formation;
}