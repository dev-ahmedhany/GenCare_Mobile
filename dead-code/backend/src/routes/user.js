const router = require('express').Router();

router.get('/profile', (req, res) => {
  res.send('User profile');
});

module.exports = router;
