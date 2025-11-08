import axios from 'axios';

const API_URL = 'http://localhost:3001/habits';

export const getHabits = () => axios.get(API_URL);
export const addHabit = (habit) => axios.post(API_URL, habit);
export const updateHabit = (id, habit) => axios.patch(`${API_URL}/${id}`, habit);
export const deleteHabit = (id) => axios.delete(`${API_URL}/${id}`);
