import React, { useState } from "react";
import arrow from "../../assets/icons/help.png";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ item, expanded, handleChange, index }) => {
  const navigate = useNavigate();

  return (
    <>
      <Accordion
        className="help__item"
        expanded={expanded === index}
        onChange={handleChange(index)}
      >
        <AccordionSummary className="help__title">
          <span>Товары</span>
          <img
            className={
              expanded === index ? "help__button rotate" : "help__button"
            }
            src={arrow}
            alt="Aroow"
          />
        </AccordionSummary>
        <AccordionDetails>
          <div className="about-us__description help__description order__good">
            {item.map((item, index) => {
                console.log(item);
              return <div onClick={() => navigate(`/collections/${item.collection}/${item.id}`)} key={index}>{item.title}</div>;
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default OrderItem;
