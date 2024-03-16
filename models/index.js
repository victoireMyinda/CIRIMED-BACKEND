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
db.formations = require("./formation.model")(sequelize, DataTypes);
db.candidats = require("./candidat.model")(sequelize, DataTypes);
db.formation_candidat = require("./formation_candidat.model")(sequelize, DataTypes);

// MANY - ONE USER CRM / POSTS
db.users.hasMany(db.posts, {
    as: 'posts',
});

db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: 'user'
});

// RELATION N-N FORMATIONS-CANDIDATS
db.formations.belongsToMany(db.candidats, { through: 'formation_candidat' });
db.candidats.belongsToMany(db.formations, { through: 'formation_candidat' });

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("DB SYNCHRONISEE AVEC SUCCES",)
    })
    .catch(err => {
        console.log("ERREURS DE SYNCHRONISATION DE BD : ", err);
    });

module.exports = db;