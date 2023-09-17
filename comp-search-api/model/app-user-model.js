const USER_CONSTANTS = require("../constants/user-constants");

module.exports = (sequelize, DataTypes, Model) =>{
    class AppUser extends Model {}
    AppUser.init({
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.literal('uuid_generate_v4()'),
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designation: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: USER_CONSTANTS.AVAILABILITY.ACTIVE,
        },
        company_id: {
            type: DataTypes.UUID,
            onDelete: 'CASCADE',
            references: {
                model: 'companies', 
                key: 'company_id',
             }
        }
    },
    {
        sequelize,
        modelName: 'app_user'
    })

    return AppUser;
}