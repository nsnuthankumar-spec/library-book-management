import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <header className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          📚 <span>Library System</span>
        </h1>

        <nav className="flex flex-wrap gap-2">
          <NavLink to="/" className={linkStyle}>Dashboard</NavLink>
          <NavLink to="/books" className={linkStyle}>Books</NavLink>
          <NavLink to="/activity" className={linkStyle}>Activity</NavLink>
          <NavLink to="/add-book" className={linkStyle}>Add Book</NavLink>
        </nav>
      </div>
    </header>
  );
}
