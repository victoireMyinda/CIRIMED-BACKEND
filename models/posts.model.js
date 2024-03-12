module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.STRING,
            unique: true
        },
    });

    return Post;
}