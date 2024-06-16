import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const RandomBooks = ({ bookshelfKeys, addToBookshelf }) => {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounced function to fetch random books
  const fetchRandomBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=the&limit=10&page=${Math.floor(
          Math.random() * 1000
        )}`
      );
      setRandomBooks(response.data.docs);
    } catch (err) {
      setError("Error fetching random books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch when component mounts
    fetchRandomBooks();
  }, [fetchRandomBooks]);

  return (
    <div>
      <div className="absolute left-[55rem] pt-20">{loading && <Loader />}</div>
      {error && <ErrorMessage error={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-x-[9rem] gap-y-[5rem] pt-[3rem] px-[5rem] sm:px-[.2rem]">
        {randomBooks.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            bookshelfKeys={bookshelfKeys}
            addToBookshelf={addToBookshelf}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomBooks;
