module.exports = {
  extractErrorResponse(error) {
    const errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return {
      message: "Please, make sure all the data are valid",
      errors,
    }; 
  },

  getPaginationMetadata(rawPage = 1, rawSize = 20) {
    const size = typeof rawSize === "number" && rawSize <= 100 ? rawSize : 20;
    const page = typeof rawPage === "number" && rawPage > 0 ? rawPage : 1;

    const skip = size * page - size;

    return {
      skip,
      size,
      page,
    };
  },

  getTimeToRead(body) {
    return body.split(" ").length * 0.5;
  },
};
