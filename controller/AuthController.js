import UserModel from "../models/UserModel.js";

export const ResgiterController = async (req, res, next) => {
  const { name, email, password, lastname } = req.body;
  // validate
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required and should be greater than 6 characters");
  }
  const ExistingUser = await UserModel.findOne({ email });
  if (ExistingUser) {
    next("Email already exists, Please Login");
  }
  const user = await UserModel.create({ name, email, password, lastname });
  // token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user: {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      location: user.location,
    },
    token,
  });
};

export const LoginController = async (req, res, next) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    next("Please provide all fields");
  }
  // find user by email
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    next("No user found");
  }
  //
  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid password");
  } else {
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  }
};

// export const LoginController = async (req, res, next) => {
//   const { email, password } = req.body;

//   console.log("Received email and password:", email, password);

//   if (!email || !password) {
//     console.log("Missing fields");
//     return next(new Error("Please provide all fields"));
//   }

//   const user = await UserModel.findOne({ email }).select("+password");
//   if (!user) {
//     console.log("User not found");
//     return next(new Error("Invalid username or password"));
//   }

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     console.log("Password mismatch");
//     return next(new Error("Invalid username or password"));
//   }

//   user.password = undefined;
//   const token = user.createJWT();
//   res.status(200).json({
//     success: true,
//     message: "Login successfully",
//     user,
//     token,
//   });
// };
