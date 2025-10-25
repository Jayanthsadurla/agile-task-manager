import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
    // Sprint endpoints
    getAllSprints: () => 
        axios.get(`${API_BASE_URL}/sprints/`),
    
    getSprint: (id) => 
        axios.get(`${API_BASE_URL}/sprints/${id}/`),
    
    getSprintBoard: (id) => 
        axios.get(`${API_BASE_URL}/sprints/${id}/board/`),
    
    getSprintStats: (id) => 
        axios.get(`${API_BASE_URL}/sprints/${id}/stats/`),
    
    createSprint: (data) => 
        axios.post(`${API_BASE_URL}/sprints/`, data),
    
    // Task endpoints
    getAllTasks: () => 
        axios.get(`${API_BASE_URL}/tasks/`),
    
    getTasksBySprint: (sprintId) => 
        axios.get(`${API_BASE_URL}/tasks/?sprint=${sprintId}`),
    
    createTask: (data) => 
        axios.post(`${API_BASE_URL}/tasks/`, data),
    
    updateTask: (id, data) => 
        axios.put(`${API_BASE_URL}/tasks/${id}/`, data),
    
    updateTaskStatus: (id, status) => 
        axios.patch(`${API_BASE_URL}/tasks/${id}/update_status/`, { status }),
    
    deleteTask: (id) => 
        axios.delete(`${API_BASE_URL}/tasks/${id}/`),
};