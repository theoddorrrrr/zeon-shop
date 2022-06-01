import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchMoreBestSellers, fetchMoreHotGoods } from "../../api/API";
import { ChangeFavoriteHotGoodsAction } from "../../store/reducers/hotGoodsSlice";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";
import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";
import { ChangeFavoriteBestSellersAction } from "../../store/reducers/bestSellersSlice";

const MainPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const pages = useSelector((state) => state.mainInfo);
  const hotGoods = useSelector((state) => state.hotGoods);
  const favorites = useSelector((state) => state.favorites);
  const bestSellers = useSelector((state) => state.bestSellersGoods);

  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(fetchMoreHotGoods());
  };

  const getMoreBestSellers = () => {
    dispatch(fetchMoreBestSellers());
  };

  //Hot
  const favoriteHandler = (item) => {
    // dispatch(ChangeFavoriteHotGoodsAction(item));
    dispatch(setFavorites(item));
  };

  const unFavoriteHandler = (item) => {
    // dispatch(ChangeFavoriteHotGoodsAction(item));
    dispatch(setUnFavorites(item));
  };

  //BestSellers
  const favoriteBestSellers = (item) => {
    console.log("BESTS");
    // dispatch(ChangeFavoriteBestSellersAction(item));
    dispatch(setFavorites(item));
  };
  const unFavoriteBestSellers = (item) => {
    // dispatch(ChangeFavoriteBestSellersAction(item));
    dispatch(setUnFavorites(item));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [hotGoods, bestSellers]);

  // useEffect(() => {
  //   localStorage.getItem("123")
  //     ? localStorage.getItem("123")
  //     : localStorage.setItem("123", []);
  // });

  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", [])
  console.log(fav);

  return (
    <>
      <div className="goods__wrapper">
        {bestSellers.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2 className="goods-title">Хит продаж</h2>
            <div className="goods__items">
              {bestSellers.data.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);
                console.log(isFavorite);
                return (
                  <div className="goods__item" key={item.id}>
                    <div className="goods__images">
                      {item.price?.discount && (
                        <div className="goods__discount">
                          <span>{item.price.discount}%</span>
                        </div>
                      )}

                      {isFavorite ? (
                        <div
                          onClick={() => unFavoriteBestSellers(item)}
                          className="goods__favorite"
                        >
                          <img src={favoriteActive} alt="Favorite" />
                        </div>
                      ) : (
                        <div
                          onClick={() => favoriteBestSellers(item)}
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
                          <span className="goods__price">
                            {item.price.price} р
                          </span>
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
          </>
        )}
      </div>

      {bestSellers.data.length <= 4 && (
        <button onClick={getMoreBestSellers} className="button btn button-load">
          More
        </button>
      )}

      <div className="goods__wrapper">
        {hotGoods.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2 className="goods-title">Новинки</h2>
            <div className="goods__items">
              {hotGoods.data.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);

                return (
                  <div className="goods__item" key={item.id}>
                    <div className="goods__images">
                      {item.price?.discount && (
                        <div className="goods__discount">
                          <span>{item.price.discount}%</span>
                        </div>
                      )}

                      {isFavorite ? (
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
                          <span className="goods__price">
                            {item.price.price} р
                          </span>
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
          </>
        )}

        {hotGoods.data.length <= 4 && (
          <button onClick={buttonHandler} className="button btn button-load">
            More
          </button>
        )}

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
    </>
  );
};

export default MainPage;
