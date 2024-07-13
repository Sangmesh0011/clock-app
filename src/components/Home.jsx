import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      id="home"
      className="w-full h-full text-white flex justify-center items-center"
    >
      <Slider
        {...settings}
        className="w-[80%] h-auto bg-orange-400 flex justify-center items-center rounded-full px-16 py-8"
      >
        <div className="flex justify-center items-center">
          <div className="h-full flex-col text-center justify-center items-center">
            <h2 className="text-[30px] font-bold">
              We serve incomparable delicacies
            </h2>
            <span className="">
              All the top restaurants with their best menu waiting for you, they
              can't wait for your order !!
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full flex-col text-center justify-center items-center">
            <h2 className="text-4xl font-bold">
              We serve incomparable delicacies
            </h2>
            <span>
              All the top restaurants with their best menu waiting for you, they
              can't wait for your order !!
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full flex-col text-center justify-center items-center">
            <h2 className="text-4xl font-bold">
              We serve incomparable delicacies
            </h2>
            <span className="flex flex-col md:flex-row justify-center items-center gap-x-3">
              <button
                className="w-full md:w-2/5 flex justify-center items-center mt-6 px-6 py-2 border-2 rounded-full"
                onClick={() => nav("/register/1")}
              >
                Register
              </button>
              <button
                className="w-full md:w-2/5 flex justify-center items-center mt-6 px-6 py-2 border-2 rounded-full"
                onClick={() => nav("/login/1")}
              >
                Login
              </button>
            </span>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Home;
