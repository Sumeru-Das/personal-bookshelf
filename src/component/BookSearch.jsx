import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
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
      // Construct the search query to look for exact phrase matches
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          searchQuery
        )}&limit=10&page=1`
      );
      setBooks(response.data.docs);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchBooks = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim().length > 0) {
        fetchBooks(searchQuery);
      } else {
        setBooks([]);
      }
    }, 300),
    []
  );

  const handleQueryChange = (query) => {
    setQuery(query);
    debouncedFetchBooks(query);
  };

  const addToBookshelf = (book) => {
    const currentBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    const bookExists = currentBookshelf.some((b) => b.key === book.key);

    if (!bookExists) {
      const updatedBookshelf = [...currentBookshelf, book];
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
      setBookshelfKeys([...bookshelfKeys, book.key]);
      toast.success("Book added to your bookshelf!");
    } else {
      toast.error("This book is already in your bookshelf.");
    }
  };

  return (
    <div className="container sm:ml-[7rem] py-5">
      <Toaster position="top-right" reverseOrder={false} />
      <SearchInput query={query} setQuery={handleQueryChange} />
      <div className="absolute left-[55rem] pt-20">{loading && <Loader />}</div>
      {error && <ErrorMessage error={error} />}
      {query.trim().length === 0 ? (
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
    </div>
  );
};

export default BookSearch;
