import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Activity from "./pages/Activity";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/books" element={<Layout><Books /></Layout>} />
        <Route path="/add-book" element={<Layout><AddBook /></Layout>} />
        <Route path="/activity" element={<Layout><Activity /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
