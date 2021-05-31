require('dotenv').config({ path: '../../../.env' });
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const createError = require('http-errors');
const { check, validationResult } = require('express-validator');
const Users = require('../../../models/User');
const ash = require('../../../helpers/asyncHandler');

const lang = process.env.LANGUAGE;
const dictionary = require('../../../config/errorMessages');

router.post('/',
    [
      check('email', dictionary.users.invalidEmail).isEmail(),
      check('password', dictionary.users.invalidPassword).isLength({ min: 6 }),
      check('name', dictionary.users.invalidName).notEmpty(),
    ],
    ash(async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const cryptedPassword = await bcrypt.hash(password, 10);

      const user = await new Users({ email, password: cryptedPassword });
      user.save();

      res.json({ _id: user._id, email: user.email });
    }));

router.post('/login', ash(async (req, res, next) => {

  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    throw createError(404, dictionary.users.loginError);
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
  throw createError(404, dictionary.users.loginError);
}));

router.delete('/:userId', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const user = await Users.findById(req.params.userId);

      const avtiveUser = await Users.findById(req.user._id);

      if (user._id.toString() === req.user._id.toString()
          || avtiveUser.role === 'admin') {
        await user.remove();
      } else {
        throw createError(403, 'Unauthorized');
      }

      res.json({ msg: 'Deleted' });
    }));

router.get('/', ash(async (req, res) => {

  let { offset, limit } = req.body;
  if (!offset) offset = 0;
  if (!limit) limit = 50;

  let total = 0;
  let users = null;

  total = await Comments.estimatedDocumentCount();
  users = await Users.find().skip(+offset).limit(+limit);

  res.json({ payload: users, total });
}));

router.get('/me', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const me = await Users.findById(req.user._id);

      res.json({ payload: me });
    }));

router.get('/:userId', ash(async (req, res) => {

  const userId = req.params.userId;

  const user = await Users.findById(userId);

  res.json({ payload: user });
}));

module.exports = router;

module.exports = router;