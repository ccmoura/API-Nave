import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Admin from '../app/models/Admin';
import Vacancy from '../app/models/Vacancy';
import Candidate from '../app/models/Candidate';
import Candidacy from '../app/models/Candidacy';

const models = [Admin, Candidacy, Candidate, Vacancy];
const connection = new Sequelize(databaseConfig);
models.map(model => model.init(connection));
