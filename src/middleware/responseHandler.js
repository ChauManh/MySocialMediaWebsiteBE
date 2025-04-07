const responseHandler = (req, res, next) => {
    res.success = (result, message = "Success") => {
      return res.status(200).json({ EC: 0, EM: message, result });
    };
  
    res.error = (errorCode = 1, message = "Error", status = 400) => {
      return res.status(status).json({ EC: errorCode, EM: message });
    };
  
    res.InternalError = (message = "Internal Error") => {
      return res.status(500).json({ EC: -1, EM: message });
    };
  
    next();
  };

  // const handleResponseResult = (result) => {
  //   return result.EC === 0
  //       ? res.success(result.result, result.EM)
  //       : res.error(result.EC, result.EM);
  // } 
  export default responseHandler

  // export { responseHandler, handleResponseResult };