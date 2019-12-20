import { Model, Sequelize } from 'sequelize';

class Candidate extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        sequelize,
      }
    );
  }
}
export default Candidate;
