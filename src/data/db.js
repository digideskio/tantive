import Sequelize from 'sequelize';

export default new Sequelize('postgres://localhost:5432/postgres', {
  define: {
    timestamps: true
  }
});
