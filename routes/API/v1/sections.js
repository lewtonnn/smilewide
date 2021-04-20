const router = require('express').Router();
const passport = require('passport');
require('../../../config/passport');
const initFileUploader = require('../../../config/multerS3');
const Sections = require('../../../models/Section');
const ash = require('../../../helpers/asyncHandler');

const fileUploader = initFileUploader('/sections');

router.post('/',
    [
      passport.authenticate('jwt', { session: false }),
      ash(fileUploader.array('section_avatar', 1)),
    ],
    ash(async (req, res) => {

      const { title } = req.body;
      const picture = req.files[0].location;

      const section = await new Sections({ title, picture });
      section.save();

      res.json(section);
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