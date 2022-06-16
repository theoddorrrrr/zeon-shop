import axios from "axios";
import { GetInfoAction } from "../store/reducers/infoSlice";
import { GetPublicOfferAction } from "../store/reducers/publicOfferSlice";
import { GetInterestedGoods, GetMainInfoAction } from "../store/reducers/mainInfoSlice";
import {
  GetHotGoodsAction,
  GetMoreHotGoodsAction,
} from "../store/reducers/hotGoodsSlice";
import {
  GetBestSellersGoodsAction,
  GetMoreBestSellersGoodsAction,
} from "../store/reducers/bestSellersSlice";
import {
  GetAllCollections,
  GetCollectionsAction,
  GetMoreCollections,
  GetPaginatedCollectionsAction,
} from "../store/reducers/collectionsSlice";
import { GetOneCollectionsAction, GetPaginatedOneCollectionAction } from "../store/reducers/oneCollection";
import { GetAllDataAction } from "../store/reducers/searchSlice";
import { GetAboutUsActuion } from "../store/reducers/aboutUsSlice";
import { GetHelpAction } from "../store/reducers/helpSlice";
import { GetMoreNewsAction, GetNewsAction } from "../store/reducers/newsSlice";

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json"
  }
});

// Base Info

export const fetchInfo = () => {
  return function (dispatch) {
    instance.get("info").then((json) => dispatch(GetInfoAction(json.data)));
  };
};

export const fetchMainInfo = () => {
  return function (dispatch) {
    instance
      .get("main-page")
      .then((json) => dispatch(GetMainInfoAction(json.data)));
  };
};

// Hot

export const fetchHotGoods = (size = 4) => {
  return function (dispatch) {
    instance
      .get(`hot?_limit=${size}`)
      .then((json) => dispatch(GetHotGoodsAction(json.data)));
  };
};

export const fetchMoreHotGoods = () => {
  return function (dispatch) {
    instance
      .get(`hot?_start=4&_end=12`)
      .then((json) => dispatch(GetMoreHotGoodsAction(json.data)));
  };
};

// Best Sellers

export const fetchBestSellers = (size = 4) => {
  return function (dispatch) {
    instance
      .get(`bestSellers?_limit=${size}`)
      .then((json) => dispatch(GetBestSellersGoodsAction(json.data)));
  };
};

export const fetchMoreBestSellers = () => {
  return function (dispatch) {
    instance
      .get(`bestSellers?_start=4&_end=12`)
      .then((json) => dispatch(GetMoreBestSellersGoodsAction(json.data)));
  };
};

// Public Offer

export const fetchPublicOffer = () => {
  return function (dispatch) {
    instance
      .get("public-offer")
      .then((json) => dispatch(GetPublicOfferAction(json.data)));
  };
};

// Collections

export const fetchColletions = () => {
  return function (dispatch) {
    instance
      .get("collections?_limit=4")
      .then((json) => dispatch(GetCollectionsAction(json.data)));
  };
};

export const fetchMoreColletions = () => {
  return function (dispatch) {
    instance
      .get("collections?_start=4&_end=8")
      .then((json) => dispatch(GetMoreCollections(json.data)));
  };
};

export const fetchAllCollections = () => {
  return function (dispatch) {
    instance
      .get("collections")
      .then((json) => dispatch(GetAllCollections(json.data)));
  };
};

export const fetchPaginatedCollection = (limit = 4, page = 1) => {
  return function (dispatch) {
    instance
      .get(`collections?_limit=${limit}&_page=${page}`)
      .then((json) => dispatch(GetPaginatedCollectionsAction(json)));
  };
};

// One Collection

export const fetchCollection = (pathname) => {
  return function (dispatch) {
    instance
      .get(`${pathname}`)
      .then((json) => dispatch(GetOneCollectionsAction(json.data)));
  };
};

export const fetchPaginatedOneCollection = (limit = 4, page = 1, pathname) => {
  return function (dispatch) {
    instance
      .get(`${pathname}?_limit=${limit}&_page=${page}`)
      .then((json) => dispatch(GetPaginatedOneCollectionAction(json.data)));
  };
};

// All goods for search

const hot = instance.get('hot').then(json => json.data)
const bestSellers = instance.get('bestSellers').then(json => json.data)
const summer2020 = instance.get('summer2020').then(json => json.data)
const spring2020 = instance.get('spring2020').then(json => json.data)
const winter2020 = instance.get('winter2020').then(json => json.data)
const fall2020 = instance.get('fall2020') .then(json => json.data)

export const fetchAllGoods = () => {
  return function (dispatch) {
    axios.all([hot, bestSellers, summer2020, spring2020, winter2020, fall2020])
    .then(json => dispatch(GetAllDataAction(json)))
  }
}

// About Us

export const fetchAboutUs = () => {
  return function (dispatch) {
    instance
      .get(`aboutUs`)
      .then((json) => dispatch(GetAboutUsActuion(json.data)));
  };
};

// Help

export const fetchHelp = () => {
  return function (dispatch) {
    instance
      .get(`help`)
      .then((json) => dispatch(GetHelpAction(json.data)));
  };
};

// News

export const fetchNews = (limit = 4, page = 1) => {
  return function (dispatch) {
    instance
      .get(`news?_limit=${limit}&_page=${page}`)
      .then((json) => dispatch(GetNewsAction(json.data)));
  };
}

export const fetchMoreNews = (limit = 4, page = 1) => {
  return function (dispatch) {
    instance
      .get(`news?_limit=${limit}&_page=${page}`)
      .then((json) => dispatch(GetMoreNewsAction(json.data)));
  };
};

// Interest

export const fetchInterested = () => {
  return function (dispatch) {
    instance
      .get(`hot?_limit=5`)
      .then((json) => dispatch(GetInterestedGoods(json.data)));
  };
};


// Cart

export const postCart = (data) => {
  instance.post(`orders`, data)
}
