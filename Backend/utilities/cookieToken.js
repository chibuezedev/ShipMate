const cookieToken = (user, res) => {
  const token = user.getJWT();

  const options = {
    expires: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("token", token, options);

  return res.status(200).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
