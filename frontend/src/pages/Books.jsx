import axios from "axios";
import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH BOOKS
  ========================== */
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* =========================
     FILTERS
  ========================== */
  const categories = ["All", ...new Set(books.map(b => b.category))];

  const filteredBooks = books.filter(b => {
    const matchText =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || b.category === category;

    return matchText && matchCategory;
  });

  /* =========================
     ACTIVITY LOG
  ========================== */
  const logActivity = action => {
    const logs = JSON.parse(localStorage.getItem("activityLogs")) || [];
    logs.push({ action, time: new Date().toLocaleString() });
    localStorage.setItem("activityLogs", JSON.stringify(logs));
  };

  /* =========================
     ISSUE / RETURN
  ========================== */
  const updateCopies = async (book, change) => {
    try {
      await axios.put(
        `http://localhost:3000/books/update-copies/${book._id}`,
        { change }
      );

      logActivity(
        `${change === -1 ? "Issued" : "Returned"} book: "${book.title}"`
      );

      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  /* =========================
     DELETE BOOK
  ========================== */
  const deleteBook = async book => {
    if (!window.confirm("Delete only if copies are 0. Continue?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/books/delete/${book._id}`
      );

      logActivity(`Deleted book: "${book.title}"`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* =========================
     STATUS HELPERS
  ========================== */
  const getStatus = copies => {
    if (copies === 0) return "Out of Stock";
    if (copies <= 2) return "Low Stock";
    return "Available";
  };

  const getStatusColor = copies => {
    if (copies === 0) return "text-red-400";
    if (copies <= 2) return "text-orange-400";
    return "text-green-400";
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="page-books">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="card mb-8">
          <h1 className="text-4xl font-bold text-white">📚 Library Books</h1>
          <p className="text-white/60 mt-2">
            Showing <b>{filteredBooks.length}</b> of <b>{books.length}</b> books
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by title or author"
              className="flex-1 bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <select
              className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white focus:outline-none md:w-1/4"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} className="text-black">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="card overflow-hidden">
          {loading ? (
            <p className="text-center py-12 text-white/70">
              Loading books...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead className="bg-white/10 text-white/80">
                  <tr>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Author</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-center">Year</th>
                    <th className="p-4 text-center">Copies</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-white/60">
                        No books found
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map(b => (
                      <tr
                        key={b._id}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="p-4">{b.title}</td>
                        <td className="p-4">{b.author}</td>
                        <td className="p-4">{b.category}</td>
                        <td className="p-4 text-center">{b.publishedYear}</td>
                        <td className="p-4 text-center">{b.availableCopies}</td>
                        <td className={`p-4 text-center font-semibold ${getStatusColor(b.availableCopies)}`}>
                          {getStatus(b.availableCopies)}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="btn-green disabled:opacity-40"
                              onClick={() => updateCopies(b, -1)}
                              disabled={b.availableCopies === 0}
                            >
                              Issue
                            </button>

                            <button
                              className="btn-blue"
                              onClick={() => updateCopies(b, 1)}
                            >
                              Return
                            </button>

                            <button
                              className="btn-red"
                              onClick={() => deleteBook(b)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
