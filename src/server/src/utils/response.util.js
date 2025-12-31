export const successResponse = async (
  res,
  status = 200,
  message = "Success",
  data = {}
) => {
  return res.status(status).json({
    success: true,
    message: message,
    data,
  });
};

export const errorResponse = async (
  res,
  status = 400,
  message = "Failed",
  data = {}
) => {
  return res.status(status).json({
    success: false,
    message: message,
    data: {},
  });
};
