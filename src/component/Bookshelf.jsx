import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import message from "../assets/icons/Message.svg";
import book from "../assets/icons/book.svg";

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(savedBooks);
  }, []);

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(
      (book) => book.key !== bookToRemove.key
    );
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    toast.success("Book removed from your bookshelf!");
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  return (
    <div className="min-h-screen">
      <header className="bg-[#6B08F0] text-white px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 leading-6">
        <div className="flex flex-col sm:justify-start items-center">
          <div className="flex justify-center items-center">
            <img src={book} alt="Book Icon" className="h-10" />
            <h1 className="text-[7vw] sm:text-4xl tracking-tighter pl-2">
              Book Search App
            </h1>
          </div>
          <p className="text-[4vw] sm:text-xl pt-2 sm:pt-0 font-semibold sm:font-normal">
            Because You Can't Read Netflix.
          </p>
        </div>
        <div className="py-5 flex">
          <Link
            to="/"
            className="bg-zinc-100 h-[38px] sm:h-[58px] pr-5 py-5 text-black rounded-[44px] font-semibold flex items-center overflow-hidden"
          >
            <div className="sm:h-[58px] sm:w-[80px] bg-[#40C9FF] hidden lg:block">
              <img src={message} alt="Message Icon" className="pl-4 pt-1" />
            </div>
            <h1 className="pl-5">
              <span className="hidden lg:block">Go to My</span>Booksearch
            </h1>
          </Link>
        </div>
      </header>
      <Toaster position="bottom-right" reverseOrder={false} />
      {bookshelf.length === 0 ? (
        <p className="text-center text-gray-500 pt-20">
          No book present in the shelf
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 px-5 sm:px-20">
          {bookshelf.map((book, index) => (
            <div
              key={index}
              className="background shadow-lg rounded-[12px] p-6 text-zinc-800 flex flex-col justify-center items-center text-center"
            >
              <h3 className="font-semibold text-zinc-900 text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tighter mb-4">
                {truncateTitle(book.title)}
              </h3>
              <p className="text-md sm:text-lg pb-5 font-semibold text-zinc-900 ">
                Author: {book.author_name?.join(", ") || "Unknown"}
              </p>
              <button
                onClick={() => removeFromBookshelf(book)}
                className="bg-[#40C9FF] text-black font-bold text-md sm:text-lg lg:text-xl rounded-[12px] h-[60px] px-5 lg:px-10"
              >
                Remove from Shelf
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
