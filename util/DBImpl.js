const Sequelize = require("sequelize");
const config = require("../config.json");

/*
    Author: InterXellar (Filip M.)
    Date: 22.09.2018
    Function: Impl Sequelize for DB usage
 */
// Begin Sequelize init
module.exports = {
    SequelizeInit: function() {
        const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
            host: config.db.host,
            // More dialects can be implemented later if needed
            dialect: 'mysql',
            operatorsAliases: false,

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        sequelize.authenticate().then(() => {
            console.log('Die Verbindung wurde erfolgreich hergestellt');
        }).catch(ConnectionFailed => {
            console.error('Die Verbindung konnte nicht erfolgreich hergestellt werden!\n');
            console.error('Der Prozess wird nun beendet: ', process.title);
            console.error('\n', ConnectionFailed);
            process.exit(1);
        });
    }
};