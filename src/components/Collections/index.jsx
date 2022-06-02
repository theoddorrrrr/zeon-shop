import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCollection, instance } from "../../api/API";

const Collection = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollection(pathname));
  }, []);

  const collection = useSelector((state) => state.oneCollection);

//   console.log(collection);
//   useEffect(()=> {},[collection])

  console.log(collection);
  console.log(collection?.data?.title);
  console.log(collection.data?.goods);

  return (
    <div className="collecion">
      {collection.loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="collection__title">{collection?.data?.title}</div>
          <div className="collection__title">ASDASDBASDJADJS</div>
          <div className="colletcions__items">
            {collection.data.goods.map((item) => {
              return <div key={item.id} className="collection__item">{item.id}</div>;
            })} 
          </div>
        </>
      )}
      
    </div>
  );
};

export default Collection;
