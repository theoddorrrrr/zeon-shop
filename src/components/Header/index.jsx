import { getLogo, getContacts, fetchContacts } from "../../api/API";
import { useEffect, useState } from "react";
import search from "../../assets/icons/search.png";
import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import closeBtn from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsNavbarAction } from "../../store/reducers/navbarSlice";
import favoriteImg from "../../assets/icons/heart.png";
import cartImg from "../../assets/icons/cart.png";

const Header = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [])

  return (
    <header className="header">
      <div className="header-container container">
        <div className="header-wrapper">
          {isNavbar ? <Navbar /> : null}
          <HeaderBody />
          {/* <HeaderDesktop /> */}
          <Divider className="header__divider" />
          <HeaderBreadCrumbs />
        </div>
      </div>
    </header>
  );
};

const HeaderBody = () => {
  const [logo, setLogo] = useState();

  useEffect(() => {
    const f = async () => {
      const responseLogo = await getLogo();
      setLogo(responseLogo.data.src);
    };
    f();
  }, []);

  return (
    <div className="header-body">
      <Burger />
      <img className="header__logo" src={logo} />
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
  
  return (
    <nav className="nav nav-desktop">
      
    </nav>
  )
}

const Navbar = () => {
  const dispatch = useDispatch();
  const isNavbar = useSelector((state) => state.navbar.isNavbar);
  const contacts = useSelector((state) => state.contacts);
  const contact = useSelector((state) => state.contacts.contacts.numbers[0].number)

  const toggleNavbar = () => {
    dispatch(setIsNavbarAction(isNavbar));
    document.body.classList.toggle("fixed");
  };

  return (
    <nav className="nav nav-mobile">
      <div className="nav__menu">
        <ul className="nav__list">
          <li className="nav__title">Меню</li>
          <li>О нас</li>
          <li>Новости</li>
          <li>Коллекция</li>

          <Divider />

          <div className="button">
            <img src={favoriteImg} alt="Favorite" />
            <button className="btn favorite">Избранное</button>
          </div>
          <div className="button">
            <img src={cartImg} alt="Cart" />
            <button className="btn cart">Корзина</button>
          </div>
        </ul>
        <div className="nav-contacts">
          <div className="nav-contacts__title">Свяжитесь с нами</div>
          <div className="nav-contacts__contact">{contact}</div>
          <div className="nav-contacts__social-media">
            {contacts.loading ? (
              <div>Loading</div>
            ) : (
              contacts.contacts.mobileSocialMedia.map((item) => {
                return (<div key={item.id}>
                  <a href={item.data}>
                    <img src={item.src} alt={item.title} />
                  </a>
                </div>)
              })
            )}
          </div>
        </div>
      </div>
      <img src={closeBtn} onClick={toggleNavbar} className="close-btn" />
      <div className="nav__backdrop"></div>
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
