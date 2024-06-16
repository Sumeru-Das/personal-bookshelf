import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const RandomBooks = ({ bookshelfKeys, addToBookshelf }) => {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRandomBooks = async () => {
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
    };

    fetchRandomBooks();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-[3rem] px-[9rem]">
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
