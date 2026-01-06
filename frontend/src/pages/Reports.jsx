import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then(res => setBooks(res.data));
  }, []);

  const lowStock = books.filter(b => b.availableCopies <= 2);

  const categoryCount = {};
  books.forEach(b => {
    categoryCount[b.category] = (categoryCount[b.category] || 0) + 1;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Reports & Insights</h2>

      <p><b>Total Books:</b> {books.length}</p>
      <p><b>Low Stock Books:</b> {lowStock.length}</p>

      <h3 className="mt-4 font-semibold">📂 Books per Category</h3>
      <ul className="list-disc ml-6">
        {Object.keys(categoryCount).map(cat => (
          <li key={cat}>{cat}: {categoryCount[cat]}</li>
        ))}
      </ul>
    </div>
  );
}
