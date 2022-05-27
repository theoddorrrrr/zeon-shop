import {combineReducers} from 'redux'
import { navbarSlice } from './navbarSlice'
import { infoSlice } from './infoSlice'
import { publicOfferSlice } from './publicOfferSlice'
import { mainInfoSlice } from './mainInfoSlice'


export const rootReducer = combineReducers({
    navbar: navbarSlice,
    info: infoSlice,
    publicOffer: publicOfferSlice,
    mainInfo: mainInfoSlice
})
