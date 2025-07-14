import { Bounce, toast } from "react-toastify";
// import LogoutCallback from "./logout";

const ErrorAlert = (error, navigation) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
  };
  
  if (error?.response) {

    const errorData = error?.response?.data?.errors;
    let totalErrors = 0

    if(errorData) {
      totalErrors = Object.keys(errorData).reduce((total, field) => total + errorData[field].length, 0);
    }

    switch (error?.response?.status) {
      case 400:
      case 404: {
        if (error?.response?.data?.errors && totalErrors > 0) {
          let errorList = error?.response?.data?.errors;
          for (let key in errorList) {
            toast.error(key+": "+errorList[key][0], toastOptions);
          }
        } else if (error?.response?.data?.message) {
         toast.error(error.response.data.message, toastOptions);

        } else if (error?.response?.data?.title) {
          toast.error(error.response.data.title, toastOptions);

        } else if (Array.isArray(error.response.data) && error?.response?.data.length > 0) {
          let errorList = error?.response?.data;

          for (let key in errorList) {
            toast.error(errorList[key], {
              position: "top-right",
              autoClose: 6000,
            });
          }
        }  else if (error?.response?.data) {
         toast.error(error.response.data, toastOptions);
        }
        else {
          toast.error(error.response.data, toastOptions);
        }
        break;
      }
      case 401:
        // LogoutCallback(navigation);
        break;
      case 500:
        toast.error("Data not found", toastOptions);
        break;
      default:
        toast.error("An unexpected error occurred", toastOptions);
        break;
    }
  } else if(error.message){
    toast.error(error.message, toastOptions);
  } else {
    toast.error("An error occurred without a response", toastOptions);
  }

};

export default ErrorAlert;
