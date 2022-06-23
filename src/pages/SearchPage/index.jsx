import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";
import { useLocation } from "react-router-dom";

import PaginationCustom from "../../components/PaginationCustom";
import { useRef } from "react";
import Interested from "../../components/Interested";
import Good from "../../components/Good";

const SearchPage = () => {
  const interestedGoods = useSelector((state) => state.mainInfo.interested);
  const { state } = useLocation();

  // Takes goods from local storage
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", []);

  const favorites = useSelector((state) => state.favorites);

  // Pagination

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(window.innerWidth >= 768 ? 8 : 4);
  const paginatedGoods = state?.filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  const changePage = (data) => {
    if (data >= 1 && data <= Math.ceil(state?.filteredData.length / limit)) {
      setPage(data);
    }
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setLimit(12);
    else setLimit(4);
  });

  return (
    <>
      <div className="goods__wrapper search__wrapper">
        <div className="goods__result">
          <span>Результаты поиска по запросу:</span>
          <span> {state?.data || ""}</span>
        </div>
        {!state || state?.filteredData.length <= 0 ? (
          <>
            <div className="goods__empty">
              По вашему запросу ничего не найдено
            </div>
            <div className="cart__title interested__title">
              Возможно Вас заинтересует
            </div>

            <div className="goods__items interested__goods">
              {interestedGoods.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);

                return (
                  <Interested
                    item={item}
                    isFavorite={isFavorite}
                    key={item.id}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="goods__items search__items">
              {paginatedGoods.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);
                return (
                  <Good item={item} isFavorite={isFavorite} key={item.id} />
                );
              })}
            </div>

            {state?.filteredData.length >= limit && (
              <PaginationCustom
                limit={limit}
                count={state?.filteredData}
                func={changePage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
