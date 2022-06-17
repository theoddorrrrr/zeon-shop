import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  const info = useSelector((state) => state.info);

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__body">
          <div className="footer__top">
            <div className="footer__logo">
              {info.loading ? (
                <span>Loading</span>
              ) : (
                  <img className="footer__img" src={info.data.logo.src} />
              )}
            </div>
            <div className="footer__content">
              <div className="footer-company">
                <div className="footer-company-title footer-title">
                  Компания
                </div>
                <ul>
                  <li>
                    <LinkRouter to="about-us">О нас</LinkRouter>
                  </li>
                  <li>
                    <LinkRouter to="news">Новости</LinkRouter>
                  </li>
                  <li>
                    <LinkRouter to="/help">Помощь</LinkRouter>
                  </li>
                </ul>
              </div>
              <div className="footer-contacts">
                <div className="footer-contacts footer-title">Контакты</div>
                <ul>
                  {info.loading ? (
                    <span>Loading</span>
                  ) : (
                    info.data.numbers.map((item) => {
                      return (
                        <li key={item.id}>
                          <a href={item.data}>
                            <img src={item.src} alt={item.number} />
                            <span>{item.title}</span>
                          </a>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
              <div className="footer-social-media">
                <div className="footer-social-media__title footer-title">
                  Мы в социальных сетях
                </div>
                <ul>
                  {info.loading ? (
                    <span>Loading</span>
                  ) : (
                    info.data.links.map((item) => {
                      return (
                        <li key={item.id}>
                          <a target="_blank" href={item.data}>
                            <img src={item.src} />
                            <span>{item.title}</span>
                          </a>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <Divider className="footer__divider" />
            <div className="footer__copy">
              <span>Developed by Zeon 2020</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
