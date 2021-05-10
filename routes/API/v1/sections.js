const router = require('express').Router();
const passport = require('passport');
require('../../../config/passport');
const { check, validationResult } = require('express-validator');
const initFileUploader = require('../../../config/multerS3');
const Sections = require('../../../models/Section');
const Users = require('../../../models/User');
const createError = require('http-errors');
const ash = require('../../../helpers/asyncHandler');

const lang = process.env.LANGUAGE;
const dictionary = require('../../../config/errorMessages');

const fileUploader = initFileUploader('/sections');

router.post('/',
    [
      passport.authenticate('jwt', { session: false }),
      check('title', dictionary.sections.invalidTitle).notEmpty(),
      ash(fileUploader.array('section_picture', 1)),
    ],
    ash(async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await Users.findById(req.user._id);

      if (user.role !== 'admin') {
        throw createError(403, 'Unauthorized');
      }

      const title = req.body.title;
      const picture = req.files[0].location;

      const section = await new Sections({ title, picture });
      await section.save();

      res.json(section);
    }));

router.delete('/:sectionId', passport.authenticate('jwt', { session: false }),
    ash(async (req, res) => {

      const user = await Users.findById(req.user._id);

      if (user.role !== 'admin') {
        throw createError(403, 'Unauthorized');
      }

      await Sections.deleteOne({ _id: req.params.sectionId });

      res.json({ msg: 'Deleted' });
    }))
;

router.get('/', ash(async (req, res) => {

  let { offset, limit } = req.body;
  if (!offset) offset = 0;
  if (!limit) limit = 50;

  let total = 0;
  let sections = null;

  total = await Posts.estimatedDocumentCount();
  sections = await Posts.find().skip(+offset).limit(+limit);

  res.json({ payload: sections, total });
}));

router.get('/:sectionId', ash(async (req, res) => {

  const sectionId = req.params.sectionId;

  const section = await Sections.findById(sectionId);

  res.json({ payload: section });
}));

router.put('/:sectionId',
    [
      passport.authenticate('jwt', { session: false }),
      ash(fileUploader.array('section_picture', 1)),
    ], ash(async (req, res) => {

      const user = await Users.findById(req.user._id);

      if (user.role !== 'admin') {
        throw createError(403, 'Unauthorized');
      }

      let fieldsToUpdate = {};

      const picture = req.files[0].location;

      const sectionId = req.params.sectionId;

      let section = await Sections.findById(sectionId);

      section = {};

      res.json({ payload: section });
    }));

module.exports = router;