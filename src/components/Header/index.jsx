import { fetchInfo } from "../../api/API";
import { useEffect, useState } from "react";
import search from "../../assets/icons/search.png";
import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import closeBtn from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsNavbarAction } from "../../store/reducers/navbarSlice";
import favoriteImg from "../../assets/icons/heart.png";
import cartImg from "../../assets/icons/cart.png";
import { Link as LinkRouter } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);

  return (
    <header className="header">
      <div className="header-container container">
        <div className="header-wrapper">
          {isNavbar ? <Navbar /> : null}
          <HeaderBody />
          <Divider className="header__divider" />
          <HeaderBreadCrumbs />
        </div>
      </div>
    </header>
  );
};

const HeaderBody = () => {
  const info = useSelector((state) => state.info);

  return (
    <div className="header-body">
      <Burger />
      {info.loading ? (
        <span>Loading</span>
      ) : (
        <LinkRouter to="/">
          <img className="header__logo" src={info.data.logo.src} />
        </LinkRouter>
      )}
      <Search />
    </div>
  );
};

const HeaderBreadCrumbs = () => {
  return (
    <div className="header-breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
};

const HeaderDesktop = () => {
  return <nav className="nav nav-desktop"></nav>;
};

const Navbar = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);
  const info = useSelector((state) => state.info);
  const contact = useSelector((state) => state.info.data.numbers[0]);

  const toggleNavbar = () => {
    dispatch(setIsNavbarAction(isNavbar));
    document.body.classList.toggle("fixed");
  };

  return (
    <nav className="nav nav-mobile">
      <div className="nav__menu">
        <ul className="nav__list">
          <li className="nav__title">Меню</li>
          <li>
            <LinkRouter to="about-us" onClick={toggleNavbar}>
              О нас
            </LinkRouter>
          </li>
          <li>
            <LinkRouter to="collections" onClick={toggleNavbar}>
              Коллекция
            </LinkRouter>
          </li>
          <li>
            <LinkRouter to="news" onClick={toggleNavbar}>
              Новости
            </LinkRouter>
          </li>

          <Divider />

          <div className="favorite-btn">
            <LinkRouter onClick={toggleNavbar} className="button" to="/favorite">
              <img src={favoriteImg} alt="Favorite" />
              <button className="btn favorite">Избранное</button>
            </LinkRouter>
          </div>
          <div className="cart-btn">
            <LinkRouter onClick={toggleNavbar} className="button" to="/cart">
              <img src={cartImg} alt="Cart" />
              <button className="btn cart">Корзина</button>
            </LinkRouter>
          </div>
        </ul>
        <div className="nav-contacts">
          <div className="nav-contacts__title">Свяжитесь с нами</div>
          <div className="nav-contacts__contact">
            {info.loading ? (
              <span>Loading</span>
            ) : (
              <div>
                <a href={contact.data}>{contact.title}</a>
              </div>
            )}
          </div>
          <div className="nav-contacts__social-media">
            {info.loading ? (
              <div>Loading</div>
            ) : (
              info.data.mobileSocialMedia.map((item) => {
                return (
                  <div key={item.id}>
                    <a target="_blank" href={item.data}>
                      <img src={item.src} alt={item.title} />
                    </a>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <img src={closeBtn} onClick={toggleNavbar} className="close-btn" />
      <div className="nav__backdrop" onClick={toggleNavbar}></div>
    </nav>
  );
};

const Burger = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);
  const toggleNavbar = () => {
    dispatch(setIsNavbarAction(isNavbar));
    document.body.classList.toggle("fixed");
  };
  return (
    <div onClick={toggleNavbar} className="burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const Search = () => {
  return (
    <div className="search">
      <img src={search} />
    </div>
  );
};

export default Header;
