import { create } from "zustand";

const store = create((set) => ({
  fields: [],
  formName: "Untitled form",
  formDescription: "",
  setFields: (newFields) => set(() => ({ fields: newFields })),
  setFormName: (newName) => set(() => ({ formName: newName })),
  setFormDescription: (newDescription) => set(() => ({ formDescription: newDescription })),
}));

export default store;
