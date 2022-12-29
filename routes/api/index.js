const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');
const reactionRoutes = require('./reaction-routes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/reaction', reactionRoutes);

module.exports = router;