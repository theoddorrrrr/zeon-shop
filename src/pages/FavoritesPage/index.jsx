import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PaginationCustom from "../../components/PaginationCustom";

import FavoritesGood from "../../components/FavoritesGood";
import Interested from "../../components/Interested";

const FavirotePage = () => {
  const favorites = useSelector((state) => state.favorites);
  const interestedGoods = useSelector((state) => state.mainInfo.interested);

  const array = [];
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", JSON.stringify(array));

  // Pagination

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const paginatedGoods = fav.slice((page - 1) * limit, page * limit);

  const changePage = (data) => {
    if (data >= 1 && data <= Math.ceil(fav.length / limit)) {
      setPage(data);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 768) setLimit(8);
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setLimit(8);
    else setLimit(4);
  });

  return (
    <div className="favorites-wrapper">
      <div className="favorites__title">Избранное</div>
      {!fav || fav.length < 1 ? (
        <>
          <div className="favorites__count cart__text">
            У вас пока нет избранных товаров
          </div>

          <div className="favorites__title interested__title">
            Возможно Вас заинтересует
          </div>

          <div className="interested__goods">
            {interestedGoods.map((item) => {
              const isFavorite = fav && fav.some((i) => i.id === item.id);

              return (
                <Interested item={item} isFavorite={isFavorite} key={item.id} />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="favorites__count favorites__full">
            Товаров в избранном: {fav?.length}
          </div>
          <div className="goods__items">
            {paginatedGoods.map((item) => {
              return <FavoritesGood item={item} key={item.id} />;
            })}
          </div>
          {favorites.length >= limit && (
            <PaginationCustom limit={limit} count={fav} func={changePage} />
          )}
        </>
      )}
    </div>
  );
};

export default FavirotePage;
