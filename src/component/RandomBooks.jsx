import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import "../Styles/BookList.css";
import toast from "react-hot-toast";

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
      const books = response.data.docs;
      setRandomBooks(books);
      localStorage.setItem("randomBooks", JSON.stringify(books));
    } catch (err) {
      toast.error("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("randomBooks"));
    if (storedBooks && storedBooks.length > 0) {
      setRandomBooks(storedBooks);
    } else {
      // Initial fetch when component mounts
      fetchRandomBooks();
    }
  }, [fetchRandomBooks]);

  return (
    <div>
      <div className="flex justify-center items-center pt-[1rem] text-center">
        {loading && <Loader />}
      </div>
      {error && <ErrorMessage error={error} />}
      <div className="book-list">
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

// grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 sm:gap-x-[9rem] gap-y-[5rem] pt-[3rem] px-[4.5rem] sm:px-[.2rem]
