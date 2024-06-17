import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import message from "../assets/icons/Message.svg";

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
    <div className="">
      <header className="bg-[#6B08F0] text-white px-5 py-5 flex flex-col justify-center items-center h-[246px] gap-4 leading-6">
        <h1 className="text-[10vw] sm:text-7xl tracking-tighter">
          Book Search App
        </h1>
        <p className="text-[3vw] sm:text-2xl sm:font-normal font-semibold">
          including the young adult dystopian novel Departures and the
        </p>
        <div className="py-5 flex">
          <Link
            to="/"
            className="bg-zinc-100 h-[38px] sm:h-[58px] pr-5 py-5 text-black rounded-[44px] font-semibold flex items-center overflow-hidden"
          >
            <div className="sm:h-[58px] sm:w-[80px]  bg-[#40C9FF] hidden lg:block">
              <img src={message} alt="" className="pl-4 pt-1" />
            </div>
            <h1 className="pl-5">Go to My Booksearch</h1>
          </Link>
        </div>
      </header>
      <Toaster position="top-right" reverseOrder={false} />
      {bookshelf.length === 0 ? (
        <p className="text-center text-gray-500 pt-20x">
          No book present in the shelf
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 px-10">
          {bookshelf.map((book, index) => (
            <div
              key={index}
              className="p-4 w-[540px] h-[250px] text-zinc-100 flex flex-col justify-center items-center text-center bg-gradient-to-r from-[#AC2CD3] to-[#659CF8] rounded-[12px]"
            >
              <h3 className="font-semibold text-[2.5rem] leading-tight tracking-tighter">
                {truncateTitle(book.title)}
              </h3>
              <p className="text-mb pb-5">
                Author: {book.author_name?.join(", ") || "Unknown"}
              </p>
              <button
                onClick={() => removeFromBookshelf(book)}
                className=" bg-[#40C9FF] text-black font-bold text-xl rounded-[12px] h-[50px]"
              >
                <h1 className="px-10">Remove from Shelf</h1>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
