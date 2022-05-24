import axios from 'axios'

export const getLogo = async () => {
    const response = await axios.get('http://localhost:3000/icons/1')
}

export const getContacts = axios.get('http://localhost:3000/contacts')

    