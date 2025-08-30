import api from '../config/api.js';

export const authServices = {

    // Single login for both doctor and patient
    login: async (email, password) => {
        return await api.post('/api/auth/login', { email, password });
    },

    // doctor register
    doctorRegister: async (userData) => {
        return await api.post('/api/auth/signup/doctor', userData);
    },

    // patient register
    patientRegister: async (userData) => {
        return await api.post('/api/auth/signup/patient', userData);
    },

    // logout
    logout: async () => {
        return await api.post('/api/auth/logout');
    }
}