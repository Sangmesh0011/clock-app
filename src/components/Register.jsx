import React, { useState, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { Link,useParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const passRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const {slideval}=useParams();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const handleEye = () => {
    setVisible(!visible);
    if (visible) {
      passRef.current.setAttribute("type", "text");
    } else {
      passRef.current.setAttribute("type", "password");
    }
  };

  const loginGoogle = async() => {
    const prov = new GoogleAuthProvider();
    signInWithPopup(auth, prov).then(async (res) => {
      console.log(res)
      nav(`/success/${slideval || 1}`);
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
        nav(`/success/${slideval || 1}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full md:w-2/4 h-auto flex flex-col justify-center items-center py-4 md:p-8 border-2 gap-y-2">
      <div className="flex-col justify-start w-2/3">
        <h1 className="text-4xl">Create your new account</h1>
        <span className="text-gray-500 ml-1">
          Create an account to start looking for food you like
        </span>
      </div>

      <form
        onSubmit={handleRegister}
        className="flex-col justify-start items-center w-2/3 mt-6"
      >
        <div className="flex flex-col justify-start items-start w-full gap-y-1">
          <span className="text-lg">Email Address</span>
          <input
            type="email"
            value={email}
            className="w-full border-2 px-4 py-2"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col justify-start items-start w-full gap-y-1">
          <span className="text-lg">User Name</span>
          <input
            type="text"
            value={name}
            className="w-full border-2 px-4 py-2"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col justify-start items-start w-full gap-y-1">
          <span className="text-lg">Password</span>
          <div className="flex justify-center items-center border-2 w-full ">
            <input
              type="password"
              ref={passRef}
              value={password}
              className="w-5/6 h-full px-4 py-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="w-1/6 h-full flex justify-center items-center">
              <AiFillEye onClick={handleEye} className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="w-full mt-6 px-2 text-sm flex gap-x-4 text-center">
          <input type="checkbox" id="chkb" className="" required /> I agree with
          the Terms of Service and Privacy Policy
        </div>
        <div className="">
          <button
            className="w-full flex justify-center items-center mt-6 px-6 py-2 bg-orange-500 rounded-full"
            type="submit"
          >
            Sign Up
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
            Have an account? <Link to="/login/1">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
