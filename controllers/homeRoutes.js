const router = require('express').Router();
const sequilize = require('../config/connection');
const { Comment, Post, User } = require('../models');



router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }]
    });

    res.render("homepage", { loggedIn: req.session.logged_in,post:postData })
  }
  catch (err) {
    if (err) console.log("Homepage", err)
  }
});



router.get('/post/:id', async (req, res) => {
  try {
    const postId = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }]
    });

    if (!postId) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    const post = postId.get({ plain: true });

    const comment = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [{ model: User }]
    })

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard', { loggedIn: req.session.logged_in });
    return;
  }
  console.log('logged_in')
  res.render('login', { loggedIn: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;

  }

  res.render('signup', { loggedIn: req.session.logged_in });
})

module.exports = router;
