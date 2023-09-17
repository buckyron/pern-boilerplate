module.exports = (sequelize, DataTypes, Model) => {

    class Company extends Model {}

    Company.init({
        company_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        company_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false
        },
        latitude: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        longitude: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        map: {
          type: DataTypes.STRING,
          allowNull:true,
        }
        
      }, {
        sequelize, 
        modelName: 'companies' 
      });
      
      return Company;
}