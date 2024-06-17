import React, { useState } from "react";
import "../Styles/BookCard.css";
import bookmark from "../assets/icons/bookmark.svg";
import bookmarkFill from "../assets/icons/bookmarkFill.svg";

const BookCard = ({ book, bookshelfKeys, addToBookshelf }) => {
  const [isBookmarked, setIsBookmarked] = useState(
    bookshelfKeys.includes(book.key)
  );

  const handleBookmarkClick = () => {
    if (!isBookmarked) {
      addToBookshelf(book);
    }
    setIsBookmarked(!isBookmarked);
  };

  const truncateTitle = (title, wordLimit) => {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return title;
  };

  const truncatedTitle = truncateTitle(book.title, 5);

  const authorNames = book.author_name
    ? book.author_name.slice(0, 2).join(", ") +
      (book.author_name.length > 2 ? "..." : "")
    : "Unknown";

  return (
    <div className="card">
      <div onClick={handleBookmarkClick}>
        <img
          src={isBookmarked ? bookmarkFill : bookmark}
          alt="Bookmark"
          className="absolute right-2 top-2 cursor-pointer"
        />
      </div>
      <div className="heading absolute bottom-0 w-4/5 px-5 pb-[2rem]">
        <h3 className="font-semibol text-[2rem] pb-2 leading-[2rem] capitalize">{truncatedTitle}</h3>
        <p className="text-sm">By: {authorNames}</p>
        <p className="text-sm">
          First Published: {book.first_publish_year || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
