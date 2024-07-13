import { MdCloudDone } from "react-icons/md"; 
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Success = () => {
  const nav = useNavigate();
  const {slideval}=useParams();
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      const ref = doc(db, "Users", user.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        alert("Please login");
        nav("/login");
      }
    });
  };

  useEffect(() => {
    fetchUser();
    return ()=>{
    }
  });

  const logout=async()=>{
    try{
      await auth.signOut();
      nav("/login")

    }catch(e){
      console.log(e);
    }
  }
  return (
    <div className="w-3/5 flex flex-col justify-center items-center">
    <MdCloudDone className="w-2/6 h-2/6"/>
    <h2 className="font-bold text-3xl mb-11 text-green-800">Log in was Successful</h2>
    {user?<span className="text-gray-400">Welcome <span className="font-bold text-xl text-green-500 ml-3">{user.name}</span></span>:null}
    <div
      onClick={() => {
        nav(`/tracking/${slideval}`);
      }}
      className="w-2/3 flex justify-center items-center mt-6 px-6 py-2 text-white bg-orange-500 rounded-full"
    >
      
      <button type="submit">Go to tracking page</button>
    </div>
    <div onClick={logout} className="w-2/3 text-white flex justify-center items-center mt-6 px-6 py-2 bg-orange-500 rounded-full">
      <button type="submit">Logout</button>
    </div>
  </div> 
  );
};

export default Success;
