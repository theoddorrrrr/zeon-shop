import axios from 'axios'
import {GetContactsAction} from "../store/reducers/contactsSlice"


const instance = axios.create({
    baseURL: 'http://localhost:3000/',
  });

export const getLogo = async () => {
    const response = await instance.get('logo')

    return response
}

export const getContacts = async () => {
    const response = await instance.get('contacts')

    return response
}

export const fetchContacts = () => {
    return function(dispatch) {
        fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(json => dispatch(GetContactsAction(json)))
    }
}

export const getAboutUs = async () => {
    const response = await instance.get('aboutUs')

    return response
}



    