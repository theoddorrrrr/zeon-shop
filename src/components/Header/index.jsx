import { fetchInfo, instance } from "../../api/API";
import { useEffect, useState } from "react";
import { Breadcrumbs, Divider, Link } from "@mui/material";
import closeBtn from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsNavbarAction } from "../../store/reducers/navbarSlice";
import favoriteImg from "../../assets/icons/heart.png";
import cartImg from "../../assets/icons/cart.png";
import {
  Link as LinkRouter,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Search from "../Search";
import {
  setLoginAction,
  setModalAction,
} from "../../store/reducers/modalSlice";
import SearchMobile from "../SearchMobile";
import { useAuth } from "../../hooks/use-auth";

import { removeUserAction } from "../../store/reducers/userSlice";
import userImg from "../../assets/icons/user-outlined.png";

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
  const { isAuth, email } = useAuth();

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
                <LinkRouter to="collections">Коллекции</LinkRouter>
              </li>
              <li>
                <LinkRouter to="news">Новости</LinkRouter>
              </li>
            </ul>

            <div className="header-top__right">
              <ContactWithUs />
              {isAuth ? <Logout email={email} /> : <Login />}
            </div>
          </div>
        </div>

        <Divider style={{ flex: "0 0 100%" }} />
      </div>
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className="header__login" onClick={() => dispatch(setLoginAction())}>
      Login
    </div>
  );
};

const Logout = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <>
      <div
        className="header__orders"
        onClick={() => isAuth && navigate("/orders")}
      >
        {email}
      </div>
      <div
        className="header__login"
        onClick={() => dispatch(removeUserAction())}
      >
        Logout
      </div>
    </>
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
        <SearchMobile />

        <div className="header-buttons">
          <FavoriteButton desktop={true} />
          <span className="header-buttons__divider"></span>
          <CartButton desktop={true} />
        </div>
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
        <button className="btn favorites">
          <span>Избранное</span>
        </button>
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
    { title: "cart", path: "Корзина" },
    { title: "favorite", path: "Избранное" },
    { title: "about-us", path: "О нас" },
    { title: "hot", path: "Новинки" },
    { title: "bestSellers", path: "Хит продаж" },
    { title: "news", path: "Новости" },
    { title: "help", path: "Помощь" },
    { title: "public-offer", path: "Публичная офферта" },
    { title: "collections", path: "Коллекции" },
    { title: "search", path: "Результаты поиска" },
    { title: "orders", path: "Мои заказы" },
  ];

  const [data, setData] = useState([]);
  const [good, setGood] = useState({});

  const getData = async (collection) => {
    const { data } = await instance.get(`${collection}`);
    setData(data);
  };

  const getOneGood = async (collection, id) => {
    const { data } = await instance.get(`${collection}/${id}`);
    setGood(data);
  };

  let { pathname } = useLocation();

  const newPath = pathname.split("/")[1];
  let currentPath = paths.find((item) => newPath == item.title);

  useEffect(() => {
    if (
      pathname.split("/")[1] === "collections" &&
      pathname.split("/").length > 2
    ) {
      getData(pathname.split("/")[2]);
    }
    if (
      pathname.split("/")[1] === "collections" &&
      pathname.split("/").length == 4
    ) {
      getOneGood(pathname.split("/")[2], pathname.split("/")[3]);
    }
  }, []);

  useEffect(() => {
    if (
      pathname.split("/")[1] === "collections" &&
      pathname.split("/").length > 2
    ) {
      getData(pathname.split("/")[2]);
    }
    if (
      pathname.split("/")[1] === "collections" &&
      pathname.split("/").length == 4
    ) {
      getOneGood(pathname.split("/")[2], pathname.split("/")[3]);
    }
  }, [pathname]);

  const navigate = useNavigate();

  return (
    <>
      {currentPath !== undefined ? (
        <div className="header-breadcrumbs container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="black"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Главная
            </Link>

            {pathname.split("/").length == 2 ? (
              <Link
                underline="none"
                style={{ cursor: "default" }}
                color="#d1d1d1"
              >
                {currentPath?.path}
              </Link>
            ) : (
              <Link
                underline="hover"
                color="black"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/${currentPath?.title}`)}
              >
                {currentPath?.path}
              </Link>
            )}

            {pathname.split("/")[1] === "collections" &&
              pathname.split("/").length == 3 && (
                <Link
                  underline="none"
                  style={{ cursor: "default" }}
                  color="#d1d1d1"
                >
                  {data[0]?.collectionTitle}
                </Link>
              )}
            {pathname.split("/")[1] === "collections" &&
              pathname.split("/").length > 3 && (
                <Link
                  underline="hover"
                  color="black"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/collections/${pathname.split("/")[2]}`)
                  }
                >
                  {data[0]?.collectionTitle}
                </Link>
              )}

            {pathname.split("/")[1] === "collections" &&
              pathname.split("/").length == 4 && (
                <Link
                  underline="none"
                  style={{ cursor: "default" }}
                  color="#d1d1d1"
                >
                  {good?.title}
                </Link>
              )}
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

  const { isAuth, email } = useAuth();

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
              Коллекции
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
          <Divider />

          {isAuth ? (
            <div className="navbar-mobile__user" onClick={() => toggleNavbar()}>
              <img className="navbar-mobile__img" src={userImg} />
              <Logout email={email} />
            </div>
          ) : (
            <div className="navbar-mobile__user" onClick={() => toggleNavbar()}>
              <img className="navbar-mobile__img" src={userImg} />
              <Login email={email} />
            </div>
          )}
        </ul>
        <div className="nav-contacts">
          <div className="nav-contacts__title">Свяжитесь с нами</div>
          <ContactWithUs />
          <div className="nav-contacts__social-media">
            {info.loading ? (
              <div>Loading</div>
            ) : (
              <>
                <div>
                  <a target="_blank" href={info.data.mobileSocialMedia[0].data}>
                    <img
                      src={info.data.mobileSocialMedia[0].src}
                      alt={info.data.mobileSocialMedia[0].title}
                    />
                  </a>
                </div>
                <div>
                  <a target="_blank" href={info.data.mobileSocialMedia[1].data}>
                    <img
                      src={info.data.mobileSocialMedia[1].src}
                      alt={info.data.mobileSocialMedia[1].title}
                    />
                  </a>
                </div>
                <div
                  onClick={() => {
                    dispatch(setModalAction());
                  }}
                >
                  <img
                    src={info.data.mobileSocialMedia[2].src}
                    alt={info.data.mobileSocialMedia[2].title}
                  />
                </div>
              </>
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
    <>
      <div className="nav-contacts__contact">
        {info.loading ? (
          <span>Loading</span>
        ) : (
          <>
            <a href={info.data.numbers[0].data}>
              <span className="">Тел:</span> {info.data.numbers[0].title}
            </a>
          </>
        )}
      </div>
    </>
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

export default Header;
