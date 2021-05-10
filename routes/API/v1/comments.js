const router = require('express').Router();
const passport = require('passport');
const createError = require('http-errors');
require('../../../config/passport');
const { check, validationResult } = require('express-validator');
const Comments = require('../../../models/Comment');
const ash = require('../../../helpers/asyncHandler');

const lang = process.env.LANGUAGE;
const dictionary = require('../../../config/errorMessages');

router.post('/',
    [
      passport.authenticate('jwt', { session: false }),
      check('text', dictionary.comments.invalidText).isLength({ min: 3 }),
    ],
    ash(async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { post, text } = req.body;

      const comment = await new Comments({ post, text, author: req.user._id });
      comment.save();

      res.json(comment);
    }));

router.delete('/:commentId', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const comment = await Comments.findById(req.params.commentId);

      if (comment.author.toString() === req.user._id.toString()) {
        await comment.remove();
      } else {
        throw createError(403, 'Unauthorized');
      }

      res.json({ msg: 'Deleted' });
    }));

router.get('/', ash(async (req, res) => {

  let { offset, limit } = req.body;
  if (!offset) offset = 0;
  if (!limit) limit = 50;

  const postId = req.body.postId || '';

  let total = 0;
  let comments = null;

  if (postId) {
    total = await Comments.countDocuments({ postId });
    comments = await Comments.find({ postId }).skip(+offset).limit(+limit);
  } else {
    total = await Comments.estimatedDocumentCount();
    comments = await Comments.find().skip(+offset).limit(+limit);
  }

  res.json({ payload: comments, total });
}));

router.get('/:commentId', ash(async (req, res) => {

  const commentId = req.params.commentId;

  const comment = await Comments.findById(commentId);

  res.json({ payload: comment });
}));

router.post('/:commentId/like', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const commentId = req.params.commentId;
      const userId = req.user._id;

      const comment = await Comments.findById(commentId);

      let alreadyLiked = false;

      comment.likes.forEach((like, index) => {
        console.log(index);
        if (like._id.toString() === userId.toString()) {
          console.log('id ', like._id);
          comment.likes.splice(index, 1);
          alreadyLiked = true;
        }
        if(alreadyLiked) return false;
      });

      if (!alreadyLiked) {
        comment.likes.push(userId);
      }

      await comment.save();

      res.json({ payload: comment });
    }));

module.exports = router;