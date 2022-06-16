import Footer from "../Footer";
import Header from "../Header";
import "./App.scss";

import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import AboutUsPage from "../../pages/AboutUsPage";
import CollectionsPage from "../../pages/CollectionsPage";
import NewsPage from "../../pages/NewsPage";
import FavirotePage from "../../pages/FavoritesPage";
import CartPage from "../../pages/CartPage";
import HelpPage from "../../pages/HelpPage";
import PublicOfferPage from "../../pages/PublicOfferPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchBestSellers,
  fetchColletions,
  fetchHotGoods,
  fetchInterested,
  fetchMainInfo,
} from "../../api/API";
import Details from "../Details";
import Collection from "../Collection";
import ScrollToTop from "../ScrollToTop";
import SearchPage from "../../pages/SearchPage";
import MediaButton from "../MediaButton";
import CallForm from "../../forms/CallForm";
import SuccessForm from "../../forms/SuccessForm";
import CartForm from "../../forms/CartForm";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { modal } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMainInfo());
    dispatch(fetchInterested())
    dispatch(fetchHotGoods());
    dispatch(fetchBestSellers());
    dispatch(fetchColletions());
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <div className="main__container container">
          <div className="main__content">
            {pathname == "/cart" || <MediaButton />}
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:collection" element={<Collection />} />
              <Route
                path="/collections/:collection/:id"
                element={<Details />}
              />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/favorite" element={<FavirotePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/public-offer" element={<PublicOfferPage />} />
              <Route path="/search-page" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </main>

      {modal.isModal && <CallForm />}
      {modal.isSuccess && <SuccessForm />}
      {modal.isCart && <CartForm />}

      <Footer />
    </div>
  );
}

export default App;
