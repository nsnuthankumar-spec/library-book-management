const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// CREATE – Add a new book
router.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
// READ – Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// READ – Get books by category
router.get("/category/:category", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// READ – Get books published after 2015
router.get("/after/2015", async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: { $gt: 2015 } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// UPDATE – Increase or decrease available copies
router.put("/update-copies/:id", async (req, res) => {
  try {
    const { change } = req.body; // +1 or -1 or any number

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies + change < 0) {
      return res
        .status(400)
        .json({ message: "Invalid update: Negative stock not allowed" });
    }

    book.availableCopies += change;
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE – Remove book if copies = 0
router.delete("/delete/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies !== 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete. Copies still available" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});