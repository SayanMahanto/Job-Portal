import UserModel from "../models/UserModel.js";

// Update user controller
export const updateUserController = async (req, res, next) => {
  const { name, email, lastname, location } = req.body;
  if (!name || !email || !lastname || !location) {
    next("Please provide all fields");
  }
  const user = await UserModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

// Get user controller
export const getUserController = async (req, res, next) => {
  try {
    const user = await UserModel.findById({ _id: req.body.user.userId });
    user.password = undefined;
    if (!user) {
      return res.send(200).send({
        message: "User Not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth Error",
      success: false,
      error: error.message,
    });
  }
};
