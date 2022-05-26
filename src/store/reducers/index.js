import {combineReducers} from 'redux'
import { navbarSlice } from './navbarSlice'
import { contactsSlice } from './contactsSlice'


export const rootReducer = combineReducers({
    navbar: navbarSlice,
    contacts: contactsSlice
})
