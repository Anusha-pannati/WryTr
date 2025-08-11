import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUser } from "../hooks";

export const Appbar = () => {
    const {user} = useUser();
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <Link 
        to="/blogs" 
        className="flex items-center cursor-pointer text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
      >
        WryTr
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/blogWriter">
          <button 
            type="button" 
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-colors"
          >
            New
          </button>
        </Link>
        
        <Avatar 
          size="big"
          name= {user?.name.toUpperCase() || "Anonymous"}
        />
      </div>
    </div>
  );
};