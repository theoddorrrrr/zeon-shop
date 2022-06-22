import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/API";
import Interested from "../../components/Interested";
import OrderItem from "../../components/OrderItem";
import { useAuth } from "../../hooks/use-auth";

const OrdersPage = () => {
  const { isAuth, id } = useAuth();
  const [userState, setUserState] = useState([]);
  const navigate = useNavigate();

  !isAuth && navigate("/");
  // console.log(email, id);

  const getData = async () => {
    const { data } = await instance.get(`users/${id}`);
    setUserState(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // const state = useSelector(state => state.userState)
  // console.log(state);

  // console.log(userState);

  // Takes goods from local storage
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", []);

  const favorites = useSelector((state) => state.favorites);
  const interestedGoods = useSelector((state) => state.mainInfo.interested);

  console.log(userState.orders);

  const [expanded, setExpanded] = useState(false);

  // console.log(expanded);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="favorite-wrapper">
      {!userState.orders || userState.orders.length < 1 ? (
        <div style={{ width: "100%" }}>
          <div className="cart__title">Заказы</div>
          <div className="cart__text">У вас пока нет заказов</div>

          <div className="cart__title interested__title">
            Возможно Вас заинтересует
          </div>

          <div className="goods__items interested__goods">
            {interestedGoods.map((item) => {
              const isFavorite = fav && fav.some((i) => i.id === item.id);

              return (
                <Interested item={item} isFavorite={isFavorite} key={item.id} />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="cart__title">Заказы</div>
          <div className="cart__text">
            Всего заказов: {userState.orders.length}
          </div>

          <div className="order__items">
            {userState.orders.map((item, index) => {
              return (
                <div className="order__item" key={index}>
                  <div className="order__details">
                    <div className="order__detail">
                      Ликеек: {item.cartDetails.totalLines}
                    </div>
                    <div className="order__detail">
                      Товаров: {item.cartDetails.totalGoods}
                    </div>
                    <div className="order__detail">
                      Цена до скидки: {item.cartDetails.totalPrice} р
                    </div>
                    <div className="order__detail">
                      Скидка: {item.cartDetails.discount} р
                    </div>
                    <div className="order__detail">
                      Итого: {item.cartDetails.price} р
                    </div>

                    <div className="order__goods">
                      <OrderItem
                        key={index}
                        index={index}
                        item={item.goods}
                        expanded={expanded}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
