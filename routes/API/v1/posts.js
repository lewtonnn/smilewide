const router = require('express').Router();
const passport = require('passport');
require('../../../config/passport');
const initFileUploader = require('../../../config/multerS3');
const Posts = require('../../../models/Post');
const ash = require('../../../helpers/asyncHandler');

const fileUploader = initFileUploader('/posts');

router.post('/',
    [
      passport.authenticate('jwt', { session: false }),
      ash(fileUploader.array('post_content', 1)),
    ],
    ash(async (req, res) => {

      const { title } = req.body;
      const url = req.files[0].location;

      const post = await new Posts({ title, url, author: req.user._id });
      post.save();

      res.json(post);
    }));

router.delete('/', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const post = await new Posts({ email, password: cryptedPassword });
      post.save();

      res.json({ _id: user._id, email: user.email });
    }));

router.get('/', (req, res) => {
  res.json({ msg: 'ok api/v1/users' });
});

module.exports = router;