import axios from "axios";
import { create } from "zustand";
import axiosInstance from "../helpers/axiosInstance";
import { toast } from "react-toastify";

const store = create((set) => ({
  fields: [],
  formName: "Untitled form",
  formDescription: "",
  newFormSaved: false,
  setNewFormSaved: (newFormSaved) => set(() => ({ newFormSaved })),
  setFields: (newFields) => set(() => ({ fields: newFields })),
  setFormName: (newName) => set(() => ({ formName: newName })),
  setFormDescription: (newDescription) => set(() => ({ formDescription: newDescription })),

  // Authentication State
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  // Simplified login action in Zustand
login: async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    const { userId, token, username, userEmail } = response.data; // Only receive userId and token
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id: userId, username, userEmail }));
      
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    set({ user: { id: userId, username:username, userEmail:userEmail }, token }); // Store userId in user object
    toast.success('Login successful');
    return true;
  } catch (error) {
    console.error('Login error:', error);
    const message = error.response.data.message || 'An error occurred';
    toast.error(message);
    return false;
  }
},


  // Register Action
  register: async (username, email, password) => {
    try {
      await axiosInstance.post('/api/auth/register', { username, email, password });
      toast.success('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response.data.message || 'An error occurred';
      toast.error(message);
    }
  },

  // Logout Action
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, token: null });
  },

  // Form State and Actions
  forms: [], // Stores user-created forms
  currentForm: null, // The form currently being created or edited

  // Fetch User Forms
  fetchUserForms: async () => {
    try {
      const response = await axiosInstance.get('/api/forms');
      set({ forms: response.data });
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  },

  // Create Form Action
  createForm: async (formName, formDescription, fields) => {
    try {
      const response = await axiosInstance.post('/api/forms', { formName, formDescription, fields });
      set((state) => ({ forms: [...state.forms, response.data] }));
      toast.success('Form created successfully');
    } catch (error) {
      console.error('Error creating form:', error);
      const message = error.response.data.message || 'An error occurred';
      toast.error(message);
    }
  },

  // Form Responses State and Actions
  responses: [], // Stores responses for a specific form

  // Delete form
  deleteForm: async (formId) => {
    try {
      await axiosInstance.delete(`/api/forms/${formId}`);
      set((state) => ({
        forms: state.forms.filter((form) => form._id !== formId),
      }));
      toast.success('Form deleted successfully');
    } catch (error) {
      console.error('Error deleting form:', error);
      const message = error.response.data.message || 'An error occurred';
      toast.error(message);
    }
  },

}));

export default store;
