import api from './api';

export const getVenues = async () => {
  const response = await api.get('/venue')
  return response.data
}

export const getVenue = async (id) => {
  const response = await api.get(`/venue/${id}`)
  return response.data
}

export const createVenue = async (venue) => {
  const response = await api.post('/venue', venue)
  return response.data
}

export const updateVenue = async (id, venue) => {
  const response = await api.put(`/venue/${id}`, venue)
  return response.data
}

export const deleteVenue = async (id) => {
  const response = await api.delete(`/venue/${id}`)
  return response.data
}