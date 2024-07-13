import { RxAvatar } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import AnalogClock from "analog-clock-react";

const Tracking = () => {
  const {slideval} = useParams();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [sec, setSec] = useState("");
  const [min, setMin] = useState("");
  const [hr, setHr] = useState("");
  const [speed, setSpeed] = useState(slideval);
  // const [slidv, setSlidv] = useState(slideval);

  useEffect(() => {
    setSpeed(slideval);
  }, [slideval]);

  useEffect(() => {
    const curr = new Date();
    setSec(curr.getSeconds());
    setMin(curr.getMinutes());
    setHr(curr.getHours());
  }, []);

  useEffect(() => {
    const speedInterval = 1000 / speed;
    const intr = setInterval(() => {
      const revSec = sec === 0 ? 59 : sec - 1;
      const revMin = revSec === 59 && min !== 0 ? min - 1 : min;
      const revHr = revMin === 59 && hr !== 0 ? hr - 1 : hr;
      setSec(revSec);
      setMin(revMin);
      setHr(revHr);
    }, speedInterval);

    setTimeout(() => {
      clearInterval(intr);
    }, 7200000);

    return () => {
      clearInterval(intr);
    };
  }, [sec, min, hr, speed]);

  let options = {
    useCustomTime: true,
    width: "300px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#faa501",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
    seconds: sec,
    minutes: min,
    hours: hr,
  };

  const handleSlider = (e) => {
    setSpeed(e.target.value);
  };

  const fetchQuote = async () => {
    await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness", {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.REACT_APP_QUOTE_API,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      });
  };

  useEffect(() => {
    fetchQuote();

    setInterval(() => {
      fetchQuote();
    }, 5000);
    return () => {};
  }, []);

  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      // const ref = doc(db, "Users", user.uid);
      // const docSnap = await getDoc(ref);
      if (user) {
        // docSnap.exists()
        console.log(user)
        setUser(user);
      } else {
        // alert("Please login");
        nav("/login/1");
      }
    });
  };

  useEffect(() => {
    fetchUser();
    return () => {};
  },[]);

  const logout = async () => {
    try {
      await auth.signOut();
      nav("/login/1");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUrl=()=>{
    const link=`https://clockapp123.netlify.app/tracking/${speed}`;
    navigator.clipboard.writeText(link).then(()=>{
      alert("Link copied to clipboard !")
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <div className="min-h-screen w-full text-black flex flex-col justify-center items-center gap-y-4">
      <div className="border-b-2 shadow-2xl h-20 nav w-screen flex justify-between items-center px-20">
        <h2 className="text-4xl font-serif font-bold uppercase">Clock</h2>
        <div className="flex justify-center items-center gap-x-6">
          <span className="hidden md:flex justify-center items-center gap-x-2">
            <RxAvatar className="w-8 h-8" /> {user ? user.displayName : ""}
          </span>
        <span
            className="px-4 text-center h-auto hover:border-black hover:bg-transparent border-orange-500 text-white hover:text-black bg-orange-500 py-1 rounded-full border-2 font-bold cursor-pointer"
            onClick={handleUrl}
          >
            Share link
          </span>
          <span
            className="px-4 text-center h-auto hover:border-black hover:bg-transparent border-orange-500 text-white hover:text-black bg-orange-500 py-1 rounded-full border-2 font-bold cursor-pointer"
            onClick={logout}
          >
            Logout
          </span>
        </div>
      </div>

      <div className="z-10 quote w-2/3 h-[40%] mt-4 md:h-[20%] text-center flex flex-col">
        <span className="md:text-2xl font-semibold">{quote}</span>
        <span className="text-gray-800">- {author}</span>
      </div>

      <div className="h-[60%] md:h-[90%] w-full flex justify-center items-center">
        <div className="main w-full h-auto flex flex-col md:flex-row justify-center items-center gap-y-7">
          <div className="left flex justify-center items-center w-full h-auto md:w-1/3 md:h-full">
            <span className="text-5xl text-zinc-400 font-bold">
              {hr < 10 ? "0" + hr : hr}:
            </span>
            <span className="text-5xl text-zinc-400 font-bold">
              {min < 10 ? "0" + min : min}:
            </span>
            <span className="text-5xl text-zinc-400 font-bold">
              {sec < 10 ? "0" + sec : sec}
            </span>
          </div>
          <div className="middle flex justify-center items-center w-full md:w-1/3 md:h-full">
            <AnalogClock {...options} />
          </div>
          <div className="right flex justify-center items-center w-1/3 h-full">
            <input
              className="slider px-2 py-1 bg-slate-300 accent-orange-400 appearance-none md:w-1/3 h-auto -rotate-90"
              onChange={handleSlider}
              type="range"
              min="1"
              max="10"
              value={speed}
            />
            <h2 className="flex flex-col justify-center items-center">
              <span className=" text-gray-300 uppercase font-bold text-6xl">
                Speed
              </span>{" "}
              <span className="text-7xl text-orange-400">{speed}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
