import { fetchInfo } from "../../api/API";
import { useEffect } from "react";
import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import closeBtn from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsNavbarAction } from "../../store/reducers/navbarSlice";
import favoriteImg from "../../assets/icons/heart.png";
import cartImg from "../../assets/icons/cart.png";
import { Link as LinkRouter, useLocation, useParams } from "react-router-dom";
import Search from "../Search";

const Header = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-wrapper">
          {isNavbar ? <Navbar /> : null}
          <HeaderTop />
          <HeaderBody />
        </div>
      </div>
      <Divider className="header__divider" />
      <HeaderBreadCrumbs />
    </header>
  );
};

const HeaderTop = () => {
  return (
    <div className="header-top">
      <div>
        <div className="header-top__container container">
          <div className="header-top__body">
            <ul className="nav__list_desktop">
              <li>
                <LinkRouter to="about-us">О нас</LinkRouter>
              </li>
              <li>
                <LinkRouter to="collections">Коллекция</LinkRouter>
              </li>
              <li>
                <LinkRouter to="news">Новости</LinkRouter>
              </li>
            </ul>

            <ContactWithUs />
          </div>
        </div>

        <Divider style={{ flex: "0 0 100%" }} />
      </div>
    </div>
  );
};

const HeaderBody = () => {
  const info = useSelector((state) => state.info);

  return (
    <div className="header-body__container container">
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

        <FavoriteButton desktop={true} />
        <CartButton desktop={true} />
      </div>
    </div>
  );
};

const FavoriteButton = ({ toggleNavbar, desktop }) => {
  const handleNavbar = () => {
    if (toggleNavbar) {
      toggleNavbar();
    }
  };

  const isFavorite = useSelector((state) => state.favorites.length);

  return (
    <div className={desktop ? "favorite-btn_desktop" : "favorite-btn mobile"}>
      <LinkRouter
        className={isFavorite ? "button with-goods" : "button"}
        to="/favorite"
        onClick={handleNavbar}
      >
        <img src={favoriteImg} alt="Favorite" />
        <button className="btn favorite">Избранное</button>
      </LinkRouter>
    </div>
  );
};

const CartButton = ({ toggleNavbar, desktop }) => {
  const handleNavbar = () => {
    if (toggleNavbar) {
      toggleNavbar();
    }
  };

  const isCart = useSelector((state) => state.cart.length);
  return (
    <div className={desktop ? "cart-btn_desktop" : "cart-btn mobile"}>
      <LinkRouter
        className={isCart ? "button with-goods" : "button"}
        to="/cart"
        onClick={handleNavbar}
      >
        <img src={cartImg} alt="Cart" />
        <button className="btn cart">Корзина</button>
      </LinkRouter>
    </div>
  );
};
const HeaderBreadCrumbs = () => {
  const paths = [
    // { title: "", path: "Корзина" },
    { title: "cart", path: "Корзина" },
    { title: "favorite", path: "Изнбранные" },
    { title: "about-us", path: "О нас" },
    { title: "hot", path: "Новинки" },
    { title: "bestSellers", path: "Хит продаж" },
    { title: "news", path: "Новости" },
    { title: "help", path: "Помощь" },
    { title: "public-offer", path: "Публичная офферта" },
    { title: "collections", path: "Коллекции" },
    { title: "search", path: "Результаты поиска" },
  ];
  let { pathname } = useLocation();
  
  pathname = pathname.split("/")[1];
  let currentPath = paths.find((item) => pathname == item.title);

  // console.log(currentPath);
  // console.log(pathname);

  // if ((pathname = " ")) {
  //   console.log("AAAA");
  //   return <></>;
  // }
  // if (currentPath == undefined)
  // pathname == " " && <></>;
  //  : currentPath?.path = "Коллекция";

  // console.log("YYYO");

  return (
    <>
      {currentPath !== undefined ? (
        <div className="header-breadcrumbs container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="black" href="/">
              Главная
            </Link>
            <Link underline="none" color="#d1d1d1">{currentPath?.path}</Link>
          </Breadcrumbs>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);
  const info = useSelector((state) => state.info);

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
          <FavoriteButton toggleNavbar={toggleNavbar} />
          <CartButton toggleNavbar={toggleNavbar} />
        </ul>
        <div className="nav-contacts">
          <div className="nav-contacts__title">Свяжитесь с нами</div>
          <ContactWithUs />
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

const ContactWithUs = () => {
  const info = useSelector((state) => state.info);

  return (
    <div>
      <div className="nav-contacts__contact">
        {info.loading ? (
          <span>Loading</span>
        ) : (
          <div>
            <a href={info.data.numbers[0].data}>
              <span className="">Тел:</span> {info.data.numbers[0].title}
            </a>
          </div>
        )}
      </div>
    </div>
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

<Search />

export default Header;
