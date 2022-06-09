import { Pagination, PaginationItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import favoriteActive from "../../assets/icons/heart-good-filled.png";
import PaginationCustom from "../../components/PaginationCustom";

import { setUnFavorites } from "../../store/reducers/favoritesSlice";

const FavirotePage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  let navigate = useNavigate();

  const array = [];
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", JSON.stringify(array));

  const unFavoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setUnFavorites(item));
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4)
  const paginatedGoods = fav.slice((page - 1) * limit, page * limit);

  const changePage = (data) => {
    setPage(data);
  };

  useEffect(()=>{
    if(window.innerWidth >= 768) setLimit(12)
  }, [])

  window.addEventListener('resize', () => {
    if(window.innerWidth >= 768) setLimit(12)
    else setLimit(4)
  })

  return (
    <div className="favorites-wrapper">
      <div className="favorites__title">Избранное</div>
      {!fav || fav.length < 1 ? (
        <div className="favorites__count">У вас пока нет избранных товаров</div>
      ) : (
        <>
          <div className="favorites__count">
            Товаров в избранном: {fav?.length}
          </div>
          <div className="goods__items">
            {paginatedGoods.map((item) => {
              return (
                <div
                  onClick={() =>
                    navigate(`/collections/${item.collection}/${item.id}`)
                  }
                  key={item.id}
                  className="goods__item"
                >
                  <div className="goods__images">
                    {item.price?.discount && (
                      <div className="goods__discount">
                        <span>{item.price.discount}%</span>
                      </div>
                    )}

                    <div
                      onClick={(e) => unFavoriteHandler(e, item)}
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
          <PaginationCustom limit={limit} count={fav} func={changePage} />
        </>
      )}
    </div>
  );
};

export default FavirotePage;
