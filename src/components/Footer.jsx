import React from "react";
import { BsFacebook, BsGithub, BsTwitter, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-[#d3d4d4]">
      <div className="bg-n-3 px-10 py-10 ">
        {/* Company Logo & Description */}
        <div className="hidden sm:block text-center mb-10">
          <p className="text-2xl font-bold">About</p>
          <p className="text-base tracking-wider mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nobis
            ratione aperiam aliquam possimus repellat consequatur totam
            temporibus consequuntur vitae.
          </p>
        </div>
        {/* Footer Items */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col items-center">
            <img src="path/to/your/logo.png" alt="Company Logo" width={200} />
            <p className="text-base tracking-wide mt-4 text-center">
              Genuine Astrology made easy. Now directly Call & Chat with India’s
              best Astrologers with complete privacy.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-xl sm:text-2xl font-cormorant text-white font-extrabold">
              Product
            </p>
            <a href="#" className="text-base mt-4">
              Horoscope
            </a>
            <a href="#" className="text-base mt-2">
              Daily Predictions
            </a>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-xl sm:text-2xl font-cormorant text-white font-extrabold">
              Services
            </p>
            <a href="#" className="text-base mt-4">
              Consultations
            </a>
            <a href="#" className="text-base mt-2">
              Personalized Reports
            </a>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-xl sm:text-2xl font-cormorant text-white font-extrabold">
              Astrologer
            </p>
            <Link to={"/astrologer-signin"} className="text-base mt-4">
              Astrologer Login
            </Link>
            <Link to={"/astrologer-signup"} className="text-base mt-2">
              Astrologer Register
            </Link>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-xl sm:text-2xl font-cormorant text-white font-extrabold">
              Support
            </p>
            <a href="#" className="text-base mt-4">
              Contact Us
            </a>
            <a href="#" className="text-base mt-2">
              FAQs
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="bg-black text-center py-5">
        <div className="my-3 flex justify-center gap-6">
          <a href="#" aria-label="Facebook">
            <BsFacebook />
          </a>
          <a href="#" aria-label="Github">
            <BsGithub />
          </a>
          <a href="#" aria-label="Twitter">
            <BsTwitter />
          </a>
          <a href="#" aria-label="Instagram">
            <BsInstagram />
          </a>
        </div>
        <p className="my-2 text-sm lg:text-md">
          ©2024 - AstroKun | All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
