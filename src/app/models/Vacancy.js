import { Model, Sequelize } from 'sequelize';

class Vacancy extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        sequelize,
      }
    );
  }
}
export default Vacancy;
