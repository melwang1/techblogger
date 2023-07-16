const router = require('express').Router();
const userRoutes = require('./userRoutes');
const newPostRoutes = require('./newpostRoutes');


router.use('/users', userRoutes);
router.use('/posts', newPostRoutes);


module.exports = router;
//Checnge file name