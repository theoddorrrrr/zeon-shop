import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchHotGoods, fetchMainInfo } from "../../api/API";

import { GetMainInfoAction } from "../../store/reducers/mainInfoSlice";
import { ChangeFavoriteAction } from "../../store/reducers/hotGoodsSlice"

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";
import { setFavorites, setUnFavorites } from "../../store/reducers/favoritesSlice";

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
  const hotGoods = useSelector((state) => state.hotGoods);
  // console.log(hotGoods);

  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(fetchHotGoods(12));
  };

  useEffect(() => {
    dispatch(fetchMainInfo());
    dispatch(fetchHotGoods());
  }, [])

  const favoriteHandler = (item) => {
    dispatch(ChangeFavoriteAction(item))
    dispatch(setFavorites(item));
  }

  const unFavoriteHandler = (item) => {
    dispatch(ChangeFavoriteAction(item))
    dispatch(setUnFavorites(item));
  }

  useEffect( () => {
    localStorage.setItem('hotGoods', JSON.stringify(hotGoods));
  }, [hotGoods])

  // useEffect(() => {
  //   // hotGoods = JSON.parse(localStorage.getItem('hotGoods'));
  // }, []);

  return (
    <div className="goods__wrapper">
      {hotGoods.loading ? (
        <div>Loading</div>
      ) : (
        <div className="goods__items">
          {hotGoods.data.map((item) => {
            return (
              <div className="goods__item" key={item.id}>
                <div className="goods__images">
                  {item.price?.discount && (
                    <div className="goods__discount">
                      <span>{item.price.discount}%</span>
                    </div>
                  )}

                  {item.isFavorite ? (
                    <div
                    onClick={() => unFavoriteHandler(item)}
                    className="goods__favorite"
                  >
                    <img src={favoriteActive} alt="Favorite" />
                  </div>
                  ) : (
                    <div
                    onClick={() => favoriteHandler(item)}
                    className="goods__favorite"
                  >
                    <img src={favorite} alt="Favorite" />
                  </div>
                  )}

                  <img
                    className="goods__img"
                    src={item.src[0]}
                    alt={item.title}
                  />
                </div>
                <div className="goods__body">
                  <div className="goods__title">{item.title}</div>
                  <div className="goods__prices">
                    {item.isDiscount ? (
                      <>
                        <span className="goods__price">
                          {item.price.price} р
                        </span>
                        <span className="goods__old-price">
                          {item.price?.oldPrice} р
                        </span>
                      </>
                    ) : (
                      <span className="goods__price">{item.price.price} р</span>
                    )}
                  </div>
                  <div className="goods__sizes">Размер: {item.sizes}</div>
                  <div className="goods__colors">
                    {item.colors.map((color) => {
                      return (
                        <div
                          key={color}
                          className="goods__color"
                          style={
                            color === "#FFFFFF"
                              ? {
                                  backgroundColor: color,
                                  border: "1px solid #D1D1D1",
                                }
                              : { backgroundColor: color }
                          }
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button onClick={buttonHandler} className="button btn button-load">
        More
      </button>
      {/* <Slider className="slider" {...settings}>
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
        </div>
        <div>
          <img src={logo.data.src} alt="Img" />
        </div>
      </Slider> */}
    </div>
  );
};

export default MainPage;
