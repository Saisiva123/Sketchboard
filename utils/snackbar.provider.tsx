import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { SnackbarType } from './snackbar.types';
import reducer, { TAction } from './snackbar.reducer';
import Snackbar from "@/components/snackbar"

export const SnackbarContext = createContext<{
  queue: SnackbarType[];
  dispatch: React.Dispatch<TAction>;
}>({
  queue: [] as SnackbarType[],
  dispatch: () => { }
});

export const SnackbarProvider = (
  { children
  }: {
    children: React.ReactNode;
  }) => {
  const [{ queue }, dispatch] = useReducer(reducer, { queue: [] });

  useEffect(() => {
    let timeout: any;
    queue?.length ?
     timeout = setTimeout(() => { dispatch({ type: "REMOVE_SNACKBAR", payload: { key: queue[0]?.key } }) }, 3500) :
     null;

    return () => {
      clearTimeout(timeout)
    }
  }, [queue])

  return (
    <SnackbarContext.Provider value={{ queue, dispatch }}>
      {queue.map((snack, index) => (
        <Snackbar
          key={snack.key}
          className={`-mt-${index + 1} left-${index + 4}`}
          variant={snack.variant}
          icon={snack.icon}
          handleClose={() =>
            dispatch({ type: "REMOVE_SNACKBAR", payload: { key: snack.key } })
          }
          text={snack.text}
        />
      ))}
      {children}
    </SnackbarContext.Provider>
  );
}
