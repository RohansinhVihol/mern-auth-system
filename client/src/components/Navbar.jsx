import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContextData();

  const logout = async () =>{
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + "/api/auth/logout")
      if(data.success){
        setIsLoggedin(false)
        setUserData(false)
        navigate("/")
      }
    } catch (error) {
      const msg = error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg)
    }
  }

 

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50">
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {userData ? (
        <div className="relative group inline-block">
        
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer select-none">
            {userData.name?.[0]?.toUpperCase()}
          </div>

          <div className="absolute right-0 top-8 hidden group-hover:block bg-white text-black rounded-md shadow-lg min-w-36 ">
            <ul className="text-sm">
              { !userData.isAccountVerified && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Verify Email
              </li>}
              <li
              onClick={logout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")} 
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition"
        >
          Login
          <img src={assets.arrow_icon} alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
