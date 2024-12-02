"use client"
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the state
interface DataState {
  myData: string | null;
  totalTasks: number;
  totalBudget: number;
}

// Define the action types
type DataAction =
  | { type: 'SET_DATA'; payload: string }
  | { type: 'SET_TOTAL_TASKS'; payload: number }
  | { type: 'SET_TOTAL_BUDGET'; payload: number };

// Create the context with an initial empty object of DataState
const DataContext = createContext<{
  state: DataState;
  setData: (data: string) => void;
  setTotalTasks: (totalTasks: number) => void;
  setTotalBudget: (totalBudget: number) => void;
}>({
  state: {
    myData: null,
    totalTasks: 0,
    totalBudget: 0,
  },
  setData: () => {},
  setTotalTasks: () => {},
  setTotalBudget: () => {},
});

// Define initial state
const initialState: DataState = {
  myData: null,
  totalTasks: 0,
  totalBudget: 0,
};

// Define reducer function
const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, myData: action.payload };
    case 'SET_TOTAL_TASKS':
      return { ...state, totalTasks: action.payload };
    case 'SET_TOTAL_BUDGET':
      return { ...state, totalBudget: action.payload };
    default:
      return state;
  }
};

// Define data provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const setData = (data: string) => dispatch({ type: 'SET_DATA', payload: data });
  const setTotalTasks = (totalTasks: number) => dispatch({ type: 'SET_TOTAL_TASKS', payload: totalTasks });
  const setTotalBudget = (totalBudget: number) => dispatch({ type: 'SET_TOTAL_BUDGET', payload: totalBudget });

  return (
    <DataContext.Provider value={{ state, setData, setTotalTasks, setTotalBudget }}>
      {children}
    </DataContext.Provider>
  );
};

// Define custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
