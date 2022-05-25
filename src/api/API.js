import axios from 'axios'

export const getLogo = async () => {
    const response = await axios.get('http://localhost:3000/logo')

    return response
}

export const getContacts = async () => {
    const response = await axios.get('http://localhost:3000/contacts')

    return response
}



    