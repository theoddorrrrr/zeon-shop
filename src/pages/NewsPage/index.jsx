import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../api/API";
import { useObserver } from "../../hooks/useObserver";

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  console.log(page);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  useObserver(lastElement, page < totalPages, !news.isLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    console.log('PAGE CHANGED');
    dispatch(fetchNews(limit, page));
  }, [page, limit]);

  return (
    <>
      {news.loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="news__title">Новости</div>
          <div className="news__items">
            {news.data.map((item) => {
              return (
                <div className="news__item" key={item.id}>
                  <div className="news__image">
                    <img src={item.src} alt="" />
                  </div>
                  <div className="news__body">
                    <div className="news__title">{item.title}</div>
                    <div className="news__descriptions">
                      {item.descriptions}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={lastElement} style={{ height: 20, background: "red" }} />
          {news.loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <div>Loading</div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NewsPage;
