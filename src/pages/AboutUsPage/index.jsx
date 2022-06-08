import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUs } from "../../api/API";

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const aboutUs = useSelector((state) => state.aboutUs);

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, []);

  return (
    <>
      {aboutUs.loading ? (
        <div>Loading</div>
      ) : (
        <div className="about-us">
          <div className="about-us__left">
            {aboutUs.data.src.map((src) => {
              return (
                <div className="about-us__image" key={src}>
                  <img src={src} alt="Image" />
                </div>
              );
            })}
          </div>
          <div className="about-us__right">
            <div className="about-us__title">{aboutUs.data.title}</div>
            <div className="about-us__description">{aboutUs.data.description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUsPage;
