import { Link } from "react-router-dom";

import message from "../assets/icons/Message.svg";
import book from "../assets/icons/book.svg";

const Header = () => {
  return (
    <header className="bg-[#6B08F0] text-white px-4 sm:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 leading-6">
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
          to="/bookshelf"
          className="bg-zinc-100 h-[38px] sm:h-[58px] pr-5 py-5 text-black rounded-[44px] font-semibold flex items-center overflow-hidden"
        >
          <div className="sm:h-[58px] sm:w-[80px]  bg-[#40C9FF] hidden lg:block">
            <img src={message} alt="" className="pl-4 pt-1" />
          </div>
          <h1 className="pl-5">
            <span className="hidden lg:block">Go to My</span>Bookshelf
          </h1>
        </Link>
      </div>
    </header>
  );
};
export default Header;
