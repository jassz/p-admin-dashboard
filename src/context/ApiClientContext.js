// src/context/ApiClientContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import createApiClient from '../api/ApiClient';

const ApiClientContext = createContext(null);

export const ApiClientProvider = ({ children }) => {
  const [apiUrls, setApiUrls] = useState({
    dashboardApiUrl: null,
    accountMgtApiUrl: null
  });

  useEffect(() => {
    const initApiClient = async () => {
      const urls = await createApiClient();
      setApiUrls(urls);
    };

    initApiClient();
  }, []);

  if (!apiUrls.dashboardApiUrl || !apiUrls.accountMgtApiUrl) return null;

  return (
    <ApiClientContext.Provider value={apiUrls}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  return useContext(ApiClientContext);
};