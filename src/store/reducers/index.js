import {combineReducers} from 'redux'
import { navbarSlice } from './navbarSlice'
import { infoSlice } from './infoSlice'
import { publicOfferSlice } from './publicOfferSlice'
import { mainInfoSlice } from './mainInfoSlice'
import { hotGoodsSlice } from './hotGoodsSlice'
import { favoritesSlice } from './favoritesSlice'
import { bestSellersSlice } from './bestSellersSlice'


export const rootReducer = combineReducers({
    navbar: navbarSlice,
    info: infoSlice,
    publicOffer: publicOfferSlice,
    mainInfo: mainInfoSlice,
    hotGoods: hotGoodsSlice,
    favorites: favoritesSlice,
    bestSellersGoods: bestSellersSlice
})
