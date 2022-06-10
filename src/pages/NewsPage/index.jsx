import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreNews, fetchNews } from "../../api/API";

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const [page, setPage] = useState(2);
  const ref = useRef();

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  useEffect(() => {
    dispatch(fetchMoreNews(4, page))
  }, [page]);

  const increasePage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        entry.isIntersecting && increasePage()
    });    

    if (!news.loading) {
      observer.observe(ref.current);
    }

   return () => {
     console.log(observer);
   }

  }, [news.loading]);

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
          <div ref={ref} style={{ height: 20 }} />
        </>
      )}
    </>
  );
};

export default NewsPage;
