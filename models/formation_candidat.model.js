module.exports = (sequelize, DataTypes) => {
    const FormationCandidat = sequelize.define("formation_candidat", {
        formationId: DataTypes.INTEGER,
        candidatId: DataTypes.INTEGER,
    })
    return FormationCandidat;
}