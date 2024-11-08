import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

export const clearList = async () => {
    try {
        const response = await axios.delete(`${API_URL}/clear`);
        return response.data;
    } catch (error) {
        console.error('Error clearing tasks:', error);
    }
};


export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const editText = async (id, text) => {
    try {
        const response = await axios.put(`${API_URL}/editText/${id}`, { text });
        return response.data;
    } catch (error) {
        console.error('Error editing task text:', error);
    }
};

export const editCompleted = async (id, completed) => {
    try {
        const response = await axios.put(`${API_URL}/editCompleted/${id}`, { completed });
        return response.data;
    } catch (error) {
        console.error('Error editing task completed status:', error);
    }
};
