const dbConfig = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Connexion à la base de données a été effectuée avec succès");
    })
    .catch(err => {
        console.log(err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model")(sequelize, DataTypes);
db.posts = require("./posts.model")(sequelize, DataTypes);

// MANY - ONE USER CRM / POSTS
db.users.hasMany(db.posts, {
    as: 'posts',
});

db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: 'user'
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("DB SYNCHRONISEE AVEC SUCCES",)
    })
    .catch(err => {
        console.log("ERREURS DE SYNCHRONISATION DE BD : ", err);
    });

module.exports = db;