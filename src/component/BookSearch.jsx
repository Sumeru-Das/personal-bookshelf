import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import BookList from "./BookList";
import ErrorMessage from "./ErrorMessage";
import RandomBooks from "./RandomBooks";

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
      <SearchInput query={query} setQuery={setQuery} />
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {query.length === 0 ? (
        <RandomBooks
          bookshelfKeys={bookshelfKeys}
          addToBookshelf={addToBookshelf}
        />
      ) : (
        <BookList
          books={books}
          bookshelfKeys={bookshelfKeys}
          addToBookshelf={addToBookshelf}
        />
      )}
      <div className="flex justify-end mb-4">
        <Link to="/bookshelf" className="text-blue-500 underline">
          Go to My Bookshelf
        </Link>
      </div>
    </div>
  );
};

export default BookSearch;
