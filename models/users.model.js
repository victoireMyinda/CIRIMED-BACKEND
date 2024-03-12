module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        prenom: {
            type: DataTypes.STRING,
        },
        nom: {
            type: DataTypes.STRING,
        },
        sexe: {
            type: DataTypes.STRING,
        },
        dateNaissance: {
            type: DataTypes.STRING,
        },
        numTel: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        url: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.TEXT
        },
        lon: {
            type: DataTypes.INTEGER
        },
        lat: {
            type: DataTypes.INTEGER
        },
        isConnected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Users;
}