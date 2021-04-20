const router = require('express').Router();
const passport = require('passport');
require('../../../config/passport');
const Comments = require('../../../models/Comment');
const ash = require('../../../helpers/asyncHandler');

router.post('/',
    passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

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

module.exports = router;