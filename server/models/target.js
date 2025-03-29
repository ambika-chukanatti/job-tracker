import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const Target = sequelize.define('Target', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  goal: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deadline: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salary_min: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salary_max: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
        model: "Users",
        key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  timestamps: false,
  tableName: "Targets"
});

export default Target;