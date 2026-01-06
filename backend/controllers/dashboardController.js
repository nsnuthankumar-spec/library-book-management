const Book = require("../models/Book");

exports.getStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalCopiesAgg = await Book.aggregate([
      { $group: { _id: null, sum: { $sum: "$availableCopies" } } }
    ]);

    const categories = await Book.distinct("category");

    res.status(200).json({
      totalBooks,
      totalCopies: totalCopiesAgg[0]?.sum || 0,
      totalCategories: categories.length
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
