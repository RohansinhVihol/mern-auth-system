import React, { useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContextData } from "../context/AppContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const[loading, setLoading] = useState(false)

  const {
    backendUrl,
  } = useContextData();

  axios.defaults.withCredentials = true;

  const inputRef = useRef([]);

  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
      }
      data.success && setIsEmailSent(true);
    } catch (error) {
      const msg =
        error.response?.data.message || error.message || "Something went wrong";
      toast.error(msg);

      if (error.response?.data?.statusCode == 429) {
        setIsEmailSent(true);

      }
    }
    finally{
      setLoading(false)
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
      }
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data.message || error.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor:pointer"
        />

        {loading && <div className="flex text-center text-shadow-neutral-700 justify-center text-2xl absolute bottom-4">Sending Otp TO Your Email...</div>}
        {/* email id */}
        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              Reset Password
            </h1>
            <p className="text-center mb-6 text-indigo-300">
              Enter your registered email address
            </p>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" className="w-3 h-3" />
              <input
                type="email"
                placeholder="Email id"
                className="bg-transparent outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="w-full py-3 rounded-full bg-linear-to-br from-indigo-200 to-indigo-500 ">
              Submit
            </button>
          </form>
        )}
        
        {/* otp receive */}

        {!isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitOtp}
            className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              Reset Passoword OTP
            </h1>
            <p className="text-center mb-6 text-indigo-300">
              Enter the 6-digit code sent to your email id.
            </p>
            <div
              onPaste={handlePaste}
              className="flex justify-between gap-2 mb-8"
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    ref={(e) => (inputRef.current[index] = e)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    key={index}
                    required
                    className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <button className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-200 to-indigo-500 ">
              Submit
            </button>
          </form>
        )}

        {/* Enter new password */}
        {isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitNewPassword}
            className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              New Passoword
            </h1>
            <p className="text-center mb-6 text-indigo-300">
              Enter the new passowrd
            </p>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" className="w-3 h-3" />
              <input
                type="password"
                placeholder="Enter New Password"
                className="bg-transparent outline-none text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full py-3 rounded-full bg-linear-to-br from-indigo-200 to-indigo-500 ">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
