import {combineReducers} from 'redux'
import { navbarSlice } from './navbarSlice'
import { infoSlice } from './infoSlice'
import { publicOfferSlice } from './publicOfferSlice'
import { mainInfoSlice } from './mainInfoSlice'
import { hotGoodsSlice } from './hotGoodsSlice'
import { favoritesSlice } from './favoritesSlice'
import { bestSellersSlice } from './bestSellersSlice'
import { collectionsSlice } from './collectionsSlice'
import { oneCollectionSlice } from './oneCollection'
import { cartSlice } from './cartSlice'
import { searchSlice } from './searchSlice'
import { aboutUsSlice } from './aboutUsSlice'
import { helpSlice } from './helpSlice'
import { newsSlice } from './newsSlice'


export const rootReducer = combineReducers({
    navbar: navbarSlice,
    info: infoSlice,
    publicOffer: publicOfferSlice,
    mainInfo: mainInfoSlice,
    hotGoods: hotGoodsSlice,
    favorites: favoritesSlice,
    bestSellersGoods: bestSellersSlice,
    collections: collectionsSlice,
    oneCollection: oneCollectionSlice,
    cart: cartSlice,
    allGoods: searchSlice,
    aboutUs: aboutUsSlice,
    help: helpSlice,
    news: newsSlice
})
