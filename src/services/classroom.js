import api from './api';

export const getClassrooms = async () => {
    const response = await api.get('/class')
    return response.data
}

export const getClassroom = async (id) => {
    const response = await api.get(`/class/${id}`)
    return response.data
}

export const deleteClassroom = async (id) => {
    const response = await api.delete(`/class/${id}`)
    return response.data
}