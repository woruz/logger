module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
    return;
  }

  next();
};
