import api from './api';

export const getUser = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createUser = async (data) => {
    try {
        const response = await api.post('/user', data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (id, data) => {
    try {
        console.log(id);
        const response = await api.put(`/user/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async () => {
    try {
        const response = await api.delete('/user');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}