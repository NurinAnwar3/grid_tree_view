// src/context/ApiClientContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import createApiClient from '../api/ApiClient';

const ApiClientContext = createContext(null);

export const ApiClientProvider = ({ children }) => {
  const [apiClient, setApiClient] = useState(null);

  useEffect(() => {
    const initApiClient = async () => {
      const client = await createApiClient();
      setApiClient(client);
    };

    initApiClient();
  }, []);

  if (!apiClient) return 

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  return useContext(ApiClientContext);
};
