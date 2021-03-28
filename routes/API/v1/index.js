const router = require('express').Router();
const fs = require('fs');

const apiRoutes = fs.readdirSync(__dirname);
for (const route of apiRoutes) {
  if (route !== 'index.js' && route.slice(-3) === '.js') {
    const routeName = route.split('.')[0];
    router.use('/' + routeName, require('./' + routeName));
  }
}

router.get('/', (req, res) => {
  res.json({ msg: 'ok API/v1' });
});

module.exports = router;