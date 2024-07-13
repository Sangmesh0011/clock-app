import { FcGoogle } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const {slideval}=useParams();
  const passRef = useRef(null);
  const eyeRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const nav = useNavigate();

  const loginGoogle = () => {
    const prov = new GoogleAuthProvider();
    signInWithPopup(auth, prov).then(async (res) => {});
    nav(`/success/${slideval || 1}`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav(`/success/${slideval || 1}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEye = () => {
    setVisible(!visible);
    if (visible) {
      passRef.current.setAttribute("type", "text");
    } else {
      passRef.current.setAttribute("type", "password");
    }
  };
  return (
    <div className="md:w-2/4 h-auto flex flex-col justify-center items-center py-4 md:p-8 border-2">
      <div className="flex-col justify-start w-2/3">
        <h1 className="text-4xl">Login to your account</h1>
        <span className="text-gray-500 ml-1">
          Sign in to your account to view the app
        </span>
      </div>

      <form
        onSubmit={handleLogin}
        className="flex-col justify-start items-center w-2/3 mt-6"
      >
        <div className="flex flex-col justify-start items-start w-full  mb-3">
          <span className="text-lg">Email Address</span>
          <input
            type="email"
            value={email}
            className="w-full border-2 px-4 py-2"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col justify-start items-start w-full gap-y-1">
          <span className="text-lg">Password</span>
          <div className="flex justify-center items-center w-full border-2">
            <input
              type="password"
              ref={passRef}
              value={password}
              className="w-full h-full px-4 py-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-1/6 h-full flex justify-center items-center">
              <AiFillEye onClick={handleEye} ref={eyeRef} className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="w-2/3 mt-6 px-2">Forgot password?</div>
        <div className="">
          <button
            className="w-full flex justify-center items-center mt-6 px-6 py-2 bg-orange-500 rounded-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      <br />

      <br />
      <div className="flex flex-col justify-center items-center gap-y-2">
        <span>or sign in with</span>

        <div className="flex flex-col justify-center items-center">
          <FcGoogle
            onClick={loginGoogle}
            className="w-12 h-12 cursor-pointer"
          />
          <span>
            Don't have an account? <Link to="/register/1">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
