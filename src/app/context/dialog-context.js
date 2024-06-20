"use client"

import { createContext, useContext, useState, useEffect } from 'react';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const dialogState = localStorage.getItem('isDialogOpen');
    if (dialogState === 'true') {
      setDialogOpen(true);
    }
  }, []);

  const showDialog = () => {
    setDialogOpen(true);
    localStorage.setItem('isDialogOpen', 'true');
  };

  const hideDialog = () => {
    setDialogOpen(false);
    localStorage.setItem('isDialogOpen', 'false');
  };

  return (
    <DialogContext.Provider value={{ isDialogOpen, showDialog, hideDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
