import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCollections, fetchPaginatedCollection } from "../../api/API";
import arrow from "../../assets/icons/up.png";

import PaginationCustom from "../../components/PaginationCustom";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collections = useSelector((state) => state.collections.all);
  const paginated = useSelector((state) => state.collections.paginated);
  
  const [limit, setLimit] = useState(4);

  const changePage = (data) => {
    if(data >= 1 && data <= Math.ceil(collections?.length / limit) ) {
       dispatch(fetchPaginatedCollection(limit, data))
    }  
  };

  useEffect(() => {
    if (window.innerWidth >= 768) setLimit(8);
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setLimit(8);
    else setLimit(4);
  });

  useEffect(() => {
    dispatch(fetchAllCollections());
    dispatch(fetchPaginatedCollection(limit));
  }, []);


  return (
    <>
      {collections?.loading ? (
        <div>Loading</div>
      ) : (
        <div className="collections">
          <div className="collections__text text">Коллекции</div>
          <div className="collections__items">
            {paginated?.map((item) => {
              return (
                <div
                  onClick={() => navigate(`/collections/${item.goods}`)}
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

            <PaginationCustom
              limit={limit}
              count={collections}
              func={changePage}
            />
        </div>
      )}
    </>
  );
};

export default CollectionsPage;
