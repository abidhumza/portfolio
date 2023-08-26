import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  GoogleMap,
  Footer,
} from "./components";

const ScrollToTopOnRefresh = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <ScrollToTopOnRefresh />
        <div
          className="bg-hero-pattern bg-cover
        bg-no-repeat bg-center"
        >
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <GoogleMap />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
