import Footer from "../Footer";
import Header from "../Header";
import "./App.scss";

import { Routes, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import AboutUsPage from "../../pages/AboutUsPage";
import CollectionsPage from "../../pages/CollectionsPage";
import NewsPage from "../../pages/NewsPage";
import FavirotePage from "../../pages/FavoritesPage";
import CartPage from "../../pages/CartPage";
import HelpPage from "../../pages/HelpPage";
import PublicOfferPage from "../../pages/PublicOfferPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHotGoods, fetchMainInfo } from "../../api/API";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMainInfo());
    !JSON.parse(localStorage.getItem("hotGoods")) && dispatch(fetchHotGoods())
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <div className="main__container container">
          <div className="main__content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/favorite" element={<FavirotePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/public-offer" element={<PublicOfferPage />} />
            </Routes>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
