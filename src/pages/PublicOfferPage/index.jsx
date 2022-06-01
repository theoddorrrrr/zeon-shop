import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicOffer } from "../../api/API";

const PublicOfferPage = () => {
  const dispatch = useDispatch();

  const publicOffer = useSelector((state) => state.publicOffer);

  useEffect(() => {
    dispatch(fetchPublicOffer());
  }, []);

  return (
    <div>
      {publicOffer.loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="title">{publicOffer.data.title}</div>
          <div className="content">{publicOffer.data.description}</div>
        </div>
      )}
    </div>
  );
};

export default PublicOfferPage;
