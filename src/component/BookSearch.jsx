import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookshelfKeys, setBookshelfKeys] = useState([]);

  useEffect(() => {
    const currentBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelfKeys(currentBookshelf.map((book) => book.key));
  }, []);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`
      );
      setBooks(response.data.docs);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchBooks = useCallback(debounce(fetchBooks, 300), []);

  useEffect(() => {
    if (query.length > 0) {
      debouncedFetchBooks(query);
    } else {
      setBooks([]);
    }
  }, [query, debouncedFetchBooks]);

  const addToBookshelf = (book) => {
    const currentBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    const bookExists = currentBookshelf.some((b) => b.key === book.key);

    if (!bookExists) {
      const updatedBookshelf = [...currentBookshelf, book];
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
      setBookshelfKeys([...bookshelfKeys, book.key]);
    } else {
      alert("This book is already in your bookshelf.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <Loader />} {/* Display loader when loading is true */}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.key}
            className="p-4 border border-gray-200 rounded shadow"
          >
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p className="text-sm">
              Author: {book.author_name?.join(", ") || "Unknown"}
            </p>
            <p className="text-sm">
              First Published: {book.first_publish_year || "N/A"}
            </p>
            <button
              onClick={() => addToBookshelf(book)}
              className={`mt-2 p-2 rounded ${
                bookshelfKeys.includes(book.key)
                  ? "bg-green-500"
                  : "bg-blue-500 text-white"
              }`}
              disabled={bookshelfKeys.includes(book.key)}
            >
              {bookshelfKeys.includes(book.key)
                ? "Added to Bookshelf"
                : "Add to Bookshelf"}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/bookshelf" className="text-blue-500 underline">
          Go to My Bookshelf
        </Link>
      </div>
    </div>
  );
};

export default BookSearch;
