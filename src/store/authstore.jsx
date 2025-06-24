import {create} from "zustand"

const authstore = create((set , get) => ({
    emp_id: "",
    set_emp_id: (user_id) => set((state) => ({ emp_id: user_id })),
    remove_emp_id: () => set({emp_id:""}),
  }))

export default authstore;