import * as Yup from 'yup';
import Vacancy from '../models/Vacancy';
import Admin from '../models/Admin';

module.exports = {
  async index(req, res) {
    const result = await Vacancy.findAll();
    if (result) {
      return res.json(result);
    }
    return res.json({ error: 'Unable to list vacancys' });
  },
  async findById(req, res) {
    const result = await Vacancy.findOne({ where: { id: req.params.id } });
    if (result) {
      return res.json(result);
    }
    return res.json({
      error: `Vacancy with id '${req.params.id}' not found`,
    });
  },
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(2),
    });
    const adminExists = await Admin.findOne({
      where: { id: req.params.id },
    });
    if (!adminExists) {
      return res
        .status(400)
        .json({ error: `Admin '${req.params.id}' not exists` });
    }
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const vacancyExists = await Vacancy.findOne({
      where: { name: req.body.name },
    });
    if (vacancyExists) {
      return res
        .status(400)
        .json({ error: `Vacancy '${req.body.name}' already exists` });
    }
    const result = await Vacancy.create(req.body);
    if (result) {
      return res.json({
        message: 'Vacancy was successfully created ',
        result,
      });
    }
    return res.json({ error: 'Error creating Vacancy' });
  },
  async deleteById(req, res) {
    const adminExists = await Admin.findOne({
      where: { id: req.body.id },
    });
    if (!adminExists) {
      return res
        .status(400)
        .json({ error: `Admin '${req.body.id}' not exists` });
    }
    const result = await Vacancy.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result) {
      return res.json({
        message: `Vacancy '${req.params.id}' successfully removed`,
        result,
      });
    }
    return res.json({ error: `Error removing vacancy '${req.params.id}'` });
  },
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(2),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const vacancyExists = await Vacancy.findOne({
      where: { name: req.body.name },
    });
    if (vacancyExists) {
      return res
        .status(400)
        .json({ error: `Vacancy ${req.body.name} already exists` });
    }
    const adminExists = await Admin.findOne({
      where: { id: req.body.id },
    });
    if (!adminExists) {
      return res
        .status(400)
        .json({ error: `Admin '${req.body.id}' not exists` });
    }
    const [numberOfAffectedRows, affectedRows] = await Vacancy.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );
    if (numberOfAffectedRows == 1) {
      return res.json({
        message: 'Vacancy name changed successfully',
        affectedRows,
      });
    }
    return res.json({
      error: `
        Error changing vacancy name '${req.params.id}'`,
    });
  },
};
