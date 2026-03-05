import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, setIsLoggedin, getUserData } = useContextData();

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password }
        );

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
          toast.success(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password }
        );

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
          toast.success(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onsubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full"
              type="email"
              placeholder="Email id"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state !== "Sign Up" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="mb-4 text-indigo-500 cursor-pointer"
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 font-medium text-white mt-2"
          >
            {loading ? "Please wait..." : state}
          </button>
        </form>

        <p className="text-gray-50 text-center mt-4">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
            className="text-blue-400 cursor-pointer underline"
          >
            {state === "Sign Up" ? "Login here" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;