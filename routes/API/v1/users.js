require('dotenv').config({ path: '../../../.env' });
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../../../models/User');
const ash = require('../../../helpers/asyncHandler');

router.post('/', ash(async (req, res) => {

  const { email, password } = req.body;
  const cryptedPassword = await bcrypt.hash(password, 10);

  const user = await new User({ email, password: cryptedPassword });
  user.save();

  res.json({ _id: user._id, email: user.email });
}));

router.get('/', (req, res) => {
  res.json({ msg: 'ok api/v1/users' });
});

router.post('/login', ash(async (req, res, next) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(createError(404, 'Incorrect email or password'));
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (passwordCorrect) {
    const payload = {
      user_id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ token });
  }
  return next(createError(404, 'Incorrect email or password'));
}));

module.exports = router;