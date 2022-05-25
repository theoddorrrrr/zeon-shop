import { getLogo, getContacts } from "../../api/API";
import { useEffect, useState } from "react";
import search from "../../assets/icons/search.png";

const Header = () => {
  const [logo, setLogo] = useState();
  const [email, setEmail] = useState();
  const [numbers, setNumbers] = useState();
  const [socialMedia, setSocialMedia] = useState();

  const [navbar, setNavbar] = useState(false);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    const f = async () => {
      const responseLogo = await getLogo();
      const responseContacts = await getContacts();

      setLogo(responseLogo.data.src);
      setEmail(responseContacts.data.email);
      setNumbers(responseContacts.data.numbers);
      setSocialMedia(responseContacts.data.links);
    };
    f();
  }, []);

  return (
    <header className="header">
        {navbar ? <Navbar /> : null}

      <Burger toggleNavbar={toggleNavbar} />

      <img src={logo} />

      <Search />

      {/* {email}

      {numbers
        ? numbers.map((item) => <div key={item.id}>{item.number}</div>)
        : null} */}
    </header>
  );
};

const Navbar = () => {
  return <nav className="nav">
      <ul>
          <li>Меню</li>
          <li>О нас</li>
          <li>Новости</li>
          <li>Коллекция</li>
      </ul>
  </nav>;
};

const Burger = ({ toggleNavbar }) => {
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
