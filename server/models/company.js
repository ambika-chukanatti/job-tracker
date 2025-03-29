import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const Company = sequelize.define('Company', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  company_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  industry: {
    type: Sequelize.STRING,
    allowNull: false
  },
  company_size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  company_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year_founded: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: "Users",
        key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  timestamps: false,
  tableName: "Companies"
});

export default Company;