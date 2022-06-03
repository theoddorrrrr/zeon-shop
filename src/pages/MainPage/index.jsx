import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMoreBestSellers,
  fetchMoreColletions,
  fetchMoreHotGoods,
} from "../../api/API";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";
import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/up.png";

const MainPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    easing: true,
  };

  let navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites);
  const hotGoods = useSelector((state) => state.hotGoods);
  const bestSellers = useSelector((state) => state.bestSellersGoods);
  const mainInfo = useSelector((state) => state.mainInfo);
  const collections = useSelector((state) => state.collections);

  const dispatch = useDispatch();

  // Get More Goods
  const buttonHandler = () => {
    dispatch(fetchMoreHotGoods());
  };

  const getMoreBestSellers = () => {
    dispatch(fetchMoreBestSellers());
  };

  const getMoreCollections = () => {
    dispatch(fetchMoreColletions());
  };

  // Favorite Functions
  const favoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setFavorites(item));
  };

  const unFavoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setUnFavorites(item));
  };

  // Takes goods from local storage
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", []);

  const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : localStorage.setItem("cart", []);

  return (
    <>
      <Slider className="slider" {...settings}>
        {mainInfo.loading ? (
          <span>Loading</span>
        ) : (
          mainInfo.data.sliderImages.map((item) => {
            return (
              <div className="slider__item" key={item.src}>
                <img className="slider__img" src={item.src} alt={item.title} />
              </div>
            );
          })
        )}
      </Slider>

      <div className="goods__wrapper">
        {bestSellers.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2 className="goods-title">Хит продаж</h2>
            <div className="goods__items">
              {bestSellers.data.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);
                return (
                  <div
                    className="goods__item"
                    onClick={() => navigate(`/bestSellers/${item.id}`)}
                    key={item.id}
                  >
                    <div className="goods__images">
                      {item.price?.discount && (
                        <div className="goods__discount">
                          <span>{item.price.discount}%</span>
                        </div>
                      )}

                      {isFavorite ? (
                        <div
                          onClick={(e) => unFavoriteHandler(e, item)}
                          className="goods__favorite"
                        >
                          <img src={favoriteActive} alt="Favorite" />
                        </div>
                      ) : (
                        <div
                          onClick={(e) => favoriteHandler(e, item)}
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
          Еще
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
                  <div
                    className="goods__item"
                    onClick={() => navigate(`/hot/${item.id}`)}
                    key={item.id}
                  >
                    <div className="goods__images">
                      {item.price?.discount && (
                        <div className="goods__discount">
                          <span>{item.price.discount}%</span>
                        </div>
                      )}

                      {isFavorite ? (
                        <div
                          onClick={(e) => unFavoriteHandler(e, item)}
                          className="goods__favorite"
                        >
                          <img src={favoriteActive} alt="Favorite" />
                        </div>
                      ) : (
                        <div
                          onClick={(e) => favoriteHandler(e, item)}
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

      {hotGoods.data.length <= 4 && (
        <button onClick={buttonHandler} className="button btn button-load">
          Еще
        </button>
      )}

      {collections.loading ? (
        <div>Loading</div>
      ) : (
        <div className="collections">
          <div className="collections__text title">Коллекция</div>
          <div className="collections__items">
            {collections.data.map((item) => {
              return (
                <div
                  onClick={() => navigate(`/${item.goods}`)}
                  className="collections__item"
                  key={item.id}
                >
                  <div className="collections__img">
                    <img src={item.src} alt={item.title} />
                    <div className="collections__title">{item.title}</div>
                  </div>

                  <div className="collections__button">
                    <button className="button btn button-show-all">
                      <span>Смотреть все</span>
                      <img className="arrow-more" src={arrow} alt="arrow" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {collections.data.length <= 4 && (
        <button onClick={getMoreCollections} className="button btn button-load">
          Еще
        </button>
      )}

      {mainInfo.loading ? (
        <div>Loading</div>
      ) : (
        <div className="advantages container">
          <h2 className="advantages__title title">Наши преимущества</h2>
          <div className="advantages__items">
            {mainInfo.data.advantages.map((item) => {
              return (
                <div className="advantages__item" key={item.id}>
                  <div className="advantages__img">
                    <img src={item.src} alt={item.title} />
                  </div>
                  <div className="advantages__text">{item.title}</div>
                  <div className="advantages__description">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
