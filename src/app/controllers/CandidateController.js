import * as Yup from 'yup';
import Candidate from '../models/Candidate';

module.exports = {
  async index(req, res) {
    const result = await Candidate.findAll();
    if (result) {
      return res.json(result);
    }
    return res.json({ error: 'Unable to list candidates' });
  },
  async findByCpf(req, res) {
    const result = await Candidate.findOne({ where: { cpf: req.params.cpf } });
    if (result) {
      return res.json(result);
    }
    return res.json({
      error: `Candidate with cpf '${req.params.cpf}' not found`,
    });
  },
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cpf: Yup.string()
        .min(11)
        .max(11)
        .required(),
      phone: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const emailExists = await Candidate.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Email ${req.body.email} already exists` });
    }
    const result = await Candidate.create(req.body);
    if (result) {
      return res.json({
        message: 'Candidate was successfully created',
        result,
      });
    }
    return res.json({ error: 'Error creating Candidate' });
  },
  async deleteByCpf(req, res) {
    const result = await Candidate.destroy({
      where: {
        cpf: req.params.cpf,
      },
    });
    if (result) {
      return res.json({
        message: `Admin '${req.params.cpf}' successfully removed`,
        result,
      });
    }
    return res.json({ error: `Error removing admin '${req.params.cpf}'` });
  },
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const emailExists = await Candidate.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Email '${req.body.email}' already exists` });
    }
    const [numberOfAffectedRows, affectedRows] = await Candidate.update(
      { email: req.body.email, phone: req.body.phone },
      { where: { id: req.params.id } }
    );
    if (numberOfAffectedRows == 1) {
      return res.json({
        message: 'Email and phone changed successfully',
        affectedRows,
      });
    }
    return res.json({
      error: `
        Error updating candidate '${req.params.id}'`,
    });
  },
};
