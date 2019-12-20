import * as Yup from 'yup';
import Admin from '../models/Admin';

export default {
  async index(req, res) {
    const result = await Admin.findAll();
    if (result) {
      return res.json(result);
    }
    return res.json({ error: 'Unable to list administrators' });
  },
  async findByEmail(req, res) {
    const result = await Admin.findOne({ where: { email: req.params.email } });
    if (result) {
      return res.json(result);
    }
    return res.json({
      error: `Admin with email '${req.params.email}' not found`,
    });
  },
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const emailExists = await Admin.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Email '${req.body.email}' already exists` });
    }
    const result = await Admin.create(req.body);
    if (result) {
      return res.json({
        message: 'Administrator was successfully created',
        result,
      });
    }
    return res.json({ error: 'Error creating administrator' });
  },
  async deleteById(req, res) {
    const result = await Admin.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result) {
      return res.json({
        message: `Admin '${req.params.id}' successfully removed`,
        result,
      });
    }
    return res.json({ error: `Error removing admin '${req.params.id}'` });
  },
  async updateEmail(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const emailExists = await Admin.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Email '${req.body.email}' already exists` });
    }
    const adminExists = await Admin.findOne({
      where: { id: req.params.id },
    });
    if (!adminExists) {
      return res
        .status(400)
        .json({ error: `Admin '${req.params.id}' not exists` });
    }
    const [numberOfAffectedRows, affectedRows] = await Admin.update(
      { email: req.body.email },
      { where: { id: req.params.id } }
    );
    if (numberOfAffectedRows == 1) {
      return res.json({ message: 'Email changed successfully', affectedRows });
    }
    return res.json({
      error: `
        Error changing admin email '${req.params.id}'`,
    });
  },
};
