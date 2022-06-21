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
import { useEffect, useState } from "react";
import {
  fetchBestSellers,
  fetchColletions,
  fetchHotGoods,
  fetchInterested,
  fetchMainInfo,
  instance,
} from "../../api/API";
import Details from "../Details";
import Collection from "../Collection";
import ScrollToTop from "../ScrollToTop";
import SearchPage from "../../pages/SearchPage";
import MediaButton from "../MediaButton";
import CallForm from "../../forms/CallForm";
import SuccessForm from "../../forms/SuccessForm";
import CartForm from "../../forms/CartForm";
import LoginForm from "../../forms/LoginForm";
import RegisterForm from "../../forms/RegisterForm";
import NotFoundPage from "../../pages/NotFoundPage";
import OrdersPage from "../../pages/OrdersPage";
import { useAuth } from "../../hooks/use-auth";
import { setUserStateAction } from "../../store/reducers/userStateSlice";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { modal } = useSelector((state) => state);
  const { isAuth, id } = useAuth();

  console.log(isAuth, id);

  const user = useSelector(state => state.userState)

  const getData = async () => {
    const { data } = await instance.get(`users?id=${id}`);
    // console.log(data);

    if (data.length > 0) {
      dispatch(setUserStateAction(data[0]))
    } else {
      const newUser = {"id": id, "cart": [], "favorites": [], "orders": []}

      await instance.post('users', newUser)
      await getData()
    }
  };

  useEffect(() => {
    isAuth && getData();
  }, [isAuth]);

  // console.log(user);

  useEffect(() => {
    dispatch(fetchMainInfo());
    dispatch(fetchInterested());
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
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>

      {modal.isModal && <CallForm />}
      {modal.isSuccess && <SuccessForm />}
      {modal.isCart && <CartForm />}
      {modal.isLogin && <LoginForm />}
      {modal.isRegister && <RegisterForm />}

      <Footer />
    </div>
  );
}

export default App;
