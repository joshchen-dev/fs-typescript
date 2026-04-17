import { Alert } from "@mui/material";
import axios, { AxiosError } from "axios";

interface BackendError {
  error: {
    message: string,
    path: string[]
  }[]
}

const Notification = ({error}: {error: AxiosError<BackendError> | unknown}) => {
  if (!axios.isAxiosError<BackendError>(error)) {
    return null;
  }
  
  console.log(error.response?.data.error[0]);

  return (
    <Alert severity="error">{error.response?.data.error[0].path} {error.response?.data.error[0].message}</Alert>
  );
};

export default Notification;