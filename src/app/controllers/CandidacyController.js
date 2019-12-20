import * as Yup from 'yup';
import Candidacy from '../models/Candidacy';
import Admin from '../models/Admin';
import Vacancy from '../models/Vacancy';
import Candidate from '../models/Candidate';

module.exports = {
  async index(req, res) {
    const result = await Candidacy.findAll();
    if (result) {
      return res.json(result);
    }
    return res.json({ error: 'Unable to list candidacys' });
  },
  async findById(req, res) {
    const result = await Candidacy.findOne({ where: { id: req.params.id } });
    if (result) {
      return res.json(result);
    }
    return res.json({
      error: `Candidacy with id '${req.params.id}' not found`,
    });
  },
  async store(req, res) {
    const schema = Yup.object().shape({
      idVacancy: Yup.number()
        .integer()
        .required(),
      idCandidate: Yup.number()
        .integer()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const vacancyExists = await Vacancy.findOne({
      where: { id: req.body.idVacancy },
    });
    if (!vacancyExists) {
      return res
        .status(400)
        .json({ error: `Vacancy '${req.body.idVacancy}' does not exist` });
    }
    const candidateExists = await Candidate.findOne({
      where: { id: req.body.idCandidate },
    });
    if (!candidateExists) {
      return res
        .status(400)
        .json({ error: `Candidate '${req.body.idCandidate}' does not exist` });
    }
    const result = await Candidacy.create(req.body);
    if (result) {
      return res.json({
        message: 'Candidacy was successfully created',
        result,
      });
    }
    return res.json({ error: 'Error creating candidacy' });
  },
  async deleteById(req, res) {
    const result = await Candidacy.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result) {
      return res.json({
        message: `Candidacy '${req.params.id}' successfully removed`,
        result,
      });
    }
    return res.json({ error: `Error removing candidacy '${req.params.id}'` });
  },
  async updateComment(req, res) {
    const schema = Yup.object().shape({
      comment: Yup.string().max(500),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const candidacyExists = await Candidacy.findOne({
      where: { id: req.params.id },
    });
    if (!candidacyExists) {
      return res.status(400).json({
        error: `Candidacy '${req.params.id}' does not exist`,
      });
    }
    const adminExists = await Admin.findOne({
      where: { id: req.body.idAdmin },
    });
    if (!adminExists) {
      return res
        .status(400)
        .json({ error: `Admin '${req.body.idAdmin}' not exists` });
    }
    const [numberOfAffectedRows, affectedRows] = await Candidacy.update(
      { comment: req.body.comment },
      { where: { id: req.params.id } }
    );
    if (numberOfAffectedRows == 1) {
      return res.json({
        message: 'Comment changed successfully',
        affectedRows,
      });
    }
    return res.json({
      error: `
        Error changing comment on candidacy '${req.params.id}'`,
    });
  },
  async filterByVacancy(req, res) {
    const result = await Candidacy.findAll({ where: { id: req.params.id } });
    if (result) {
      return res.json(result);
    }
    return res.json({ error: 'Unable to list candidacys' });
  },
};
