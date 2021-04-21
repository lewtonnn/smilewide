const router = require('express').Router();
const passport = require('passport');
require('../../../config/passport');
const { check, validationResult } = require('express-validator');
const initFileUploader = require('../../../config/multerS3');
const Posts = require('../../../models/Post');
const Users = require('../../../models/User');
const createError = require('http-errors');
const ash = require('../../../helpers/asyncHandler');

const lang = process.env.LANGUAGE;
const dictionary = require('../../../config/dictionary')[lang];

const fileUploader = initFileUploader('/posts');

router.post('/',
    [
      passport.authenticate('jwt', { session: false }),
      check('title', dictionary.posts.invalidTitle).isLength({ min: 3 }),
      check('description', dictionary.posts.invalidDescription)
          .isLength({ min: 3, max: 60 }),
      ash(fileUploader.array('post_content', 1)),
    ],
    ash(async (req, res) => {

      const { title, sectionId } = req.body;
      const url = req.files[0].location;

      const post = await new Posts(
          { title, sectionId, url, author: req.user._id });
      await post.save();

      res.json(post);
    }));

router.delete('/:postId', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Posts.findById(req.params.postId);

      if (post.author.toString() === req.user._id.toString()) {
        await post.remove();
      } else {
        throw createError(403, 'Unauthorized');
      }

      res.json({ msg: 'Deleted' });
    }));

router.get('/', ash(async (req, res) => {

  let { offset, limit } = req.body;
  if (!offset) offset = 0;
  if (!limit) limit = 50;

  const sectionId = req.body.sectionId || '';

  let total = 0;
  let posts = null;

  if (sectionId) {
    total = await Posts.countDocuments({ sectionId });
    posts = await Posts.find({ sectionId }).skip(+offset).limit(+limit);
  } else {
    total = await Posts.estimatedDocumentCount();
    posts = await Posts.find().skip(+offset).limit(+limit);
  }

  res.json({ payload: posts, total });
}));

router.get('/:postId', ash(async (req, res) => {

  const postId = req.params.postId;

  const post = await Posts.findById(postId);

  res.json({ payload: post });
}));

module.exports = router;