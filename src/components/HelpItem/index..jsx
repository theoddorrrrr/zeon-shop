import React, { useState } from "react";
import arrow from "../../assets/icons/help.png";


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const HelpItem = ({ item, expanded, handleChange }) => {

  console.log(expanded);

  return (
    <>
      <Accordion className="help__item" expanded={expanded === item.id} onChange={handleChange(item.id)}>

        <AccordionSummary className="help__title"><span>{item.question}</span>
          <img className={expanded === item.id ? "help__button rotate" : "help__button"} src={arrow} alt="Aroow" /></AccordionSummary>
        <AccordionDetails><div className="about-us__description help__description">
          {item.answer}
        </div></AccordionDetails>
      </Accordion>
    </>
  );
};

export default HelpItem;
