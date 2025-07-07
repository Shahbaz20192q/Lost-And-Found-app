import React from "react";
import Hero from "../Components/Home/Hero";
import LatestReport from "../Components/Home/LatestRepor/LatestReport";
import Impact from "../Components/Home/Impact";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <LatestReport catText="Lost Items" mainText={true} />
      <LatestReport catText="Found Items" />
      <Impact />
    </div>
  );
};

export default Home;
