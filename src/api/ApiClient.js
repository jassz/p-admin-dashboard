// src/api/ApiClient.js
import { fetchConfig } from '../config/configService';

const createApiClient = async () => {
  const config = await fetchConfig();
  console.log('API Client config:', config);
  return {
    dashboardApiUrl: config.dashboardApiUrl,
    accountMgtApiUrl: config.accountMgtApiUrl
  };
};

export default createApiClient;