module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        // Define table columns
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // Additional columns can be defined here
    });

    return Posts;
};
