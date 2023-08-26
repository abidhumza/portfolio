import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close, music, musicIcon } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Audio element for background music
  const audio = new Audio(music);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / maxScroll) * 100;
      setScrollProgress(progress);

      // Play or pause the music based on the state.
      isMusicPlaying ? audio.play() : audio.pause();
    };

    audio.addEventListener("ended", () => {
      setTimeout(() => {
        audio.play();
      }, 2000);
    });

    // Set the volume of the audio to 50%.
    audio.volume = 0.5;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      audio.removeEventListener("ended", () => {});
    };
  }, [isMusicPlaying]);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center 
                  py-5 fixed top-0 z-20 bg-primary`}
    >
      <div
        className="w-full flex justify-between
      items-center max-w-7xl mx-auto"
      >
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className={`w-9
          h-9 object-contain
          transition-transform duration-300
          transform hover:rotate-180`}
          />
          <p
            className="text-white text-[18px]
          font-bold cursor-pointer flex"
          >
            Abid &nbsp;
            <span className="sm:block hidden"> Humza</span>
          </p>
        </Link>

        {/* Navbar Links Section Start*/}

        <ul
          className="list-none hidden sm:flex
          flex-row gap-10"
        >
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-[#CEDEBD]" : "text-secondary"
              } text-[18px] font-medium cursor-pointer 
              transform transition-transform duration-100 
              group hover:scale-110 hover:text-[#CEDEBD]`}
            >
              <a
                href={
                  link.id === "resume" ? "/Resume.pdf" : `#${link.id || ""}`
                }
                download={link.id === "resume" ? "My_Resume.pdf" : undefined}
                onClick={(event) => {
                  setActive(link.title);
                }}
              >
                {link.title}
                <div
                  className={`absolute bottom-0 left-0 w-full
                  h-0.5 bg-white bg-opacity-40 transition-transform
                  duration-200 transform ${
                    active === link.title ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
              </a>
            </li>
          ))}
        </ul>

        {/* Navbar Links Section End */}

        {/* Music Toggle */}
        <div
          className={`flex items-center cursor-pointer md:justify-center sm:justify-center
         bg-white bg-opacity-40 rounded-full p-2 transform
        hover:-translate-y-0.5 hover:scale-105 hover:rotate-3
        transition-transform duration-300 
          ${isMusicPlaying ? "bg-opacity-80" : ""}`}
          onClick={() => {
            setIsMusicPlaying(!isMusicPlaying);
            isMusicPlaying ? audio.pause() : audio.play();
          }}
        >
          <img src={musicIcon} alt="Music" className="w-6 h-6 object-contain" />
        </div>

        {/* Scroll Progress Underline */}
        <div
          className="absolute bottom-0 left-0 h-0.5 
          bg-gradient-to-r from-gray-300
           to-white transform"
          style={{
            width: `${scrollProgress}%`,
            transformOrigin: "left center",
          }}
        ></div>

        {/* Hamburger Menu Section Start */}

        <div
          className="sm:hidden flex flex-1 justify-end items-center 
          transform transition-transform duration-300 ease-in-out"
        >
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px]
          object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          {/* Hamburger Menu Section Items */}

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-0 mx-4 my-2 
            min-w-[140px] z-10 rounded-xl bg-gradient-to-br
            from-black to-gray-900 shadow-lg`}
          >
            <ul
              className="list-none flex
          justify-end items-start flex-col gap-4"
            >
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium
                cursor-pointer hover:text-white text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  {link.id === "resume" ? (
                    <a href="/Resume.pdf" download="My_Resume.pdf">
                      {link.title}
                    </a>
                  ) : (
                    <a href={`#${link.id || ""}`}>{link.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Hamburger Menu Section End */}
      </div>
    </nav>
  );
};
export default Navbar;
