import axios from "axios";
import { GetInfoAction } from "../store/reducers/infoSlice";
import { GetPublicOfferAction } from "../store/reducers/publicOfferSlice";
import { GetMainInfoAction } from "../store/reducers/mainInfoSlice";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const fetchInfo = () => {
  return function (dispatch) {
    instance.get("info").then((json) => dispatch(GetInfoAction(json.data)));
  };
};

export const fetchPublicOffer = () => {
  return function (dispatch) {
    instance
      .get("public-offer")
      .then((json) => dispatch(GetPublicOfferAction(json.data)));
  };
};

export const fetchMainInfo = () => {
    return function (dispatch) {
      instance
        .get("main-page")
        .then((json) => dispatch(GetMainInfoAction(json.data)));
    };
  };

// export const getAboutUs = async () => {
//     const response = await instance.get('aboutUs')

//     return response
// }
