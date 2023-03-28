import React from "react";
import CarouselHome from "../components/CarouselHome";
import Navigation from "../components/Navigation";
import Sidebar from "../components/sidebar";

const Home = () => {
  return (
    <div>
      <Navigation />
      <CarouselHome />
      {/* <Sidebar /> */}
    </div>
  );
};

export default Home;
