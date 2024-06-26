import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
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
      toast.error("Error fetching data. Please try again.");
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
    <div className="px-10 pb-10">
      <Toaster position="bottom-right" reverseOrder={false} />
      <SearchInput query={query} setQuery={handleQueryChange} />

      <div className="flex justify-center items-center pt-10 text-center">
        {loading && <Loader />}
      </div>
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
      <div className="flex justify-end items-center my-20 h-20">
        <p className="text-white bg-[#6B08F0] py-4 px-8 rounded-xl border-t-2 border-l-2 cursor-pointer hover:border-none ">
          Show more
        </p>
      </div>
    </div>
  );
};

export default BookSearch;
