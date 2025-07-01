// src/store/userStore.js
import { create } from 'zustand';

const dashboardstore = create((set) => ({
  firsname: '',
  lastname: '',
  email: '',
  roles: [],
  projects: [],

  setUserData: ({ firsname , lastname , email, roles }) => set(() => ({
    firsname,
    lastname,
    email,
    roles,
    projects
  })),

  clearUserData: () => set(() => ({
    firsname: '',
    lastname: '',
    email: '',
    roles: [],
    projects: []
  }))

}));

export default dashboardstore;
