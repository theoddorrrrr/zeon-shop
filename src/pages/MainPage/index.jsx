import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchMainInfo } from "../../api/API";

import { GetMainInfoAction } from "../../store/reducers/mainInfoSlice";

const MainPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const pages = useSelector((state) => state.mainInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMainInfo());
  }, []);

  return (
    <div>
      <Slider className="slider" {...settings}>
        {pages.loading ? (
          <span>Loading</span>
        ) : (
          pages.data.map((item) => {
            return (
              <div className="slider__item" key={item.src}>
                <img className="slider__img" src={item.src} alt={item.title} />
              </div>
            );
          })
        )}
        {/* <div>
          <img src={logo.data.src} alt="Img" />
        </div>
        <div>
          <img src={logo.data.src} alt="Img" />
        </div>
        <div>
          <img src={logo.data.src} alt="Img" />
        </div>
        <div>
          <img src={logo.data.src} alt="Img" />
        </div>
        <div>
          <img src={logo.data.src} alt="Img" />
        </div> */}
      </Slider>
    </div>
  );
};

export default MainPage;
