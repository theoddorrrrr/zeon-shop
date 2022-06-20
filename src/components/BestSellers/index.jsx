import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMoreBestSellers } from "../../api/API";
import Good from "../Good";

const BestSellers = () => {
  const bestSellers = useSelector((state) => state.bestSellersGoods);
  const dispatch = useDispatch();

  const getMoreBestSellers = () => {
    dispatch(fetchMoreBestSellers());
  };

  // Takes goods from local storage
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", []);

  const favorites = useSelector((state) => state.favorites);

  return (
    <>
      <div className="goods__wrapper">
        {bestSellers.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2 className="goods-title">Хит продаж</h2>
            <div className="goods__items bestSellers__items">
              {bestSellers.data.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);

                return (
                  <Good item={item} isFavorite={isFavorite} key={item.id} />
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
    </>
  );
};

export default BestSellers;
