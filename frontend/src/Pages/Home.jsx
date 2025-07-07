import React from "react";
import Hero from "../Components/Home/Hero";
import LatestReport from "../Components/Home/LatestRepor/LatestReport";
import Impact from "../Components/Home/Impact";
import HowItWork from "../Components/Home/HowItWork/HowItWork";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <LatestReport catText="Lost Items" mainText={true} />
      <LatestReport catText="Found Items" />
      <Impact />
      <HowItWork />
    </div>
  );
};

export default Home;
