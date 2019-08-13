import bcrypt from 'bcryptjs';

import User from '../models/user';
import Session from '../models/session'

const initSession = async (userId) => {
  const token = await Session.generateToken();
  const session = new Session({ token, userId });
  await session.save();
  return session;
}

const isEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return emailRegex.test(email);
}

const registerUser = async (req, res) => {

  const { email, password } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ 
      message: 'Email must be a valid email address.', 
    })
  }

  if (typeof password !== 'string') {
    return res.status(400).json({ 
      message: 'Password must be a string.', 
    })
  }

  const user = new User({email, password});
  const persistedUser = await user.save();
  const userId = persistedUser._id;
  const session = await initSession(userId);

  res
    .cookie('token', session.token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1209600000, // 2 weeks
      secure: process.env.NODE_ENV === 'production', // will only be set to true in production
    })
    .status(201)
    .json({
      title: 'User Registration Successful',
      detail: 'Successfully registered new user',
      id: user._id,
    });
} 

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ 
      title: 'Bad Request',
      message: 'Email must be a valid email address', 
    })
  }

  if (typeof password !== 'string') {
    return res.status(400).json({
      title: 'Bad Request',
      message: 'Password must be a string', 
    })
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      title: 'Invalid Credentials',
      detail: 'Check email and password combination',
      error: err,
    });
  }

  //using bcrypt to compare passwords
  const passwordValidated = await bcrypt.compare(password, user.password);
  if (!passwordValidated) {
    res.status(401).json({
      title: 'Invalid Credentials',
      detail: 'Check email and password combination',
    });
  }

  const session = await initSession(userId);

  // same options as before!
  res
    .cookie('token', session.token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1209600000,
      secure: process.env.NODE_ENV === 'production',
    })
    .json({
      title: 'Login Successful',
      detail: 'Successfully validated user credentials',
    });

}

const authenticateUser = async (req, res) => {
  try {
    // using object destructuring to grab the userId from the request session
    const { userId } = req.session;

    // only retrieve the authenticated user's email
    const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });

    res.json({
      title: 'Authentication successful',
      detail: 'Successfully authenticated user',
      user,
    });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Not authorized to access this route',
          errorMessage: err.message,
        },
      ],
    });
  }
}

export default {
  registerUser,
  loginUser,
  authenticateUser
}