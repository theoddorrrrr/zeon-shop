import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BestSellers from "../../components/BestSellers";
import Hot from "../../components/Hot";
import Slider from "../../components/Slider";
import Collections from "../../components/Collections";
import Advantages from "../../components/Advantages";

const MainPage = () => {
  return (
    <>
      <Slider />
      <BestSellers />
      <Hot />
      <Collections />
      <Advantages />
    </>
  );
};

export default MainPage;
