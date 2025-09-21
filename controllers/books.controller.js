// controllers/books.controller.js
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { getDb } = require('../data/db');

// Validation schema (8+ fields)
const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  authorId: Joi.string().length(24).hex().required(), // store as ObjectId
  isbn: Joi.string().min(5).required(),
  genre: Joi.string().min(2).required(),
  publishedYear: Joi.number().integer().min(1000).max(9999).required(),
  pages: Joi.number().integer().min(1).required(),
  inStock: Joi.boolean().required(),
  price: Joi.number().min(0).required()
});

exports.getAll = async (req, res) => {
  try {
    const books = await getDb().collection('books').find({}).toArray();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const book = await getDb().collection('books').findOne({ _id: new ObjectId(id) });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};

exports.create = async (req, res) => {
  try {
    const { error, value } = bookSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details });

    const doc = {
      ...value,
      authorId: new ObjectId(value.authorId)
    };

    const result = await getDb().collection('books').insertOne(doc);
    res.status(201).json({ id: result.insertedId.toString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create book' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const { error, value } = bookSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details });

    const updateDoc = {
      $set: {
        ...value,
        authorId: new ObjectId(value.authorId)
      }
    };

    const result = await getDb().collection('books').updateOne({ _id: new ObjectId(id) }, updateDoc);
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update book' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const result = await getDb().collection('books').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete book' });
  }
};
