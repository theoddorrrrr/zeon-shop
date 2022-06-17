import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMoreHotGoods } from "../../api/API";
import Good from "../Good";

const Hot = () => {
  const hotGoods = useSelector((state) => state.hotGoods);
  const dispatch = useDispatch();

  // Get More Goods
  const buttonHandler = () => {
    dispatch(fetchMoreHotGoods());
  };

  // Takes goods from local storage
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", []);

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : localStorage.setItem("cart", []);

  const favorites = useSelector((state) => state.favorites);

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
                  <Good item={item} isFavorite={isFavorite} key={item.id} />
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
