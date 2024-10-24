import { create } from "zustand";

const store = create((set) => ({
  fields: [],
  setFields: (newFields) => set(() => ({ fields: newFields })),
}));

export default store;
