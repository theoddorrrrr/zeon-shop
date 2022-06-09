import React from "react";
import SliderComponent from "react-slick";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const settings = {
    dots: true,
    // infinite: true,
    // autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    easing: true,
  };

  const mainInfo = useSelector((state) => state.mainInfo);
  let navigate = useNavigate();
  
  return (
    <>
      <SliderComponent className="slider" {...settings}>
        {mainInfo.loading ? (
          <span>Loading</span>
        ) : (
          mainInfo.data.sliderImages.map((item) => {
            return (
              <div className="slider__item" onClick={() => navigate(`/collections/winter2020`)} key={item.src}>
                <img className="slider__img" src={item.src} alt={item.title} />
              </div>
            );
          })
        )}
      </SliderComponent>
    </>
  );
};

export default Slider;
