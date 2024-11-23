'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

// Định nghĩa kiểu severity cho snackbar
type SnackbarSeverity = "success" | "error" | "info" | "warning";

// Định nghĩa kiểu dữ liệu trong context
interface SnackbarContextType {
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
  SnackbarComponent: () => JSX.Element;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// Provider component
interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("success");

  const showSnackbar = (message: string, severity: SnackbarSeverity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Component Snackbar
  const SnackbarComponent = (): JSX.Element => (
    <MuiSnackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarSeverity}
        variant="filled"
      >
        {snackbarMessage}
      </Alert>
    </MuiSnackbar>
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar, SnackbarComponent }}>
      {children}
    </SnackbarContext.Provider>
  );
};

// Hook để sử dụng SnackbarContext
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

