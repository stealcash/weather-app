import { BASE_PATH } from "../app/constants";

//Function for handle all kind of error may come thorugh api 
export function handleErrorWithCode(err: any) {
  if (typeof err === 'undefined') {
    return {
      code: 500,
      message: "Unkown Error",
    };
  }

  if (typeof err === 'string') {
    return {
      code: 200,
      message: err,
    };
  }

  if (!err.response) {
    return {
      code: 500,
      message: err.toString(),
    };
  }

  if (err.response.status === 401) {
    window.location.replace(BASE_PATH);
  }

  if (err.response.status === 403) {
    window.location.replace(BASE_PATH);
  }



  if (err.response.status === 500) {
    return {
      code: 500,
      message: 'Something went wrong. Please try again after sometime!',
    };
  }

  if (err.response.data) {
    return {
      code: err.response.status,
      message: getFirstError(err.response.data.errors),
      errors: err.response.data.errors
    };
  }

  return {
    code: 500,
    message: err.toString(),
  };
}

// Get first error from error coming through api
export function getFirstError(errors: any): string {
  if (typeof errors === 'undefined') {
    return "Unkown Error";
  }
  if (typeof errors === 'string') {
    return errors;
  }
  if (Array.isArray(errors)) {
    return getFirstError(errors[0]);
  }

  const newError = errors[Object.keys(errors)[0]];
  return getFirstError(newError);
}