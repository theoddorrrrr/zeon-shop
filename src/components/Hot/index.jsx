import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";
import { fetchMoreHotGoods } from "../../api/API";

const Hot = () => {
  const hotGoods = useSelector((state) => state.hotGoods);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  // Get More Goods
  const buttonHandler = () => {
    dispatch(fetchMoreHotGoods());
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

  const favorites = useSelector((state) => state.favorites);

  const mouseHandler = (e) => {
    // console.log(e);
  };

  const mouseMoveHandler = (e) => {
    // console.log(ref.current);

    // console.log(e);
  };
  // console.log(hover);

  const ref = useRef();

  return (
    <>
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
                    onClick={() => navigate(`/collections/hot/${item.id}`)}
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
                          className="goods__favorite favorite"
                        >
                          <img src={favorite} alt="Favorite" />
                        </div>
                      )}

                      <img
                        // onMouseOver={(e)=> mouseHandler(e)}
                        onMouseMove={(e) => mouseMoveHandler(e)}
                        className="goods__img"
                        src={item.src[0]}
                        alt={item.title}
                      />

                      <div ref={ref} className="hover"></div>
                    </div>
                    <div className="goods__body">
                      <div className="goods__title">{item.title}</div>
                      <div className="goods__prices">
                        {item.isDiscount ? (
                          <>
                            <span className="goods__price">
                              {item.price.price.toLocaleString()} р
                            </span>
                            <span className="goods__old-price">
                              {item.price?.oldPrice.toLocaleString()} р
                            </span>
                          </>
                        ) : (
                          <span className="goods__price">
                            {item.price.price.toLocaleString()} р
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
    </>
  );
};

export default Hot;
