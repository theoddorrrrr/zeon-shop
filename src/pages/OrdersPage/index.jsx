import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";

const OrdersPage = () => {
  const [data, setData] = useState([]);

  const {email, id} = useAuth()
  console.log(email, id);

//   const getData = async () => {
//     const { data } = await instance.get(`${collection}/${id}`);
//     setData(data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

  return <div>OrdersPage</div>;
};

export default OrdersPage;
