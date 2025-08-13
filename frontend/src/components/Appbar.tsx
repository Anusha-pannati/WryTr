import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUser } from "../hooks";
import { useState } from "react";

export const Appbar = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("Authorization");
        navigate("/");
    };

    return (
        <div className="bg-white border-b border-green-100 flex justify-between items-center px-10 py-4 shadow-sm">
            <Link 
                to="/blogs" 
                className="flex items-center cursor-pointer text-2xl font-bold text-green-700 hover:text-green-800 transition-colors"
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
                
                <div 
                    className="relative"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <Avatar 
                        size="big"
                        name={user?.name.toUpperCase() || "Anonymous"}
                    />
                    
                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100 py-2 z-50">
                              <div className="px-4 py-2 border-b border-gray-100">
                                  <p className="text-sm font-medium text-gray-900">
                                      {user?.name || "Anonymous"}
                                  </p>
                              </div>
                              <button
                                  onClick={handleLogout}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center"
                              >
                                  Sign out
                              </button>
                          </div>

                    )}
                </div>
            </div>
        </div>
    );
};
