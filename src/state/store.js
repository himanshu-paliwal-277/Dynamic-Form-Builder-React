import axios from "axios";
import { create } from "zustand";

const store = create((set) => ({
  fields: [],
  formName: "Untitled form",
  formDescription: "",
  setFields: (newFields) => set(() => ({ fields: newFields })),
  setFormName: (newName) => set(() => ({ formName: newName })),
  setFormDescription: (newDescription) => set(() => ({ formDescription: newDescription })),

  // Authentication State
  user: null,
  token: localStorage.getItem('token') || null,

  // Simplified login action in Zustand
login: async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { userId, token, username, userEmail } = response.data; // Only receive userId and token
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    set({ user: { id: userId, username:username, userEmail:userEmail }, token }); // Store userId in user object
    alert('Login successful');
    return true;
  } catch (error) {
    console.error('Login error:', error);
    alert('Failed to login');
    return false;
  }
},


  // Register Action
  register: async (username, email, password) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      alert('Registration successful, please log in');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register');
    }
  },

  // Logout Action
  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, token: null });
  },

  // Form State and Actions
  forms: [], // Stores user-created forms
  currentForm: null, // The form currently being created or edited

  // Fetch User Forms
  fetchUserForms: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forms');
      set({ forms: response.data });
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  },

  // Create Form Action
  createForm: async (formName, formDescription, fields) => {
    try {
      const response = await axios.post('http://localhost:5000/api/forms', { formName, formDescription, fields });
      set((state) => ({ forms: [...state.forms, response.data] }));
      alert('Form created successfully');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  },

  // Form Responses State and Actions
  responses: [], // Stores responses for a specific form

  // Fetch Responses for a Form
  fetchResponses: async (formId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/${formId}/responses`);
      set({ responses: response.data });
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  }
}));

export default store;
