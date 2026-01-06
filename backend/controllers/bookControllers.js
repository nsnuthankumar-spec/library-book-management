const Book = require("../models/Book");

// CREATE
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// UPDATE COPIES
exports.updateCopies = async (req, res) => {
  const { change } = req.body;
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies + change < 0)
    return res.status(400).json({ message: "Negative stock not allowed" });

  book.availableCopies += change;
  await book.save();
  res.json(book);
};

// DELETE
exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.availableCopies !== 0)
    return res.status(400).json({ message: "Copies still available" });

  await book.deleteOne();
  res.json({ message: "Book deleted" });
};
