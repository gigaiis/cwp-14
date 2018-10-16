module.exports = (Sequelize, sequelize) => {
    return sequelize.define('films', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rating: {
            type: Sequelize.FLOAT,
            validate: {
                isFloat: true,
                min: 0
            }
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1970
            }
        },
        budget: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0
            }
        },
        gross: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        poster: {
            type: Sequelize.STRING,
            allowNull: false
        },
        position: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        }
    }, {
        scopes: {
            new: {
                where: {
                    year: {
                        [Sequelize.Op.gte]: 2007        // >= 2007
                    }
                }
            }
        }
    });
};