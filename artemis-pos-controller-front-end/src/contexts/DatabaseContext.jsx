import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const DatabaseContext = createContext();

export function DatabaseContextProvider({ children }) {
  const [database, setDatabase] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/pos');
      setDatabase(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DatabaseContext.Provider value={{ database, setDatabase, fetchData }}>
      {children}
    </DatabaseContext.Provider>
  );
}
