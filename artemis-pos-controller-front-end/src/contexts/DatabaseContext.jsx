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

  const checkIsRedFlag = (lastPurchaseDate) => {
    const now = new Date();
    const lastPurchase = new Date(lastPurchaseDate);

    const nowUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
    );
    const lastPurchaseUTC = Date.UTC(
      lastPurchase.getUTCFullYear(),
      lastPurchase.getUTCMonth(),
      lastPurchase.getUTCDate(),
    );

    const diferencaEmDias = Math.floor(
      (nowUTC - lastPurchaseUTC) / (1000 * 60 * 60 * 24),
    );

    return diferencaEmDias >= 5;
  };

  return (
    <DatabaseContext.Provider
      value={{ database, setDatabase, fetchData, checkIsRedFlag }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
