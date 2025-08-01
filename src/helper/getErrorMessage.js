
const getErrorMessage = (error) => {
  return (
    error.response?.data?.errorMesage ||
    error.response?.data?.message?.error?.message ||
    error.response?.data?.message ||
    "An unexpected error occurred"
  );
};

export default getErrorMessage;
