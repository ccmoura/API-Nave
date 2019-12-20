import { Model, Sequelize } from 'sequelize';

class Candidacy extends Model {
  static init(sequelize) {
    super.init(
      {
        id_candidate: Sequelize.INTEGER,
        id_vacancy: Sequelize.INTEGER,
        comment: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        sequelize,
      }
    );
  }
}
export default Candidacy;
