import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-gray-200">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-xl font-bold mb-10 flex items-center gap-2">
          📚 Library System
        </h1>

        <nav className="space-y-3">
          <NavLink to="/" className="nav-link">🏠 Dashboard</NavLink>
          <NavLink to="/books" className="nav-link">📘 Books</NavLink>
          <NavLink to="/add-book" className="nav-link">➕ Add Book</NavLink>
          <NavLink to="/activity" className="nav-link">📜 Activity</NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10 bg-gradient-to-br from-slate-950 to-slate-900">
        {children}
      </main>

    </div>
  );
}
