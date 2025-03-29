import Sequelize from 'sequelize';

const sequelize = new Sequelize('job_tracker_app', process.env.DATABASE_USERNAME, process.env.DATABASE_SECRET, {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;