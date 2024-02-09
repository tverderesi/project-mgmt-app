import React, { useState, createContext } from "react";

type EditModeContextProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EditModeContext = createContext<EditModeContextProps>({
  editMode: false,
  setEditMode: () => {},
});

export function EditModeProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [editMode, setEditMode] = useState(false);
  return <EditModeContext.Provider value={{ editMode, setEditMode }}>{children}</EditModeContext.Provider>;
}
