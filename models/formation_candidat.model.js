module.exports = (sequelize, DataTypes) => {
    const FormationCandidat = sequelize.define("formation_candidat", {
        formationId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
    })
    return FormationCandidat;
}