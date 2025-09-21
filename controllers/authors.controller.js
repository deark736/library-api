// controllers/authors.controller.js
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { getDb } = require('../data/db');

// 5 fields
const authorSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  birthdate: Joi.string().min(4).required(), // or Joi.date().iso()
  country: Joi.string().min(2).required()
});

exports.getAll = async (req, res) => {
  try {
    const authors = await getDb().collection('authors').find({}).toArray();
    res.status(200).json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch authors' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const author = await getDb().collection('authors').findOne({ _id: new ObjectId(id) });
    if (!author) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch author' });
  }
};

exports.create = async (req, res) => {
  try {
    const { error, value } = authorSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details });

    const result = await getDb().collection('authors').insertOne(value);
    res.status(201).json({ id: result.insertedId.toString() });7
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create author' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const { error, value } = authorSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details });

    const result = await getDb().collection('authors').updateOne(
      { _id: new ObjectId(id) },
      { $set: value }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json({ message: 'Author updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update author' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const result = await getDb().collection('authors').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json({ message: 'Author deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete author' });
  }
};
