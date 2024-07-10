import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

const TasksProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [listId, setListId] = useState();
  return (
    <DataContext.Provider value={{ data, setData, listId, setListId }}>
      {children}
    </DataContext.Provider>
  );
};

function useTasksData() {
  const context = useContext(DataContext);
  return context;
}

export { TasksProvider, useTasksData };
