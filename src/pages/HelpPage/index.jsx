import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHelp } from "../../api/API";
import HelpItem from "../../components/HelpItem/index.";

const HelpPage = () => {
  const dispatch = useDispatch();
  const help = useSelector((state) => state.help);

  useEffect(() => {
    dispatch(fetchHelp());
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {help.loading ? (
        <div>Loading</div>
      ) : (
        <div className="about-us">
          <div className="about-us__left help__left">
            <div className="about-us__image help__image">
              <img src={help.data.src} alt="Image" />
            </div>
          </div>
          <div className="about-us__right help__right">
            <div className="about-us__title">{help.data.title}</div>
            <div className=" help__items">
              {help.data.qna.map((item) => {
                return (
                  <HelpItem key={item.id} item={item} expanded={expanded} handleChange={handleChange} />
                );

              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpPage;
