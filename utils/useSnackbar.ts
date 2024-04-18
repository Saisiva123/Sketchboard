"use client"

import { useContext, useCallback, useEffect } from "react";
import { SnackbarType } from "./snackbar.types";
import { SnackbarContext } from "./snackbar.provider";

export default function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar was called outside of SnackbarProvider");
  }

  const { dispatch } = context;
  
  return useCallback(
    (snack: SnackbarType) => {
      dispatch({ type: "ADD_SNACKBAR", payload: { current: snack } });
    },
    [dispatch]
  );
 
}
