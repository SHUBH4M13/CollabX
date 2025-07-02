import { create } from 'zustand';

const dashboardstore = create((set) => ({
  firstname: '',
  lastname: '',
  email: '',
  roles: [],
  projects: [],

  setUserData: ({ firstname , lastname , email, roles , projects }) => set(() => ({
    firstname,
    lastname,
    email,
    roles,
    projects
  })),

  clearUserData: () => set(() => ({
    firstname: '',
    lastname: '',
    email: '',
    roles: [],
    projects: []
  }))

}));

export default dashboardstore;
