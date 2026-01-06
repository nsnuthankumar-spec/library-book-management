import { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3000/books/add", form);
    alert("📚 Book added successfully!");
    setForm({
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      availableCopies: ""
    });
  };

  return (
    <div className="page-add">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="card">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white">
              ➕ Add New Book
            </h2>
            <p className="text-white/70 mt-2">
              Enter book details to add it to the library
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-6">

            <Input
              label="Book Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Eg: Clean Code"
            />

            <Input
              label="Author"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Eg: Robert C. Martin"
            />

            <Input
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Eg: Programming"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Published Year"
                name="publishedYear"
                type="number"
                value={form.publishedYear}
                onChange={handleChange}
                placeholder="Eg: 2022"
              />

              <Input
                label="Available Copies"
                name="availableCopies"
                type="number"
                value={form.availableCopies}
                onChange={handleChange}
                placeholder="Eg: 10"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
            >
              ➕ Add Book to Library
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INPUT COMPONENT
========================= */
function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
