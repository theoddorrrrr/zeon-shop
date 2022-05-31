import React from "react";
import { useDispatch, useSelector } from "react-redux";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";

import { ChangeFavoriteAction } from "../../store/reducers/hotGoodsSlice";

import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

const FavirotePage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const favoriteHandler = (id) => {
    const favoriteGood = [...favorites.data].filter((item) => item.id == id);
    dispatch(setFavorites(favoriteGood));
  };

  const unFavoriteHandler = (item) => {
    dispatch(ChangeFavoriteAction(item));
    dispatch(setUnFavorites(item));
  };

  return (
    <div className="favorites-wrapper">
      <div>Избранное</div>
      {favorites.length < 1 ? (
        <div>У вас пока нет избранных товаров</div>
      ) : (
        <>
          <div>Товаров в избранном: {favorites.length}</div>
          <div className="goods__items">
            {favorites.map((item) => {
              return (
                <div key={item.id} className="goods__item">
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
