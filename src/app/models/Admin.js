import { Model, Sequelize } from 'sequelize';

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        sequelize,
      }
    );
  }
}
export default Admin;
