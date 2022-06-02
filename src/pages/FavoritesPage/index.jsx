import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import favoriteActive from "../../assets/icons/heart-good-filled.png";

import {
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

const FavirotePage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites)

  let navigate = useNavigate();


  const array = []
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", JSON.stringify(array))

  const unFavoriteHandler = (item) => {
    dispatch(setUnFavorites(item));
  };

  return (
    <div className="favorites-wrapper">
      <div>Избранное</div>
      {!fav || fav.length < 1 ? (
        <div>У вас пока нет избранных товаров</div>
      ) : (
        <>
          <div>Товаров в избранном: {fav?.length}</div>
          <div className="goods__items">
            {fav.map((item) => {
              return (
                <div onClick={()=> navigate(`/${item.collection}/${item.id}`)} key={item.id} className="goods__item">
                  <div className="goods__images">
                    {item.price?.discount && (
                      <div className="goods__discount">
                        <span>{item.price.discount}%</span>
                      </div>
                    )}

                    <div
                      onClick={() => unFavoriteHandler(item)}
                      className="goods__favorite"
                    >
                      <img src={favoriteActive} alt="Favorite" />
                    </div>

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
  );
};

export default FavirotePage;
