import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCollection,
  fetchLimitedHotGoods,
  fetchPaginatedOneCollection,
} from "../../api/API";

import PaginationCustom from "../../components/PaginationCustom";
import { useRef } from "react";
import Good from "../Good";
import Interested from "../Interested";

const Collection = () => {
  const pathname = useParams();
  const [limit, setLimit] = useState(window.innerWidth >= 768 ? 8 : 4);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const collection = useSelector((state) => state.oneCollection);
  const paginated = useSelector((state) => state.oneCollection.paginated);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setLimit(8);
    else setLimit(4);
  });

  useEffect(() => {
    dispatch(fetchLimitedHotGoods());
  }, []);

  const hots = useSelector((state) => state.hotGoods);
  console.log(hots);

  // Takes goods from local storage
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", []);

  useEffect(() => {
    dispatch(fetchCollection(pathname.collection));
    dispatch(fetchPaginatedOneCollection(limit, 1, pathname.collection));
  }, []);

  useEffect(() => {
    dispatch(fetchPaginatedOneCollection(limit, 1, pathname.collection));
  }, [limit]);

  const changePage = (data) => {
    if (data >= 1 && data <= Math.ceil(collection.data.length / limit)) {
      dispatch(fetchPaginatedOneCollection(limit, data, pathname.collection));
    }
  };

  return (
    <>
      <div className="goods__wrapper collection-wrapper">
        {collection.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2 className="collections__text">
              {collection.data[0].collectionTitle}
            </h2>
            <div className="goods__items">
              {paginated.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);
                return (
                  <Good item={item} isFavorite={isFavorite} key={item.id} />
                );
              })}
            </div>
            <PaginationCustom
              limit={limit}
              count={collection.data}
              func={changePage}
            />
          </>
        )}
      </div>

      <div className="cart__title interested__title hots-interested__title">Новинки</div>

      <div className="goods__items interested__goods">
        {hots.loading ? (
          <div>Loading</div>
        ) : (
          <>
            {hots.limited.map((item) => {
              const isFavorite = fav && fav.some((i) => i.id === item.id);

              return (
                <Interested item={item} isFavorite={isFavorite} key={item.id} />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Collection;
