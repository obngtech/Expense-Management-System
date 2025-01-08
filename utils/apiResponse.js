const APIresponse = (res, status, message, data) => {
  const response = { message };
  if (data) {
    response.data = data;
  }
  return res.status(status).json(response);
};

module.exports = APIresponse;
