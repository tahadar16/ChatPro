const handleError = (error, res, next) => {
  // Check the error is a validation error
  if (error instanceof Array) {
    console.log("Validation error detected => ", error);
    res.status(400).json({ error: error[0] });
    next();
  } else if (error.message !== "undefined" && !error.message.isEmpty) {
    res.status(400).json({ error: { msg: error.message } });
    next();
  } else {
    console.log("instance not detected");
    res.status(500).json({ error: { msg: "Server Error" } });
    // Pass error on if not a validation error
    next(error);
  }
};

export default handleError;
