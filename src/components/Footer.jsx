import React, { useState, useEffect } from "react";
import { SocialLinks } from "../constants";

import { arrow } from "../assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [showArrow, setShowArrow] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setShowArrow(window.scrollY > 3000);
    setFadeIn(window.scrollY > 3000 ? true : false);

    // console.log(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-center">
      <div
        className="h-10 flex justify-center gap-5 overflow-hidden"
      >
        {SocialLinks.map((social, index) => (
          <a
            key={index}
            href={social.source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-300 transform 
            hover:scale-110 cursor-pointer hover:shadow-md"
          >
            <img src={social.image} alt={social.image} className="w-8 h-8" />
          </a>
        ))}
      </div>
      <p className="mt-2 pb-5 text-sm text-gray-600 leading-6">
        Copyright © {currentYear} by Abid Humza. All rights reserved
      </p>
      <div className="relative">
        {showArrow && (
          <div
            className={`absolute bottom-12 right-5 cursor-pointer bg-purple-500 rounded-full p-2 transform hover:scale-110 ${
              fadeIn ? "opacity-100 transition-opacity" : "opacity-0"
            }`}
            onClick={scrollToTop}
          >
            <img src={arrow} alt="Scroll to top" className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
